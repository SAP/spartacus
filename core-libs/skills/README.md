# @spartacus/skills

AI **Agent Skills** for building custom [SAP Spartacus](https://github.com/SAP/spartacus)
storefront applications. The package ships two skills: `spartacus-developer`
for Spartacus-specific development patterns and `spartacus-major-upgrade`
for reviewing and completing the Angular 21 to 22 / Spartacus 221121.24 customer
migration. The upgrade skill covers dependency peers, schematic review, custom
subclasses, removed APIs, EPD retirement, SSR, tests and runtime validation.

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
the skills into the locations your tools expect.

### Recommended: the schematic

If `@spartacus/schematics` is installed, let it place the files for you:

```bash
ng generate @spartacus/schematics:ai-context
# or target specific tools (repeat the flag once per tool):
ng generate @spartacus/schematics:ai-context --ai-tools=claude --ai-tools=agents
```

This is also offered as a prompt during `ng add @spartacus/schematics`.

During an interactive upgrade, the `add-or-update-ai-skills` migration also offers
installation or refresh. Non-interactive upgrades refresh guidance for tools
already installed; otherwise they print the manual-install instructions. The
schematic copies both shipped skills and preserves unrelated customer
instructions. An LLM without skill discovery can read the copied upgrade
`SKILL.md` and its relative reference directly.

### Manual copy

If you don't use the schematic, copy the skill folder yourself:

```bash
# Claude Code
mkdir -p .claude/skills
cp -r node_modules/@spartacus/skills/skills/spartacus-developer .claude/skills/
cp -r node_modules/@spartacus/skills/skills/spartacus-major-upgrade .claude/skills/

# Other agents (cross-tool location read by Codex, Gemini CLI, and others)
mkdir -p .agents/skills
cp -r node_modules/@spartacus/skills/skills/spartacus-developer .agents/skills/
cp -r node_modules/@spartacus/skills/skills/spartacus-major-upgrade .agents/skills/
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
skills/spartacus-major-upgrade/
  SKILL.md             # dedicated customer upgrade workflow
  references/
    angular-22.md      # automatic/manual migration and validation reference
```

## Maintaining the skill (for maintainers)

`@spartacus/skills` is versioned in lockstep with the framework — `npm run
config:update` sets its `version` to the current `PUBLISHING_VERSION`, same as
every other library.
 
