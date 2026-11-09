import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  Share2, 
  CheckCircle2,
  Lock,
  Edit2,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/sampleData';

export const ItemDetailModal = () => {
  const { 
    selectedItemId, 
    setSelectedItemId, 
    items, 
    setClaimingItemId, 
    setEditingItemId,
    deleteItem,
    addToast
  } = useApp();

  if (!selectedItemId) return null;

  const item = items.find(i => i.id === selectedItemId);
  if (!item) return null;

  const categoryObj = CATEGORIES.find(c => c.id === item.category);
  const categoryLabel = categoryObj ? categoryObj.label : item.category;
  const isResolved = item.status === 'resolved';
  const isLost = item.type === 'lost';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Listing URL copied to clipboard!', 'info');
    } else {
      addToast('Share URL copied!', 'info');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedItemId(null)}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isResolved ? (
              <span className="badge-status badge-resolved" style={{ position: 'static' }}>
                <CheckCircle2 size={13} /> Reunited
              </span>
            ) : isLost ? (
              <span className="badge-status badge-lost" style={{ position: 'static' }}>
                <AlertCircle size={13} /> Lost Item
              </span>
            ) : (
              <span className="badge-status badge-found" style={{ position: 'static' }}>
                <ShieldCheck size={13} /> Found Item
              </span>
            )}
            <span style={{ fontSize: '0.85rem', color: 'var(--slate-400)' }}>
              Ref #{item.id}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {item.isUserReport && (
              <>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setSelectedItemId(null);
                    setEditingItemId(item.id);
                  }}
                  title="Edit this report"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this listing?')) {
                      deleteItem(item.id);
                    }
                  }}
                  title="Delete report"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
            <button 
              className="modal-close" 
              onClick={() => setSelectedItemId(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="detail-layout">
            <div>
              <div className="detail-img-box">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              {item.reward && (
                <div style={{
                  marginTop: 14,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--emerald-50)',
                  border: '1px solid var(--emerald-border)',
                  color: 'var(--emerald-600)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <span>🎉 Finder Reward Offered:</span>
                  <span>{item.reward}</span>
                </div>
              )}
            </div>

            <div className="detail-info">
              <h2 className="detail-title">{item.title}</h2>

              <div className="detail-attr-list">
                <div className="detail-attr-item">
                  <div className="detail-attr-label">Category</div>
                  <div className="detail-attr-value">{categoryLabel}</div>
                </div>

                <div className="detail-attr-item">
                  <div className="detail-attr-label">Status</div>
                  <div className="detail-attr-value" style={{ textTransform: 'capitalize' }}>
                    {item.status === 'resolved' ? 'Reunited / Closed' : 'Active Listing'}
                  </div>
                </div>

                <div className="detail-attr-item">
                  <div className="detail-attr-label">Location Recorded</div>
                  <div className="detail-attr-value" style={{ fontSize: '0.84rem' }}>
                    {item.location}
                  </div>
                </div>

                <div className="detail-attr-item">
                  <div className="detail-attr-label">Date Reported</div>
                  <div className="detail-attr-value">
                    {item.date} {item.time ? `@ ${item.time}` : ''}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: 6 }}>
                  Item Description & Particulars
                </div>
                <div className="detail-desc-box">
                  {item.description}
                </div>
              </div>

              {/* Resolved info banner */}
              {isResolved && item.claimedBy && (
                <div style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  marginBottom: 16
                }}>
                  <div style={{ fontWeight: 700, color: '#065f46', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={16} /> Reunited with verified owner
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#047857', marginTop: 4 }}>
                    Claimed by: {item.claimedBy.name} on {item.claimedBy.date}
                  </div>
                </div>
              )}

              {/* Contact box */}
              <div className="contact-card">
                <div className="contact-card-title">
                  <User size={15} />
                  <span>Reporter Contact Details</span>
                </div>

                <div className="contact-row">
                  <User size={15} color="#93c5fd" />
                  <span style={{ fontWeight: 600 }}>{item.contactName || 'Campus Community Member'}</span>
                </div>

                {item.contactEmail && (
                  <div className="contact-row">
                    <Mail size={15} color="#93c5fd" />
                    <a 
                      href={`mailto:${item.contactEmail}`} 
                      style={{ color: '#93c5fd', textDecoration: 'none' }}
                    >
                      {item.contactEmail}
                    </a>
                  </div>
                )}

                {item.contactPhone && (
                  <div className="contact-row">
                    <Phone size={15} color="#93c5fd" />
                    <a 
                      href={`tel:${item.contactPhone}`} 
                      style={{ color: '#e2e8f0', textDecoration: 'none' }}
                    >
                      {item.contactPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={handleShare}>
            <Share2 size={16} /> Share Link
          </button>

          {!isResolved && (
            <button
              className="btn btn-blue"
              onClick={() => {
                setSelectedItemId(null);
                setClaimingItemId(item.id);
              }}
            >
              <ShieldCheck size={16} />
              {item.type === 'found' ? 'Claim This Item' : 'I Found This Item / Contact'}
            </button>
          )}

          <button className="btn btn-primary" onClick={() => setSelectedItemId(null)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

