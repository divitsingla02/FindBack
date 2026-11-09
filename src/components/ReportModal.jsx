import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  FileText,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAMPUS_LOCATIONS, CATEGORIES } from '../data/sampleData';

const DEFAULT_IMAGES = {
  electronics: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
  wallets: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
  keys: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
  clothing: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
  bags: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  stationery: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80',
  bottles: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  jewelry: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  other: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
};

export const ReportModal = ({ isEditMode = false }) => {
  const { 
    currentView, 
    setCurrentView, 
    reportTypeInitial, 
    editingItemId, 
    setEditingItemId,
    items, 
    addItem, 
    updateItem 
  } = useApp();

  const isViewReport = currentView === 'report' || editingItemId !== null;

  const existingItem = editingItemId ? items.find(i => i.id === editingItemId) : null;

  const [formData, setFormData] = useState({
    type: reportTypeInitial || 'lost',
    title: '',
    category: 'electronics',
    location: CAMPUS_LOCATIONS[0],
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    description: '',
    reward: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});
  const [customLocation, setCustomLocation] = useState('');
  const [useCustomLocation, setUseCustomLocation] = useState(false);

  useEffect(() => {
    if (existingItem) {
      setFormData({
        type: existingItem.type,
        title: existingItem.title,
        category: existingItem.category,
        location: existingItem.location,
        date: existingItem.date,
        time: existingItem.time || '12:00',
        description: existingItem.description,
        reward: existingItem.reward || '',
        contactName: existingItem.contactName || '',
        contactEmail: existingItem.contactEmail || '',
        contactPhone: existingItem.contactPhone || '',
        imageUrl: existingItem.imageUrl || ''
      });
      if (!CAMPUS_LOCATIONS.includes(existingItem.location)) {
        setUseCustomLocation(true);
        setCustomLocation(existingItem.location);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        type: reportTypeInitial || 'lost'
      }));
    }
  }, [existingItem, reportTypeInitial]);

  if (!isViewReport && !editingItemId) return null;

  const handleClose = () => {
    if (editingItemId) {
      setEditingItemId(null);
    } else {
      setCurrentView('browse');
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title / Item name is required.';
    if (!formData.description.trim()) {
      errs.description = 'Please describe the item (color, distinctive marks, brand).';
    } else if (formData.description.trim().length < 10) {
      errs.description = 'Please provide at least 10 characters of description.';
    }
    if (!formData.contactName.trim()) errs.contactName = 'Your name or campus office is required.';
    if (!formData.contactEmail.trim()) {
      errs.contactEmail = 'Email address is required.';
    } else if (!formData.contactEmail.includes('@')) {
      errs.contactEmail = 'Valid email is required.';
    }
    if (useCustomLocation && !customLocation.trim()) {
      errs.location = 'Please specify the custom campus location.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, imageUrl: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const finalLocation = useCustomLocation ? customLocation : formData.location;
    const finalImage = formData.imageUrl || DEFAULT_IMAGES[formData.category] || DEFAULT_IMAGES.other;

    const submissionData = {
      ...formData,
      location: finalLocation,
      imageUrl: finalImage
    };

    if (existingItem) {
      updateItem(existingItem.id, submissionData);
      setEditingItemId(null);
    } else {
      addItem(submissionData);
      setCurrentView('browse');
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 'var(--radius-md)',
              background: formData.type === 'lost' ? '#fee2e2' : '#dbeafe',
              color: formData.type === 'lost' ? '#b91c1c' : '#1d4ed8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={18} />
            </div>
            <div>
              <h3 className="modal-title">
                {existingItem ? 'Edit Report' : (formData.type === 'lost' ? 'Report a Lost Belonging' : 'Report a Found Item')}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                Fill in the details to publish to the campus community
              </p>
            </div>
          </div>

          <button className="modal-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Type selector toggle */}
            {!existingItem && (
              <div className="form-group">
                <label className="form-label">Report Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'lost' })}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: formData.type === 'lost' ? '2px solid #ef4444' : '1px solid var(--slate-300)',
                      backgroundColor: formData.type === 'lost' ? '#fef2f2' : '#ffffff',
                      color: formData.type === 'lost' ? '#991b1b' : 'var(--slate-700)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                  >
                    <span>🔴</span>
                    <span>I LOST Something</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'found' })}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: formData.type === 'found' ? '2px solid #2563eb' : '1px solid var(--slate-300)',
                      backgroundColor: formData.type === 'found' ? '#eff6ff' : '#ffffff',
                      color: formData.type === 'found' ? '#1e40af' : 'var(--slate-700)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                  >
                    <span>🔵</span>
                    <span>I FOUND Something</span>
                  </button>
                </div>
              </div>
            )}

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Item Name / Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Navy Blue Hydroflask or Apple Watch Series 8"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && (
                <span style={{ color: 'var(--rose-600)', fontSize: '0.78rem' }}>
                  {errors.title}
                </span>
              )}
            </div>

            {/* Category and Date/Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Approx. Time</label>
                <input
                  type="time"
                  className="form-input"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Campus Location *</label>
                <button
                  type="button"
                  onClick={() => setUseCustomLocation(!useCustomLocation)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--blue-accent)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {useCustomLocation ? 'Select from predefined campus spots' : '+ Enter custom location'}
                </button>
              </div>

              {useCustomLocation ? (
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Math Dept Room 302, Bench near pond..."
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                />
              ) : (
                <select
                  className="form-select"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                >
                  {CAMPUS_LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              )}
              {errors.location && (
                <span style={{ color: 'var(--rose-600)', fontSize: '0.78rem' }}>
                  {errors.location}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description & Unique Identifiers *</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Describe color, size, stickers, scratches, case, brand or where exactly it was placed..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && (
                <span style={{ color: 'var(--rose-600)', fontSize: '0.78rem' }}>
                  {errors.description}
                </span>
              )}
            </div>

            {/* Reward (Optional) */}
            <div className="form-group">
              <label className="form-label">Finder Reward (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. $25 coffee gift card or $50 cash"
                value={formData.reward}
                onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
              />
            </div>

            {/* Image upload / URL */}
            <div className="form-group">
              <label className="form-label">Item Photo</label>
              {formData.imageUrl ? (
                <div className="preview-box">
                  <img src={formData.imageUrl} alt="Item preview" />
                  <button
                    type="button"
                    className="preview-remove-btn"
                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                    title="Remove photo"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="upload-dropzone">
                  <label style={{ cursor: 'pointer', display: 'block' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFile}
                      style={{ display: 'none' }}
                    />
                    <ImageIcon size={36} color="var(--blue-accent)" style={{ margin: '0 auto 8px auto' }} />
                    <div style={{ fontWeight: 600, color: 'var(--slate-800)', fontSize: '0.9rem' }}>
                      Click to upload image file
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: 4 }}>
                      PNG, JPG or WebP (Or leave blank to auto-assign a relevant category photo)
                    </div>
                  </label>
                  <div style={{ margin: '10px 0', fontSize: '0.75rem', color: 'var(--slate-400)' }}>— OR PASTE IMAGE URL —</div>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://images.unsplash.com/..."
                    style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                </div>
              )}
            </div>

            {/* Reporter Contact Info */}
            <div style={{
              backgroundColor: 'var(--slate-50)',
              border: '1px solid var(--slate-200)',
              padding: '18px 20px',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--navy-950)', marginBottom: 12, fontSize: '0.92rem' }}>
                Your Contact Information
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Jordan Smith"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  />
                  {errors.contactName && (
                    <span style={{ color: 'var(--rose-600)', fontSize: '0.78rem' }}>
                      {errors.contactName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@campus.edu"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                  {errors.contactEmail && (
                    <span style={{ color: 'var(--rose-600)', fontSize: '0.78rem' }}>
                      {errors.contactEmail}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+1 (555) 000-0000"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-blue">
              {existingItem ? 'Save Changes' : `Publish ${formData.type.toUpperCase()} Report`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

