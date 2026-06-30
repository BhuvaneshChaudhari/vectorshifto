import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FileInputNode = ({ id, data }) => {
  const [format, setFormat] = useState(data?.format || 'CSV');

  return (
    <BaseNode
      title="File Input"
      className="node--fileInput"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-file` },
      ]}
    >
      <div className="node-field">
        <label>
          Format:
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="CSV">CSV</option>
            <option value="JSON">JSON</option>
            <option value="XML">XML</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
