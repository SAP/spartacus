/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import { I18nModule } from '@spartacus/core';
import { StarRatingModule } from '@spartacus/storefront';
import { AsmCustomerPromotionListingComponent } from './asm-customer-promotion-listing.component';
import { MessageComponentModule } from "../../../../../projects/storefrontlib/cms-components/misc/message/message.module";

@NgModule({
    declarations: [AsmCustomerPromotionListingComponent],
    exports: [AsmCustomerPromotionListingComponent],
    imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule, MessageComponentModule]
})
export class AsmCustomerPromotionListingModule {}
