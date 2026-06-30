import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { MenuIcon } from './icons';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app">
      <nav className="topbar">
        <button className="topbar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
          <MenuIcon />
        </button>
        <div className="topbar-brand">
          <span className="topbar-brand-dot" />
          VectorShift
        </div>
      </nav>
      <div className="app-body">
        <PipelineToolbar collapsed={!sidebarOpen} />
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
