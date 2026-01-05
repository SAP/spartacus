/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCtaComponentsModule } from '@spartacus/opf/cta/components';
import { OpfCtaCoreModule } from '@spartacus/opf/cta/core';
import { OpfApiCtaModule } from '@spartacus/opf/cta/opf-api';

@NgModule({
  imports: [OpfCtaCoreModule, OpfApiCtaModule, OpfCtaComponentsModule],
})
export class OpfCtaModule {}
