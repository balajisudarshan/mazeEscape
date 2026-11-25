import type { Point, NeighborCheck, BFSStep } from '../types/maze';

export const DIRECTIONS: Array<{
  name: 'Up' | 'Down' | 'Left' | 'Right';
  dr: number;
  dc: number;
}> = [
  { name: 'Up', dr: -1, dc: 0 },
  { name: 'Down', dr: 1, dc: 0 },
  { name: 'Left', dr: 0, dc: -1 },
  { name: 'Right', dr: 0, dc: 1 },
];

export function pointToKey(p: Point): string {
  return `${p.r},${p.c}`;
}

export function keyToPoint(key: string): Point {
  const [r, c] = key.split(',').map(Number);
  return { r, c };
}

export function pointsEqual(a: Point | null, b: Point | null): boolean {
  if (!a || !b) return false;
  return a.r === b.r && a.c === b.c;
}

export interface BFSResult {
  steps: BFSStep[];
  found: boolean;
  shortestPath: Point[];
  moves: number;
  cellCount: number;
  totalVisited: number;
}

export function computeBFSSteps(
  grid: number[][],
  start: Point,
  exit: Point
): BFSResult {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  const steps: BFSStep[] = [];

  // Edge case: empty grid or invalid start/exit
  if (
    rows === 0 ||
    cols === 0 ||
    start.r < 0 ||
    start.r >= rows ||
    start.c < 0 ||
    start.c >= cols ||
    exit.r < 0 ||
    exit.r >= rows ||
    exit.c < 0 ||
    exit.c >= cols ||
    grid[start.r][start.c] === 1 ||
    grid[exit.r][exit.c] === 1
  ) {
    const errorStep: BFSStep = {
      stepIndex: 0,
      totalSteps: 1,
      phase: 'no_path',
      currentCell: null,
      currentLevel: 0,
      queue: [],
      visitedSet: new Set(),
      distanceMap: new Map(),
      parentMap: new Map(),
      recentNeighborChecks: [],
      shortestPath: [],
      visiblePathCells: [],
      status: 'no_path',
      pseudocodeLine: 5,
      logMessage: 'Invalid start or exit position (out of bounds or inside a wall).',
      logType: 'warning',
    };
    return {
      steps: [errorStep],
      found: false,
      shortestPath: [],
      moves: 0,
      cellCount: 0,
      totalVisited: 0,
    };
  }

  // Tracking state
  const visitedSet = new Set<string>();
  const distanceMap = new Map<string, number>();
  const parentMap = new Map<string, Point>();
  const queue: Array<{ point: Point; dist: number }> = [];

  // Start initialization
  const startKey = pointToKey(start);
  visitedSet.add(startKey);
  distanceMap.set(startKey, 0);
  queue.push({ point: start, dist: 0 });

  // Initial step 0
  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    phase: 'init',
    currentCell: null,
    currentLevel: 0,
    queue: queue.map((q) => ({ point: { ...q.point }, dist: q.dist })),
    visitedSet: new Set(visitedSet),
    distanceMap: new Map(distanceMap),
    parentMap: new Map(parentMap),
    recentNeighborChecks: [],
    shortestPath: [],
    visiblePathCells: [],
    status: 'ready',
    pseudocodeLine: 3,
    logMessage: `Queue initialized. Start cell (${start.r}, ${start.c}) marked visited and enqueued.`,
    logType: 'info',
  });

  let found = false;
  let finalPath: Point[] = [];

  // Check if start is already exit
  if (pointsEqual(start, exit)) {
    finalPath = [start];
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      phase: 'completed',
      currentCell: start,
      currentLevel: 0,
      queue: [],
      visitedSet: new Set(visitedSet),
      distanceMap: new Map(distanceMap),
      parentMap: new Map(parentMap),
      recentNeighborChecks: [],
      shortestPath: [start],
      visiblePathCells: [start],
      status: 'found',
      pseudocodeLine: 4,
      logMessage: `Start is already the exit! Path length: 0 moves (1 cell).`,
      logType: 'success',
    });
    const finalSteps = steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
    return {
      steps: finalSteps,
      found: true,
      shortestPath: [start],
      moves: 0,
      cellCount: 1,
      totalVisited: 1,
    };
  }

  while (queue.length > 0) {
    const front = queue.shift()!;
    const current = front.point;
    const currentDist = front.dist;

    // Check if exit reached
    if (pointsEqual(current, exit)) {
      found = true;
      // Reconstruct path
      const reversed: Point[] = [];
      let currKey: string | undefined = pointToKey(exit);
      while (currKey) {
        const pt = keyToPoint(currKey);
        reversed.push(pt);
        if (pointsEqual(pt, start)) break;
        const parentPt = parentMap.get(currKey);
        currKey = parentPt ? pointToKey(parentPt) : undefined;
      }
      finalPath = reversed.reverse();

      // Step for detecting exit
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        phase: 'reconstruct',
        currentCell: current,
        currentLevel: currentDist,
        queue: queue.map((q) => ({ point: { ...q.point }, dist: q.dist })),
        visitedSet: new Set(visitedSet),
        distanceMap: new Map(distanceMap),
        parentMap: new Map(parentMap),
        recentNeighborChecks: [],
        shortestPath: finalPath,
        visiblePathCells: [start],
        status: 'found',
        pseudocodeLine: 4,
        logMessage: `Exit cell (${exit.r}, ${exit.c}) reached! Beginning parent-pointer path reconstruction.`,
        logType: 'success',
      });

      // Animate path reconstruction step by step
      for (let i = 2; i <= finalPath.length; i++) {
        const partialPath = finalPath.slice(0, i);
        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          phase: 'reconstruct',
          currentCell: partialPath[partialPath.length - 1],
          currentLevel: currentDist,
          queue: queue.map((q) => ({ point: { ...q.point }, dist: q.dist })),
          visitedSet: new Set(visitedSet),
          distanceMap: new Map(distanceMap),
          parentMap: new Map(parentMap),
          recentNeighborChecks: [],
          shortestPath: finalPath,
          visiblePathCells: partialPath,
          status: 'found',
          pseudocodeLine: 4,
          logMessage: `Tracing shortest path: added (${partialPath[partialPath.length - 1].r}, ${partialPath[partialPath.length - 1].c}) [step ${i - 1} of ${finalPath.length - 1} moves].`,
          logType: 'success',
        });
      }

      // Final completed step
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        phase: 'completed',
        currentCell: null,
        currentLevel: currentDist,
        queue: [],
        visitedSet: new Set(visitedSet),
        distanceMap: new Map(distanceMap),
        parentMap: new Map(parentMap),
        recentNeighborChecks: [],
        shortestPath: finalPath,
        visiblePathCells: finalPath,
        status: 'found',
        pseudocodeLine: 4,
        logMessage: `Shortest path confirmed: ${finalPath.length - 1} moves (${finalPath.length} cells). Total cells visited: ${visitedSet.size}.`,
        logType: 'success',
      });

      break;
    }

    // Inspect four neighbours in order: Up, Down, Left, Right
    const neighborChecks: NeighborCheck[] = [];
    const newlyEnqueued: Point[] = [];

    for (const dir of DIRECTIONS) {
      const nr = current.r + dir.dr;
      const nc = current.c + dir.dc;
      const neighborPoint: Point = { r: nr, c: nc };
      const neighborKey = pointToKey(neighborPoint);

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
        neighborChecks.push({
          direction: dir.name,
          point: neighborPoint,
          status: 'rejected',
          reason: 'Outside grid boundaries',
        });
      } else if (grid[nr][nc] === 1) {
        neighborChecks.push({
          direction: dir.name,
          point: neighborPoint,
          status: 'rejected',
          reason: 'Blocked by wall',
        });
      } else if (visitedSet.has(neighborKey)) {
        neighborChecks.push({
          direction: dir.name,
          point: neighborPoint,
          status: 'rejected',
          reason: 'Already visited',
        });
      } else {
        // Valid, open, and unvisited!
        visitedSet.add(neighborKey);
        parentMap.set(neighborKey, current);
        distanceMap.set(neighborKey, currentDist + 1);
        queue.push({ point: neighborPoint, dist: currentDist + 1 });
        newlyEnqueued.push(neighborPoint);

        neighborChecks.push({
          direction: dir.name,
          point: neighborPoint,
          status: 'accepted',
          reason: `Valid neighbour! Enqueued with distance ${currentDist + 1}`,
        });
      }
    }

    // Add step for dequeuing and processing this cell's neighbors
    const enqueuedDesc = newlyEnqueued.length > 0
      ? `Enqueued ${newlyEnqueued.map((p) => `(${p.r},${p.c})`).join(', ')}.`
      : 'No new unvisited neighbours.';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      phase: 'inspect',
      currentCell: current,
      currentLevel: currentDist,
      queue: queue.map((q) => ({ point: { ...q.point }, dist: q.dist })),
      visitedSet: new Set(visitedSet),
      distanceMap: new Map(distanceMap),
      parentMap: new Map(parentMap),
      recentNeighborChecks: [...neighborChecks],
      shortestPath: [],
      visiblePathCells: [],
      status: 'exploring',
      pseudocodeLine: 4,
      logMessage: `Dequeued (${current.r}, ${current.c}) at level ${currentDist}. Inspected 4 neighbours. ${enqueuedDesc}`,
      logType: newlyEnqueued.length > 0 ? 'enqueue' : 'info',
    });
  }

  // If queue became empty and exit was not found
  if (!found) {
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      phase: 'no_path',
      currentCell: null,
      currentLevel: 0,
      queue: [],
      visitedSet: new Set(visitedSet),
      distanceMap: new Map(distanceMap),
      parentMap: new Map(parentMap),
      recentNeighborChecks: [],
      shortestPath: [],
      visiblePathCells: [],
      status: 'no_path',
      pseudocodeLine: 5,
      logMessage: `Queue empty. Explored all ${visitedSet.size} reachable cells. No path exists to exit (${exit.r}, ${exit.c}).`,
      logType: 'warning',
    });
  }

  // Fix totalSteps in all snapshots
  const total = steps.length;
  const finalSteps = steps.map((s, idx) => ({
    ...s,
    stepIndex: idx,
    totalSteps: total,
  }));

  const moves = finalPath.length > 0 ? finalPath.length - 1 : 0;
  const cellCount = finalPath.length;

  return {
    steps: finalSteps,
    found,
    shortestPath: finalPath,
    moves,
    cellCount,
    totalVisited: visitedSet.size,
  };
}
