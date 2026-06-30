import { useState, useMemo } from 'react';
import { DraggableNode } from './draggableNode';
import { SearchIcon } from './icons';

const categories = [
  {
    name: 'Inputs',
    nodes: [
      { type: 'customInput', label: 'Input' },
      { type: 'fileInput', label: 'File Input' },
      { type: 'numberInput', label: 'Number' },
      { type: 'text', label: 'Text' },
    ],
  },
  {
    name: 'Processing',
    nodes: [
      { type: 'llm', label: 'LLM' },
      { type: 'filter', label: 'Filter' },
      { type: 'merge', label: 'Merge' },
    ],
  },
  {
    name: 'Outputs',
    nodes: [
      { type: 'customOutput', label: 'Output' },
    ],
  },
  {
    name: 'Utility',
    nodes: [
      { type: 'note', label: 'Note' },
    ],
  },
];

export const PipelineToolbar = ({ collapsed }) => {
  const [search, setSearch] = useState('');

  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    const q = search.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        nodes: cat.nodes.filter((n) => n.label.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.nodes.length > 0);
  }, [search]);

  return (
    <div className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar-search">
        <div className="sidebar-search-wrapper">
          <span className="sidebar-search-icon"><SearchIcon /></span>
          <input
            className="sidebar-search-input"
            type="text"
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="sidebar-search-hint">/</span>
        </div>
      </div>
      <div className="sidebar-scroll">
        {filteredCategories.map((cat) => (
          <div className="sidebar-category" key={cat.name}>
            <div className="sidebar-category-header">{cat.name}</div>
            <div className="sidebar-category-nodes">
              {cat.nodes.map((node) => (
                <DraggableNode key={node.type} type={node.type} label={node.label} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
