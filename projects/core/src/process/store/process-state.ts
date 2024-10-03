/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntityLoaderState } from '../../state/utils/entity-loader/entity-loader-state';

export const PROCESS_FEATURE = 'process';

export interface StateWithProcess<T> {
  [PROCESS_FEATURE]: EntityLoaderState<T>;
}
