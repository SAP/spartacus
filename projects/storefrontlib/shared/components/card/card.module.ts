/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { AtMessageModule } from '../assistive-technology-message/assistive-technology-message.module';
import { TruncateTextPopoverModule } from '../truncate-text-popover/truncate-text-popover.module';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    CommonModule,
    AtMessageModule,
    I18nModule,
    IconModule,
    TruncateTextPopoverModule,
    KeyboardFocusModule,
    FeaturesConfigModule,
  ],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
