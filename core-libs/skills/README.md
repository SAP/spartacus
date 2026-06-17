# @spartacus/skills

AI **Agent Skills** for building custom [SAP Spartacus](https://github.com/SAP/spartacus)
storefront applications. The package ships a single skill, `spartacus-developer`,
that captures the Spartacus-specific rules an AI assistant should follow when
generating or changing storefront code (backend communication, CMS wiring,
routing, configuration, state, i18n, styling, SSR, and more).

> **For AI agents:** do **not** read these skills directly from
> `node_modules/@spartacus/skills`. They are the distributable source, not the
> active copy. Use the copy placed in your project root (e.g.
> `.claude/skills/spartacus-developer/` or `.cursor/skills/spartacus-developer/`).
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
ng generate @spartacus/schematics:ai-context --ai-tools=claude --ai-tools=cursor
```

This is also offered as a prompt during `ng add @spartacus/schematics`.

### Manual copy

If you don't use the schematic, copy the skill folder yourself:

```bash
# Claude Code
mkdir -p .claude/skills
cp -r node_modules/@spartacus/skills/skills/spartacus-developer .claude/skills/

# Cursor
mkdir -p .cursor/skills
cp -r node_modules/@spartacus/skills/skills/spartacus-developer .cursor/skills/
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

## Versioning (for maintainers)

- **Spartacus version floor** — the `compatibility` field in `SKILL.md` declares
  the baseline Spartacus line all current guidance assumes.
- **Skill content revision** — `metadata.version` in `SKILL.md` is an internal
  marker for the guidance content itself (not the npm version). Bump it when the
  guidance changes meaningfully.

For guidance that applies only to a Spartacus release **newer than the floor**,
annotate the specific section or line in place using a
greppable marker that references a Spartacus version:

```markdown
### Lazy-loaded translations via i18n.backend.loader

> Since: 2211.30

...
```

```markdown
> Deprecated: 2211.25 — use `provideConfigFactory` instead.
```

`SKILL.md`'s "Version awareness" section tells the agent to read the project's
`@spartacus/core` version and honor these markers. Everything unmarked applies to
the whole `compatibility` range, so the initial release carries no `Since:`
markers — the first one is added only when guidance for a newer feature lands.
