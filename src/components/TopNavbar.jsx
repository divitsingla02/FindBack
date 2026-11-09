import React from 'react';
import { 
  Search, 
  Menu, 
  Plus, 
  MapPin, 
  Bell, 
  User, 
  SlidersHorizontal 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopNavbar = ({ setMobileOpen }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    setCurrentView, 
    setReportTypeInitial,
    claims
  } = useApp();

  const pendingClaims = claims.filter(c => c.status === 'pending').length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentView('browse');
  };

  const openReport = (type) => {
    setReportTypeInitial(type);
    setCurrentView('report');
  };

  return (
    <header className="top-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button 
          className="mobile-toggle"
          onClick={() => setMobileOpen(true)}
          aria-label="Toggle Navigation"
        >
          <Menu size={22} />
        </button>

        <form onSubmit={handleSearchSubmit} className="top-nav-search">
          <Search size={16} color="var(--slate-400)" />
          <input
            type="text"
            placeholder="Search items, wallets, AirPods, keys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="top-nav-actions">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => openReport('lost')}
          title="Report an item you lost on campus"
        >
          <span style={{ color: '#dc2626', fontWeight: 800 }}>•</span>
          Report Lost
        </button>

        <button
          className="btn btn-blue btn-sm"
          onClick={() => openReport('found')}
          title="List an item you found on campus"
        >
          <Plus size={16} />
          Report Found
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8 }}>
          <button
            onClick={() => setCurrentView('claims')}
            style={{
              background: 'none',
              border: 'none',
              position: 'relative',
              padding: 8,
              cursor: 'pointer',
              color: 'var(--slate-600)',
              borderRadius: 'var(--radius-sm)'
            }}
            title={`${pendingClaims} pending verification claim(s)`}
          >
            <Bell size={20} />
            {pendingClaims > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  backgroundColor: '#ef4444',
                  borderRadius: '50%'
                }}
              />
            )}
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--slate-100)',
              border: '1px solid var(--slate-200)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--slate-700)'
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'var(--navy-900)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={14} />
            </div>
            <span>Student Portal</span>
          </div>
        </div>
      </div>
    </header>
  );
};

