/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { EventService, QueryState } from '@spartacus/core';
import {
  Comment,
  Quote,
  QuoteDetailsReloadQueryEvent,
  QuoteFacade,
} from '@spartacus/quote/root';
import {
  ICON_TYPE,
  MessageEvent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-details-vendor-contact',
  templateUrl: './quote-details-vendor-contact.component.html',
})
export class QuoteDetailsVendorContactComponent {
  showVendorContact = true;
  iconTypes = ICON_TYPE;

  quoteDetails$: Observable<QueryState<Quote | undefined>> =
    this.quoteFacade.getQuoteDetails();
  messageEvents$: Observable<Array<MessageEvent>> = this.prepareMessageEvents();

  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();
  constructor(
    protected quoteFacade: QuoteFacade,
    protected eventService: EventService
  ) {}

  onSend(event: { message: string }, code: string) {
    this.quoteFacade
      .addQuoteComment(code, { text: event.message })
      .pipe(take(1))
      .subscribe(() =>
        this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent)
      );
  }

  protected prepareMessagingConfigs(): MessagingConfigs {
    return {
      charactersLimit: 255,
      displayAddMessageSection: of(true),
      dateFormat: 'MMMM d, yyyy h:mm aa',
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
