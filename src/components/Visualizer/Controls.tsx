import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Dices,
  PenTool,
  Eraser,
  MapPin,
  Flag,
  Trash2,
} from 'lucide-react';
import type { EditTool } from '../../types/maze';
import { PRESET_MAZES } from '../../algorithms/mazeGenerators';

interface ControlsProps {
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  speedMs: number;
  isEditing: boolean;
  editTool: EditTool;
  selectedPresetId: string;
  showDistances: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSeek: (stepIndex: number) => void;
  onSpeedChange: (speedMs: number) => void;
  onGenerateMaze: () => void;
  onToggleEditing: () => void;
  onSelectEditTool: (tool: EditTool) => void;
  onClearWalls: () => void;
  onSelectPreset: (presetId: string) => void;
  onToggleDistances: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  currentStepIndex,
  totalSteps,
  isPlaying,
  speedMs,
  isEditing,
  editTool,
  selectedPresetId,
  showDistances,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSeek,
  onSpeedChange,
  onGenerateMaze,
  onToggleEditing,
  onSelectEditTool,
  onClearWalls,
  onSelectPreset,
  onToggleDistances,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-medium)',
      borderRadius: 'var(--radius-sm)',
      padding: '1rem',
      boxShadow: 'var(--shadow-sm)',
    }}>
      {/* Preset Selector row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase'
          }}>
            Preset:
          </span>
          <select
            value={selectedPresetId}
            onChange={(e) => onSelectPreset(e.target.value)}
            disabled={isPlaying}
            style={{
              padding: '0.375rem 0.625rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-medium)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              backgroundColor: '#ffffff',
              color: 'var(--text-primary)',
              cursor: isPlaying ? 'not-allowed' : 'pointer',
            }}
          >
            {PRESET_MAZES.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onGenerateMaze}
            disabled={isPlaying}
            title="Generate a new randomized maze with guaranteed reachable exit"
          >
            <Dices size={14} />
            <span>Generate New Maze</span>
          </button>

          <button
            className={`btn btn-sm ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
            onClick={onToggleEditing}
            disabled={isPlaying}
            title="Toggle wall & coordinate editing mode"
          >
            <PenTool size={14} />
            <span>{isEditing ? 'Exit Editor' : 'Edit Maze'}</span>
          </button>
        </div>
      </div>

      {/* Editor Sub-Toolbar when in edit mode */}
      {isEditing && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          backgroundColor: 'var(--bg-tertiary)',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px dashed var(--border-dark)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textTransform: 'uppercase'
          }}>
            Edit Tool:
          </span>

          <button
            className={`btn btn-sm ${editTool === 'wall' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onSelectEditTool('wall')}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            <span style={{ width: '8px', height: '8px', backgroundColor: '#0f172a', display: 'inline-block' }}></span>
            Draw Wall (#)
          </button>

          <button
            className={`btn btn-sm ${editTool === 'erase' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onSelectEditTool('erase')}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            <Eraser size={12} />
            Erase Wall (.)
          </button>

          <button
            className={`btn btn-sm ${editTool === 'start' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onSelectEditTool('start')}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            <MapPin size={12} color="#10b981" />
            Place Start (S)
          </button>

          <button
            className={`btn btn-sm ${editTool === 'exit' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onSelectEditTool('exit')}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            <Flag size={12} color="#f59e0b" />
            Place Exit (E)
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={onClearWalls}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', marginLeft: 'auto' }}
            title="Clear all walls in the grid"
          >
            <Trash2 size={12} />
            Clear Walls
          </button>
        </div>
      )}

      {/* Main Playback Controls Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.875rem',
      }}>
        {/* Playback Buttons Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <button
            className="btn btn-secondary btn-icon"
            onClick={onReset}
            title="Reset to step 0"
          >
            <RotateCcw size={16} />
          </button>

          <button
            className="btn btn-secondary btn-icon"
            onClick={onStepBackward}
            disabled={isPlaying || currentStepIndex <= 0}
            title="Step backward one BFS step"
          >
            <SkipBack size={16} />
          </button>

          {isPlaying ? (
            <button
              className="btn btn-secondary"
              onClick={onPause}
              style={{ minWidth: '6.5rem' }}
            >
              <Pause size={16} fill="currentColor" />
              Pause
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={onPlay}
              disabled={currentStepIndex >= totalSteps - 1}
              style={{ minWidth: '6.5rem' }}
            >
              <Play size={16} fill="currentColor" />
              {currentStepIndex === 0 ? 'Start' : 'Resume'}
            </button>
          )}

          <button
            className="btn btn-secondary btn-icon"
            onClick={onStepForward}
            disabled={isPlaying || currentStepIndex >= totalSteps - 1}
            title="Step forward one BFS step"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Speed Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            marginRight: '0.25rem',
          }}>
            Speed:
          </span>
          {[
            { label: '0.25x', ms: 500 },
            { label: '0.5x', ms: 250 },
            { label: '1x', ms: 100 },
            { label: '2x', ms: 40 },
            { label: '5x', ms: 10 },
          ].map((sp) => (
            <button
              key={sp.label}
              className={`btn btn-sm ${speedMs === sp.ms ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => onSpeedChange(sp.ms)}
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                minWidth: '2.5rem',
              }}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Distance toggle */}
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          userSelect: 'none',
        }}>
          <input
            type="checkbox"
            checked={showDistances}
            onChange={onToggleDistances}
            style={{ cursor: 'pointer' }}
          />
          Show cell distances
        </label>
      </div>

      {/* Step scrubber slider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderTop: '1px solid var(--border-light)',
        paddingTop: '0.75rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          minWidth: '5.5rem',
        }}>
          Step {currentStepIndex + 1} / {totalSteps}
        </span>

        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={(e) => onSeek(Number(e.target.value))}
          disabled={isPlaying}
          style={{
            flex: 1,
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            accentColor: 'var(--text-primary)',
          }}
        />
      </div>
    </div>
  );
};
