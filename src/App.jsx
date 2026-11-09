import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { DashboardView } from './views/DashboardView';
import { BrowseView } from './views/BrowseView';
import { MyReportsView } from './views/MyReportsView';
import { ClaimsView } from './views/ClaimsView';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ClaimModal } from './components/ClaimModal';
import { ReportModal } from './components/ReportModal';
import { useApp } from './context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

function AppContent() {
  const { currentView, toasts, removeToast } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <TopNavbar setMobileOpen={setMobileOpen} />

        <main className="page-body">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'browse' && <BrowseView />}
          {currentView === 'my-reports' && <MyReportsView />}
          {currentView === 'claims' && <ClaimsView />}
        </main>
      </div>

      {/* Modals */}
      <ItemDetailModal />
      <ClaimModal />
      <ReportModal />

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === 'success' && <CheckCircle2 size={18} color="var(--emerald-600)" />}
            {toast.type === 'error' && <AlertCircle size={18} color="var(--rose-600)" />}
            {toast.type === 'info' && <Info size={18} color="var(--blue-accent)" />}
            
            <span style={{ flex: 1 }}>{toast.message}</span>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--slate-400)',
                padding: 2
              }}
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}

