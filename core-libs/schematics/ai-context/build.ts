/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateAgents } from './generators/agents';
import { generateClaude } from './generators/claude';
import { generateCursor } from './generators/cursor';

generateClaude();
generateAgents();
generateCursor();

console.log(
  'AI context outputs regenerated under src/add-spartacus/files/ai-context/'
);
