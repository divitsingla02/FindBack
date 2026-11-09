import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  FileCheck,
  Lock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ClaimModal = () => {
  const { 
    claimingItemId, 
    setClaimingItemId, 
    items, 
    submitClaim 
  } = useApp();

  const item = items.find(i => i.id === claimingItemId);

  const [formData, setFormData] = useState({
    claimantName: '',
    claimantEmail: '',
    claimantPhone: '',
    ownershipProof: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!claimingItemId || !item) return null;

  const validate = () => {
    const errs = {};
    if (!formData.claimantName.trim()) {
      errs.claimantName = 'Full Name is required.';
    }
    if (!formData.claimantEmail.trim()) {
      errs.claimantEmail = 'Campus or personal email is required.';
    } else if (!formData.claimantEmail.includes('@')) {
      errs.claimantEmail = 'Please provide a valid email address.';
    }
    if (!formData.claimantPhone.trim()) {
      errs.claimantPhone = 'Contact phone number is required.';
    }
    if (!formData.ownershipProof.trim()) {
      errs.ownershipProof = 'Please provide verification details or description of unique identifiers.';
    } else if (formData.ownershipProof.trim().length < 15) {
      errs.ownershipProof = 'Proof description should be at least 15 characters for verification.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitClaim({
        itemId: item.id,
        itemTitle: item.title,
        claimantName: formData.claimantName,
        claimantEmail: formData.claimantEmail,
        claimantPhone: formData.claimantPhone,
        ownershipProof: formData.ownershipProof,
        additionalNotes: formData.additionalNotes
      });
      setIsSubmitting(false);
      setClaimingItemId(null);
    }, 400);
  };

  const isFoundItem = item.type === 'found';

  return (
    <div className="modal-overlay" onClick={() => setClaimingItemId(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--blue-subtle)',
              color: 'var(--blue-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="modal-title">
                {isFoundItem ? 'Submit Ownership Claim' : 'Report Found Match'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                Target: {item.title}
              </p>
            </div>
          </div>

          <button 
            className="modal-close"
            onClick={() => setClaimingItemId(null)}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{
              backgroundColor: 'var(--slate-50)',
              border: '1px solid var(--slate-200)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.84rem',
              color: 'var(--slate-600)',
              lineHeight: 1.5
            }}>
              <div style={{ fontWeight: 600, color: 'var(--slate-800)', marginBottom: 2 }}>
                🔒 Safe Campus Verification
              </div>
              To prevent fraudulent claims, describe details not publicly visible in the listing photos (e.g. wallpaper, serial numbers, scratches, contents of wallet/bag).
            </div>

            <div className="form-group">
              <label className="form-label">Your Full Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Alex Morgan"
                value={formData.claimantName}
                onChange={(e) => setFormData({ ...formData, claimantName: e.target.value })}
              />
              {errors.claimantName && (
                <span style={{ color: 'var(--rose-600)', fontSize: '0.78rem' }}>
                  {errors.claimantName}
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@campus.edu"
                  value={formData.claimantEmail}
                  onChange={(e) => setFormData({ ...formData, claimantEmail: e.target.value })}
                />
                {errors.claimantEmail && (
                  <span style={{ color: 'var(--rose-600)', fontSize: '0.78rem' }}>
                    {errors.claimantEmail}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+1 (555) 000-0000"
                  value={formData.claimantPhone}
                  onChange={(e) => setFormData({ ...formData, claimantPhone: e.target.value })}
                />
                {errors.claimantPhone && (
                  <span style={{ color: 'var(--rose-600)', fontSize: '0.78rem' }}>
                    {errors.claimantPhone}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Proof of Ownership / Distinct Identifiers *
              </label>
              <textarea
                className="form-textarea"
                rows="4"
                placeholder="Describe hidden details: passcode, engraving, sticker on inside, contents of pockets, date/time you remember dropping it..."
                value={formData.ownershipProof}
                onChange={(e) => setFormData({ ...formData, ownershipProof: e.target.value })}
              />
              {errors.ownershipProof && (
                <span style={{ color: 'var(--rose-600)', fontSize: '0.78rem' }}>
                  {errors.ownershipProof}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Meeting Preference / Notes (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Free to meet at Campus Police station or Library front desk"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setClaimingItemId(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Claim Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

