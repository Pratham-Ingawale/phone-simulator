import { useState } from 'react'
import './App.css'
import IPhoneDevice from './components/IPhoneDevice'

function App() {
  const [currentUrl, setCurrentUrl] = useState('https://apple.com')
  const [inputUrl, setInputUrl] = useState('')

  const presetUrls = [
    { name: 'Kings', url: 'http://localhost:8081/' },
    { name: 'Google', url: 'https://google.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'YouTube', url: 'https://youtube.com' }
  ]

  const handleUrlSubmit = (e) => {
    e.preventDefault()
    if (inputUrl.trim()) {
      let url = inputUrl.trim()
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }
      setCurrentUrl(url)
      setInputUrl('')
    }
  }

  const handlePresetClick = (url) => {
    setCurrentUrl(url)
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
                    onClick={() => handlePresetClick(preset.url)}
                    className="preset-btn"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="device-section">
          <IPhoneDevice url={currentUrl} />
        </div>
      </div>
    </div>
  )
}

export default App
