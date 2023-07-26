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
  QuoteFacade,
} from '@spartacus/quote/root';
import {
  ICON_TYPE,
  Item,
  MessageEvent,
  MessagingComponent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { QuoteUIConfig } from '../../config';

const DEFAULT_COMMENT_MAX_CHARS = 1000;

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
    protected quoteUiConfig: QuoteUIConfig
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
      charactersLimit:
        this.quoteUiConfig.quote?.maxCharsForComments ??
        DEFAULT_COMMENT_MAX_CHARS,
      displayAddMessageSection: this.quoteDetails$.pipe(
        map((quote) => quote.isEditable)
      ),
      dateFormat: 'MMMM d, yyyy h:mm aa',
      itemList$: this.quoteDetails$.pipe(
        map((quote) => {
          let name: string = 'quote.comments.allProducts';
          this.translationService
            .translate(name)
            .pipe(take(1))
            .subscribe((text) => (name = text));
          const itemList: Item[] = [{ id: '', name: name }];
          quote.entries?.forEach((entry) => {
            if (entry.entryNumber) {
              itemList.push({
                id: entry.entryNumber.toString(),
                name: entry.product?.name ?? entry.product?.code ?? entry.entryNumber.toString(),
              });
            }
          });
          return itemList;
        })
      ),
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
      item: { id: 'dummyId', name: 'Dummy Name' },
    };
    return messages;
  }
}
