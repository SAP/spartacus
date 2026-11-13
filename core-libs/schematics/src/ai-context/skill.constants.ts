/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AiTool } from '../add-spartacus/schema';

export const SPARTACUS_SKILL_NAMES = [
  'spartacus-developer',
  'spartacus-major-upgrade',
] as const;

export const AI_SKILLS_DESTINATIONS: Record<AiTool, string> = {
  claude: '.claude/skills',
  agents: '.agents/skills',
};
