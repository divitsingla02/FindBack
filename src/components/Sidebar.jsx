import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  PlusCircle, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw,
  Compass,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { currentView, setCurrentView, items, claims, resetAllData } = useApp();

  const userReportCount = items.filter(i => i.isUserReport).length;
  const pendingClaimCount = claims.filter(c => c.status === 'pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'browse', label: 'Browse Items', icon: Compass, count: items.length },
    { id: 'report', label: 'Report Item', icon: PlusCircle },
    { id: 'my-reports', label: 'My Reports', icon: FileText, count: userReportCount },
    { id: 'claims', label: 'Claims Center', icon: ShieldCheck, count: pendingClaimCount }
  ];

  const handleNav = (viewId) => {
    setCurrentView(viewId);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-logo" onClick={() => handleNav('dashboard')}>
            <div className="brand-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <span className="brand-name">FindBack</span>
              <span className="brand-badge">Campus</span>
            </div>
          </div>
          {mobileOpen && (
            <button 
              className="modal-close" 
              style={{ color: '#ffffff' }}
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="sidebar-nav">
          <div className="nav-section-label">Main Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item.id)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="badge-count">{item.count}</span>
                )}
              </button>
            );
          })}

          <div className="nav-section-label" style={{ marginTop: 'auto' }}>
            System Tools
          </div>
          <button
            className="nav-link"
            onClick={() => {
              if (confirm('Reset to initial sample items and activity demo data?')) {
                resetAllData();
              }
            }}
            title="Reset demo data"
            style={{ opacity: 0.8 }}
          >
            <RotateCcw size={18} />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="campus-pill">
            <span className="campus-dot"></span>
            <div>
              <div style={{ color: '#f8fafc', fontWeight: 600 }}>Central Campus Hub</div>
              <div style={{ fontSize: '0.72rem' }}>Online & Synchronized</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

