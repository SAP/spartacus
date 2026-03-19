---
name: schematics
description: "Use this skill when working with Spartacus schematics - Angular schematics for installing, configuring, and migrating Spartacus libraries. Trigger when the user mentions writing, debugging, or testing schematics, works with migration scripts or constructor/component deprecations, creates feature schematics configuration, adds new library installation schematics, tests schematics with verdaccio, or updates migrations.json or deprecation data files. Even if the user just mentions 'schematics', 'ng add', or 'ng update' in the context of Spartacus development, load this skill."
---

# Spartacus Schematics Development

This skill covers developing and testing Angular schematics for Spartacus library installation and migration.

## Directory Structure

| Path | Purpose |
|------|---------|
| `projects/schematics/` | Main installation and migration schematics |
| `projects/schematics/src/migrations/` | Version-specific migration scripts |
| `projects/schematics/src/shared/` | Shared utilities |
| `projects/schematics/src/shared/lib-configs/` | Feature schematics configurations |
| `<lib>/schematics/` | Feature-specific installation schematics in each library |

## Testing Commands

```bash
# Core Schematics lib
cd projects/schematics && npm run test


# All libs' schematics
npm run test:all-schematics

# Single library schematics (Jest)
nx run <library-name>:test-jest

# Specific test file
nx run <library-name>:test-jest --testPathPatterns="<spec-filename>"
```

**Technical note**: During `build`/`test`, `feature-toggles.ts` is copied from `@spartacus/core` to `src/feature-toggles.copied-from-core-lib.ts` (git-ignored). This avoids direct dependency on `@spartacus/core`.
