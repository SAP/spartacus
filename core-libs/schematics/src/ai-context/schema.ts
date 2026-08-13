/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AiTool } from '../add-spartacus/schema';

export interface Schema {
  aiTools?: AiTool[];
  debug?: boolean;
  /** When true, removes existing skill files before copying fresh ones. Used by the update migration. */
  deleteBeforeCopy?: boolean;
}
