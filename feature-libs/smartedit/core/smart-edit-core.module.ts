/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { smartEditDecorators } from './decorators/index';

@NgModule({
  providers: [...smartEditDecorators],
})
export class SmartEditCoreModule {}
