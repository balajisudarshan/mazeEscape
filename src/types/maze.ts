export interface Point {
  r: number;
  c: number;
}

export type CellType = 'open' | 'wall';

export type CellDisplayState = 
  | 'open'
  | 'wall'
  | 'start'
  | 'exit'
  | 'current'
  | 'queued'
  | 'visited'
  | 'path';

export interface NeighborCheck {
  direction: 'Up' | 'Down' | 'Left' | 'Right';
  point: Point;
  status: 'accepted' | 'rejected';
  reason: string;
}

export type AlgorithmStatus = 
  | 'ready'
  | 'exploring'
  | 'paused'
  | 'found'
  | 'no_path';

export interface ParentLink {
  child: Point;
  parent: Point;
}

export interface BFSStep {
  stepIndex: number;
  totalSteps: number;
  phase: 'init' | 'dequeue' | 'inspect' | 'reconstruct' | 'completed' | 'no_path';
  currentCell: Point | null;
  currentLevel: number;
  queue: Array<{ point: Point; dist: number }>;
  visitedSet: Set<string>; // serialized "r,c"
  distanceMap: Map<string, number>; // "r,c" -> dist
  parentMap: Map<string, Point>; // "r,c" -> parent Point
  recentNeighborChecks: NeighborCheck[];
  shortestPath: Point[]; // Full path when found
  visiblePathCells: Point[]; // Cells highlighted on grid during path animation
  status: AlgorithmStatus;
  pseudocodeLine: number;
  logMessage: string;
  logType: 'info' | 'success' | 'warning' | 'enqueue' | 'dequeue';
}

export interface PresetMaze {
  id: string;
  name: string;
  description: string;
  rows: number;
  cols: number;
  grid: number[][]; // 0 = open, 1 = wall
  start: Point;
  exit: Point;
  expectedMoves?: number;
  expectedCells?: number;
}

export type EditTool = 'wall' | 'erase' | 'start' | 'exit';
