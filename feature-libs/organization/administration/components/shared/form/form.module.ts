/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';



import { MessageService } from '../message/services/message.service';
import { FormComponent } from './form.component';
import { KeyboardFocusModule } from '@spartacus/storefront';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    I18nModule,
    RouterModule,
    KeyboardFocusModule,
    FormComponent,
],
    providers: [MessageService],
    exports: [FormComponent],
})
export class FormModule {}
