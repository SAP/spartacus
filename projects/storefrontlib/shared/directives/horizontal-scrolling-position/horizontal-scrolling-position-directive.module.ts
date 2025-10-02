/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { HorizontalScrollingPositionDirective } from './horizontal-scrolling-position.directive';

@NgModule({
  imports: [HorizontalScrollingPositionDirective],
  exports: [HorizontalScrollingPositionDirective],
})
export class HorizontalScrollingPositionDirectiveModule {}
