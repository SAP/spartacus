/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfBaseComponentsModule } from '@spartacus/opf/base/components';
import { OpfBaseCoreModule } from '@spartacus/opf/base/core';
import { OpfApiBaseModule } from '@spartacus/opf/base/opf-api';

@NgModule({
  imports: [OpfApiBaseModule, OpfBaseCoreModule, OpfBaseComponentsModule],
})
export class OpfBaseModule {}
