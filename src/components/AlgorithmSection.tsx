import React, { useState } from 'react';
import { Code2, Copy, Check, Layers } from 'lucide-react';

export const AlgorithmSection: React.FC = () => {
  const [copiedLang, setCopiedLang] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<'c' | 'python' | 'cpp'>('c');

  const copyToClipboard = (code: string, lang: string) => {
    navigator.clipboard.writeText(code);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  const cCode = `/*
 * DAA Project: MAZE ESCAPE - Finding Shortest Path Using BFS
 * SRM University AP - CSE Department (2026-2027)
 * Submitted by: Prem Gupta, R. Chandra Haasini, J Kushal Reddy, Tulasi Manohar
 */

#include <stdio.h>

#define ROWS 5
#define COLS 7
#define MAX (ROWS * COLS)

int maze[ROWS][COLS] = {
    {0, 0, 1, 0, 0, 0, 0},
    {0, 0, 1, 0, 1, 1, 0},
    {1, 0, 0, 0, 1, 0, 0},
    {0, 1, 1, 0, 0, 0, 1},
    {0, 0, 0, 0, 1, 0, 0}
};

int visited[ROWS][COLS] = {0};
int parentRow[ROWS][COLS];
int parentCol[ROWS][COLS];

int qRow[MAX], qCol[MAX];
int front = 0, rear = 0;

// Direction vectors: Up, Down, Left, Right
int dr[4] = {-1, 1, 0, 0};
int dc[4] = {0, 0, -1, 1};

int main() {
    int sr = 0, sc = 0; // Start coordinates
    int er = 4, ec = 6; // Exit coordinates
    int r, c, nr, nc, i;
    int pathRow[MAX], pathCol[MAX], count = 0;

    // Enqueue start cell
    qRow[rear] = sr;
    qCol[rear] = sc;
    rear++;
    visited[sr][sc] = 1;
    parentRow[sr][sc] = -1;
    parentCol[sr][sc] = -1;

    // BFS Traversal Loop
    while (front < rear) {
        r = qRow[front];
        c = qCol[front];
        front++;

        if (r == er && c == ec)
            break;

        for (i = 0; i < 4; i++) {
            nr = r + dr[i];
            nc = c + dc[i];

            if (nr >= 0 && nr < ROWS &&
                nc >= 0 && nc < COLS &&
                maze[nr][nc] == 0 &&
                visited[nr][nc] == 0) {
                
                visited[nr][nc] = 1;
                parentRow[nr][nc] = r;
                parentCol[nr][nc] = c;
                qRow[rear] = nr;
                qCol[rear] = nc;
                rear++;
            }
        }
    }

    if (visited[er][ec] == 0) {
        printf("No path exists.\\n");
    } else {
        r = er;
        c = ec;
        while (r != -1 && c != -1) {
            pathRow[count] = r;
            pathCol[count] = c;
            count++;
            i = parentRow[r][c];
            c = parentCol[r][c];
            r = i;
        }

        printf("Shortest path (row, column):\\n");
        for (i = count - 1; i >= 0; i--)
            printf("(%d, %d) ", pathRow[i], pathCol[i]);
        printf("\\nNumber of moves: %d\\n", count - 1);
    }

    return 0;
}`;

  const pythonCode = `from collections import deque

def bfs_maze(maze, start, exit_pos):
    R, C = len(maze), len(maze[0])
    sr, sc = start
    er, ec = exit_pos
    
    if maze[sr][sc] == 1 or maze[er][ec] == 1:
        return None, 0
    
    queue = deque([(sr, sc)])
    visited = { (sr, sc) }
    parent = {}
    
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    found = False
    while queue:
        r, c = queue.popleft()
        if (r, c) == (er, ec):
            found = True
            break
            
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < R and 0 <= nc < C and maze[nr][nc] == 0:
                if (nr, nc) not in visited:
                    visited.add((nr, nc))
                    parent[(nr, nc)] = (r, c)
                    queue.append((nr, nc))
                    
    if not found:
        return None, 0
        
    path = []
    curr = (er, ec)
    while curr:
        path.append(curr)
        curr = parent.get(curr)
    path.reverse()
    
    moves = len(path) - 1
    return path, moves`;

  const cppCode = `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

struct Point { int r, c; };

vector<Point> solveMazeBFS(const vector<vector<int>>& maze, Point start, Point exit) {
    int R = maze.size(), C = maze[0].size();
    vector<vector<bool>> visited(R, vector<bool>(C, false));
    vector<vector<Point>> parent(R, vector<Point>(C, {-1, -1}));
    
    queue<Point> q;
    q.push(start);
    visited[start.r][start.c] = true;
    
    int dr[4] = {-1, 1, 0, 0};
    int dc[4] = {0, 0, -1, 1};
    
    bool found = false;
    while (!q.empty()) {
        Point curr = q.front();
        q.pop();
        
        if (curr.r == exit.r && curr.c == exit.c) {
            found = true;
            break;
        }
        
        for (int i = 0; i < 4; ++i) {
            int nr = curr.r + dr[i];
            int nc = curr.c + dc[i];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C &&
                maze[nr][nc] == 0 && !visited[nr][nc]) {
                visited[nr][nc] = true;
                parent[nr][nc] = curr;
                q.push({nr, nc});
            }
        }
    }
    
    if (!found) return {};
    
    vector<Point> path;
    Point curr = exit;
    while (curr.r != -1 && curr.c != -1) {
        path.push_back(curr);
        if (curr.r == start.r && curr.c == start.c) break;
        curr = parent[curr.r][curr.c];
    }
    reverse(path.begin(), path.end());
    return path;
}`;

  return (
    <section id="algorithm" style={{ backgroundColor: 'var(--bg-secondary)', scrollMarginTop: '3.75rem' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span>ALGORITHM SPECIFICATION</span>
            <span>•</span>
            <span>REPORT SECTION 05, 06 & 07</span>
          </div>
          <h2 className="section-title">
            Algorithm, Pseudocode, and Source Code
          </h2>
          <p className="section-desc">
            The formal BFS maze traversal algorithm used by the project. Breadth-First Search ensures the earliest arrival at any cell corresponds to the strictly minimal edge count.
          </p>
        </div>

        {/* 2-Column Grid: Pseudocode on Left, Code Implementation on Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)',
          gap: '1.5rem',
          alignItems: 'start',
          marginBottom: '2rem',
        }} className="code-columns">
          {/* Left Column: Official Pseudocode */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <Code2 size={14} />
                <span>PSEUDOCODE (REPORT SECTION 06)</span>
              </div>
              <span className="badge-tech badge-blue">FORMAL SPEC</span>
            </div>

            <div className="panel-body" style={{ padding: '1rem' }}>
              <pre style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                overflowX: 'auto',
                whiteSpace: 'pre',
              }}>
{`BFS(MAZE, START, EXIT)
 1. create an empty queue Q
 2. mark START as visited
 3. PARENT[START] = NIL
 4. insert START into Q
 
 5. while Q is not empty:
     CURRENT = remove front of Q
     if CURRENT = EXIT:
         return BUILD_PATH(PARENT, EXIT)
         
     for each neighbour N of CURRENT:
         if N is inside the grid
            and MAZE[N] is open
            and N is not visited:
             mark N as visited
             PARENT[N] = CURRENT
             insert N into Q
             
 6. return "No path exists"

BUILD_PATH(PARENT, EXIT)
 1. PATH = empty list
 2. CURRENT = EXIT
 3. while CURRENT is not NIL:
     add CURRENT to PATH
     CURRENT = PARENT[CURRENT]
 4. reverse PATH
 5. return PATH`}
              </pre>
            </div>
          </div>

          {/* Right Column: Code Implementation Tabs */}
          <div className="panel">
            <div className="panel-header" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <button
                  className={`btn btn-sm ${activeLang === 'c' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveLang('c')}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                >
                  C (Report Source)
                </button>
                <button
                  className={`btn btn-sm ${activeLang === 'python' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveLang('python')}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                >
                  Python
                </button>
                <button
                  className={`btn btn-sm ${activeLang === 'cpp' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveLang('cpp')}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                >
                  C++ (STL)
                </button>
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => copyToClipboard(activeLang === 'c' ? cCode : activeLang === 'python' ? pythonCode : cppCode, activeLang)}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                {copiedLang === activeLang ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                <span>{copiedLang === activeLang ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="panel-body" style={{ padding: '1rem' }}>
              <pre style={{
                backgroundColor: '#0f172a',
                color: '#e2e8f0',
                borderRadius: 'var(--radius-xs)',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                lineHeight: 1.5,
                maxHeight: '440px',
                overflowY: 'auto',
                overflowX: 'auto',
                whiteSpace: 'pre',
              }}>
                {activeLang === 'c' && cCode}
                {activeLang === 'python' && pythonCode}
                {activeLang === 'cpp' && cppCode}
              </pre>
            </div>
          </div>
        </div>

        {/* 5 Core Components Breakdown (Report Section 07.2) */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">
              <Layers size={14} />
              <span>MAIN ARCHITECTURAL DATA STRUCTURES (REPORT SECTION 07.2)</span>
            </div>
            <span className="badge-tech">SRM UNIVERSITY AP SPEC</span>
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
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  1. Maze Array
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  int maze[ROWS][COLS]
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Stores layout of open (0) and blocked (1) cells. Indexed by <code>maze[r][c]</code>.
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.875rem',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: '#0369a1', marginBottom: '0.25rem' }}>
                  2. FIFO Queue
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  qRow[MAX], qCol[MAX]
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Array-based circular or linear queue storing <code>(r, c)</code> coordinates waiting to be checked.
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.875rem',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: '#0f766e', marginBottom: '0.25rem' }}>
                  3. Visited Array
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  int visited[ROWS][COLS]
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Boolean flag matrix. Marking a cell at insertion time prevents redundant enqueuing and cycles.
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.875rem',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: '#92400e', marginBottom: '0.25rem' }}>
                  4. Parent Arrays
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  parentRow[R][C], parentCol[R][C]
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Stores predecessor <code>(r, c)</code> from which each cell was discovered to trace route backwards.
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.875rem',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: '#047857', marginBottom: '0.25rem' }}>
                  5. Path Arrays
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  pathRow[MAX], pathCol[MAX]
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Stores the route backwards from Exit to Start, which is then reversed to output the final path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
