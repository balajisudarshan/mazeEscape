import React from 'react';
import { Compass, FileText, Cpu, GitBranch, BarChart3, Users } from 'lucide-react';

interface NavbarProps {
  onLoadReportPreset: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoadReportPreset, onScrollTo }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border-light)',
      backdropFilter: 'blur(8px)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '3.75rem',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            backgroundColor: 'var(--text-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-xs)',
            fontWeight: 700,
            fontSize: '0.875rem',
            fontFamily: 'var(--font-mono)'
          }}>
            ME
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)'
              }}>
                MAZE ESCAPE
              </span>
              <span className="badge-tech" style={{ fontSize: '0.625rem', padding: '0.125rem 0.375rem' }}>
                BFS 2026–27
              </span>
            </div>
            <div style={{
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)'
            }}>
              SRM University AP • CSE Department
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }} className="desktop-nav">
          <button
            onClick={() => onScrollTo('visualizer')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            <Compass size={14} /> Visualizer
          </button>

          <button
            onClick={() => onScrollTo('mechanism')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            <GitBranch size={14} /> Mechanism
          </button>

          <button
            onClick={() => onScrollTo('algorithm')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            <Cpu size={14} /> Pseudocode & C
          </button>

          <button
            onClick={() => onScrollTo('complexity')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            <BarChart3 size={14} /> Complexity
          </button>

          <button
            onClick={() => onScrollTo('about')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            <Users size={14} /> Project Report
          </button>
        </nav>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onLoadReportPreset}
            title="Load 5×7 report maze: 10 moves (11 cells)"
          >
            <FileText size={14} />
            <span>Preset (5×7)</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => onScrollTo('visualizer')}
          >
            Visualizer
          </button>
        </div>
      </div>
    </header>
  );
};
