/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OpfCtaComponentsModule } from './components/opf-cta-components.module';
import { OpfCtaConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [OpfCtaComponentsModule],
  providers: [...facadeProviders, OpfCtaConnector],
})
export class OpfCtaCoreModule {}
