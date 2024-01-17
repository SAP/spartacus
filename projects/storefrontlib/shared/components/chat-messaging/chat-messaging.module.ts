/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { AvatarComponent } from './avatar';
import { MessagingComponent } from './messaging';
import { FileUploadModule, FormErrorsModule } from '../form';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    FormErrorsModule,
  ],
  declarations: [AvatarComponent, MessagingComponent],
  exports: [AvatarComponent, MessagingComponent],
})
export class ChatMessagingModule {}
