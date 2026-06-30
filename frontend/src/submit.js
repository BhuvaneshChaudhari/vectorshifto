import { useState, useCallback, useEffect } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { SpinnerIcon, CloseIcon, CheckIcon, XCircleIcon, SparklesIcon } from './icons';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleClose = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (!result && !error) return;
    const handler = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [result, error, handleClose]);

  const [ripple, setRipple] = useState(false);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('https://vectorshifto.onrender.com/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
      setRipple(true);
      setTimeout(() => setRipple(false), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [nodes, edges]);

  return (
    <>
      <div className="submit-container">
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          <span className="submit-button-ripple" data-active={ripple} />
          {loading ? <SpinnerIcon /> : <SparklesIcon />}
          {loading ? 'Analyzing' : 'Analyze Pipeline'}
        </button>
      </div>

      {result && (
        <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-label="Pipeline analysis result">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose} aria-label="Close"><CloseIcon /></button>
            <div className="modal-status">
              <span className={`modal-status-icon ${result.is_dag ? 'status--success' : 'status--error'}`}>
                {result.is_dag ? <CheckIcon /> : <XCircleIcon />}
              </span>
              <span className="modal-status-text">
                {result.is_dag ? 'Valid DAG' : 'Cycle Detected'}
              </span>
            </div>
            <div className="modal-summary">
              {result.is_dag ? (
                <>
                  <p className="modal-summary-line">This workflow contains:</p>
                  <ul className="modal-summary-list">
                    <li><strong>{result.num_nodes}</strong> {result.num_nodes === 1 ? 'node' : 'nodes'}</li>
                    <li><strong>{result.num_edges}</strong> {result.num_edges === 1 ? 'edge' : 'edges'}</li>
                  </ul>
                  <p className="modal-summary-footer">No cycles detected. The pipeline can be executed safely.</p>
                </>
              ) : (
                <>
                  <p className="modal-summary-line">One or more cycles were found in the pipeline.</p>
                  <p className="modal-summary-footer modal-summary-footer--error">Remove the cyclic dependency before execution.</p>
                </>
              )}
            </div>
            <div className="modal-stats">
              <div className="modal-stat">
                <span className="modal-stat-value">{result.num_nodes}</span>
                <span className="modal-stat-label">Nodes</span>
              </div>
              <div className="modal-stat">
                <span className="modal-stat-value">{result.num_edges}</span>
                <span className="modal-stat-label">Edges</span>
              </div>
              <div className="modal-stat">
                <span className={`modal-stat-value ${result.is_dag ? 'dag--yes' : 'dag--no'}`}>
                  {result.is_dag ? '✓' : '✗'}
                </span>
                <span className="modal-stat-label">Pipeline</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="modal-overlay" onClick={handleClose} role="alert" aria-label="Error">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose} aria-label="Close"><CloseIcon /></button>
            <h2 className="modal-title">Error</h2>
            <p className="modal-error">{error}</p>
          </div>
        </div>
      )}
    </>
  );
};
