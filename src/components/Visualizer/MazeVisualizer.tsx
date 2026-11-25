import React, { useState, useEffect, useMemo } from 'react';
import type { Point, BFSStep, EditTool } from '../../types/maze';
import { computeBFSSteps, pointsEqual } from '../../algorithms/bfs';
import {
  REPORT_PRESET,
  PRESET_MAZES,
  generateRandomSolvableMaze,
} from '../../algorithms/mazeGenerators';
import { MazeGrid } from './MazeGrid';
import { Controls } from './Controls';
import { MetricsBar } from './MetricsBar';
import { StatePanels } from './StatePanels';

interface MazeVisualizerProps {
  onLoadReportTrigger?: number;
}

export const MazeVisualizer: React.FC<MazeVisualizerProps> = ({ onLoadReportTrigger }) => {
  // Maze state
  const [grid, setGrid] = useState<number[][]>(REPORT_PRESET.grid);
  const [start, setStart] = useState<Point>(REPORT_PRESET.start);
  const [exit, setExit] = useState<Point>(REPORT_PRESET.exit);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(REPORT_PRESET.id);

  // Editor state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTool, setEditTool] = useState<EditTool>('wall');
  const [showDistances, setShowDistances] = useState<boolean>(true);

  // Animation & BFS playback state
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(100);

  // Compute BFS snapshots deterministically from current grid, start, exit
  const bfsResult = useMemo(() => {
    return computeBFSSteps(grid, start, exit);
  }, [grid, start, exit]);

  const steps = bfsResult.steps;
  const currentStep: BFSStep | null = steps[stepIndex] || null;

  // Total open cells in grid
  const totalOpenCells = useMemo(() => {
    let count = 0;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[0]?.length || 0); c++) {
        if (grid[r][c] === 0) count++;
      }
    }
    return count;
  }, [grid]);

  // Timer loop for playback
  useEffect(() => {
    if (!isPlaying) return;

    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setStepIndex((prev) => {
        if (prev + 1 >= steps.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);

    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, steps.length, speedMs]);

  // Handle external trigger to load Report Preset
  useEffect(() => {
    if (onLoadReportTrigger) {
      handleSelectPreset(REPORT_PRESET.id);
    }
  }, [onLoadReportTrigger]);

  // Handlers
  const handlePlay = () => {
    if (stepIndex >= steps.length - 1) {
      setStepIndex(0);
    }
    setIsPlaying(true);
    setIsEditing(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIndex(0);
  };

  const handleSeek = (idx: number) => {
    setIsPlaying(false);
    setStepIndex(Math.min(Math.max(0, idx), steps.length - 1));
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = PRESET_MAZES.find((p) => p.id === presetId);
    if (!preset) return;
    setIsPlaying(false);
    setSelectedPresetId(preset.id);
    setGrid(preset.grid.map((row) => [...row]));
    setStart({ ...preset.start });
    setExit({ ...preset.exit });
    setStepIndex(0);
    setIsEditing(false);
  };

  const handleGenerateMaze = () => {
    setIsPlaying(false);
    const { grid: newGrid, start: newStart, exit: newExit } = generateRandomSolvableMaze(9, 13);
    setGrid(newGrid);
    setStart(newStart);
    setExit(newExit);
    setSelectedPresetId('custom-generated');
    setStepIndex(0);
    setIsEditing(false);
  };

  const handleClearWalls = () => {
    setIsPlaying(false);
    const cleared = grid.map((row) => row.map(() => 0));
    setGrid(cleared);
    setStepIndex(0);
  };

  // Editing cell click handler
  const handleCellClick = (r: number, c: number) => {
    if (!isEditing) return;

    if (r < 0 || r >= grid.length || c < 0 || c >= (grid[0]?.length || 0)) return;

    if (editTool === 'start') {
      if (grid[r][c] === 1) return;
      if (pointsEqual({ r, c }, exit)) return;
      setStart({ r, c });
      setStepIndex(0);
    } else if (editTool === 'exit') {
      if (grid[r][c] === 1) return;
      if (pointsEqual({ r, c }, start)) return;
      setExit({ r, c });
      setStepIndex(0);
    } else if (editTool === 'wall') {
      if (pointsEqual({ r, c }, start) || pointsEqual({ r, c }, exit)) return;
      const newGrid = grid.map((row, rowIdx) =>
        row.map((val, colIdx) => (rowIdx === r && colIdx === c ? 1 : val))
      );
      setGrid(newGrid);
      setStepIndex(0);
    } else if (editTool === 'erase') {
      const newGrid = grid.map((row, rowIdx) =>
        row.map((val, colIdx) => (rowIdx === r && colIdx === c ? 0 : val))
      );
      setGrid(newGrid);
      setStepIndex(0);
    }
  };

  return (
    <section id="visualizer" style={{ backgroundColor: '#ffffff', scrollMarginTop: '3.75rem' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span>INTERACTIVE CS LABORATORY</span>
            <span>•</span>
            <span>BFS GRID ENGINE</span>
          </div>
          <h2 className="section-title">
            Breadth-First Search Maze Visualizer
          </h2>
          <p className="section-desc">
            Observe the level-by-level wavefront exploration of the FIFO queue. Cells are expanded in uniform distance order, ensuring the first arrival at the exit yields the strictly shortest path.
          </p>
        </div>

        {/* Live Metrics Bar */}
        <div style={{ marginBottom: '1.25rem' }}>
          <MetricsBar
            status={currentStep?.status || 'ready'}
            currentStep={currentStep}
            totalOpenCells={totalOpenCells}
            finalMoves={bfsResult.moves}
            finalCellCount={bfsResult.cellCount}
          />
        </div>

        {/* Visualizer Main Grid & Technical State Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 1fr)',
          gap: '1.25rem',
          alignItems: 'start',
          marginBottom: '1.25rem',
        }} className="visualizer-main-layout">
          {/* Left Column: Maze Grid & Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <MazeGrid
              grid={grid}
              start={start}
              exit={exit}
              currentStep={currentStep}
              editTool={editTool}
              isEditing={isEditing}
              onCellClick={handleCellClick}
              showDistances={showDistances}
            />

            {/* Visual Legend */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              padding: '0.625rem 0.875rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xs)',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#10b981', display: 'inline-block', borderRadius: '1px' }}></span>
                Start (S)
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', display: 'inline-block', borderRadius: '1px' }}></span>
                Exit (E)
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#0f172a', display: 'inline-block', borderRadius: '1px' }}></span>
                Wall [1] (#)
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', display: 'inline-block', borderRadius: '1px' }}></span>
                Open [0] (.)
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#fef3c7', border: '1px solid #f59e0b', display: 'inline-block', borderRadius: '1px' }}></span>
                Current (★)
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#e0f2fe', border: '1px solid #7dd3fc', display: 'inline-block', borderRadius: '1px' }}></span>
                In Queue (Q)
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#ccfbf1', border: '1px solid #5eead4', display: 'inline-block', borderRadius: '1px' }}></span>
                Visited (✓)
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#a7f3d0', border: '2px solid #059669', display: 'inline-block', borderRadius: '1px' }}></span>
                Shortest Path (*)
              </span>
            </div>
          </div>

          {/* Right Column: Live Technical State Panels */}
          <div>
            <StatePanels
              currentStep={currentStep}
              stepHistory={steps}
              currentStepIndex={stepIndex}
            />
          </div>
        </div>

        {/* Controls Toolbar */}
        <Controls
          currentStepIndex={stepIndex}
          totalSteps={steps.length}
          isPlaying={isPlaying}
          speedMs={speedMs}
          isEditing={isEditing}
          editTool={editTool}
          selectedPresetId={selectedPresetId}
          showDistances={showDistances}
          onPlay={handlePlay}
          onPause={handlePause}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
          onReset={handleReset}
          onSeek={handleSeek}
          onSpeedChange={setSpeedMs}
          onGenerateMaze={handleGenerateMaze}
          onToggleEditing={() => setIsEditing(!isEditing)}
          onSelectEditTool={setEditTool}
          onClearWalls={handleClearWalls}
          onSelectPreset={handleSelectPreset}
          onToggleDistances={() => setShowDistances(!showDistances)}
        />
      </div>
    </section>
  );
};
