/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCtaElementModule } from './opf-cta-element';
import { OpfCtaScriptsModule } from './opf-cta-scripts';

@NgModule({
  imports: [OpfCtaScriptsModule, OpfCtaElementModule],
  providers: [],
})
export class OpfCtaComponentsModule {}
