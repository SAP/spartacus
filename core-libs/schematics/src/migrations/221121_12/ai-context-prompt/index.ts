/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getPrefixedSpartacusSchematicsVersion } from '../../../shared/utils/package-utils';

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
    const skillsVersion = getPrefixedSpartacusSchematicsVersion();
    context.logger.info(
      [
        '',
        'ℹ️  Spartacus offers AI-assistant guidance (Claude / Cursor) via the',
        '   @spartacus/skills package, released alongside this Spartacus version.',
        '   To add it to this project:',
        '',
        `     npm install --save-dev @spartacus/skills@${skillsVersion}`,
        '     ng g @spartacus/schematics:ai-context',
        '',
        '   The schematic copies the spartacus-developer skill into .claude/skills/spartacus-developer/',
        '   and/or .cursor/skills/spartacus-developer/.',
        '',
      ].join('\n')
    );
  };
}
