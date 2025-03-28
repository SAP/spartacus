/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxFor } from '@rx-angular/template/for';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import { OutletModule } from '../../outlet/outlet.module';
import { PageLayoutComponent } from './page-layout.component';
import { PageTemplateDirective } from './page-template.directive';
@NgModule({
  // SPIKE NEW - use RxFor to cut tasks
  imports: [CommonModule, OutletModule, PageSlotModule, RxFor],
  declarations: [PageLayoutComponent, PageTemplateDirective],
  exports: [PageLayoutComponent, PageTemplateDirective],
})
export class PageLayoutModule {}
