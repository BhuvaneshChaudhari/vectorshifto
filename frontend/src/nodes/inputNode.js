import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  return (
    <BaseNode
      title="Input"
      className="node--customInput"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    >
      <div className="node-field">
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
      </div>
      <div className="node-field">
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
