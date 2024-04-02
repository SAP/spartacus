/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntityState } from './entity-state';

export function entitySelector<T>(
  state: EntityState<T>,
  id: string
): T | undefined {
  return state.entities[id] || undefined;
}
