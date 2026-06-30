import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      title="Merge"
      className="node--merge"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input1`, style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: `${id}-input2`, style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <span className="node-static">Combine two inputs</span>
    </BaseNode>
  );
};
