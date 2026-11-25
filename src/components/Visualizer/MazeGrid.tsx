import React, { useState } from 'react';
import type { Point, BFSStep, EditTool } from '../../types/maze';
import { pointsEqual, pointToKey } from '../../algorithms/bfs';

interface MazeGridProps {
  grid: number[][];
  start: Point;
  exit: Point;
  currentStep: BFSStep | null;
  editTool: EditTool;
  isEditing: boolean;
  onCellClick: (r: number, c: number) => void;
  showDistances?: boolean;
}

export const MazeGrid: React.FC<MazeGridProps> = ({
  grid,
  start,
  exit,
  currentStep,
  editTool,
  isEditing,
  onCellClick,
  showDistances = true,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<Point | null>(null);

  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  // Build lookup maps for current state
  const visitedSet = currentStep?.visitedSet || new Set<string>();
  const distanceMap = currentStep?.distanceMap || new Map<string, number>();
  const queuedSet = new Set(currentStep?.queue.map((q) => pointToKey(q.point)) || []);
  const currentCell = currentStep?.currentCell;

  // Shortest path lookup with move indexes
  const pathIndexMap = new Map<string, number>();
  if (currentStep?.visiblePathCells) {
    currentStep.visiblePathCells.forEach((pt, idx) => {
      pathIndexMap.set(pointToKey(pt), idx);
    });
  }

  const handleMouseDown = (r: number, c: number) => {
    setIsMouseDown(true);
    onCellClick(r, c);
  };

  const handleMouseEnter = (r: number, c: number) => {
    setHoveredCell({ r, c });
    if (isMouseDown && isEditing && (editTool === 'wall' || editTool === 'erase')) {
      onCellClick(r, c);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsMouseDown(false);
        setHoveredCell(null);
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        userSelect: 'none',
      }}
    >
      {/* Maze Container */}
      <div style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-sm)',
        padding: '1.25rem 1.25rem 1rem',
        boxShadow: 'var(--shadow-sm)',
        maxWidth: '100%',
        overflowX: 'auto',
      }}>
        {/* Column coordinate indices on top */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `28px repeat(${cols}, minmax(32px, 48px))`,
          gap: '3px',
          marginBottom: '3px',
        }}>
          {/* Top-left corner blank */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--text-subtle)',
          }}>
            r\c
          </div>
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={`col-${c}`}
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: hoveredCell?.c === c ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: hoveredCell?.c === c ? 'var(--bg-tertiary)' : 'transparent',
                borderRadius: '2px',
                padding: '2px 0',
              }}
            >
              {c}
            </div>
          ))}
        </div>

        {/* Rows with row indices on left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {grid.map((row, r) => (
            <div
              key={`row-${r}`}
              style={{
                display: 'grid',
                gridTemplateColumns: `28px repeat(${cols}, minmax(32px, 48px))`,
                gap: '3px',
                alignItems: 'center',
              }}
            >
              {/* Row index on left */}
              <div
                style={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: hoveredCell?.r === r ? 'var(--text-primary)' : 'var(--text-muted)',
                  backgroundColor: hoveredCell?.r === r ? 'var(--bg-tertiary)' : 'transparent',
                  borderRadius: '2px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {r}
              </div>

              {/* Row cells */}
              {row.map((val, c) => {
                const cellPt: Point = { r, c };
                const cellKey = pointToKey(cellPt);
                const isStart = pointsEqual(cellPt, start);
                const isExit = pointsEqual(cellPt, exit);
                const isWall = val === 1;
                const isCurrent = pointsEqual(cellPt, currentCell || null);
                const isPath = pathIndexMap.has(cellKey);
                const pathIdx = pathIndexMap.get(cellKey);
                const isVisited = visitedSet.has(cellKey);
                const isQueued = queuedSet.has(cellKey);
                const distance = distanceMap.get(cellKey);

                let bg = '#ffffff';
                let border = '1px solid #e2e8f0';
                let textColor = 'var(--text-muted)';
                let badgeContent: React.ReactNode = null;
                let subContent: React.ReactNode = null;

                if (isWall) {
                  bg = '#0f172a';
                  border = '1px solid #1e293b';
                  textColor = '#475569';
                  badgeContent = '#';
                } else if (isStart) {
                  bg = isPath ? '#059669' : '#10b981';
                  border = '2px solid #047857';
                  textColor = '#ffffff';
                  badgeContent = 'S';
                  subContent = <span style={{ fontSize: '0.5625rem', opacity: 0.9 }}>0</span>;
                } else if (isExit) {
                  bg = isPath ? '#059669' : '#f59e0b';
                  border = isPath ? '2px solid #047857' : '2px solid #d97706';
                  textColor = '#ffffff';
                  badgeContent = 'E';
                  if (distance !== undefined && showDistances) {
                    subContent = <span style={{ fontSize: '0.5625rem' }}>{distance}</span>;
                  }
                } else if (isCurrent) {
                  bg = '#fef3c7';
                  border = '2px solid #f59e0b';
                  textColor = '#92400e';
                  badgeContent = '★';
                  if (distance !== undefined && showDistances) {
                    subContent = <span style={{ fontSize: '0.625rem', fontWeight: 700 }}>d={distance}</span>;
                  }
                } else if (isPath) {
                  bg = '#a7f3d0';
                  border = '2px solid #059669';
                  textColor = '#065f46';
                  badgeContent = pathIdx !== undefined ? pathIdx : '*';
                  subContent = <span style={{ fontSize: '0.5625rem', fontWeight: 600 }}>move</span>;
                } else if (isQueued) {
                  bg = '#e0f2fe';
                  border = '1px solid #7dd3fc';
                  textColor = '#0369a1';
                  badgeContent = 'Q';
                  if (distance !== undefined && showDistances) {
                    subContent = <span style={{ fontSize: '0.5625rem' }}>d={distance}</span>;
                  }
                } else if (isVisited) {
                  bg = '#ccfbf1';
                  border = '1px solid #5eead4';
                  textColor = '#0f766e';
                  if (distance !== undefined && showDistances) {
                    badgeContent = distance;
                  } else {
                    badgeContent = '✓';
                  }
                }

                const cursorStyle = isEditing
                  ? editTool === 'start' || editTool === 'exit'
                    ? 'pointer'
                    : 'crosshair'
                  : 'default';

                return (
                  <div
                    key={`cell-${r}-${c}`}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    style={{
                      aspectRatio: '1 / 1',
                      minWidth: '32px',
                      maxWidth: '48px',
                      backgroundColor: bg,
                      border,
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: textColor,
                      cursor: cursorStyle,
                      position: 'relative',
                      transition: 'background-color 0.12s ease, border-color 0.12s ease',
                      boxShadow: isCurrent ? '0 0 0 2px rgba(245, 158, 11, 0.4)' : 'none',
                    }}
                    title={`(${r}, ${c}): ${isWall ? 'Wall' : isStart ? 'Start Cell' : isExit ? 'Exit Cell' : isPath ? `Shortest Path (Step ${pathIdx})` : isCurrent ? 'Currently Processing' : isQueued ? `In Queue (dist ${distance})` : isVisited ? `Visited (dist ${distance})` : 'Open Cell'}`}
                  >
                    <div>{badgeContent}</div>
                    {subContent && <div>{subContent}</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Hover info bar */}
        <div style={{
          marginTop: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '0.625rem',
        }}>
          <div>
            {hoveredCell ? (
              <span>
                Coordinates: <strong>({hoveredCell.r}, {hoveredCell.c})</strong> | Value: <strong>{grid[hoveredCell.r][hoveredCell.c] === 1 ? 'Wall [1]' : 'Open [0]'}</strong>
                {distanceMap.has(pointToKey(hoveredCell)) && (
                  <span> | Distance: <strong>{distanceMap.get(pointToKey(hoveredCell))}</strong></span>
                )}
              </span>
            ) : (
              <span>Hover over a cell to inspect coordinates and status</span>
            )}
          </div>
          <div>
            Grid: <strong>{rows} × {cols}</strong> ({rows * cols} cells)
          </div>
        </div>
      </div>
    </div>
  );
};
