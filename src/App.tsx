/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { useEffect, useState } from 'react';
import AdminCrmDashboard from './components/AdminCrmDashboard';
import CampusAndTestimonials from './components/CampusAndTestimonials';
import FaqAndLeadForm from './components/FaqAndLeadForm';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import PainPointsAndSolutions from './components/PainPointsAndSolutions';
import WhyChooseAndCareers from './components/WhyChooseAndCareers';

type ActiveView = 'landing' | 'crm';

function getInitialView(): ActiveView {
  if (typeof window !== 'undefined' && window.location.hash === '#crm') {
    return 'crm';
  }
  return 'landing';
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>(getInitialView);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#crm') {
        setActiveView('crm');
      } else if (activeView === 'crm' && window.location.hash !== '#crm') {
        setActiveView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeView]);

  const openCrm = () => {
    setActiveView('crm');
    if (window.location.hash !== '#crm') {
      window.history.pushState(null, '', '#crm');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToLanding = () => {
    setActiveView('landing');
    if (window.location.hash === '#crm') {
      window.history.pushState(null, '', '#utama');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToLeadForm = () => {
    if (activeView !== 'landing') {
      setActiveView('landing');
      window.history.pushState(null, '', '#daftar');
      window.setTimeout(() => {
        const formSection = document.getElementById('daftar');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const nameInput = document.getElementById('lead-full-name');
          if (nameInput instanceof HTMLInputElement) {
            nameInput.focus({ preventScroll: true });
          }
        }
      }, 120);
      return;
    }

    const formSection = document.getElementById('daftar');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nameInput = document.getElementById('lead-full-name');
      if (nameInput instanceof HTMLInputElement) {
        window.setTimeout(() => nameInput.focus({ preventScroll: true }), 450);
      }
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      {activeView === 'crm' ? (
        <AdminCrmDashboard
          onBackToLanding={backToLanding}
          onGoToRegistrationForm={scrollToLeadForm}
        />
      ) : (
        <div className="min-h-screen bg-[#f8fafc] text-[#0f2b5c]">
          <Navbar onNavigateToForm={scrollToLeadForm} onOpenCrm={openCrm} />
          <main>
            <HeroSection onNavigateToForm={scrollToLeadForm} />
            <PainPointsAndSolutions />
            <WhyChooseAndCareers onNavigateToForm={scrollToLeadForm} />
            <CampusAndTestimonials />
            <FaqAndLeadForm onOpenCrm={openCrm} />
          </main>
          <Footer onOpenCrm={openCrm} />
        </div>
      )}
    </MotionConfig>
  );
}
