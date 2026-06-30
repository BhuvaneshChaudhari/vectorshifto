import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');

  return (
    <BaseNode
      title="Filter"
      className="node--filter"
      width={200}
      height={100}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <div className="node-field">
        <label>
          Condition:
          <select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option value="equals">Equals</option>
            <option value="greater">Greater Than</option>
            <option value="less">Less Than</option>
            <option value="contains">Contains</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
