import { useState, useEffect } from 'react'
import './App.css'
import IPhoneDevice from './components/IPhoneDevice'
import InspectorPanel from './components/InspectorPanel'

function App() {
  const [currentUrl, setCurrentUrl] = useState('https://apple.com')
  const [inputUrl, setInputUrl] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [inspectEnabled, setInspectEnabled] = useState(false)
  const [iframeSrcDoc, setIframeSrcDoc] = useState('')
  const [inspectorData, setInspectorData] = useState(null)

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'INSPECTOR_DATA') {
        setInspectorData(event.data.payload)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const presetUrls = [
    { name: 'Kings', url: 'http://localhost:8081/' },
    { name: 'Hawks', url: 'http://localhost:8081/' },
    // { name: 'GitHub', url: 'https://github.com' },
    // { name: 'YouTube', url: 'https://youtube.com' }
  ]

  const handleUrlSubmit = async (e) => {
    e.preventDefault()
    if (inputUrl.trim()) {
      let url = inputUrl.trim()
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }
      setCurrentUrl(url)
      if (inspectEnabled) {
        fetchInspectableHtml(url)
      }
      setInputUrl('')
    }
  }

  const handlePresetClick = (url, name) => {
    setCurrentUrl(url)
    if (inspectEnabled) {
      fetchInspectableHtml(url)
    }

    if (name === 'Hawks') {
      fetch('http://localhost:3001/api/copy-haws-to-kings', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setCurrentUrl('http://localhost:8081/')
            setReloadKey(prev => prev + 1)
          } else {
            alert('Failed to copy Hawks theme!')
          }
        })
        .catch(() => alert('Failed to copy Hawks theme!'))
    }
    if (name === 'Kings') {
      fetch('http://localhost:3001/api/copy-kings-to-kings', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setCurrentUrl('http://localhost:8081/')
            setReloadKey(prev => prev + 1)
          } else {
            alert('Failed to copy Kings theme!')
          }
        })
        .catch(() => alert('Failed to copy Kings theme!'))
    }
  }

  const fetchInspectableHtml = async (url) => {
    try {
      const response = await fetch('http://localhost:3001/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const html = await response.text()
      setIframeSrcDoc(html)
    } catch (error) {
      console.error('Failed to fetch inspectable URL', error)
      alert('Failed to load inspector.')
    }
  }

  const handleInspectToggle = (e) => {
    const isEnabled = e.target.checked
    setInspectEnabled(isEnabled)
    if (isEnabled) {
      fetchInspectableHtml(currentUrl)
    } else {
      setIframeSrcDoc('')
    }
  }

  return (
    <div className="app">
      {/* <div className="header">
        <h1>iPhone 15 Pro Max Web Viewer</h1>
        <p>Experience websites in a realistic iPhone device mockup</p>
      </div> */}
      
      <div className="main-content">
        <div className="controls-section">
          <div className="url-controls">
            <form onSubmit={handleUrlSubmit} className="url-input-form">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter a website URL..."
                className="url-input"
              />
              <button type="submit" className="url-submit-btn">
                Load Website
              </button>
            </form>

            <div className="preset-urls">
              <h3 className="preset-label">Quick Links</h3>
              <div className="preset-buttons">
                {presetUrls.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetClick(preset.url, preset.name)}
                    className="preset-btn"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="inspector-toggle">
              <label>
                <input type="checkbox" checked={inspectEnabled} onChange={handleInspectToggle} />
                Enable Inspector
              </label>
            </div>
          </div>
        </div>
        
        <div className="device-section">
          <IPhoneDevice 
            url={!inspectEnabled ? currentUrl : undefined} 
            srcDoc={inspectEnabled ? iframeSrcDoc : undefined}
            reloadKey={reloadKey} 
          />
        </div>
        {inspectEnabled && <InspectorPanel data={inspectorData} />}
      </div>
    </div>
  )
}

export default App
