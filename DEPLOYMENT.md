# Deployment Guide - AI Prompt Generator

## Quick Start (Local Development)

### Method 1: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your browser will open automatically

### Method 2: Python HTTP Server
```bash
# Navigate to project directory
cd f:\Organized_Files\Ex\Web\04

# Start Python server (Python 3)
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Open browser to http://localhost:8000
```

### Method 3: Node.js serve
```bash
# Install serve globally
npm install -g serve

# Navigate to project directory
cd f:\Organized_Files\Ex\Web\04

# Start server
serve .

# Open browser to displayed URL
```

## Production Deployment

### GitHub Pages
1. Create a new GitHub repository
2. Upload all project files
3. Go to Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Your site will be live immediately
4. Optional: Connect to GitHub for automatic deployments

### Vercel
1. Create account at [vercel.com](https://vercel.com)
2. Import project from GitHub or upload files
3. Deploy with one click
4. Get automatic HTTPS and CDN

### Traditional Web Hosting
1. Upload all files via FTP/SFTP to your web host
2. Ensure `index.html` is in the root directory
3. Access via your domain name

## Environment Configuration

### API Key Management
For production, consider these security practices:

1. **Environment Variables** (for server-side deployments):
```javascript
// Add to script.js
const API_KEY = process.env.GOOGLE_AI_API_KEY || 'fallback-key';
```

2. **Config File** (not recommended for public repos):
```javascript
// config.js (add to .gitignore)
const CONFIG = {
    GOOGLE_AI_API_KEY: 'your-actual-api-key'
};
```

3. **Runtime Configuration**:
Keep the current implementation where users enter their own API keys.

## Performance Optimization

### CDN Integration
Replace local files with CDN versions:
```html
<!-- Already using Tailwind CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Google Fonts (already optimized) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Minification
For production, consider minifying JavaScript:
```bash
# Using terser
npm install -g terser
terser script.js -o script.min.js -c -m
```

### Compression
Enable gzip compression on your server:
```apache
# .htaccess for Apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## Security Considerations

### API Key Protection
- Never commit API keys to version control
- Use environment variables in production
- Implement rate limiting if hosting backend
- Consider using a proxy server for API calls

### Content Security Policy
Add to HTML head for enhanced security:
```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://generativelanguage.googleapis.com;
    img-src 'self' data: blob:;
">
```

## Monitoring & Analytics

### Error Tracking
Add error tracking service:
```html
<!-- Sentry example -->
<script src="https://browser.sentry-cdn.com/7.0.0/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: 'YOUR_DSN_HERE' });
</script>
```

### Analytics
Add Google Analytics or similar:
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Backup & Maintenance

### Automated Backups
Set up automated backups of:
- Source code (GitHub automatically backs up)
- User data (if storing server-side)
- Configuration files

### Update Schedule
- Monitor Tailwind CSS updates
- Check Google AI API changes
- Update dependencies regularly
- Test across browsers periodically

## Troubleshooting Deployment

### Common Issues

**CORS Errors**:
- Ensure proper server configuration
- Use HTTPS for production
- Check API endpoint CORS settings

**Font Loading Issues**:
- Verify Google Fonts CDN access
- Add font-display: swap for better performance

**Service Worker Issues**:
- Check browser compatibility
- Verify HTTPS requirement for production
- Update cache version when deploying updates

**API Rate Limits**:
- Implement proper error handling
- Add user feedback for rate limit errors
- Consider caching responses where appropriate

## Support

For deployment issues:
1. Check browser console for errors
2. Verify all files are uploaded correctly
3. Test API connectivity
4. Check server logs if available

---

Happy deploying! 🚀
