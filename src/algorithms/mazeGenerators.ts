import type { PresetMaze, Point } from '../types/maze';

export const REPORT_PRESET: PresetMaze = {
  id: 'report-preset',
  name: 'DAA Project Report Maze (5×7)',
  description: 'Exact maze from the project report. Demonstrates 10-move shortest path (11 cells).',
  rows: 5,
  cols: 7,
  grid: [
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0],
  ],
  start: { r: 0, c: 0 },
  exit: { r: 4, c: 6 },
  expectedMoves: 10,
  expectedCells: 11,
};

export const MULTI_PATH_PRESET: PresetMaze = {
  id: 'multi-path',
  name: 'Multi-Path Branching (9×13)',
  description: 'Contains short and long branch corridors. Demonstrates how BFS finds the optimal path without getting trapped in long paths.',
  rows: 9,
  cols: 13,
  grid: [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  start: { r: 0, c: 0 },
  exit: { r: 8, c: 12 },
};

export const WAVEFRONT_PRESET: PresetMaze = {
  id: 'wavefront-field',
  name: 'Wavefront Expansion (7×9)',
  description: 'Wide open chamber with minimal pillars. Highlights the circular/diamond wavefront pattern of BFS level exploration.',
  rows: 7,
  cols: 9,
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  start: { r: 3, c: 0 },
  exit: { r: 3, c: 8 },
};

export const LABYRINTH_PRESET: PresetMaze = {
  id: 'classic-labyrinth',
  name: 'Classic Labyrinth (11×15)',
  description: 'Intricate maze with winding corridors, multiple dead ends, and a long single solution path.',
  rows: 11,
  cols: 15,
  grid: [
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  start: { r: 0, c: 0 },
  exit: { r: 10, c: 14 },
};

export const UNREACHABLE_PRESET: PresetMaze = {
  id: 'unreachable-trap',
  name: 'Trapped / No Path (7×7)',
  description: 'Demonstrates BFS behavior when the exit is completely surrounded by walls. Shows state "No Path".',
  rows: 7,
  cols: 7,
  grid: [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1],
    [0, 1, 0, 1, 1, 1, 1],
  ],
  start: { r: 0, c: 0 },
  exit: { r: 5, c: 5 },
};

export const PRESET_MAZES: PresetMaze[] = [
  REPORT_PRESET,
  MULTI_PATH_PRESET,
  WAVEFRONT_PRESET,
  LABYRINTH_PRESET,
  UNREACHABLE_PRESET,
];

/**
 * Generate a guaranteed-solvable random maze using Randomized Depth-First Search with carving
 */
export function generateRandomSolvableMaze(
  rows: number = 9,
  cols: number = 13
): { grid: number[][]; start: Point; exit: Point } {
  const rCount = rows % 2 === 0 ? rows + 1 : rows;
  const cCount = cols % 2 === 0 ? cols + 1 : cols;

  const grid: number[][] = Array.from({ length: rCount }, () => Array(cCount).fill(1));

  const start: Point = { r: 0, c: 0 };
  const exit: Point = { r: rCount - 1, c: cCount - 1 };

  const inBounds = (r: number, c: number) => r >= 0 && r < rCount && c >= 0 && c < cCount;

  function carve(r: number, c: number) {
    grid[r][c] = 0;

    const directions = [
      { dr: -2, dc: 0 },
      { dr: 2, dc: 0 },
      { dr: 0, dc: -2 },
      { dr: 0, dc: 2 },
    ].sort(() => Math.random() - 0.5);

    for (const { dr, dc } of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (inBounds(nr, nc) && grid[nr][nc] === 1) {
        grid[r + dr / 2][c + dc / 2] = 0;
        carve(nr, nc);
      }
    }
  }

  carve(0, 0);

  grid[start.r][start.c] = 0;
  grid[exit.r][exit.c] = 0;

  if (rCount > 1 && cCount > 1) {
    grid[rCount - 1][cCount - 2] = 0;
    grid[rCount - 2][cCount - 1] = 0;
  }

  const wallRemovalCount = Math.floor((rCount * cCount) * 0.08);
  for (let i = 0; i < wallRemovalCount; i++) {
    const rr = Math.floor(Math.random() * (rCount - 2)) + 1;
    const cc = Math.floor(Math.random() * (cCount - 2)) + 1;
    grid[rr][cc] = 0;
  }

  return { grid, start, exit };
}
