import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ITEMS, INITIAL_CLAIMS, INITIAL_ACTIVITIES } from '../data/sampleData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load items from localStorage or use INITIAL_ITEMS
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('findback_items');
      return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    } catch (e) {
      console.error('Error loading items from localStorage', e);
      return INITIAL_ITEMS;
    }
  });

  // Load claims
  const [claims, setClaims] = useState(() => {
    try {
      const saved = localStorage.getItem('findback_claims');
      return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
    } catch (e) {
      console.error('Error loading claims from localStorage', e);
      return INITIAL_CLAIMS;
    }
  });

  // Load activities
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('findback_activities');
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch (e) {
      return INITIAL_ACTIVITIES;
    }
  });

  // Navigation & View state
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'browse' | 'report' | 'my-reports' | 'claims'
  const [reportTypeInitial, setReportTypeInitial] = useState('lost'); // for pre-selecting type in report form
  const [selectedItemId, setSelectedItemId] = useState(null); // for item detail modal
  const [claimingItemId, setClaimingItemId] = useState(null); // for claim modal
  const [editingItemId, setEditingItemId] = useState(null); // for edit modal

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'lost' | 'found' | 'resolved'

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('findback_items', JSON.stringify(items));
    } catch (e) {
      console.error('Could not save items to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('findback_claims', JSON.stringify(claims));
    } catch (e) {
      console.error('Could not save claims to localStorage', e);
    }
  }, [claims]);

  useEffect(() => {
    try {
      localStorage.setItem('findback_activities', JSON.stringify(activities));
    } catch (e) {
      console.error('Could not save activities to localStorage', e);
    }
  }, [activities]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: 'fb-' + Date.now(),
      createdAt: new Date().toISOString(),
      claimCount: 0,
      claimedBy: null,
      status: 'open',
      isUserReport: true
    };
    setItems(prev => [newItem, ...prev]);

    // Add activity
    const newActivity = {
      id: 'act-' + Date.now(),
      type: `${newItem.type}_reported`,
      text: `New ${newItem.type} item reported: ${newItem.title}`,
      location: newItem.location.split('(')[0].trim(),
      time: 'Just now'
    };
    setActivities(prev => [newActivity, ...prev]);

    addToast(`Successfully submitted ${newItem.type.toUpperCase()} report!`, 'success');
    return newItem;
  };

  const updateItem = (id, updatedFields) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, ...updatedFields };
      }
      return item;
    }));
    addToast('Item details successfully updated!', 'success');
  };

  const deleteItem = (id) => {
    const itemToDelete = items.find(i => i.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    // Also remove associated claims
    setClaims(prev => prev.filter(c => c.itemId !== id));
    if (selectedItemId === id) setSelectedItemId(null);
    addToast(`"${itemToDelete ? itemToDelete.title : 'Report'}" was deleted.`, 'info');
  };

  const submitClaim = (claimData) => {
    const newClaim = {
      ...claimData,
      id: 'claim-' + Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setClaims(prev => [newClaim, ...prev]);

    // Update item claimCount
    setItems(prev => prev.map(item => {
      if (item.id === claimData.itemId) {
        return { ...item, claimCount: (item.claimCount || 0) + 1 };
      }
      return item;
    }));

    // Add activity
    const newAct = {
      id: 'act-' + Date.now(),
      type: 'claim_submitted',
      text: `${claimData.claimantName} filed an ownership claim for: ${claimData.itemTitle}`,
      location: 'Online Verification',
      time: 'Just now'
    };
    setActivities(prev => [newAct, ...prev]);

    addToast('Verification claim submitted! The poster will be notified.', 'success');
    return newClaim;
  };

  const updateClaimStatus = (claimId, newStatus) => {
    const claim = claims.find(c => c.id === claimId);
    if (!claim) return;

    setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: newStatus } : c));

    if (newStatus === 'approved') {
      // Mark item as resolved/claimed
      setItems(prev => prev.map(item => {
        if (item.id === claim.itemId) {
          return {
            ...item,
            status: 'resolved',
            claimedBy: {
              name: claim.claimantName,
              email: claim.claimantEmail,
              proof: claim.ownershipProof,
              date: new Date().toISOString().split('T')[0]
            }
          };
        }
        return item;
      }));

      // Activity
      const newAct = {
        id: 'act-' + Date.now(),
        type: 'resolved',
        text: `Item resolved & claimed: ${claim.itemTitle}`,
        location: 'Campus Union',
        time: 'Just now'
      };
      setActivities(prev => [newAct, ...prev]);
      addToast(`Claim approved! Item marked as reunited.`, 'success');
    } else {
      addToast(`Claim status updated to ${newStatus}.`, 'info');
    }
  };

  const resetAllData = () => {
    setItems(INITIAL_ITEMS);
    setClaims(INITIAL_CLAIMS);
    setActivities(INITIAL_ACTIVITIES);
    localStorage.removeItem('findback_items');
    localStorage.removeItem('findback_claims');
    localStorage.removeItem('findback_activities');
    addToast('Reset to original sample campus data.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        items,
        claims,
        activities,
        currentView,
        setCurrentView,
        reportTypeInitial,
        setReportTypeInitial,
        selectedItemId,
        setSelectedItemId,
        claimingItemId,
        setClaimingItemId,
        editingItemId,
        setEditingItemId,
        searchQuery,
        setSearchQuery,
        filterCategory,
        setFilterCategory,
        filterLocation,
        setFilterLocation,
        filterStatus,
        setFilterStatus,
        toasts,
        addToast,
        removeToast,
        addItem,
        updateItem,
        deleteItem,
        submitClaim,
        updateClaimStatus,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

