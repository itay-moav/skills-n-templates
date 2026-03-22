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
```

- **Agents** and **skills** follow the Claude Code standard — copy them directly into `.claude/agents/` or `.claude/skills/`.
- **Templates** are full project starters with their own README and files.

## Available Agents

| Agent | Description |
|-------|-------------|
| **python-library-inspector** | Inspects installed Python packages in `.venv/` for accurate, version-specific API details |
| **php-library-inspector** | Inspects installed Composer packages in `vendor/` for accurate, version-specific API details |
| **npm-library-inspector** | Inspects installed npm packages and type definitions in `node_modules/` for accurate, version-specific API details |

All library inspector agents enforce reading actual source code instead of relying on training data or memory, which may be outdated.

## Available Skills

_None yet._

## Available Templates

_None yet._

## License

See [LICENSE](LICENSE).
