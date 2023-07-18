/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ViewChild } from '@angular/core';
import { EventService, TranslationService } from '@spartacus/core';
import {
  Comment,
  QuoteDetailsReloadQueryEvent,
  QuoteFacade
} from '@spartacus/quote/root';
import {
  ICON_TYPE,
  MessageEvent,
  MessagingComponent,
  MessagingConfigs
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { QuoteUIConfig } from '../../config';

@Component({
  selector: 'cx-quote-details-comment',
  templateUrl: './quote-details-comment.component.html',
})
export class QuoteDetailsCommentComponent {
  @ViewChild(MessagingComponent) commentsComponent: MessagingComponent;

  showComments = true;
  iconTypes = ICON_TYPE;

  quoteDetails$ = this.quoteFacade.getQuoteDetails();
  messageEvents$: Observable<Array<MessageEvent>> = this.prepareMessageEvents();

  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();
  constructor(
    protected quoteFacade: QuoteFacade,
    protected eventService: EventService,
    protected translationService: TranslationService,
    protected quoteUiConfig: QuoteUIConfig,
  ) {}

  onSend(event: { message: string }, code: string) {
    this.quoteFacade
      .addQuoteComment(code, { text: event.message })
      .pipe(
        take(1),
        // do for error and success
        finalize(() => this.commentsComponent.resetForm())
      )
      .subscribe(
        // success
        () => {
          this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
          this.messagingConfigs.newMessagePlaceHolder = undefined;
        },
        // error
        () => {
          this.translationService
            .translate('quote.comments.invalidComment')
            .pipe(take(1))
            .subscribe(
              (text) => (this.messagingConfigs.newMessagePlaceHolder = text)
            );
        }
      );
  }

  protected prepareMessagingConfigs(): MessagingConfigs {
    return {
      charactersLimit: this.quoteUiConfig.quote?.maxCharsForComments ?? 1000,
      displayAddMessageSection: this.quoteDetails$.pipe(
        map((quote) => quote.isEditable)
      ),
      dateFormat: 'MMMM d, yyyy h:mm aa',
    };
  }

  protected prepareMessageEvents(): Observable<MessageEvent[]> {
    return this.quoteDetails$.pipe(
      map((quote) => {
        const messageEvents: MessageEvent[] = [];
        quote.comments?.forEach((comment) =>
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
