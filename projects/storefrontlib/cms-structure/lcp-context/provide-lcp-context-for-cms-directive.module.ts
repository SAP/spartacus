/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProvideLcpContextForCmsDirective } from './provide-lcp-context-for-cms.directive';

@NgModule({
  declarations: [ProvideLcpContextForCmsDirective],
  exports: [ProvideLcpContextForCmsDirective],
})
export class ProvideLcpContextForCmsDirectiveModule {}
