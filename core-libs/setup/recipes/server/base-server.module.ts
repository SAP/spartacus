/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ServerErrorModule } from './server-error/server-error.module';

// SPIKE TODO: move everything related to this module to a different package than /recipes
@NgModule({
  imports: [ServerErrorModule],
})
export class BaseServerModule {}
