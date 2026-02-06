# AI Governance Infrastructure

> Building the translation layer between AI knowledge and institutional action

Born from Apart Research Hackathon • January 30 - February 1, 2025

## 🚀 Quick Deploy to Vercel

```bash
# 1. Clone this repo
git clone [your-repo-url]
cd [repo-name]

# 2. Install Vercel CLI (if you haven't)
npm install -g vercel

# 3. Deploy
vercel

# Follow prompts, your site will be live in ~30 seconds
```

## 📁 Project Structure

```
governance-infrastructure-site/
├── index.html          # Main entry point
├── styles.css          # Complete design system
├── app.js              # All pages and routing
├── vmfs-screenshot.png # Hackathon prototype screenshot
├── vercel.json         # Vercel configuration
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🎨 Features

- **Professional Design** - Clean, modern UI matching the VMFS dashboard
- **Light/Dark Theme** - Toggle with localStorage persistence
- **Single Page App** - Client-side routing, no page reloads
- **Fully Responsive** - Works beautifully on all devices
- **Zero Dependencies** - Pure HTML, CSS, JavaScript
- **Fast Loading** - < 1 second load time

## 🌐 Pages

1. **Home** - Overview, problem statement, proof of concept
2. **Evidence Infrastructure** - Format translation, verification pathways
3. **Decision Infrastructure** - Protocols, simulations, advisory architectures
4. **Capacity Infrastructure** - Embedding programs, rotational pathways
5. **Strategy** - Core approach, positioning, success metrics
6. **About** - Origin story, principles, team positioning

## 🛠️ Local Development

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Open http://localhost:8000
```

## 📝 Editing Content

All content is in `app.js` - find the render methods:
- `renderHome()` - Home page
- `renderEvidence()` - Evidence Infrastructure
- `renderDecision()` - Decision Infrastructure
- `renderCapacity()` - Capacity Infrastructure
- `renderStrategy()` - Strategy page
- `renderAbout()` - About page

## 🎨 Customizing Design

Edit `styles.css` - all theme variables are at the top:
```css
:root {
  --accent: #1E40AF;  /* Primary accent color */
  --text: #0A0A0A;    /* Main text color */
  /* ... more variables */
}
```

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
vercel deploy
```

### Netlify
Drag folder to https://app.netlify.com/drop

### GitHub Pages
1. Settings > Pages
2. Source: Deploy from branch
3. Branch: main, Folder: / (root)

## 📄 License

All rights reserved.

---

**Live Site:** [Add your URL here after deployment]
