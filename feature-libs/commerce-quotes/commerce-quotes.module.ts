/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommerceQuotesComponentsModule } from '@spartacus/commerce-quotes/components';
import { CommerceQuotesCoreModule } from '@spartacus/commerce-quotes/core';
import { CommerceQuotesOccModule } from '@spartacus/commerce-quotes/occ';

@NgModule({
  imports: [
    CommerceQuotesComponentsModule,
    CommerceQuotesCoreModule,
    CommerceQuotesOccModule,
  ],
})
export class CommerceQuotesModule {}
