/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingComponent } from './messaging.component';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from '../avatar/avatar.module';
import { FileUploadModule, FormErrorsModule } from '../../form/index';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    FileUploadModule,
    FormErrorsModule,
  ],
  declarations: [MessagingComponent],
  exports: [MessagingComponent],
})
export class MessagingModule {}
