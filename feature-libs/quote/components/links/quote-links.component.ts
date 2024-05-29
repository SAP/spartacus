/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventService, FeatureConfigService } from '@spartacus/core';
import {
  CartUtilsService,
  QuoteDetailsReloadQueryEvent,
} from '@spartacus/quote/core';
import { Quote, QuoteAttachment, QuoteFacade } from '@spartacus/quote/root';
import { FileDownloadService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-quote-links',
  templateUrl: './quote-links.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteLinksComponent {
  protected quoteFacade = inject(QuoteFacade);
  protected cartUtilsService = inject(CartUtilsService);
  protected eventService = inject(EventService);
  protected fileDownloadService = inject(FileDownloadService);
  private featureConfig = inject(FeatureConfigService);

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();

  /**
   * Creates a new cart and navigates according to the 'cart' route.
   */
  goToNewCart(): void {
    //since from now on, the active cart deviates from the quote, we need to mark
    //the quote details for reload. Otherwise a browser back won't always work.
    this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
    this.cartUtilsService.goToNewCart();
  }

  /**
   * Click handler for download button.
   *
   * @param quoteCode - The quote ID (aka code)
   * @param attachments - Array of attachments belonging to the quote. It is expected to contain only 1 entry.
   */
  onDownloadAttachment(quoteCode: string, attachments: QuoteAttachment[]) {
    const attachmentId = attachments[0].id;
    const filename = attachments[0].filename || attachmentId;
    this.quoteFacade
      .downloadAttachment(quoteCode, attachmentId)
      .subscribe((res) => {
        const url = URL.createObjectURL(new Blob([res], { type: res.type }));
        this.fileDownloadService.download(url, `${filename}.pdf`);
      });
  }

  /**
   * Determines if there is any document attached with the quote.
   *
   * @param attachments - an array of attachments to the quote
   * @returns - if the document is present, returns 'true', otherwise 'false'.
   */
  hasAttachment(attachments: QuoteAttachment[]): boolean {
    return attachments?.length > 0;
  }

  /**
   * Determines if the feature for showing the download button is enabled.
   *
   * @returns - if the feature is enabled, returns 'true', otherwise 'false'.
   */
  isShowDownloadProposalButtonFeatureEnabled(): boolean {
    return this.featureConfig.isEnabled('showDownloadProposalButton');
  }
}
