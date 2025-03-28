import React from 'react';
import '../styles/Instructions.css';

const Instructions: React.FC = () => {
  return (
    <div className="instructions-container">
      <h2>滑块解谜游戏</h2>
      
      <section>
        <h3>游戏介绍</h3>
        <p>
          这是一个经典的滑块解谜游戏，灵感来源于著名的"华容道"游戏。
          在这个游戏中，玩家需要通过移动不同的方块，最终将金色的"钥匙"方块移动到出口。
        </p>
      </section>
      
      <section>
        <h3>游戏规则</h3>
        <ul>
          <li><strong>游戏目标：</strong>将金色的"钥匙"方块移动到右侧边缘，使其右边缘到达或超过游戏区域的右边界。</li>
          <li><strong>游戏界面：</strong>游戏在一个6x6的网格上进行。</li>
          <li>
            <strong>方块类型：</strong>
            <ul>
              <li>绿色方块：横向移动，占据2或3个单元格</li>
              <li>红色方块：纵向移动，占据2或3个单元格</li>
              <li>金色方块：钥匙，占据2个单元格，需要移动到出口</li>
            </ul>
          </li>
          <li>
            <strong>移动规则：</strong>
            <ul>
              <li>玩家可以用鼠标拖动方块</li>
              <li>方块只能在其允许的方向上移动（绿色横向，红色纵向）</li>
              <li>方块之间不能重叠</li>
            </ul>
          </li>
          <li>
            <strong>游戏操作：</strong>
            <ul>
              <li>左键点击并拖动方块来移动它们</li>
              <li>按'H'键可以获取提示和启动自动解题功能</li>
              <li>按'R'键可以重置游戏</li>
            </ul>
          </li>
        </ul>
      </section>
      
      <section>
        <h3>特殊功能</h3>
        <ul>
          <li><strong>自动解题：</strong>按'H'键后，游戏会自动每秒移动一次方块，直到解开谜题</li>
          <li><strong>重置游戏：</strong>按'R'键可以重置游戏到初始状态</li>
        </ul>
      </section>
      
      <div className="instructions-footer">
        <p>挑战自我，享受解谜的乐趣吧！</p>
      </div>
    </div>
  );
};

export default Instructions; 