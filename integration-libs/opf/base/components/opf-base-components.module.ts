/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCtaScriptsModule } from './opf-cta/opf-cta-scripts/opf-cta-scripts.module';
import { OpfErrorModalModule } from './opf-error-modal/opf-error-modal.module';

@NgModule({
  imports: [OpfErrorModalModule, OpfCtaScriptsModule],
  providers: [],
})
export class OpfBaseComponentsModule {}
