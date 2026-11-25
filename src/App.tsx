import React, { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MazeVisualizer } from './components/Visualizer/MazeVisualizer';
import { MechanismWalkthrough } from './components/MechanismWalkthrough';
import { ReportComparisonSection } from './components/ReportComparisonSection';
import { AlgorithmSection } from './components/AlgorithmSection';
import { ComplexitySection } from './components/ComplexitySection';
import { EducationalDeepDive } from './components/EducationalDeepDive';
import { ProjectTeamCard } from './components/ProjectTeamCard';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [loadReportTrigger, setLoadReportTrigger] = useState<number>(1);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerReportPreset = () => {
    setLoadReportTrigger((prev) => prev + 1);
    scrollToSection('visualizer');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <Navbar
        onLoadReportPreset={handleTriggerReportPreset}
        onScrollTo={scrollToSection}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <Hero
          onExplore={() => scrollToSection('visualizer')}
          onLoadReportPreset={handleTriggerReportPreset}
        />

        {/* The Core Interactive Visualizer */}
        <MazeVisualizer onLoadReportTrigger={loadReportTrigger} />

        {/* Visual Mechanism: 3 Stages & Flow of Program */}
        <MechanismWalkthrough />

        {/* 5x7 Report Verification */}
        <ReportComparisonSection
          onLoadReportPreset={handleTriggerReportPreset}
        />

        {/* Algorithm, Pseudocode, and C Code */}
        <AlgorithmSection />

        {/* Time and Space Complexity */}
        <ComplexitySection />

        {/* BFS vs DFS, Real-World Applications, Conclusion */}
        <EducationalDeepDive />

        {/* DAA Project Team and Report Details */}
        <ProjectTeamCard />
      </main>

      {/* Footer */}
      <Footer onScrollTo={scrollToSection} />
    </div>
  );
};

export default App;
