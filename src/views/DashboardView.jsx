import React from 'react';
import { 
  Sparkles, 
  Search, 
  PlusCircle, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ItemCard } from '../components/ItemCard';

export const DashboardView = () => {
  const { 
    items, 
    claims, 
    activities, 
    setCurrentView, 
    setReportTypeInitial,
    setFilterStatus,
    searchQuery,
    setSearchQuery 
  } = useApp();

  const totalLost = items.filter(i => i.type === 'lost' && i.status === 'open').length;
  const totalFound = items.filter(i => i.type === 'found' && i.status === 'open').length;
  const totalResolved = items.filter(i => i.status === 'resolved').length;
  const totalClaims = claims.length;

  const recentItems = [...items]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4);

  const openReport = (type) => {
    setReportTypeInitial(type);
    setCurrentView('report');
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setCurrentView('browse');
  };

  return (
    <div>
      {/* Landing / Hero Section */}
      <section className="hero-banner">
        <div className="hero-tag">
          <Sparkles size={14} />
          <span>Official Campus Lost & Found System</span>
        </div>

        <h1 className="hero-title">
          Lost something on campus? <span>We'll help bring it back.</span>
        </h1>

        <p className="hero-description">
          FindBack connects students, faculty, and campus facility staff in real time. 
          Report misplaced belongings or browse items safely handed over to campus drop-boxes.
        </p>

        {/* Hero search bar */}
        <form onSubmit={handleHeroSearch} className="hero-search-bar">
          <Search size={20} color="var(--slate-400)" />
          <input 
            type="text" 
            placeholder="Search by keywords, brand, model or campus building..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-blue">
            Find Item
          </button>
        </form>

        <div className="hero-actions">
          <button 
            className="btn btn-lg"
            style={{ backgroundColor: '#ffffff', color: 'var(--navy-950)' }}
            onClick={() => openReport('lost')}
          >
            <span style={{ color: '#ef4444', fontSize: '1.2rem', lineHeight: 0 }}>●</span>
            Report Lost Item
          </button>

          <button 
            className="btn btn-blue btn-lg"
            onClick={() => openReport('found')}
          >
            <PlusCircle size={18} />
            Report Found Item
          </button>

          <button
            className="btn btn-outline btn-lg"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              borderColor: 'rgba(255, 255, 255, 0.25)', 
              color: '#ffffff' 
            }}
            onClick={() => {
              setFilterStatus('all');
              setCurrentView('browse');
            }}
          >
            Browse All Listings
          </button>
        </div>
      </section>

      {/* Stats Counter Grid */}
      <section className="stats-grid">
        <div 
          className="stat-card" 
          onClick={() => { setFilterStatus('lost'); setCurrentView('browse'); }}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon rose">
            <ShieldAlert size={26} />
          </div>
          <div>
            <div className="stat-value">{totalLost}</div>
            <div className="stat-label">Active Lost Reports</div>
          </div>
        </div>

        <div 
          className="stat-card"
          onClick={() => { setFilterStatus('found'); setCurrentView('browse'); }}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon blue">
            <Search size={26} />
          </div>
          <div>
            <div className="stat-value">{totalFound}</div>
            <div className="stat-label">Found Awaiting Claim</div>
          </div>
        </div>

        <div 
          className="stat-card"
          onClick={() => { setFilterStatus('resolved'); setCurrentView('browse'); }}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon green">
            <CheckCircle2 size={26} />
          </div>
          <div>
            <div className="stat-value">{totalResolved}</div>
            <div className="stat-label">Reunited Possessions</div>
          </div>
        </div>

        <div 
          className="stat-card"
          onClick={() => setCurrentView('claims')}
          style={{ cursor: 'pointer' }}
        >
          <div className="stat-icon amber">
            <Award size={26} />
          </div>
          <div>
            <div className="stat-value">{totalClaims}</div>
            <div className="stat-label">Claims Verified</div>
          </div>
        </div>
      </section>

      {/* Main Grid: Recently Reported Items & Live Campus Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
        {/* Recently Reported Items */}
        <section>
          <div className="section-header">
            <div>
              <h2 className="section-title">Recently Reported Items</h2>
              <p className="section-subtitle">Latest lost alerts and items found around campus buildings</p>
            </div>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => {
                setFilterStatus('all');
                setCurrentView('browse');
              }}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="items-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {recentItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Live Activity Column */}
        <section>
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <TrendingUp size={20} color="var(--blue-accent)" />
                Latest Activity
              </h2>
              <p className="section-subtitle">Real-time campus union updates</p>
            </div>
          </div>

          <div className="activity-card">
            <div className="activity-list">
              {activities.slice(0, 5).map(act => (
                <div key={act.id} className="activity-item">
                  <div 
                    className="activity-dot"
                    style={{
                      backgroundColor: act.type.includes('found') ? 'var(--blue-subtle)' : 
                                       act.type.includes('lost') ? 'var(--rose-50)' : 
                                       'var(--emerald-50)',
                      color: act.type.includes('found') ? 'var(--blue-accent)' : 
                             act.type.includes('lost') ? 'var(--rose-600)' : 
                             'var(--emerald-600)'
                    }}
                  >
                    {act.type.includes('resolved') ? <CheckCircle2 size={16} /> :
                     act.type.includes('lost') ? <ShieldAlert size={16} /> :
                     <Sparkles size={16} />}
                  </div>

                  <div className="activity-content">
                    <div className="activity-text">{act.text}</div>
                    <div className="activity-meta">
                      <span>{act.location}</span>
                      <span>•</span>
                      <span>{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: '1px solid var(--slate-100)',
              textAlign: 'center'
            }}>
              <button
                className="btn btn-outline btn-sm"
                style={{ width: '100%' }}
                onClick={() => setCurrentView('claims')}
              >
                Inspect Verification Claims ({claims.length})
              </button>
            </div>
          </div>

          {/* Quick Campus Protocol Box */}
          <div style={{
            marginTop: 24,
            padding: '20px 22px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--slate-200)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-950)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={16} color="var(--blue-accent)" /> Campus Lost & Found Hours
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
              Central drop-box collection takes place at 5:00 PM daily at the Student Union Desk (SAC Rm 102). Physical verification requires student ID card.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

