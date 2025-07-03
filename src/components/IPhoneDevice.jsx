import { useState, useEffect } from 'react'
import './IPhoneDevice.css'

const IPhoneDevice = ({ url }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(false)
  }, [url])

  const handleIframeLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleIframeError = () => {
    setLoading(false)
    setError(true)
  }

  const getDisplayUrl = (url) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  return (
    <div className="iphone-container">
      <div className="iphone-device">
        {/* Action Button */}
        <div className="action-button"></div>
        
        {/* Power Button */}
        <div className="power-button"></div>

        <div className="iphone-screen">
          {/* Dynamic Island */}
          <div className="dynamic-island"></div>

          {/* Status Bar */}
          <div className="status-bar">
            <div className="time">{currentTime}</div>
            <div className="battery-info">
              <span>100%</span>
              <div className="battery">
                <div className="battery-level"></div>
              </div>
            </div>
          </div>

          {/* Address Bar */}
          <div className="address-bar">
            <div className="url-text">{getDisplayUrl(url)}</div>
          </div>

          {/* Website Container */}
          <div className="website-container">
            {loading && (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
                <p>Loading website...</p>
              </div>
            )}

            {error && (
              <div className="error-overlay">
                <div className="error-icon">⚠️</div>
                <h3>Unable to load website</h3>
                <p>The website might be blocking iframe embedding or there might be a connection issue.</p>
                <div className="error-url">{url}</div>
                <p>Try another URL or check your internet connection.</p>
              </div>
            )}

            <iframe
              src={url}
              className="website-frame"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="Website Preview"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
              scrolling="yes"
              style={{ overflow: 'auto' }}
            />
          </div>

          {/* Home Indicator */}
          <div className="home-indicator"></div>
        </div>
      </div>
    </div>
  )
}

export default IPhoneDevice