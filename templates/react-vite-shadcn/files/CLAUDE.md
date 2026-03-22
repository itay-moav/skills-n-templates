# CLAUDE.md

This file provides guidance to Claude Code when working with this project.

## Tech Stack

- **Framework**: React 19 with Vite 6
- **Styling**: Tailwind CSS 4 with ShadCN UI (New York style, neutral theme)
- **Routing**: React Router DOM 7
- **HTTP**: Axios with centralized interceptors
- **Icons**: Lucide React
- **Toasts**: Sonner
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

## UI Component Priority: Always Use ShadCN First

**CRITICAL**: When building or modifying UI, ALWAYS check if a ShadCN component exists before writing custom HTML.

1. Check `src/components/ui/` for existing components
2. If not installed yet: `npx shadcn@latest add [component]`
3. Extend with `className` prop using `cn()` for class merging
4. Create custom CVA variants in separate `.variants.js` files

### Always use ShadCN for:
- Buttons (`<Button>` not `<button>`)
- Inputs (`<Input>` not `<input>`)
- Selects (`<Select>` not `<select>`)
- Dialogs, Cards, Labels, Badges, Separators

### Class merging pattern:
```jsx
import { cn } from '@/lib/utils';
<Button className={cn("custom-class", condition && "active")}>Click</Button>
```

## Import Convention

**ALWAYS** use the `@/` alias for imports:
```jsx
import { Button } from '@/components/ui/button';
import http from '@/services/http';
```
Never use relative paths like `../../`. The `@/` alias points to `src/`.

## Project Structure

```
src/
  components/
    ui/             # ShadCN components (do not edit directly unless extending)
    layout/         # Layout wrapper with top bar
  services/
    http.js         # Axios client - use setAuthHeader() for auth, setErrorHandler() for error handling
    api.js          # Define all API calls here
    log.js          # Logging service (debug/info/warning/error/fatal)
  utilities/
    config.js       # Environment variables from Vite
  pages/            # Route page components
  lib/
    utils.js        # cn() utility for class merging
```

## Development Commands

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - ESLint check
- `npm run format` - Prettier formatting
- `npm run test:run` - Run all tests once
- `npm run test` - Tests in watch mode
- `npx shadcn@latest add [component]` - Add ShadCN components

## Service Patterns

### HTTP service (`services/http.js`)
- `setAppApiRootUrl(url)` - Set API base URL (called in main.jsx)
- `setAuthHeader(headerName, value)` - Set auth header for all requests
- `setErrorHandler(httpCode, handler)` - Register global error handler
- `fastApiWrapper(response, callback)` - Validate response status
- `responsePromiseChainHandler(promise, success, error, finally)` - Promise chain helper

### Logging (`services/log.js`)
- Levels: DEBUG (0), INFO (1), WARNING (2), ERROR (3), FATAL (4)
- Usage: `log.debug('message', data)`, `log.error('message', error)`
- Configure in `.env.local`: `VITE_APP_LOG_LEVEL=0` for debug

## Testing

- Framework: Vitest with JSDOM environment
- Test files: `*.test.jsx` in `__tests__/` directories or alongside components
- Use `@testing-library/react` for rendering and queries
- Use `@testing-library/user-event` for interactions
- Mock with `vi.mock()` and `vi.fn()`
