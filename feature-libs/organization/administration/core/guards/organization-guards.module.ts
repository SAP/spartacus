/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AdminGuard } from './admin.guard';
import { OrgUnitGuard } from './org-unit.guard';
import { UserGuard } from './user.guard';

@NgModule({
  // To ensure effective over-providing from within the child injector of a lazy-loaded module
  // by other extension libraries or end-user customizations, it's essential to provide guards manually
  // in the child injector and not in the root injector (providedIn: 'root').
  //
  // If guards were provided in the root injector, the only place to over-provide them or their dependencies
  // would be the root injector (root module), which would break lazy loading for those guards and their dependencies.
  providers: [AdminGuard, UserGuard, OrgUnitGuard],
})
export class OrganizationsGuardsModule {}
