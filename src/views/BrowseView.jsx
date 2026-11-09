import React, { useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Tag, 
  X, 
  RotateCcw,
  Sparkles,
  Inbox
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ItemCard } from '../components/ItemCard';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/sampleData';

export const BrowseView = () => {
  const { 
    items, 
    searchQuery, 
    setSearchQuery, 
    filterCategory, 
    setFilterCategory,
    filterLocation, 
    setFilterLocation, 
    filterStatus, 
    setFilterStatus,
    setReportTypeInitial,
    setCurrentView 
  } = useApp();

  // Filter logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // 1. Search Query filter (matches title or description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc) return false;
      }

      // 2. Category filter
      if (filterCategory !== 'all' && item.category !== filterCategory) {
        return false;
      }

      // 3. Location filter
      if (filterLocation !== 'all' && item.location !== filterLocation) {
        return false;
      }

      // 4. Status filter ('all', 'lost', 'found', 'resolved')
      if (filterStatus === 'lost' && (item.type !== 'lost' || item.status === 'resolved')) {
        return false;
      }
      if (filterStatus === 'found' && (item.type !== 'found' || item.status === 'resolved')) {
        return false;
      }
      if (filterStatus === 'resolved' && item.status !== 'resolved') {
        return false;
      }

      return true;
    });
  }, [items, searchQuery, filterCategory, filterLocation, filterStatus]);

  const hasActiveFilters = searchQuery !== '' || filterCategory !== 'all' || filterLocation !== 'all' || filterStatus !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setFilterLocation('all');
    setFilterStatus('all');
  };

  return (
    <div>
      {/* Page Title Header */}
      <div className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '1.75rem' }}>Browse Campus Catalog</h1>
          <p className="section-subtitle">
            Search active lost reports, found items turned into campus custody, and reunited records
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
            Report Lost
          </button>
          <button 
            className="btn btn-blue btn-sm"
            onClick={() => {
              setReportTypeInitial('found');
              setCurrentView('report');
            }}
          >
            Report Found
          </button>
        </div>
      </div>

      {/* Filter Toolbar Card */}
      <div className="filter-card">
        <div className="filter-grid">
          {/* Keyword Search */}
          <div className="form-group">
            <label className="form-label">Search Keywords</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Item name, brand, color, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: 34 }}
              />
              <Search 
                size={16} 
                color="var(--slate-400)" 
                style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} 
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--slate-400)'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="form-group">
            <label className="form-label">Location</label>
            <select
              className="form-select"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="all">All Campus Locations</option>
              {CAMPUS_LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="lost">Lost Only (Looking for)</option>
              <option value="found">Found Only (Awaiting Owner)</option>
              <option value="resolved">Reunited / Resolved</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              className="btn btn-outline"
              onClick={clearFilters}
              title="Reset all active filters"
              style={{ height: 42 }}
            >
              <RotateCcw size={15} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="category-pills">
        <button
          className={`cat-pill ${filterCategory === 'all' ? 'active' : ''}`}
          onClick={() => setFilterCategory('all')}
        >
          All Items ({items.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = items.filter(i => i.category === cat.id).length;
          return (
            <button
              key={cat.id}
              className={`cat-pill ${filterCategory === cat.id ? 'active' : ''}`}
              onClick={() => setFilterCategory(filterCategory === cat.id ? 'all' : cat.id)}
            >
              <span>{cat.label}</span>
              <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)', fontWeight: 600 }}>
          Showing <span style={{ color: 'var(--navy-950)', fontWeight: 700 }}>{filteredItems.length}</span> {filteredItems.length === 1 ? 'result' : 'results'}
          {hasActiveFilters && <span style={{ color: 'var(--slate-400)', fontWeight: 400 }}> (filtered)</span>}
        </div>
      </div>

      {/* Items Grid or Empty State */}
      {filteredItems.length > 0 ? (
        <div className="items-grid">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <Inbox size={32} />
          </div>
          <h3 className="empty-title">No items match your criteria</h3>
          <p className="empty-text">
            We couldn't find any lost or found items matching your search or filters. Try adjusting your query or report a new item.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={clearFilters}>
              Clear All Filters
            </button>
            <button
              className="btn btn-blue"
              onClick={() => {
                setReportTypeInitial('lost');
                setCurrentView('report');
              }}
            >
              Post a Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

