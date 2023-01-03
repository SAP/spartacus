/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdcComponentsModule } from '@spartacus/cdc/components';
import { CdcCoreModule } from '@spartacus/cdc/core';

@NgModule({
  imports: [CdcComponentsModule, CdcCoreModule],
})
export class CdcModule {}
