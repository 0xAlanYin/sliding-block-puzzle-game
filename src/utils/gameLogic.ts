import { Block, BlockType, Direction, Move } from '../types';

// 检查游戏是否获胜
export const checkWin = (blocks: Block[], boardSize: number): boolean => {
  const keyBlock = blocks.find(block => block.type === BlockType.KEY);
  if (!keyBlock) return false;
  
  // 如果钥匙方块的右边缘到达或超过游戏区域的右边界，则游戏获胜
  return keyBlock.x + keyBlock.width >= boardSize;
};

// 检查方块移动是否有效
export const isValidMove = (block: Block, direction: Direction, steps: number, blocks: Block[], boardSize: number): boolean => {
  if (steps <= 0) return false; // 确保步数是正数
  
  // 创建临时方块用于检查移动
  const tempBlock = { ...block };
  
  // 根据方向和步数调整临时方块的位置
  switch (direction) {
    case Direction.LEFT:
      // 确保只有横向或钥匙方块可以左右移动
      if (block.type === BlockType.VERTICAL) return false;
      tempBlock.x -= steps;
      break;
    case Direction.RIGHT:
      if (block.type === BlockType.VERTICAL) return false;
      tempBlock.x += steps;
      break;
    case Direction.UP:
      // 确保只有纵向方块可以上下移动
      if (block.type !== BlockType.VERTICAL) return false;
      tempBlock.y -= steps;
      break;
    case Direction.DOWN:
      if (block.type !== BlockType.VERTICAL) return false;
      tempBlock.y += steps;
      break;
    default:
      return false;
  }

  // 检查是否超出边界
  if (tempBlock.x < 0 || tempBlock.y < 0 || 
      tempBlock.x + tempBlock.width > boardSize || 
      tempBlock.y + tempBlock.height > boardSize) {
    return false;
  }

  // 检查是否与其他方块重叠
  for (const otherBlock of blocks) {
    // 跳过自己
    if (otherBlock.id === block.id) continue;
    
    // 检查两个矩形是否重叠
    if (!(tempBlock.x >= otherBlock.x + otherBlock.width ||
          tempBlock.x + tempBlock.width <= otherBlock.x ||
          tempBlock.y >= otherBlock.y + otherBlock.height ||
          tempBlock.y + tempBlock.height <= otherBlock.y)) {
      return false; // 有重叠，移动无效
    }
  }

  // 没有重叠，移动有效
  return true;
};

// 移动方块
export const moveBlock = (blocks: Block[], blockId: string, direction: Direction, steps: number): Block[] => {
  return blocks.map(block => {
    if (block.id !== blockId) return block;
    
    const newBlock = { ...block };
    
    switch (direction) {
      case Direction.LEFT:
        newBlock.x -= steps;
        break;
      case Direction.RIGHT:
        newBlock.x += steps;
        break;
      case Direction.UP:
        newBlock.y -= steps;
        break;
      case Direction.DOWN:
        newBlock.y += steps;
        break;
    }
    
    return newBlock;
  });
};

// 获取初始游戏设置
export const getInitialBlocks = (): Block[] => {
  // 为了演示，这里设置一个简单的初始布局
  return [
    // 金色钥匙方块 (目标块)
    {
      id: 'key',
      type: BlockType.KEY,
      x: 1,
      y: 2,
      width: 2,
      height: 1,
      color: '#FFD700' // 金色
    },
    // 绿色横向方块
    {
      id: 'h1',
      type: BlockType.HORIZONTAL,
      x: 0,
      y: 0,
      width: 2,
      height: 1,
      color: '#32CD32' // 绿色
    },
    {
      id: 'h2',
      type: BlockType.HORIZONTAL,
      x: 3,
      y: 0,
      width: 3,
      height: 1, 
      color: '#32CD32'
    },
    {
      id: 'h3',
      type: BlockType.HORIZONTAL,
      x: 3,
      y: 3,
      width: 2,
      height: 1,
      color: '#32CD32'
    },
    // 红色纵向方块
    {
      id: 'v1',
      type: BlockType.VERTICAL,
      x: 0,
      y: 1,
      width: 1,
      height: 2,
      color: '#FF4500' // 红色
    },
    {
      id: 'v2',
      type: BlockType.VERTICAL,
      x: 3,
      y: 1,
      width: 1,
      height: 3,
      color: '#FF4500'
    },
    {
      id: 'v3',
      type: BlockType.VERTICAL,
      x: 5,
      y: 1,
      width: 1,
      height: 2,
      color: '#FF4500'
    },
    {
      id: 'v4',
      type: BlockType.VERTICAL,
      x: 2,
      y: 3,
      width: 1,
      height: 3,
      color: '#FF4500'
    }
  ];
};

// 简单的自动解题算法（这只是一个示例，实际的解题算法会更复杂）
export const findSolution = (blocks: Block[], boardSize: number): Move[] | null => {
  // 在实际应用中，这里需要实现一个搜索算法来找到解决方案
  // 例如使用广度优先搜索、A*算法等
  // 这里为了演示，返回一个预设的解决方案
  
  // 在实际实现中，这里会非常复杂，需要实现完整的搜索算法
  // 简单返回null表示没有找到解决方案
  return null;
}; 