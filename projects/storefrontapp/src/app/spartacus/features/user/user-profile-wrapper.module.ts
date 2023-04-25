/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { UserProfileModule } from '@spartacus/user/profile';

const extensions: Type<any>[] = [];

@NgModule({
  imports: [UserProfileModule, ...extensions],
})
export class UserProfileWrapperModule {}
