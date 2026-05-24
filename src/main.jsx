import { StrictMode, Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const modules = import.meta.glob('./**/*.jsx')

const files = Object.keys(modules)
  .filter((p) => p !== './main.jsx')
  .sort()

const prettyName = (path) => path.replace(/^\.\//, '').replace(/\.jsx$/, '')

const readHash = () => {
  const h = decodeURIComponent(window.location.hash.slice(1))
  return files.includes(h) ? h : null
}

function Index() {
  return (
    <div className="viewer-index">
      <header>
        <h1>JSX Viewer</h1>
        <p>{files.length} file{files.length === 1 ? '' : 's'} found in <code>src/</code></p>
      </header>
      {files.length === 0 ? (
        <p className="empty">Drop a <code>.jsx</code> file with a default export into <code>src/</code> to get started.</p>
      ) : (
        <ul>
          {files.map((f) => (
            <li key={f}>
              <a href={`#${encodeURIComponent(f)}`}>{prettyName(f)}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Viewer({ path }) {
  const Component = useMemo(() => lazy(modules[path]), [path])
  return (
    <>
      <nav className="viewer-nav">
        <a href="#">← Index</a>
        <span>{prettyName(path)}</span>
      </nav>
      <Suspense fallback={<div className="viewer-loading">Loading…</div>}>
        <Component />
      </Suspense>
    </>
  )
}

function App() {
  const [current, setCurrent] = useState(readHash)

  useEffect(() => {
    const onHash = () => setCurrent(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.title = current ? prettyName(current) : 'MATV1007-Oppsummering'
  }, [current])

  return current ? <Viewer path={current} /> : <Index />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
