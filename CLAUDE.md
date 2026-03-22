# Skills & Templates Repository

## Project Structure

This repo uses a flat directory structure designed for **git sparse checkout**, allowing users to selectively download only the skills or templates they need without cloning the entire repository.

```
agents/
  <agent-name>.md       # Claude Code subagent (.md with YAML frontmatter)
skills/
  <skill-name>.md       # Claude Code skill (.md with YAML frontmatter)
templates/
  <template-name>/
    README.md            # What it does, how to use it
    CLAUDE.md            # Agent instructions (optional)
    files/               # The actual project files
```

### Key conventions

- **Agents** and **skills** are `.md` files with YAML frontmatter, following the Claude Code standard. Users copy them directly into their project's `.claude/agents/` or `.claude/skills/` directory.
- **Templates** are full project starters in subdirectories with their own README and files.

### User install flow

Users grab items via git sparse checkout, then copy into their project:

```bash
git clone --no-checkout --filter=blob:none <repo-url>
cd skills-n-templates
git sparse-checkout set agents
git checkout

# Copy an agent into your project
cp agents/python-library-inspector.md /path/to/project/.claude/agents/
```

## Maintenance Rules

### README.md must stay in sync

**Every time** you make changes to this repo — whether adding a new skill/template, changing the directory structure, updating the approach, or modifying conventions — you MUST update the root `README.md` to reflect those changes. This includes:

- Adding new agents/skills/templates to the listing in README.md
- Updating usage instructions if the checkout flow changes
- Reflecting any structural changes or new conventions
- Keeping the descriptions accurate and current

The README.md is the public-facing documentation. It must always match the actual state of the repo.
