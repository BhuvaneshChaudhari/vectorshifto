import { useState } from 'react';
import { BaseNode } from './baseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Write a note...');

  return (
    <BaseNode
      title="Note"
      className="node--note"
      handles={[]}
    >
      <div className="node-field">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
      </div>
    </BaseNode>
  );
};
