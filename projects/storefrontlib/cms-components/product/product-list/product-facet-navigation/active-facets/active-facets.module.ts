/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '../../../../../cms-components/misc/icon/icon.module';
import { KeyboardFocusModule } from '../../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { ActiveFacetsComponent } from './active-facets.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    // TODO:(CXSPA-1695) #deprecation for next major release remove below feature config
    FeaturesConfigModule,
  ],
  declarations: [ActiveFacetsComponent],
  exports: [ActiveFacetsComponent],
})
export class ActiveFacetsModule {}
