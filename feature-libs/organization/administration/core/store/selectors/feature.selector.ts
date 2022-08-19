/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  ORGANIZATION_FEATURE,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';

export const getOrganizationState: MemoizedSelector<
  StateWithOrganization,
  OrganizationState
> = createFeatureSelector<OrganizationState>(ORGANIZATION_FEATURE);
