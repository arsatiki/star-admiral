import random
from collections import deque

class Maze(object):
    """docstring for Maze"""
    def __init__(self, rows, cols):
        super(Maze, self).__init__()
        
        self.rows = []
        for _ in range(rows):
            row = ['#' if random.random() < .3 else ' ' for __ in range(cols)]
            self.rows.append(row)
            
    @property
    def width(self): return len(self.rows[0])
    
    @property
    def height(self): return len(self.rows)
    
    def __str__(self):
        return '\n'.join('|' + ''.join(row) + '|' for row in self.rows)
    
    def __getitem__(self, node):
        row, col = node
        return self.rows[row][col]
        
    def __setitem__(self, node, val):
        row, col = node
        self.rows[row][col] = val
    
    def wall(self, node):
        return self[node] == '#'
        
    def __contains__(self, node):
        row, col = node
        return 0 <= row < self.height and 0 <= col < self.width
    
    def adjacent(self, node):
        row, col = node
        
        n = (row -1, col)
        s = (row +1, col)
        w = (row, col -1) 
        e = (row, col +1)
        
        return [x for x in (n, s, w, e) if x in self and not self.wall(x)]
    
    def find_shortest(self):
        start = (0, 0)
        end = (g.height -1, g.width -1)
        
        solved, distances = bfs(self, start, end)
        return backtrack(self, start, end, distances) if solved else []
                
def backtrack(g, start, end, distances):
    node, path = end, []
    while node != start:
        path.append(node)
        candidates = [x for x in self.adjacent(node)
                        if distances[x] == distances[node] -1]
        node = candidates[0]
    path.reverse()
    return path
    
        
def bfs(g, start, end):
    fringe = deque([start])
    seen = set()
    distances = {start: 0}
    
    while fringe:
        node = fringe.popleft()
        if node in seen:
            continue
        
        if node == end:
            return True, distances
        
        adjacent_nodes = g.adjacent(node)
        fringe.extend(adjacent_nodes)
        seen.add(node)
        
        dist = distances[node]
        for x in adjacent_nodes:
            distances.setdefault(x, dist+1)

        g[node] = '.'
    
    return False, distances
            