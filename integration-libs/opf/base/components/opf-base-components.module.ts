/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCtaElementModule } from './opf-cta/opf-cta-element';
import { OpfCtaScriptsModule } from './opf-cta/opf-cta-scripts';
import { OpfErrorModalModule } from './opf-error-modal/opf-error-modal.module';

@NgModule({
  imports: [OpfErrorModalModule, OpfCtaScriptsModule, OpfCtaElementModule],
  providers: [],
})
export class OpfBaseComponentsModule {}
