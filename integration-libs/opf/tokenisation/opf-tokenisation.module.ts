/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OpfTokenisationComponentsModule } from '@spartacus/opf/tokenisation/components';
import { OpfTokenisationCoreModule } from '@spartacus/opf/tokenisation/core';
import { OpfTokenisationRootModule } from '@spartacus/opf/tokenisation/root';

@NgModule({
  imports: [
    OpfTokenisationComponentsModule,
    OpfTokenisationCoreModule,
    OpfTokenisationRootModule,
  ],
})
export class OpfTokenisationModule {}
