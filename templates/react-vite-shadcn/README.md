# React + Vite + Tailwind + ShadCN Template

A clean, production-ready React SPA starter with ShadCN UI components, Tailwind CSS 4, and a structured service layer.

## What's Included

### Stack
- React 19 + Vite 6 (build tool + dev server)
- Tailwind CSS 4 + ShadCN UI (New York style, neutral theme)
- React Router DOM 7 (client-side routing)
- Axios (HTTP client with interceptors)
- Sonner (toast notifications)
- Lucide React (icons)
- Vitest + React Testing Library (tests)
- ESLint + Prettier (code quality)

### Pre-installed ShadCN Components
Button, Card, Input, Label, Dialog, Select, Separator, Badge, Sonner (toasts)

Add more anytime: `npx shadcn@latest add [component]`

### Service Layer
- **http.js** - Axios client with error interceptors, auth header support, API response validation
- **api.js** - Template for defining API calls (empty, with pattern examples)
- **log.js** - Configurable logging (DEBUG/INFO/WARNING/ERROR/FATAL)
- **config.js** - Environment variable loader

### Project Structure
```
src/
  components/
    ui/             # ShadCN components
    layout/         # App layout with top bar
  services/         # HTTP client, API calls, logging
  utilities/        # Configuration
  pages/            # Route pages
  lib/              # Utilities (cn() for class merging)
  __tests__/        # Test setup and tests
```

## Setup

```bash
# Copy template files into your project
cp -r files/ /path/to/my-project/
cd /path/to/my-project

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your API endpoint

# Start development
npm run dev
```

## Customization

1. Update `package.json` name/version
2. Update `index.html` title
3. Update the app name in `src/components/layout/Layout.jsx`
4. Edit `CLAUDE.md` with your project-specific details
5. Define API calls in `src/services/api.js`
6. Add pages in `src/pages/` and routes in `src/App.jsx`
