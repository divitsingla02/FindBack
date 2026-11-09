import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/sampleData';

export const ItemCard = ({ item }) => {
  const { setSelectedItemId, setClaimingItemId } = useApp();

  const categoryObj = CATEGORIES.find(c => c.id === item.category);
  const categoryLabel = categoryObj ? categoryObj.label : item.category;

  const isResolved = item.status === 'resolved';
  const isLost = item.type === 'lost';

  return (
    <div 
      className="item-card"
      onClick={() => setSelectedItemId(item.id)}
    >
      <div className="item-card-media">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="item-card-img"
          onError={(e) => {
            // fallback image if unsplash fails
            e.target.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Status Badge */}
        {isResolved ? (
          <span className="badge-status badge-resolved">
            <CheckCircle2 size={12} /> Reunited / Claimed
          </span>
        ) : isLost ? (
          <span className="badge-status badge-lost">
            <AlertCircle size={12} /> Lost
          </span>
        ) : (
          <span className="badge-status badge-found">
            <ShieldCheck size={12} /> Found
          </span>
        )}

        {/* Category Pill */}
        <span className="badge-category">
          {categoryLabel}
        </span>
      </div>

      <div className="item-card-body">
        <h3 className="item-card-title" title={item.title}>
          {item.title}
        </h3>

        <p className="item-card-desc">
          {item.description}
        </p>

        <div className="item-meta-list">
          <div className="item-meta-row" title={item.location}>
            <MapPin size={14} color="var(--blue-accent)" />
            <span>{item.location}</span>
          </div>

          <div className="item-meta-row">
            <Calendar size={14} color="var(--slate-400)" />
            <span>{item.date} {item.time ? `• ${item.time}` : ''}</span>
          </div>
        </div>
      </div>

      <div className="item-card-footer">
        <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 500 }}>
          {item.reward ? (
            <span style={{ color: '#059669', fontWeight: 700 }}>🎁 {item.reward}</span>
          ) : (
            <span>By {item.contactName ? item.contactName.split(' ')[0] : 'Campus Member'}</span>
          )}
        </div>

        <button 
          className="btn btn-outline btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItemId(item.id);
          }}
          style={{ gap: 4 }}
        >
          <span>View</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

