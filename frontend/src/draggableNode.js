import { nodeIcons } from './icons';

const descriptions = {
  customInput: 'Accepts external data for processing in the workflow',
  fileInput: 'Read and import files into your pipeline',
  numberInput: 'Numeric input with optional type validation',
  text: 'Text block with dynamic {{variable}} placeholders',
  llm: 'Process text using a language model',
  filter: 'Filter data records based on conditions',
  merge: 'Combine multiple data streams into one',
  customOutput: 'Send processed data out of the pipeline',
  note: 'Add annotations and comments to your workflow',
};

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const Icon = nodeIcons[type];

    return (
      <div
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
        role="button"
        tabIndex={0}
        aria-label={`Add ${label} node`}
        title={descriptions[type] || `${label} node`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
          }
        }}
      >
        <span className="draggable-node-icon">
          {Icon ? <Icon /> : null}
        </span>
        <span className="draggable-node-label">{label}</span>
      </div>
    );
  };
