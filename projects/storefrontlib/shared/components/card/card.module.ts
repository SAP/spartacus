/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { TruncateTextPopoverModule } from '../truncate-text-popover/truncate-text-popover.module';
import { CardComponent } from './card.component';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { AtMessageModule } from '../assistive-technology-message/assistive-technology-message.module';

@NgModule({
  imports: [
    CommonModule,
    AtMessageModule,
    I18nModule,
    IconModule,
    TruncateTextPopoverModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
  ],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
