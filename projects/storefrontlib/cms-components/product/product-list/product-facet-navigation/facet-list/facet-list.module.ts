/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '../../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { IconModule } from '../../../../misc/icon/icon.module';
import { FacetModule } from '../facet/facet.module';
import { FacetListComponent } from './facet-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    FacetModule,
    KeyboardFocusModule,
    FeaturesConfigModule,
  ],
  declarations: [FacetListComponent],
  exports: [FacetListComponent],
})
export class FacetListModule {}
