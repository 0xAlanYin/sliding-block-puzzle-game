import React, { useState, useEffect, useRef } from 'react';
import { Block, BlockType, Direction, GameState } from '../types';
import { checkWin, isValidMove, moveBlock, getInitialBlocks } from '../utils/gameLogic';
import BlockComponent from './BlockComponent';
import '../styles/GameBoard.css';

const BOARD_SIZE = 6; // 6x6网格
const CELL_SIZE = 80; // 每个单元格的大小

const GameBoard: React.FC = () => {
  // 游戏状态
  const [gameState, setGameState] = useState<GameState>({
    blocks: getInitialBlocks(),
    boardSize: BOARD_SIZE,
    moves: 0,
    solved: false,
    initialBlocks: getInitialBlocks(),
  });

  // 用于拖动方块的状态
  const [draggingBlock, setDraggingBlock] = useState<Block | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [autoSolving, setAutoSolving] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  
  const boardRef = useRef<HTMLDivElement>(null);

  // 处理键盘快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        // TODO: 实现提示功能
        startAutoSolve();
      } else if (e.key === 'r' || e.key === 'R') {
        resetGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameState]);

  // 检查游戏是否获胜
  useEffect(() => {
    if (checkWin(gameState.blocks, BOARD_SIZE) && !gameState.solved) {
      setGameState(prev => ({ ...prev, solved: true }));
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
  }, [gameState.blocks, gameState.solved]);

  // 开始拖动方块
  const startDragging = (block: Block, e: React.MouseEvent) => {
    if (gameState.solved || autoSolving) return;

    const boardRect = boardRef.current?.getBoundingClientRect();
    if (!boardRect) return;

    const offsetX = e.clientX - (boardRect.left + block.x * CELL_SIZE);
    const offsetY = e.clientY - (boardRect.top + block.y * CELL_SIZE);

    setDraggingBlock(block);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // 拖动方块
  const handleDrag = (e: React.MouseEvent) => {
    if (!draggingBlock || !boardRef.current || gameState.solved || autoSolving) return;
    
    const boardRect = boardRef.current.getBoundingClientRect();
    
    // 计算新的位置（以网格单位）
    let newX = Math.floor((e.clientX - boardRect.left - dragOffset.x) / CELL_SIZE);
    let newY = Math.floor((e.clientY - boardRect.top - dragOffset.y) / CELL_SIZE);
    
    // 限制在棋盘范围内
    newX = Math.max(0, Math.min(newX, BOARD_SIZE - draggingBlock.width));
    newY = Math.max(0, Math.min(newY, BOARD_SIZE - draggingBlock.height));
    
    // 只允许方块在其允许的方向上移动
    let canMove = false;
    let direction: Direction | null = null;
    let steps = 0;
    
    if (draggingBlock.type === BlockType.VERTICAL) {
      // 纵向方块只能上下移动
      if (newY !== draggingBlock.y) {
        direction = newY > draggingBlock.y ? Direction.DOWN : Direction.UP;
        steps = Math.abs(newY - draggingBlock.y);
        canMove = true;
      }
    } else {
      // 横向方块和钥匙只能左右移动
      if (newX !== draggingBlock.x) {
        direction = newX > draggingBlock.x ? Direction.RIGHT : Direction.LEFT;
        steps = Math.abs(newX - draggingBlock.x);
        canMove = true;
      }
    }
    
    if (canMove && direction && steps > 0) {
      if (isValidMove(draggingBlock, direction, steps, gameState.blocks, BOARD_SIZE)) {
        const newBlocks = moveBlock(gameState.blocks, draggingBlock.id, direction, steps);
        setGameState(prev => ({
          ...prev,
          blocks: newBlocks,
          moves: prev.moves + 1
        }));
        
        // 更新拖动的方块为移动后的新方块
        const updatedBlock = newBlocks.find(b => b.id === draggingBlock.id);
        if (updatedBlock) {
          setDraggingBlock(updatedBlock);
        }
      }
    }
  };

  // 停止拖动
  const stopDragging = () => {
    setDraggingBlock(null);
  };

  // 重置游戏
  const resetGame = () => {
    setAutoSolving(false);
    setGameState({
      blocks: JSON.parse(JSON.stringify(gameState.initialBlocks)),
      boardSize: BOARD_SIZE,
      moves: 0,
      solved: false,
      initialBlocks: gameState.initialBlocks
    });
  };

  // 自动解题（这只是一个简单的演示，实际的解题算法会更复杂）
  const startAutoSolve = () => {
    // 在实际应用中，这里应该使用findSolution函数返回的解决方案
    // 现在只是简单演示移动
    if (autoSolving || gameState.solved) return;
    
    setAutoSolving(true);
    
    // 固定解决方案：移动特定方块以解决谜题
    // 这里我们提供一个简单的硬编码解决方案，而不是随机移动
    const solvePuzzle = async () => {
      // 等待函数，在移动之间添加延迟
      const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      try {
        // 获取当前游戏状态的一个副本
        let currentBlocks = [...gameState.blocks];
        
        // 解题方案
        const solution = [
          // 先向上移动v3（右侧红色竖块）腾出空间
          { blockId: 'v3', direction: Direction.UP, steps: 1 },
          // 移动h3（右下角绿色横块）向右
          { blockId: 'h3', direction: Direction.RIGHT, steps: 1 },
          // 向下移动v2（中间的红色竖块）
          { blockId: 'v2', direction: Direction.DOWN, steps: 2 },
          // 移动钥匙向右
          { blockId: 'key', direction: Direction.RIGHT, steps: 3 }
        ];
        
        // 执行解决方案中的每一步
        for (const move of solution) {
          await wait(1000); // 等待1秒
          
          // 找到要移动的方块
          const blockToMove = currentBlocks.find(b => b.id === move.blockId);
          if (!blockToMove) continue;
          
          // 检查移动是否有效
          if (isValidMove(blockToMove, move.direction, move.steps, currentBlocks, BOARD_SIZE)) {
            // 执行移动
            const newBlocks = moveBlock(currentBlocks, move.blockId, move.direction, move.steps);
            
            // 更新状态
            setGameState(prev => ({
              ...prev,
              blocks: newBlocks,
              moves: prev.moves + 1
            }));
            
            // 更新当前方块状态以便下一步移动
            currentBlocks = newBlocks;
            
            // 检查是否已经解决
            if (checkWin(newBlocks, BOARD_SIZE)) {
              break;
            }
          } else {
            console.log(`无法移动方块 ${move.blockId} 朝 ${move.direction} 方向 ${move.steps} 步`);
          }
        }
      } finally {
        // 无论成功与否，最终都停止自动解题
        setAutoSolving(false);
      }
    };
    
    // 开始解题过程
    solvePuzzle();
  };

  return (
    <div className="game-container">
      <div className="game-info">
        <h2>滑块解谜游戏</h2>
        <p>移动次数: {gameState.moves}</p>
        <div className="controls">
          <button onClick={resetGame}>重置游戏 (R)</button>
          <button onClick={startAutoSolve} disabled={autoSolving || gameState.solved}>
            自动解题 (H)
          </button>
        </div>
        {gameState.solved && <div className="win-message">恭喜! 你赢了!</div>}
        {autoSolving && <div className="auto-solving">自动解题中...</div>}
      </div>
      
      <div 
        className="game-board" 
        ref={boardRef}
        style={{ 
          width: BOARD_SIZE * CELL_SIZE, 
          height: BOARD_SIZE * CELL_SIZE 
        }}
        onMouseMove={handleDrag}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {/* 绘制网格线 */}
        <div className="grid">
          {Array.from({ length: BOARD_SIZE - 1 }).map((_, i) => (
            <div key={`h-${i}`} className="grid-line horizontal" style={{ top: (i + 1) * CELL_SIZE }} />
          ))}
          {Array.from({ length: BOARD_SIZE - 1 }).map((_, i) => (
            <div key={`v-${i}`} className="grid-line vertical" style={{ left: (i + 1) * CELL_SIZE }} />
          ))}
        </div>
        
        {/* 出口标记 */}
        <div className="exit-marker" style={{ right: 0, top: 2 * CELL_SIZE, height: CELL_SIZE }} />
        
        {/* 渲染方块 */}
        {gameState.blocks.map(block => (
          <BlockComponent
            key={block.id}
            block={block}
            cellSize={CELL_SIZE}
            onMouseDown={(e) => startDragging(block, e)}
          />
        ))}

        {showCongrats && (
          <div className="congrats-overlay">
            <div className="congrats-message">恭喜! 你解开了谜题!</div>
          </div>
        )}
      </div>
      
      <div className="game-instructions">
        <h3>游戏规则</h3>
        <ul>
          <li>将金色的"钥匙"方块移动到右侧出口</li>
          <li>绿色方块只能横向移动</li>
          <li>红色方块只能纵向移动</li>
          <li>按下'H'键获取提示或启动自动解题</li>
          <li>按下'R'键重置游戏</li>
        </ul>
      </div>
    </div>
  );
};

export default GameBoard; 