/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';




import { UserFormModule } from './form/user-form.module';


import { userCmsConfig, userTableConfigFactory } from './user.config';
@NgModule({
  imports: [
    UserFormModule,
],
  providers: [
    provideDefaultConfig(userCmsConfig),
    provideDefaultConfigFactory(userTableConfigFactory),
  ],
})
export class UserComponentsModule {}
