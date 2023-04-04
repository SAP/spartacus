/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { UserAccountModule } from '@spartacus/user/account';

const extensions: Type<any>[] = [];

@NgModule({
  imports: [UserAccountModule, ...extensions],
})
export class UserAccountWrapperModule {}
