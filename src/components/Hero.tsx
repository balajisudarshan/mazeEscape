import React from 'react';
import { Play } from 'lucide-react';
import { REPORT_PRESET } from '../algorithms/mazeGenerators';

interface HeroProps {
  onExplore: () => void;
  onLoadReportPreset: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onLoadReportPreset }) => {
  const miniGrid = REPORT_PRESET.grid;
  const reportPathKeys = new Set([
    '0,0', '1,0', '1,1', '2,1', '2,2', '2,3', '3,3', '3,4', '3,5', '4,5', '4,6'
  ]);

  return (
    <section style={{
      backgroundColor: '#ffffff',
      padding: '3rem 0 2.5rem',
      borderBottom: '1px solid var(--border-light)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="hero-grid">
          {/* Left Column: Heading and Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge-tech">
                DESIGN AND ANALYSIS OF ALGORITHMS
              </span>
              <span className="badge-tech badge-blue">
                SRM UNIVERSITY AP
              </span>
              <span className="badge-tech badge-green">
                REPORT 2026–2027
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
            }}>
              Find the shortest way out.
            </h1>

            <p style={{
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              maxWidth: '38rem',
            }}>
              Explore how Breadth-First Search traverses a maze, one level at a time, to guarantee the shortest path in an unweighted grid.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '1.75rem'
            }}>
              <button
                className="btn btn-primary"
                onClick={onExplore}
                style={{ padding: '0.625rem 1.25rem', fontSize: '0.9375rem' }}
              >
                <Play size={16} fill="currentColor" />
                Explore the Algorithm
              </button>

              <button
                className="btn btn-secondary"
                onClick={onLoadReportPreset}
                style={{ padding: '0.625rem 1.25rem', fontSize: '0.9375rem' }}
              >
                Load Report Preset (5×7)
              </button>
            </div>

            {/* Quick Technical Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '1.25rem',
            }} className="hero-stats">
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Optimality
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--start-border)' }}>
                  Guaranteed Min Moves
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Time Complexity
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  O(R × C)
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Report Test Case
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  10 moves / 11 cells
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Live Mini Maze Grid */}
          <div>
            <div className="panel" style={{ overflow: 'hidden' }}>
              <div className="panel-header">
                <div className="panel-title">
                  <span style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    display: 'inline-block'
                  }}></span>
                  <span>LIVE MAZE PREVIEW: REPORT 5×7</span>
                </div>
                <span className="badge-tech badge-green" style={{ fontSize: '0.625rem' }}>
                  10 MOVES OPTIMAL
                </span>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: '#f8fafc' }}>
                <div style={{
                  display: 'inline-block',
                  width: '100%',
                  maxWidth: '380px',
                  margin: '0 auto',
                  background: '#ffffff',
                  padding: '0.75rem',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '4px',
                    aspectRatio: '7 / 5',
                  }}>
                    {miniGrid.map((row, r) =>
                      row.map((val, c) => {
                        const isStart = r === 0 && c === 0;
                        const isExit = r === 4 && c === 6;
                        const isWall = val === 1;
                        const isPath = reportPathKeys.has(`${r},${c}`) && !isStart && !isExit;

                        let bg = '#ffffff';
                        let border = '1px solid #e2e8f0';
                        let color = '#64748b';
                        let label = '.';

                        if (isWall) {
                          bg = '#0f172a';
                          border = '1px solid #0f172a';
                          label = '#';
                          color = '#475569';
                        } else if (isStart) {
                          bg = '#10b981';
                          border = '1px solid #059669';
                          label = 'S';
                          color = '#ffffff';
                        } else if (isExit) {
                          bg = '#f59e0b';
                          border = '1px solid #d97706';
                          label = 'E';
                          color = '#ffffff';
                        } else if (isPath) {
                          bg = '#a7f3d0';
                          border = '1px solid #34d399';
                          label = '*';
                          color = '#065f46';
                        }

                        return (
                          <div
                            key={`${r}-${c}`}
                            style={{
                              backgroundColor: bg,
                              border,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '2px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color,
                              userSelect: 'none'
                            }}
                            title={`(${r}, ${c}) ${isWall ? 'Wall' : isStart ? 'Start' : isExit ? 'Exit' : isPath ? 'Shortest Path' : 'Open'}`}
                          >
                            {label}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Subtitle key under preview */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.875rem',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  marginTop: '0.875rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', display: 'inline-block', borderRadius: '1px' }}></span>
                    S = Start (0,0)
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', display: 'inline-block', borderRadius: '1px' }}></span>
                    E = Exit (4,6)
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#0f172a', display: 'inline-block', borderRadius: '1px' }}></span>
                    # = Wall
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#a7f3d0', display: 'inline-block', borderRadius: '1px' }}></span>
                    * = Path (10 moves)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
