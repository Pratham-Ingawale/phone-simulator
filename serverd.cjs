const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cheerio = require('cheerio');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// POST endpoint to copy haws.json to kings.json
app.post('/api/copy-haws-to-kings', (req, res) => {
  const sourcePath = path.join(__dirname, 'haws.json');
  const destPath = '/Users/pratham.ingawale/Developer/kings_reactNative/kings/app/theme/kings.json';

  fs.copyFile(sourcePath, destPath, (err) => {
    if (err) {
      console.error('Copy failed:', err);
      return res.json({ success: false, error: err.message });
    }
    res.json({ success: true });
  });
});

// POST endpoint to copy kings.json to kings.json path
app.post('/api/copy-kings-to-kings', (req, res) => {
  const sourcePath = path.join(__dirname, 'kings.json');
  const destPath = '/Users/pratham.ingawale/Developer/kings_reactNative/kings/app/theme/kings.json';

  fs.copyFile(sourcePath, destPath, (err) => {
    if (err) {
      console.error('Copy failed:', err);
      return res.json({ success: false, error: err.message });
    }
    res.json({ success: true });
  });
});

const inspectorScript = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      let selectedElement = null;
      let originalOutline = '';
      let hideTimeout = null;

      document.addEventListener('mouseover', (e) => {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }

        if (selectedElement) {
          selectedElement.style.outline = originalOutline;
        }
        
        selectedElement = e.target;
        originalOutline = selectedElement.style.outline || '';
        selectedElement.style.outline = '2px solid red';
        
        const styles = window.getComputedStyle(selectedElement);
        const styleInfo = {
          tag: selectedElement.tagName.toLowerCase(),
          id: selectedElement.id ? '#' + selectedElement.id : '',
          classes: selectedElement.className ? '.' + selectedElement.className.split(' ').join('.') : '',
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          fontSize: styles.fontSize,
          margin: styles.margin,
          padding: styles.padding,
        };
        
        window.parent.postMessage({ type: 'INSPECTOR_DATA', payload: styleInfo }, '*');
      });

      document.addEventListener('mouseout', (e) => {
        hideTimeout = setTimeout(() => {
          if (selectedElement) {
            selectedElement.style.outline = originalOutline;
            selectedElement = null;
          }
          window.parent.postMessage({ type: 'INSPECTOR_DATA', payload: null }, '*');
        }, 50);
      });
    });
  </script>
`;

app.get('/api/proxy-asset', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL is required');
  }
  try {
    const fetch = (await import('node-fetch')).default;
    const assetRes = await fetch(url);

    if (!assetRes.ok) {
      return res.status(assetRes.status).send(await assetRes.text());
    }

    const contentType = assetRes.headers.get('content-type') || '';
    const backendBase = 'http://localhost:3001';

    if (contentType.includes('text/css')) {
      let cssText = await assetRes.text();
      const cssBase = new URL(url);

      const urlRegex = /url\((['"]?)(.*?)\1\)/g;
      
      cssText = cssText.replace(urlRegex, (match, quote, path) => {
        if (path.startsWith('data:')) {
          return match;
        }
        const absoluteUrl = new URL(path, cssBase.href).href;
        const proxiedUrl = `${backendBase}/api/proxy-asset?url=${encodeURIComponent(absoluteUrl)}`;
        return `url(${quote}${proxiedUrl}${quote})`;
      });

      res.type('text/css').send(cssText);
    } else {
      const data = await assetRes.buffer();
      res.type(contentType).send(data);
    }
  } catch (error) {
    console.error('Failed to proxy asset:', error);
    res.status(500).send('Failed to proxy asset');
  }
});


app.post('/api/fetch-url', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    const text = await response.text();
    const $ = cheerio.load(text);
    const base = new URL(url);
    const backendBase = 'http://localhost:3001';

    $('script, link[rel="stylesheet"], img, source, a').each((i, el) => {
      const $el = $(el);
      let attrs = [];
      if ($el.is('script') || $el.is('img') || $el.is('source')) attrs.push('src');
      if ($el.is('link') || $el.is('a')) attrs.push('href');
      if ($el.is('img') || $el.is('source')) attrs.push('srcset');

      attrs.forEach(attr => {
        let originalValue = $el.attr(attr);
        if (!originalValue) return;

        if (attr === 'srcset') {
          const newSrcset = originalValue.split(',').map(part => {
            const trimmedPart = part.trim();
            const urlMatch = trimmedPart.match(/^(\S+)/);
            if (urlMatch) {
              const imageUrl = urlMatch[1];
              const descriptor = trimmedPart.substring(imageUrl.length).trim();
              const absoluteUrl = new URL(imageUrl, base.href).href;
              const proxiedUrl = `${backendBase}/api/proxy-asset?url=${encodeURIComponent(absoluteUrl)}`;
              return `${proxiedUrl} ${descriptor}`;
            }
            return part;
          }).join(', ');
          $el.attr(attr, newSrcset);
        } else {
          const absoluteUrl = new URL(originalValue, base.href).href;
          $el.attr(attr, `${backendBase}/api/proxy-asset?url=${encodeURIComponent(absoluteUrl)}`);
        }
      });
    });
    
    $('body').append(inspectorScript);
    
    res.send($.html());
  } catch (error) {
    console.error('Error fetching URL:', error);
    res.status(500).json({ error: 'Failed to fetch URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});