/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { EventService } from '@spartacus/core';
import { QuoteFacade } from '@spartacus/quote/root';
import {
  ICON_TYPE,
  MessageEvent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/operators';
import { Comment } from '@spartacus/quote/root';

@Component({
  selector: 'cx-quote-details-vendor-contact',
  templateUrl: './quote-details-vendor-contact.component.html',
})
export class QuoteDetailsVendorContactComponent {
  quoteDetails$ = this.quoteFacade.getQuoteDetails();
  showVendorContact = true;
  iconTypes = ICON_TYPE;

  messageEvents$: Observable<Array<MessageEvent>> = this.prepareMessageEvents();
  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();
  constructor(
    protected quoteFacade: QuoteFacade,
    protected eventService: EventService
  ) {}
  onSend() {
    //TODO CHHI signature is event: { message: string }
  }

  protected prepareMessagingConfigs(): MessagingConfigs {
    return {
      charactersLimit: 255,
      displayAddMessageSection: of(true),
      dateFormat: 'medium',
    };
  }

  protected prepareMessageEvents(): Observable<MessageEvent[]> {
    return this.quoteDetails$.pipe(
      map((quote) => {
        const messageEvents: MessageEvent[] = [];
        quote.data?.comments.forEach((comment) =>
          messageEvents.push(this.mapCommentToMessageEvent(comment))
        );
        return messageEvents;
      })
    );
  }

  protected mapCommentToMessageEvent(comment: Comment): MessageEvent {
    const messages: MessageEvent = {
      author: comment.author?.name,
      text: comment.text,
      createdAt: comment.creationDate?.toString(),
      rightAlign: !comment.fromCustomer,
    };
    return messages;
  }
}
