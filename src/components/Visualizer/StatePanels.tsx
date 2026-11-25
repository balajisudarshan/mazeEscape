import React, { useState } from 'react';
import type { BFSStep, Point } from '../../types/maze';
import { Check, X, Compass, Terminal, Link2 } from 'lucide-react';

interface StatePanelsProps {
  currentStep: BFSStep | null;
  stepHistory: BFSStep[];
  currentStepIndex: number;
}

export const StatePanels: React.FC<StatePanelsProps> = ({
  currentStep,
  stepHistory,
  currentStepIndex,
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'parents' | 'log'>('live');

  const queue = currentStep?.queue || [];
  const currentCell = currentStep?.currentCell;
  const checks = currentStep?.recentNeighborChecks || [];
  const parentMap = currentStep?.parentMap || new Map<string, Point>();

  // Filter logs up to current step
  const visibleLogs = stepHistory
    .slice(0, currentStepIndex + 1)
    .filter((s) => s.logMessage);

  return (
    <div className="panel" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '480px',
      maxHeight: '680px',
    }}>
      {/* Panel Tab Header */}
      <div className="panel-header" style={{ padding: '0.5rem 0.75rem', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => setActiveTab('live')}
            className={`btn btn-sm ${activeTab === 'live' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            <Compass size={12} />
            Live State
          </button>
          <button
            onClick={() => setActiveTab('parents')}
            className={`btn btn-sm ${activeTab === 'parents' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            <Link2 size={12} />
            Parents ({parentMap.size})
          </button>
          <button
            onClick={() => setActiveTab('log')}
            className={`btn btn-sm ${activeTab === 'log' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            <Terminal size={12} />
            Event Log ({visibleLogs.length})
          </button>
        </div>

        <span className="badge-tech" style={{ fontSize: '0.625rem' }}>
          STEP {currentStepIndex + 1}
        </span>
      </div>

      {/* Panel Body */}
      <div style={{
        padding: '0.875rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        flex: 1,
      }}>
        {activeTab === 'live' && (
          <>
            {/* 1. CURRENT CELL */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xs)',
              padding: '0.625rem 0.75rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.25rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}>
                  Current Cell (r = qRow, c = qCol)
                </span>
                {currentCell && (
                  <span className="badge-tech badge-amber" style={{ fontSize: '0.625rem' }}>
                    ACTIVE
                  </span>
                )}
              </div>

              {currentCell ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#92400e',
                  }}>
                    ({currentCell.r}, {currentCell.c})
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                  }}>
                    level: <strong>{currentStep?.currentLevel}</strong>
                  </span>
                </div>
              ) : (
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  None (waiting or search completed)
                </span>
              )}
            </div>

            {/* 2. QUEUE (FIFO) */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xs)',
              padding: '0.625rem 0.75rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.375rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}>
                  FIFO Queue [front ... rear] ({queue.length})
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                  Head ← Tail
                </span>
              </div>

              {queue.length > 0 ? (
                <div style={{
                  display: 'flex',
                  gap: '0.375rem',
                  overflowX: 'auto',
                  paddingBottom: '0.25rem',
                }}>
                  {queue.map((item, idx) => (
                    <div
                      key={`queue-${idx}`}
                      style={{
                        backgroundColor: idx === 0 ? '#0284c7' : '#ffffff',
                        color: idx === 0 ? '#ffffff' : 'var(--text-primary)',
                        border: idx === 0 ? '1px solid #0369a1' : '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '0.25rem 0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                      title={idx === 0 ? 'Queue Front (will be dequeued next)' : `Queue Index ${idx}`}
                    >
                      <span>({item.point.r},{item.point.c})</span>
                      <span style={{ fontSize: '0.5625rem', opacity: 0.85 }}>d={item.dist}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Queue is empty
                </div>
              )}
            </div>

            {/* 3. NEIGHBOUR INSPECTION (4 DIRECTIONS) */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xs)',
              padding: '0.625rem 0.75rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>
                4-Neighbour Inspection (Up, Down, Left, Right)
              </div>

              {checks.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {checks.map((chk, idx) => {
                    const isAccepted = chk.status === 'accepted';
                    return (
                      <div
                        key={`chk-${idx}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.25rem 0.5rem',
                          backgroundColor: isAccepted ? '#ecfdf5' : '#f8fafc',
                          border: isAccepted ? '1px solid #a7f3d0' : '1px solid var(--border-light)',
                          borderRadius: '2px',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <span style={{
                            fontWeight: 700,
                            minWidth: '2.5rem',
                            color: isAccepted ? '#065f46' : 'var(--text-secondary)',
                          }}>
                            {chk.direction}:
                          </span>
                          <span>({chk.point.r}, {chk.point.c})</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          {isAccepted ? (
                            <span style={{
                              color: '#065f46',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontWeight: 600,
                              fontSize: '0.6875rem',
                            }}>
                              <Check size={12} /> Accepted
                            </span>
                          ) : (
                            <span style={{
                              color: '#991b1b',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.6875rem',
                            }}>
                              <X size={12} /> {chk.reason}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No neighbour checks in this step
                </div>
              )}
            </div>
          </>
        )}

        {/* Tab 2: Parent Tracking Table */}
        {activeTab === 'parents' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
            }}>
              Records <code>parentRow[r][c]</code> and <code>parentCol[r][c]</code> to backtrack from Exit to Start:
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '0.375rem',
              maxHeight: '400px',
              overflowY: 'auto',
            }}>
              {Array.from(parentMap.entries()).map(([childKey, parentPt]) => (
                <div
                  key={childKey}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '2px',
                    padding: '0.25rem 0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>({childKey})</span>
                  <span style={{ color: 'var(--text-muted)' }}>←</span>
                  <span style={{ color: '#0284c7', fontWeight: 600 }}>({parentPt.r},{parentPt.c})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Chronological Log */}
        {activeTab === 'log' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            maxHeight: '420px',
            overflowY: 'auto',
          }}>
            {visibleLogs.map((logStep, idx) => {
              const isLatest = idx === visibleLogs.length - 1;
              return (
                <div
                  key={`log-${idx}`}
                  style={{
                    padding: '0.375rem 0.5rem',
                    backgroundColor: isLatest ? 'var(--bg-tertiary)' : 'transparent',
                    borderLeft: isLatest ? '3px solid var(--text-primary)' : '3px solid transparent',
                    color: logStep.logType === 'success' ? '#047857' : logStep.logType === 'warning' ? '#b91c1c' : 'var(--text-secondary)',
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', marginRight: '0.375rem' }}>
                    [Step {logStep.stepIndex + 1}]
                  </span>
                  {logStep.logMessage}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer message */}
      <div style={{
        padding: '0.5rem 0.875rem',
        borderTop: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-secondary)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {currentStep?.logMessage || 'Ready to run BFS.'}
      </div>
    </div>
  );
};
