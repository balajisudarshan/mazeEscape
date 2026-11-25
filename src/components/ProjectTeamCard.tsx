import React from 'react';
import { Users, GraduationCap } from 'lucide-react';

export const ProjectTeamCard: React.FC = () => {
  const teamMembers = [
    { name: 'Prem Gupta', id: 'AP25110010303', role: 'Algorithm Analysis & BFS Traversal' },
    { name: 'R. Chandra Haasini', id: 'AP25110010309', role: 'Data Structures & FIFO Queue' },
    { name: 'J Kushal Reddy', id: 'AP25110010301', role: 'System Implementation & Grid Model' },
    { name: 'Tulasi Manohar', id: 'AP25110010913', role: 'Path Reconstruction & Testing' },
  ];

  return (
    <section id="about" style={{ backgroundColor: '#ffffff', scrollMarginTop: '3.75rem' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span>DAA GROUP PROJECT CREDENTIALS</span>
            <span>•</span>
            <span>ACADEMIC SUBMISSION</span>
          </div>
          <h2 className="section-title">
            Project Information and Research Team
          </h2>
          <p className="section-desc">
            Formal submission details for the Design and Analysis of Algorithms laboratory project at SRM University AP.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start',
        }}>
          {/* Submission Details Card */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <GraduationCap size={14} />
                <span>COURSE & INSTITUTIONAL DETAILS</span>
              </div>
              <span className="badge-tech badge-blue">AY 2026–2027</span>
            </div>

            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '0.5rem',
                fontSize: '0.8125rem',
              }}>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Project:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Maze Escape: Finding Shortest Path Using BFS</span>

                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Subject:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Design and Analysis of Algorithms</span>

                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Submitted To:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Raja Banovoth Sekhar Sir</span>

                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Department:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>CSE Department</span>

                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>University:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>SRM University AP</span>

                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Core Language:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>C (ANSI C99)</span>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.75rem',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                A group project report submitted for the subject <strong>Design and Analysis of Algorithms</strong> in partial fulfillment of the requirements for Bachelor of Technology in Computer Science and Engineering.
              </div>
            </div>
          </div>

          {/* Student Team Card */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <Users size={14} />
                <span>STUDENT INVESTIGATORS</span>
              </div>
              <span className="badge-tech">SRM UNIVERSITY AP</span>
            </div>

            <div className="panel-body" style={{ padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.625rem 0.75rem',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {member.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {member.role}
                      </div>
                    </div>

                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      border: '1px solid var(--border-medium)',
                      padding: '0.1875rem 0.5rem',
                      borderRadius: '2px',
                      color: 'var(--text-primary)',
                    }}>
                      {member.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
