import React, { useState } from 'react';
import { Calculator, HardDrive, Cpu } from 'lucide-react';

export const ComplexitySection: React.FC = () => {
  const [interactiveRows, setInteractiveRows] = useState<number>(5);
  const [interactiveCols, setInteractiveCols] = useState<number>(7);

  const totalCells = interactiveRows * interactiveCols;
  const maxEdges = Math.max(0, 4 * totalCells - 2 * (interactiveRows + interactiveCols));
  const queueWorstCase = totalCells;

  return (
    <section id="complexity" style={{ backgroundColor: '#ffffff', scrollMarginTop: '3.75rem' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span>THEORETICAL ANALYSIS</span>
            <span>•</span>
            <span>REPORT SECTION 10</span>
          </div>
          <h2 className="section-title">
            Time and Space Complexity Analysis
          </h2>
          <p className="section-desc">
            Let <code>R</code> be the number of rows and <code>C</code> be the number of columns. The total number of cells in the grid is <code>V = R × C</code>. Because every reachable cell is visited at most once, BFS achieves strictly linear complexity.
          </p>
        </div>

        {/* 2 Big Complexity Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {/* Time Complexity */}
          <div className="panel" style={{ borderLeft: '4px solid var(--text-primary)' }}>
            <div className="panel-header">
              <div className="panel-title">
                <Cpu size={14} />
                <span>TIME COMPLEXITY</span>
              </div>
              <span className="badge-tech badge-blue">LINEAR IN CELLS</span>
            </div>

            <div className="panel-body">
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
              }}>
                O(R × C)
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                In the worst case, all <code>R × C</code> cells may be reachable and open. Each cell is added to the FIFO queue once and dequeued once.
              </p>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem',
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                <div>• For every cell removed, exactly 4 directions (Up, Down, Left, Right) are checked.</div>
                <div>• Checking bounds, walls, and visited status requires <code>O(1)</code> constant time per neighbour.</div>
                <div>• Total work: <code>4 × (R × C) = O(R × C)</code>.</div>
              </div>
            </div>
          </div>

          {/* Space Complexity */}
          <div className="panel" style={{ borderLeft: '4px solid #059669' }}>
            <div className="panel-header">
              <div className="panel-title">
                <HardDrive size={14} />
                <span>SPACE COMPLEXITY</span>
              </div>
              <span className="badge-tech badge-green">LINEAR IN CELLS</span>
            </div>

            <div className="panel-body">
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
                fontWeight: 800,
                color: '#059669',
                marginBottom: '0.75rem',
              }}>
                O(R × C)
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Auxiliary memory is allocated to store the state of the grid, the FIFO queue, and the parent links:
              </p>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem',
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                <div>• <strong>Visited Matrix:</strong> <code>visited[ROWS][COLS]</code> takes <code>R × C</code> bytes.</div>
                <div>• <strong>Parent Matrices:</strong> <code>parentRow</code> and <code>parentCol</code> take <code>2 × (R × C)</code> integers.</div>
                <div>• <strong>Queue:</strong> <code>qRow</code>, <code>qCol</code> take at most <code>2 × (R × C)</code> integers.</div>
                <div>• Total auxiliary space: <code>O(R × C)</code>.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Grid Scale Calculator */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">
              <Calculator size={14} />
              <span>INTERACTIVE GRID SCALE EXPLORER</span>
            </div>
            <span className="badge-tech">LIVE METRICS CALCULATOR</span>
          </div>

          <div className="panel-body">
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Adjust grid dimensions to see how BFS operations scale for arbitrary maze sizes:
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
            }}>
              {/* Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span>Rows (R): <strong>{interactiveRows}</strong></span>
                    <span style={{ color: 'var(--text-muted)' }}>[3..30]</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    value={interactiveRows}
                    onChange={(e) => setInteractiveRows(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span>Columns (C): <strong>{interactiveCols}</strong></span>
                    <span style={{ color: 'var(--text-muted)' }}>[3..40]</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={40}
                    value={interactiveCols}
                    onChange={(e) => setInteractiveCols(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--text-primary)' }}
                  />
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Preset Report Case: 5 rows × 7 columns = 35 cells
                </div>
              </div>

              {/* Calculated Results */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
              }}>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.75rem',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Vertices (V = R × C)
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {totalCells} cells
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.75rem',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Max Direction Checks
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: '#0369a1' }}>
                    {4 * totalCells} checks
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.75rem',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Max Graph Edges
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: '#0f766e' }}>
                    {maxEdges} edges
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.75rem',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Queue Max Capacity
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: '#059669' }}>
                    {queueWorstCase} slots
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
