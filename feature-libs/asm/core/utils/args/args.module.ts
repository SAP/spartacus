/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ArgsPipe } from './args.pipe';

@NgModule({
  declarations: [ArgsPipe],
  exports: [ArgsPipe],
})
export class ArgsModule {}
