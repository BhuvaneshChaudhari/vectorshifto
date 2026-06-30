import { Handle } from 'reactflow';

export const BaseNode = ({ title, handles, children, className = '', width = 200, height = 80 }) => {
  return (
    <div className={`node ${className}`} style={{ width, minHeight: height }}>
      <div className="node-header">
        <span className="node-dot" />
        <span className="node-header-label">{title}</span>
      </div>
      <div className="node-body">{children}</div>
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style}
        />
      ))}
    </div>
  );
};
