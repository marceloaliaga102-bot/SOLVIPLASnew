import React, { Suspense, lazy, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { NewSectionModal } from './components/CanvaEditor/NewSectionModal';
import { CanvaToolbar } from './components/CanvaEditor/CanvaToolbar';
import { LogoEditorModal } from './components/CanvaEditor/LogoEditorModal';
import { WindowLoader } from './components/WindowLoader';
import { CurtainPresentation } from './components/CurtainPresentation';
import { useScrollReveal } from './hooks/useScrollReveal';

// Code-split Lazy-loaded Modular Windows / Pages for optimal fluidity and instant performance
const InicioView = lazy(() => import('./views/InicioView').then(m => ({ default: m.InicioView })));
const TutorialView = lazy(() => import('./views/TutorialView').then(m => ({ default: m.TutorialView })));
const ProductosView = lazy(() => import('./views/ProductosView').then(m => ({ default: m.ProductosView })));
const ResultadosView = lazy(() => import('./views/ResultadosView').then(m => ({ default: m.ResultadosView })));
const NoticiasView = lazy(() => import('./views/NoticiasView').then(m => ({ default: m.NoticiasView })));
const EquipoView = lazy(() => import('./views/EquipoView').then(m => ({ default: m.EquipoView })));
const ComunidadView = lazy(() => import('./views/ComunidadView').then(m => ({ default: m.ComunidadView })));
const CustomSectionView = lazy(() => import('./views/CustomSectionView').then(m => ({ default: m.CustomSectionView })));

const MainContent: React.FC = () => {
  const { currentWindow, customSections, isLogoModalOpen, setIsLogoModalOpen, isAdmin } = useApp();
  const [showCurtain, setShowCurtain] = useState(true);

  // Initialize bidirectional scroll fade-in / fade-out observer
  useScrollReveal();

  // Determine active view to render
  const renderActiveWindow = () => {
    switch (currentWindow) {
      case 'inicio':
        return <InicioView />;
      case 'tutorial':
        return <TutorialView />;
      case 'productos':
        return <ProductosView />;
      case 'resultados':
      case 'galeria':
        return <ResultadosView />;
      case 'noticias':
        return <NoticiasView />;
      case 'equipo':
        return <EquipoView />;
      case 'comunidad':
        return <ComunidadView />;
      default: {
        // Check if currentWindow is a custom section
        const customSec = customSections.find(s => s.id === currentWindow);
        if (customSec) {
          return <CustomSectionView section={customSec} />;
        }
        return <InicioView />;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white w-full max-w-full overflow-x-clip">
      {/* 3-Second Diagonal Opening Curtain Presentation */}
      {showCurtain && (
        <CurtainPresentation onAnimationComplete={() => setShowCurtain(false)} />
      )}

      {/* Sticky Window Navigation Bar with Horizontal Swiping on Mobile */}
      <Navbar />

      {/* Dynamic Window Container with Suspense for fluid code-splitting */}
      <main className="flex-1 min-h-[60vh]">
        <Suspense fallback={<WindowLoader />}>
          {renderActiveWindow()}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Admin Floating Canvas Editor Toolbar - Strictly Admin Only */}
      {isAdmin && <CanvaToolbar />}

      {/* Admin Section Creator Modal - Strictly Admin Only */}
      {isAdmin && <NewSectionModal />}

      {/* Brand & Logo Editor Modal - Strictly Admin Only */}
      {isAdmin && <LogoEditorModal isOpen={isLogoModalOpen} onClose={() => setIsLogoModalOpen(false)} />}

      {/* Auth & Avatar Selection Modals */}
      <AuthModal />
      <ProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
