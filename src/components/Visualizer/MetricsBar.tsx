import React from 'react';
import type { AlgorithmStatus, BFSStep } from '../../types/maze';
import { Activity, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface MetricsBarProps {
  status: AlgorithmStatus;
  currentStep: BFSStep | null;
  totalOpenCells: number;
  finalMoves: number;
  finalCellCount: number;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({
  status,
  currentStep,
  totalOpenCells,
  finalMoves,
  finalCellCount,
}) => {
  const visitedCount = currentStep?.visitedSet.size || 0;
  const queueCount = currentStep?.queue.length || 0;
  const currentLevel = currentStep?.currentLevel ?? 0;
  const isFound = status === 'found';
  const isNoPath = status === 'no_path';

  const getStatusBadge = () => {
    switch (status) {
      case 'ready':
        return <span className="badge-tech"><Clock size={12} /> Ready</span>;
      case 'exploring':
        return <span className="badge-tech badge-amber"><Activity size={12} /> Exploring Level {currentLevel}</span>;
      case 'paused':
        return <span className="badge-tech"><Clock size={12} /> Paused</span>;
      case 'found':
        return <span className="badge-tech badge-green"><CheckCircle size={12} /> Path Found</span>;
      case 'no_path':
        return <span className="badge-tech badge-danger" style={{ backgroundColor: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca' }}><AlertTriangle size={12} /> No Path</span>;
      default:
        return null;
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '0.75rem',
      width: '100%',
    }}>
      {/* Metric 1: Algorithm Status */}
      <div className="panel" style={{ padding: '0.75rem 1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Status
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {getStatusBadge()}
        </div>
      </div>

      {/* Metric 2: Cells Visited */}
      <div className="panel" style={{ padding: '0.75rem 1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Cells Visited
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--visited-color)' }}>
            {visitedCount}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            / {totalOpenCells} open cells
          </span>
        </div>
      </div>

      {/* Metric 3: Queue Size */}
      <div className="panel" style={{ padding: '0.75rem 1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Queue Size (FIFO)
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--queued-color)' }}>
            {queueCount}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            cells waiting
          </span>
        </div>
      </div>

      {/* Metric 4: Current Level / Distance */}
      <div className="panel" style={{ padding: '0.75rem 1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Current BFS Level
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--active-color)' }}>
            {currentLevel}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            hops from start
          </span>
        </div>
      </div>

      {/* Metric 5: Shortest Path Result (Moves vs Cells) */}
      <div className="panel" style={{ padding: '0.75rem 1rem', borderLeft: isFound ? '3px solid #059669' : undefined }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Shortest Route
        </div>
        {isFound ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--path-color)' }}>
              {finalMoves} moves
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              ({finalCellCount} cells)
            </span>
          </div>
        ) : isNoPath ? (
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#dc2626' }}>
            Unreachable (0 moves)
          </div>
        ) : (
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Searching...
          </div>
        )}
      </div>
    </div>
  );
};
