/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CxRovingTabindexDirective } from './roving-tabindex.directive';

@NgModule({
  imports: [CxRovingTabindexDirective],
  exports: [CxRovingTabindexDirective],
})
export class CxRovingTabindexDirectiveModule {}
