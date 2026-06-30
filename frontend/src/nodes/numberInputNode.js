import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const NumberInputNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value ?? 0);

  return (
    <BaseNode
      title="Number Input"
      className="node--numberInput"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    >
      <div className="node-field">
        <label>
          Value:
          <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </label>
      </div>
    </BaseNode>
  );
};
