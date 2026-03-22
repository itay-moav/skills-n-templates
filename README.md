# Skills & Templates

A collection of Claude Code agents, skills, and templates to kickstart new projects.

## Installation

### Option 1: Clone and copy (recommended)

Clone the repo and copy the files you need into your project:

```bash
git clone <repo-url>
cd skills-n-templates
```

#### Installing agents into Claude Code

1. In your target project, create the agents directory if it doesn't exist:
   ```bash
   mkdir -p /path/to/project/.claude/agents
   ```
2. Copy the agent file(s) you want:
   ```bash
   cp agents/python-library-inspector.md /path/to/project/.claude/agents/
   ```
3. The agent is now available. Claude Code automatically detects agents in `.claude/agents/` — no restart or configuration needed.

#### Installing agents into other coding agents

Most AI coding agents that support custom instructions can use these agents as reference prompts:

1. Open the agent `.md` file and copy the content **below** the YAML frontmatter (`---` block).
2. Paste it into your coding agent's custom instructions, system prompt, or rules file.
3. The YAML frontmatter (`name`, `description`, `tools`, `model`, `color`) is Claude Code-specific metadata and can be ignored for other agents.

#### Installing skills into Claude Code

1. Create the skills directory if it doesn't exist:
   ```bash
   mkdir -p /path/to/project/.claude/skills
   ```
2. Copy the skill file(s):
   ```bash
   cp skills/<skill-name>.md /path/to/project/.claude/skills/
   ```

### Option 2: Sparse checkout (download only what you need)

If you don't want to clone the entire repo:

```bash
git clone --no-checkout --filter=blob:none <repo-url>
cd skills-n-templates

# Download only the agents directory
git sparse-checkout set agents
git checkout

# Add more later
git sparse-checkout add skills templates/<template-name>
```

Then follow the copy steps from Option 1.

## Structure

```
agents/           # Claude Code subagents (.md with YAML frontmatter)
skills/           # Claude Code skills (.md with YAML frontmatter)
templates/        # Full project starters
recipes/          # Setup guides combining templates + agents + skills
hook-packs/       # Claude Code hook scripts (sound alerts, linters, etc.)
```

- **Agents** and **skills** follow the Claude Code standard — copy them directly into `.claude/agents/` or `.claude/skills/`.
- **Templates** are full project starters with their own README and files.
- **Recipes** recommend which pieces to combine for a given project type, with step-by-step setup.
- **Hook packs** are shell scripts that plug into Claude Code's [hooks system](https://docs.anthropic.com/en/docs/claude-code/hooks) via `.claude/settings.json`.

## Available Agents

| Agent | Description |
|-------|-------------|
| **python-library-inspector** | Inspects installed Python packages in `.venv/` for accurate, version-specific API details |
| **php-library-inspector** | Inspects installed Composer packages in `vendor/` for accurate, version-specific API details |
| **npm-library-inspector** | Inspects installed npm packages and type definitions in `node_modules/` for accurate, version-specific API details |
| **rust-library-inspector** | Inspects installed Rust crate sources in Cargo's registry cache for accurate, version-specific API details |
| **frontend-master** | Delegated frontend development agent. Handles components, styling, API integration, testing. Tech-agnostic — discovers the stack from CLAUDE.md |

All library inspector agents enforce reading actual source code instead of relying on training data or memory, which may be outdated.

## Available Skills

_None yet._

## Available Templates

| Template | Description |
|----------|-------------|
| **react-vite-shadcn** | React 19 + Vite 6 + Tailwind CSS 4 + ShadCN UI starter with service layer, logging, and testing setup |

## Recipes

Recipes recommend which template + agents + skills to combine for a specific project type.

| Recipe | Template | Agents | Description |
|--------|----------|--------|-------------|
| **react-spa-with-api** | react-vite-shadcn | frontend-master, npm-library-inspector | Full-stack React SPA with backend API integration |

## Hook Packs

Hook packs add automated behaviors to Claude Code via the [hooks system](https://docs.anthropic.com/en/docs/claude-code/hooks). Each pack includes a README with installation instructions and the hook script(s) to copy into your project.

| Hook Pack | Description |
|-----------|-------------|
| **sound-alerts** | Plays system sounds when Claude needs input or finishes a task (macOS/Linux) |
| **frontend-lint** | Runs ESLint, Prettier, and frontend tests on changed files when Claude finishes a turn |
| **backend-lint** | Runs Black, isort, and flake8 on changed Python files when Claude finishes a turn |

#### Installing hook packs

1. Copy the hook script into your project:
   ```bash
   mkdir -p /path/to/project/hooks
   cp hook-packs/frontend-lint/frontend-lint.sh /path/to/project/hooks/
   chmod +x /path/to/project/hooks/frontend-lint.sh
   ```
2. Add the hook entry to `.claude/settings.json` as described in the pack's README.

## License

See [LICENSE](LICENSE).
