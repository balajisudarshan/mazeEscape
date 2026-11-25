import React from 'react';
import { ArrowRight, Check, Layers } from 'lucide-react';

export const MechanismWalkthrough: React.FC = () => {
  return (
    <section id="mechanism" style={{ backgroundColor: 'var(--bg-secondary)', scrollMarginTop: '3.75rem' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span>ALGORITHM MECHANICS</span>
            <span>•</span>
            <span>REPORT SECTION 04 & 08</span>
          </div>
          <h2 className="section-title">
            How BFS Finds the Shortest Path
          </h2>
          <p className="section-desc">
            Breadth-First Search systematically expands outward like a ripple in water. By exploring all cells at distance <code>k</code> before any cell at distance <code>k + 1</code>, it guarantees that the first time the exit is encountered, the route taken is mathematically optimal.
          </p>
        </div>

        {/* 3 Stages Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          {/* Stage 1 */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="panel-header">
              <div className="panel-title">
                <span className="badge-tech badge-blue">STAGE 1</span>
                <span>Explore Nearby Cells</span>
              </div>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                BFS starts at <strong>S</strong> and examines valid adjacent cells in the four cardinal directions: <strong>up, down, left, and right</strong>. Any candidate cell is validated against three conditions:
              </p>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.375rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857' }}>
                  <Check size={14} /> 1. Inside grid boundaries: <code>0 ≤ nr &lt; R && 0 ≤ nc &lt; C</code>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857' }}>
                  <Check size={14} /> 2. Not a wall: <code>maze[nr][nc] == 0</code>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857' }}>
                  <Check size={14} /> 3. Not already visited: <code>visited[nr][nc] == 0</code>
                </div>
              </div>

              {/* Direction Diagram */}
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 40px)',
                  gridTemplateRows: 'repeat(3, 40px)',
                  gap: '4px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}>
                  <div></div>
                  <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #7dd3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', color: '#0369a1' }}>Up</div>
                  <div></div>
                  <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #7dd3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', color: '#0369a1' }}>Left</div>
                  <div style={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', color: '#92400e' }}>Curr</div>
                  <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #7dd3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', color: '#0369a1' }}>Right</div>
                  <div></div>
                  <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #7dd3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px', color: '#0369a1' }}>Down</div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="panel-header">
              <div className="panel-title">
                <span className="badge-tech badge-amber">STAGE 2</span>
                <span>Process the FIFO Queue</span>
              </div>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                BFS relies strictly on a <strong>First-In, First-Out (FIFO)</strong> queue. The earliest discovered cells are processed first. This preserves the monotonic distance invariant:
              </p>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.5,
              }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  FIFO Distance Ordering:
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  Level 0: <code>(0,0)</code>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  Level 1: <code>(1,0), (0,1)</code>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  Level 2: <code>(1,1), ...</code>
                </div>
                <div style={{ color: '#047857', marginTop: '0.25rem', fontWeight: 600 }}>
                  dist(dequeue) ≤ dist(enqueue) at all times.
                </div>
              </div>

              {/* FIFO visualization */}
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                padding: '1rem',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                flexWrap: 'wrap',
              }}>
                <span style={{ color: '#dc2626', fontWeight: 600 }}>Dequeue (Front)</span>
                <span>←</span>
                <div style={{ backgroundColor: '#0284c7', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '2px', fontWeight: 700 }}>
                  (1,0) d=1
                </div>
                <div style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.5rem', borderRadius: '2px' }}>
                  (0,1) d=1
                </div>
                <div style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.5rem', borderRadius: '2px' }}>
                  (1,1) d=2
                </div>
                <span>←</span>
                <span style={{ color: '#047857', fontWeight: 600 }}>Enqueue (Rear)</span>
              </div>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="panel-header">
              <div className="panel-title">
                <span className="badge-tech badge-green">STAGE 3</span>
                <span>Reconstruct the Route</span>
              </div>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                When the exit <strong>E</strong> is dequeued, the shortest path is reconstructed by following parent coordinates (<code>parentRow</code>, <code>parentCol</code>) backwards from <strong>E</strong> to <strong>S</strong>:
              </p>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.5,
              }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Backtracking sequence:
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  (4,6) ← (4,5) ← (3,5) ← ... ← (0,0)
                </div>
                <div style={{ color: '#047857', fontWeight: 600, marginTop: '0.375rem' }}>
                  Reversing yields 10 moves (11 cells).
                </div>
              </div>

              {/* Path reverse diagram */}
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.375rem',
                padding: '0.875rem',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#0369a1' }}>
                  <span>Backtrack: Exit (4,6)</span>
                  <span>←</span>
                  <span>Start (0,0)</span>
                </div>
                <div style={{
                  backgroundColor: '#a7f3d0',
                  color: '#065f46',
                  padding: '0.375rem 0.5rem',
                  borderRadius: '2px',
                  fontWeight: 700,
                  textAlign: 'center',
                }}>
                  Forward: S (0,0) → ... → E (4,6)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Section 08: Flow of the Program Diagram */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">
              <Layers size={14} />
              <span>FLOW OF THE PROGRAM (REPORT SECTION 08)</span>
            </div>
            <span className="badge-tech">SRM AP CSE DAA SPEC</span>
          </div>

          <div className="panel-body">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              padding: '0.5rem 0',
            }}>
              {[
                { step: '1', title: 'Read maze, start and exit', desc: 'Initialize 2D grid & endpoints' },
                { step: '2', title: 'Insert start cell into queue', desc: 'visited[sr][sc] = 1, rear++' },
                { step: '3', title: 'Remove the front cell', desc: 'r = qRow[front++], c = qCol' },
                { step: '4', title: 'Check its four neighbours', desc: 'dr = {-1,1,0,0}, dc = {0,0,-1,1}' },
                { step: '5', title: 'Add valid, unvisited cells', desc: 'visited = 1, record parent, enqueue' },
                { step: '6', title: 'Exit found? Rebuild and print', desc: 'Follow parentRow & parentCol backwards' },
              ].map((flow, idx, arr) => (
                <React.Fragment key={flow.step}>
                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem 1rem',
                    minWidth: '170px',
                    maxWidth: '190px',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                    }}>
                      Step 0{flow.step}
                    </div>
                    <div style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem',
                    }}>
                      {flow.title}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      color: 'var(--text-secondary)',
                    }}>
                      {flow.desc}
                    </div>
                  </div>

                  {idx < arr.length - 1 && (
                    <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      <ArrowRight size={18} className="desktop-arrow" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
