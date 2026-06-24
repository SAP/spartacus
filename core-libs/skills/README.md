# @spartacus/skills

AI **Agent Skills** for building custom [SAP Spartacus](https://github.com/SAP/spartacus)
storefront applications. The package ships a single skill, `spartacus-developer`,
that captures the Spartacus-specific rules an AI assistant should follow when
generating or changing storefront code (backend communication, CMS wiring,
routing, configuration, state, i18n, styling, SSR, and more).

> **For AI agents:** do **not** read these skills directly from
> `node_modules/@spartacus/skills`. They are the distributable source, not the
> active copy. Use the copy placed in your project root (e.g.
> `.claude/skills/spartacus-developer/` or `.agents/skills/spartacus-developer/`).
> If no such copy exists yet, ask the developer to run the install step below.

## Scope

This guidance is for **building a custom Spartacus storefront** (consumer
codebases). It is **not** guidance for developing the Spartacus framework
itself.

## Install

```bash
npm install --save-dev @spartacus/skills
```

## Copy the skill into your project

AI assistants discover skills from your project, not from `node_modules`. Copy
the skill into the locations your tools expect.

### Recommended: the schematic

If `@spartacus/schematics` is installed, let it place the files for you:

```bash
ng generate @spartacus/schematics:ai-context
# or target specific tools (repeat the flag once per tool):
ng generate @spartacus/schematics:ai-context --ai-tools=claude --ai-tools=agents
```

This is also offered as a prompt during `ng add @spartacus/schematics`.

### Manual copy

If you don't use the schematic, copy the skill folder yourself:

```bash
# Claude Code
mkdir -p .claude/skills
cp -r node_modules/@spartacus/skills/skills/spartacus-developer .claude/skills/

# Other agents (cross-tool location read by Codex, Gemini CLI, and others)
mkdir -p .agents/skills
cp -r node_modules/@spartacus/skills/skills/spartacus-developer .agents/skills/
```

## Keeping it up to date

After updating the package (`npm update @spartacus/skills`), re-run the copy step
above so your project reflects the latest guidance.

## What's inside

```
skills/spartacus-developer/
  SKILL.md             # entry point with frontmatter (auto-discovered by agents)
  references/
    <topic>.md         # one file per topic, linked from SKILL.md
    ...                # plus deep-dive material linked from the topic files
```

## Maintaining the skill (for maintainers)

`@spartacus/skills` is versioned in lockstep with the framework — `npm run
config:update` sets its `version` to the current `PUBLISHING_VERSION`, same as
every other library.
 
