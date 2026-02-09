/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OpfTokenisationComponentsModule } from './components/opf-tokenisation-components.module';
import { OpfTokenisationCoreModule } from './core/opf-tokenisation-core.module';

@NgModule({
  imports: [OpfTokenisationComponentsModule, OpfTokenisationCoreModule],
})
export class OpfTokenisationModule {}
