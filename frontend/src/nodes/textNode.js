import { useState, useMemo, useCallback, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { parseVariables } from './variableUtils';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const variables = useMemo(() => parseVariables(currText), [currText]);

  const handleTextChange = useCallback((e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    setCurrText(textarea.value);
  }, []);

  const handles = useMemo(() => {
    const result = variables.map((v, i) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${v}`,
      style: { top: `${((i + 1) / (variables.length + 1)) * 100}%` },
    }));
    result.push({ type: 'source', position: Position.Right, id: `${id}-output` });
    return result;
  }, [id, variables]);

  return (
    <BaseNode title="Text" className="node--text" handles={handles} width={185}>
      <div className="node-field">
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          rows={2}
        />
      </div>
    </BaseNode>
  );
};
