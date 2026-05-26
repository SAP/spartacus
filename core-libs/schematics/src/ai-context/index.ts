/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule } from '@angular-devkit/schematics';
import { addAiContext } from '../add-spartacus/ai-context';
import { Schema } from './schema';

/**
 * Standalone schematic that retrofits AI-assistant guidance onto an
 * existing Spartacus-installed project without re-running the full
 * `ng add @spartacus/schematics` flow.
 *
 * Usage:
 *   ng g @spartacus/schematics:ai-context
 *   ng g @spartacus/schematics:ai-context --ai-tools=claude --ai-tools=cursor
 *
 * Note: Angular CLI auto-kebab-cases camelCase schema props (aiTools →
 * ai-tools) and refuses comma-separated values for array flags — repeat
 * the flag once per value.
 */
export function addAiContextSchematic(options: Schema): Rule {
  return addAiContext({
    project: '',
    lazy: true,
    features: [],
    aiTools: options.aiTools,
    debug: options.debug,
  });
}
