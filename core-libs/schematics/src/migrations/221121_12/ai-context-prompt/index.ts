/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

/**
 * Surfaces the new `ai-context` standalone schematic to existing
 * customers during `ng update`.
 *
 * Why a notice instead of an automatic write:
 * AI-tooling preferences are personal; we shouldn't push files into
 * customer repos uninvited. The notice tells customers about the
 * dedicated retrofit command — they opt in by running it.
 */
export function migrate(): Rule {
  return (_tree: Tree, context: SchematicContext): void => {
    context.logger.info(
      [
        '',
        'ℹ️  Spartacus 2211.21.12 ships AI-assistant guidance (Claude / Cursor / AGENTS.md).',
        '   To add it to this project, run:',
        '',
        '     ng g @spartacus/schematics:ai-context',
        '',
        '   The schematic writes namespaced guidance to .spartacus/, .claude/skills/spartacus/,',
        '   and .cursor/skills/spartacus/ — your existing CLAUDE.md / AGENTS.md are preserved',
        '   (a small sentinel-wrapped @-import block is appended).',
        '',
      ].join('\n')
    );
  };
}
