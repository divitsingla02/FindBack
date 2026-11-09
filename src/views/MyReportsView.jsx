import React from 'react';
import { 
  FileText, 
  PlusCircle, 
  Edit2, 
  Trash2, 
  Eye, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Inbox
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/sampleData';

export const MyReportsView = () => {
  const { 
    items, 
    setSelectedItemId, 
    setEditingItemId, 
    deleteItem, 
    setReportTypeInitial, 
    setCurrentView 
  } = useApp();

  const myReports = items.filter(item => item.isUserReport);

  const handleDelete = (id, title) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      deleteItem(id);
    }
  };

  return (
    <div>
      <div className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '1.75rem' }}>My Reported Items</h1>
          <p className="section-subtitle">
            Manage your personal submissions, review status changes, edit details, or remove solved items
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              setReportTypeInitial('lost');
              setCurrentView('report');
            }}
          >
            + Lost Report
          </button>
          <button
            className="btn btn-blue btn-sm"
            onClick={() => {
              setReportTypeInitial('found');
              setCurrentView('report');
            }}
          >
            + Found Report
          </button>
        </div>
      </div>

      {myReports.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {myReports.map((item) => {
            const categoryObj = CATEGORIES.find(c => c.id === item.category);
            const categoryLabel = categoryObj ? categoryObj.label : item.category;
            const isResolved = item.status === 'resolved';

            return (
              <div 
                key={item.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* Thumbnail */}
                <div 
                  style={{
                    width: 100,
                    height: 80,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: 'var(--slate-100)'
                  }}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span 
                      className={`badge-status ${
                        isResolved ? 'badge-resolved' : (item.type === 'lost' ? 'badge-lost' : 'badge-found')
                      }`}
                      style={{ position: 'static' }}
                    >
                      {isResolved ? 'Reunited' : item.type.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-400)' }}>
                      Category: {categoryLabel}
                    </span>
                    {item.claimCount > 0 && (
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--blue-accent)' }}>
                        • {item.claimCount} Claim(s) submitted
                      </span>
                    )}
                  </div>

                  <h3 
                    style={{ 
                      fontSize: '1.05rem', 
                      fontWeight: 700, 
                      color: 'var(--navy-950)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.title}
                  </h3>

                  <div style={{ display: 'flex', gap: 18, marginTop: 6, fontSize: '0.82rem', color: 'var(--slate-500)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <MapPin size={14} color="var(--slate-400)" />
                      <span>{item.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Calendar size={14} color="var(--slate-400)" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setSelectedItemId(item.id)}
                    title="View item card"
                  >
                    <Eye size={15} />
                    <span>View</span>
                  </button>

                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setEditingItemId(item.id)}
                    title="Edit report details"
                  >
                    <Edit2 size={15} />
                    <span>Edit</span>
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id, item.title)}
                    title="Delete report"
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <FileText size={32} />
          </div>
          <h3 className="empty-title">You haven't submitted any reports yet</h3>
          <p className="empty-text">
            Submit a lost item to get campus alerts or report a found item to help its owner reclaim it.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              className="btn btn-outline"
              onClick={() => {
                setReportTypeInitial('lost');
                setCurrentView('report');
              }}
            >
              Report Lost Belonging
            </button>
            <button
              className="btn btn-blue"
              onClick={() => {
                setReportTypeInitial('found');
                setCurrentView('report');
              }}
            >
              Report Found Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

