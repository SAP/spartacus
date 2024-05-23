/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { ItemCounterComponent } from './item-counter.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule, KeyboardFocusModule],
  declarations: [ItemCounterComponent],
  exports: [ItemCounterComponent],
})
export class ItemCounterModule {}
