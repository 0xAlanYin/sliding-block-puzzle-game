// 方块类型枚举
export enum BlockType {
  KEY = 'key',      // 金色钥匙方块
  HORIZONTAL = 'horizontal', // 绿色横向方块
  VERTICAL = 'vertical'    // 红色纵向方块
}

// 方块的数据结构
export interface Block {
  id: string;
  type: BlockType;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

// 游戏状态
export interface GameState {
  blocks: Block[];
  boardSize: number;
  moves: number;
  solved: boolean;
  initialBlocks: Block[];
}

// 方块移动的方向
export enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down'
}

// 移动指令
export interface Move {
  blockId: string;
  direction: Direction;
  steps: number;
} 