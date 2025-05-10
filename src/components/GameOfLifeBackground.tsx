import React, { useEffect, useRef, useState } from "react";

const GameOfLifeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameId = useRef<number>();
  const cellSize = 10; // Size of each cell in pixels
  const frameDelay = 200; // Delay between frames in milliseconds (higher = slower)
  const lastFrameTime = useRef<number>(0);

  // Initialize the grid
  const initializeGrid = (cols: number, rows: number) => {
    const grid = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => Math.random() > 0.8)
    );
    return grid;
  };

  // Calculate next generation based on Conway's Game of Life rules
  const calculateNextGeneration = (grid: boolean[][]) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const newGrid = Array(rows).fill(null).map(() => Array(cols).fill(false));

    // Function to count live neighbors
    const countNeighbors = (grid: boolean[][], x: number, y: number) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // Skip the cell itself
          if (i === 0 && j === 0) continue;
          
          // Handle edge wraparound
          const row = (y + i + rows) % rows;
          const col = (x + j + cols) % cols;
          
          if (grid[row][col]) count++;
        }
      }
      return count;
    };

    // Apply Game of Life rules
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const neighbors = countNeighbors(grid, x, y);
        const cell = grid[y][x];

        // Rules of Conway's Game of Life
        // 1. Any live cell with fewer than two live neighbors dies (underpopulation)
        // 2. Any live cell with two or three live neighbors lives on
        // 3. Any live cell with more than three live neighbors dies (overpopulation)
        // 4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
        
        if (cell) {
          newGrid[y][x] = neighbors === 2 || neighbors === 3;
        } else {
          newGrid[y][x] = neighbors === 3;
        }
      }
    }

    return newGrid;
  };

  // Draw the grid on canvas with darker cells
  const drawGrid = (ctx: CanvasRenderingContext2D, grid: boolean[][]) => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.95)"; // Darker background
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const rows = grid.length;
    const cols = grid[0].length;

    // Draw cells
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x]) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)"; // Darker cells
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
  };

  useEffect(() => {
    // Update dimensions on resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Calculate grid size
    const cols = Math.ceil(dimensions.width / cellSize);
    const rows = Math.ceil(dimensions.height / cellSize);
    
    // Initialize grid
    let grid = initializeGrid(cols, rows);
    
    // Animation loop with frame rate control
    const animate = (timestamp: number) => {
      // Only update if enough time has passed
      if (timestamp - lastFrameTime.current >= frameDelay) {
        // Draw current grid
        drawGrid(ctx, grid);
        
        // Calculate and update to next generation
        grid = calculateNextGeneration(grid);
        
        lastFrameTime.current = timestamp;
      }
      
      // Schedule next frame
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-blue-900/10 to-purple-900/15 z-10" />
    </div>
  );
};

export default GameOfLifeBackground;
