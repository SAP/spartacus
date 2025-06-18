/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CardModule } from '../card/card.module';
import { ItemActiveModule } from '../item-active.module';
import { MessageModule } from '../message/message.module';
import { FormComponent } from './form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    I18nModule,
    RouterModule,
    CardModule,
    MessageModule,
    ItemActiveModule,
    KeyboardFocusModule,
  ],
  declarations: [FormComponent],
  exports: [FormComponent],
})
export class FormModule {}
