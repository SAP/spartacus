/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { QuoteFacade } from 'feature-libs/quote/root/public_api';
import { EventService } from '@spartacus/core';
import { ICON_TYPE, MessagingConfigs } from '@spartacus/storefront';

@Component({
  selector: 'cx-quote-details-vendor-contact',
  templateUrl: './quote-details-vendor-contact.component.html',
})
export class QuoteDetailsVendorContactComponent {
  quoteDetails$ = this.quoteFacade.getQuoteDetails();
  showVendorContact = true;
  iconTypes = ICON_TYPE;
  vendorplaceHolder: string = 'Vendor Contact Component';

  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();
  constructor(
    protected quoteFacade: QuoteFacade,
    protected eventService: EventService
  ) {}
  onSend(event: { message: string }) {
    console.log('message :>> ', event.message);
  }
  protected prepareMessagingConfigs(): MessagingConfigs {
    return {
      charactersLimit: 20,
    };
  }
}
