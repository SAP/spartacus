/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ListModel } from '../../model/misc.model';
import { EntityLoaderState } from './entity-loader/entity-loader-state';

export interface EntityListState<Type> {
  list: EntityLoaderState<ListModel>;
  entities: EntityLoaderState<Type>;
}
