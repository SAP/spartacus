/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';

import { MessageComponent } from './message.component';

@NgModule({
    imports: [
    CommonModule,
    I18nModule,
    IconModule,
    FeaturesConfigModule,
    MessageComponent,
],
    exports: [MessageComponent],
})
export class MessageComponentModule {}
