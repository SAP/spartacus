/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { NgSelectA11yDirective } from './ng-select-a11y.directive';

@NgModule({
  declarations: [NgSelectA11yDirective],
  exports: [NgSelectA11yDirective],
})
export class NgSelectA11yModule {}
