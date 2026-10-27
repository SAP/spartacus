/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { OutletModule } from '../../outlet/outlet.module';
import { PageComponentModule } from '../component/page-component.module';
import { PageSlotComponent } from './page-slot.component';
import { PageSlotService } from './page-slot.service';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(PageSlotService);
    }),
  ],
  imports: [CommonModule, OutletModule, PageComponentModule, PageSlotComponent],
  exports: [PageSlotComponent],
})
export class PageSlotModule {}
