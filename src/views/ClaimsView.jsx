import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  FileCheck,
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ClaimsView = () => {
  const { 
    claims, 
    items, 
    updateClaimStatus, 
    setSelectedItemId 
  } = useApp();

  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'

  const filteredClaims = claims.filter(c => {
    if (filterTab === 'all') return true;
    return c.status === filterTab;
  });

  return (
    <div>
      <div className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '1.75rem' }}>Claims & Verification Center</h1>
          <p className="section-subtitle">
            Review ownership claims, verify claimant proofs, and approve handover reunions
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button 
          className={`tab-btn ${filterTab === 'all' ? 'active' : ''}`}
          onClick={() => setFilterTab('all')}
        >
          All Claims ({claims.length})
        </button>
        <button 
          className={`tab-btn ${filterTab === 'pending' ? 'active' : ''}`}
          onClick={() => setFilterTab('pending')}
        >
          Pending Review ({claims.filter(c => c.status === 'pending').length})
        </button>
        <button 
          className={`tab-btn ${filterTab === 'approved' ? 'active' : ''}`}
          onClick={() => setFilterTab('approved')}
        >
          Approved ({claims.filter(c => c.status === 'approved').length})
        </button>
        <button 
          className={`tab-btn ${filterTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilterTab('rejected')}
        >
          Rejected ({claims.filter(c => c.status === 'rejected').length})
        </button>
      </div>

      {filteredClaims.length > 0 ? (
        <div className="claims-list">
          {filteredClaims.map((claim) => {
            const relatedItem = items.find(i => i.id === claim.itemId);

            return (
              <div key={claim.id} className="claim-item-card">
                <div className="claim-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className={`claim-badge ${claim.status}`}>
                      {claim.status === 'pending' ? '⏳ Pending Verification' :
                       claim.status === 'approved' ? '✓ Claim Approved' : '✕ Rejected'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>
                      Claim ID: {claim.id} • Submitted: {new Date(claim.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {relatedItem && (
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedItemId(relatedItem.id)}
                      style={{ fontSize: '0.78rem' }}
                    >
                      <span>View Target Item</span>
                      <ExternalLink size={12} />
                    </button>
                  )}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Claimed Item
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-950)' }}>
                    {claim.itemTitle}
                  </div>
                </div>

                {/* Claimant Proof Box */}
                <div style={{
                  backgroundColor: 'var(--slate-50)',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px',
                  marginBottom: 16
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: 4 }}>
                    Submitted Ownership Evidence & Secret Identifiers
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--slate-800)', lineHeight: 1.5 }}>
                    "{claim.ownershipProof}"
                  </div>
                  {claim.additionalNotes && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', marginTop: 8 }}>
                      Note: {claim.additionalNotes}
                    </div>
                  )}
                </div>

                {/* Claimant Info and Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 12,
                  paddingTop: 12,
                  borderTop: '1px solid var(--slate-100)'
                }}>
                  <div style={{ display: 'flex', gap: 18, fontSize: '0.84rem', color: 'var(--slate-600)' }}>
                    <div>
                      <span style={{ color: 'var(--slate-400)' }}>Claimant: </span>
                      <strong>{claim.claimantName}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--slate-400)' }}>Email: </span>
                      <a href={`mailto:${claim.claimantEmail}`} style={{ color: 'var(--blue-accent)' }}>
                        {claim.claimantEmail}
                      </a>
                    </div>
                    {claim.claimantPhone && (
                      <div>
                        <span style={{ color: 'var(--slate-400)' }}>Phone: </span>
                        <span>{claim.claimantPhone}</span>
                      </div>
                    )}
                  </div>

                  {claim.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ color: 'var(--rose-600)', borderColor: 'var(--rose-border)' }}
                        onClick={() => updateClaimStatus(claim.id, 'rejected')}
                      >
                        <XCircle size={15} />
                        Reject Claim
                      </button>

                      <button
                        className="btn btn-blue btn-sm"
                        onClick={() => updateClaimStatus(claim.id, 'approved')}
                      >
                        <CheckCircle2 size={15} />
                        Approve & Mark Reunited
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <ShieldCheck size={32} />
          </div>
          <h3 className="empty-title">No claims found under this filter</h3>
          <p className="empty-text">
            When users claim ownership of found items with distinguishing details, their verification tickets will show up here.
          </p>
          <button className="btn btn-outline" onClick={() => setFilterTab('all')}>
            Show All Claims
          </button>
        </div>
      )}
    </div>
  );
};

