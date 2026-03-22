---
name: react-spa-with-api
description: Full-stack setup for a React SPA that communicates with a backend API.
template: react-vite-shadcn
agents:
  - frontend-master
  - npm-library-inspector
skills: []
---

# React SPA with Backend API

A complete development environment for building a React single-page application that communicates with a backend API.

## What You Get

| Item | Type | Purpose |
|------|------|---------|
| react-vite-shadcn | Template | Project scaffolding with React 19, Vite 6, Tailwind 4, ShadCN UI |
| frontend-master | Agent | Delegated frontend development (components, styling, API integration) |
| npm-library-inspector | Agent | Inspects actual installed package source code for accurate API details |

## Setup

### 1. Create your project from the template

```bash
cp -r templates/react-vite-shadcn/files/ /path/to/my-project/
cd /path/to/my-project
npm install
```

### 2. Install the agents

```bash
mkdir -p .claude/agents
cp agents/frontend-master.md .claude/agents/
cp agents/npm-library-inspector.md .claude/agents/
```

### 3. Configure your environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your API endpoint
```

### 4. Customize

- Edit `package.json` with your project name
- Edit `CLAUDE.md` with your project-specific details
- Update `index.html` title
- Define API calls in `src/services/api.js`

## How They Work Together

- **frontend-master** reads your project's `CLAUDE.md` to learn the stack, then handles all frontend development tasks. It reports API contracts back so you can coordinate with backend.
- **npm-library-inspector** is used by you (or frontend-master) to check actual installed package APIs instead of relying on potentially outdated training data.
- The **template** provides the scaffolding that frontend-master builds on: component library, service layer, testing setup.

## Extending

- Add more ShadCN components: `npx shadcn@latest add [component]`
- Add **python-library-inspector** or **php-library-inspector** if your backend uses those languages
- Add state management (Redux, Zustand, etc.) as needed — frontend-master adapts to whatever you install
