import React from 'react';
import { CheckCircle2, XCircle, Globe, Network, Gamepad2, Compass, BookOpen, GraduationCap } from 'lucide-react';

export const EducationalDeepDive: React.FC = () => {
  return (
    <section id="education" style={{ backgroundColor: 'var(--bg-secondary)', scrollMarginTop: '3.75rem' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span>THEORETICAL FOUNDATIONS & APPLICATIONS</span>
            <span>•</span>
            <span>REPORT SECTIONS 11, 12 & 13</span>
          </div>
          <h2 className="section-title">
            Why BFS Guarantees Shortest Path (BFS vs DFS)
          </h2>
          <p className="section-desc">
            Understanding the mathematical optimality of Breadth-First Search in unweighted grids, its contrast with Depth-First Search, and its foundational role in modern computing systems.
          </p>
        </div>

        {/* Side-by-side BFS vs DFS Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* BFS Card */}
          <div className="panel" style={{ borderTop: '4px solid #059669' }}>
            <div className="panel-header">
              <div className="panel-title">
                <CheckCircle2 size={16} color="#059669" />
                <span>BREADTH-FIRST SEARCH (BFS)</span>
              </div>
              <span className="badge-tech badge-green">OPTIMAL IN UNWEIGHTED</span>
            </div>

            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#065f46',
              }}>
                Guarantees Minimum Moves
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                BFS visits nodes in order of their distance from the source. It explores all neighbors at distance <code>d</code> before exploring any vertex at distance <code>d + 1</code>.
              </p>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.5,
              }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Key Characteristics:</div>
                <div>• Data structure: <strong>FIFO Queue</strong></div>
                <div>• Traversal shape: <strong>Concentric circles / diamond wavefront</strong></div>
                <div>• Shortest path guarantee: <strong>YES</strong> (when edge cost = 1)</div>
                <div>• Memory overhead: <strong>Higher</strong> (must hold level wavefront in memory)</div>
              </div>
            </div>
          </div>

          {/* DFS Card */}
          <div className="panel" style={{ borderTop: '4px solid #dc2626' }}>
            <div className="panel-header">
              <div className="panel-title">
                <XCircle size={16} color="#dc2626" />
                <span>DEPTH-FIRST SEARCH (DFS)</span>
              </div>
              <span className="badge-tech badge-danger" style={{ backgroundColor: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca' }}>
                SUB-OPTIMAL PATHS
              </span>
            </div>

            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#991b1b',
              }}>
                Does NOT Guarantee Shortest Path
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                DFS plunges as deeply as possible along each branch before backtracking. If it chooses a long winding detour that happens to reach the exit, it returns that path regardless of shorter alternative branches.
              </p>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.5,
              }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Key Characteristics:</div>
                <div>• Data structure: <strong>LIFO Stack / Recursion</strong></div>
                <div>• Traversal shape: <strong>Deep meandering tendrils</strong></div>
                <div>• Shortest path guarantee: <strong>NO</strong> (requires exhaustive branch comparison)</div>
                <div>• Memory overhead: <strong>Lower</strong> (proportional to max depth)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Section 11: Real-World Applications */}
        <div className="panel" style={{ marginBottom: '2.5rem' }}>
          <div className="panel-header">
            <div className="panel-title">
              <Globe size={14} />
              <span>REAL-WORLD APPLICATIONS (REPORT SECTION 11)</span>
            </div>
            <span className="badge-tech">PRACTICAL RELEVANCE</span>
          </div>

          <div className="panel-body">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}>
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.875rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                  <Compass size={16} color="#0284c7" />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Maze Solving</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Finding the minimum physical distance from an entrance to an exit in physical or simulated mazes without getting lost in dead ends.
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.875rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                  <Network size={16} color="#059669" />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Unweighted Graphs</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Finding the minimum number of network hops or connections between any two computers or network switches on unweighted backbones.
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.875rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                  <Globe size={16} color="#d97706" />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Social Networks</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Finding degrees of separation between users (e.g., 1st, 2nd, and 3rd degree connections on LinkedIn or mutual friends on social platforms).
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.875rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                  <Gamepad2 size={16} color="#7c3aed" />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Games & Puzzles</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Calculating the minimum sequence of moves to solve 8-puzzle games, Rubik's cube configurations, or chess knight pathfinding.
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.875rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                  <Network size={16} color="#0f766e" />
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Network Exploration</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Broadcasting discovery packets level by level across local networks and peer-to-peer nodes without entering infinite loops.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Section 12 & 13: Conclusion and References */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: '1.5rem',
          alignItems: 'start',
        }} className="conclusion-columns">
          {/* Section 12 Conclusion */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <GraduationCap size={14} />
                <span>PROJECT CONCLUSION (REPORT SECTION 12)</span>
              </div>
            </div>

            <div className="panel-body" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <p style={{ marginBottom: '0.75rem' }}>
                In this project, we used Breadth-First Search to find a shortest route through a maze. The maze was represented using a two-dimensional array, where open cells could be visited and blocked cells could not be crossed.
              </p>
              <p style={{ marginBottom: '0.75rem' }}>
                A queue was used to explore the cells level by level, and a visited array prevented repeated visits. We used parent arrays to remember how each cell was reached and to reconstruct the path after finding the exit.
              </p>
              <p>
                The project helped us understand how BFS works in a practical problem and why it gives the minimum number of moves when every move has equal cost. We also studied the time and space complexity of the solution.
              </p>
            </div>
          </div>

          {/* Section 13 References */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <BookOpen size={14} />
                <span>ACADEMIC REFERENCES (REPORT SECTION 13)</span>
              </div>
            </div>

            <div className="panel-body" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.625rem',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}>
              <div>
                <strong>1.</strong> Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest and Clifford Stein, <em>Introduction to Algorithms</em>, 3rd Edition, MIT Press — Breadth-First Search.
              </div>
              <div>
                <strong>2.</strong> Ellis Horowitz, Sartaj Sahni and Sanguthevar Rajasekaran, <em>Computer Algorithms</em> — graph traversal concepts.
              </div>
              <div>
                <strong>3.</strong> Brian W. Kernighan and Dennis M. Ritchie, <em>The C Programming Language</em>, 2nd Edition, Prentice Hall.
              </div>
              <div>
                <strong>4.</strong> Design and Analysis of Algorithms classroom notes and course material.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
