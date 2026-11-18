/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import CampusAndTestimonials from './components/CampusAndTestimonials';
import FaqAndLeadForm from './components/FaqAndLeadForm';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import PainPointsAndSolutions from './components/PainPointsAndSolutions';
import WhyChooseAndCareers from './components/WhyChooseAndCareers';

export default function App() {
  const scrollToLeadForm = () => {
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
      <div className="min-h-screen bg-[#f8fafc] text-[#0f2b5c]">
        <Navbar onNavigateToForm={scrollToLeadForm} />
        <main>
          <HeroSection onNavigateToForm={scrollToLeadForm} />
          <PainPointsAndSolutions />
          <WhyChooseAndCareers onNavigateToForm={scrollToLeadForm} />
          <CampusAndTestimonials />
          <FaqAndLeadForm />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
