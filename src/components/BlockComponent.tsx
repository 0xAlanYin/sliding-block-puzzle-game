import React from 'react';
import { Block } from '../types';
import '../styles/Block.css';

interface BlockComponentProps {
  block: Block;
  cellSize: number;
  onMouseDown: (e: React.MouseEvent) => void;
}

const BlockComponent: React.FC<BlockComponentProps> = ({ block, cellSize, onMouseDown }) => {
  return (
    <div
      className={`block ${block.type}`}
      style={{
        left: block.x * cellSize,
        top: block.y * cellSize,
        width: block.width * cellSize - 4, // 减去边框的宽度
        height: block.height * cellSize - 4,
        backgroundColor: block.color,
      }}
      onMouseDown={onMouseDown}
    >
      {/* 可选: 在方块上显示某些内容 */}
    </div>
  );
};

export default BlockComponent; 