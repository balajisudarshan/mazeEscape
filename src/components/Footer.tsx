import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid var(--border-medium)',
      padding: '3rem 0 2rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '1.75rem',
                height: '1.75rem',
                backgroundColor: 'var(--text-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '2px',
                fontWeight: 700,
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)'
              }}>
                ME
              </div>
              <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                MAZE ESCAPE
              </span>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Production-quality Breadth-First Search interactive demonstration for Design and Analysis of Algorithms (DAA).
            </p>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              SRM University AP • CSE Department
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}>
              Algorithm Lab
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <li>
                <button
                  onClick={() => onScrollTo('visualizer')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Interactive BFS Visualizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('mechanism')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  3-Stage Mechanism Walkthrough
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('report-case')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  5×7 Report Preset Benchmark
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('complexity')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  O(R × C) Complexity Analysis
                </button>
              </li>
            </ul>
          </div>

          {/* DAA Spec */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}>
              Academic Project
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div>Subject: Design & Analysis of Algorithms</div>
              <div>Submitted to: Raja Banovoth Sekhar Sir</div>
              <div>Team: Prem, Haasini, Kushal, Manohar</div>
              <div>Academic Year: 2026–2027</div>
            </div>
          </div>

          {/* Action */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
            }}>
              Quick Actions
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={scrollToTop}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
            >
              <ArrowUp size={14} /> Back to Top
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}>
          <div>
            © 2026–2027 Maze Escape Project Team • SRM University AP CSE
          </div>
          <div>
            Deterministic FIFO BFS Engine • Zero External Backend Dependencies
          </div>
        </div>
      </div>
    </footer>
  );
};
