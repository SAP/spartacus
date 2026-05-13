/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../../misc/icon';
import { KeyboardFocusModule } from '../../../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { AtMessageModule } from '../../../../../shared/components/assistive-technology-message/assistive-technology-message.module';
import { FacetComponent } from './facet.component';
@NgModule({
  imports: [
    AtMessageModule,
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    RouterModule,
    UrlModule,
    FeaturesConfigModule,
    FacetComponent,
  ],
  exports: [FacetComponent],
})
export class FacetModule {}
