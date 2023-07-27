/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
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
import { QuoteUIConfig } from '../../config/quote-ui.config';

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
    protected quoteUiConfig: QuoteUIConfig,
    @Inject(DOCUMENT) protected document: Document
  ) {}

  onSend(event: { message: string; itemId: string }, code: string) {
    this.quoteFacade
      .addQuoteComment(code, { text: event.message }, event.itemId)
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

  onItemClicked(event: { item: Item }) {
    const aTags = this.document.getElementsByTagName('a');
    for (let ii = 0; ii < aTags.length; ii++) {
      if (aTags[ii].textContent === event.item.name) {
        aTags[ii].scrollIntoView();
        return;
      }
    }
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
            const item = this.convertToItem(entry);
            if (item) {
              itemList.push(item);
            }
          });
          return itemList;
        })
      ),
    };
  }

  private convertToItem(entry: OrderEntry | undefined): Item | undefined {
    if (entry?.entryNumber !== undefined) {
      return {
        id: entry.entryNumber.toString(),
        name:
          entry.product?.name ??
          entry.product?.code ??
          entry.entryNumber.toString(),
      };
    }
  }

  protected prepareMessageEvents(): Observable<MessageEvent[]> {
    return this.quoteDetails$.pipe(
      map((quote) => {
        const messageEvents: MessageEvent[] = [];
        quote.comments?.forEach((comment) =>
          messageEvents.push(this.mapCommentToMessageEvent(comment))
        );
        quote.entries?.forEach((entry) => {
          entry.comments?.forEach((comment) =>
            messageEvents.push(this.mapCommentToMessageEvent(comment, entry))
          );
        });
        messageEvents.sort((eventA, eventB) => {
          return (
            new Date(eventA?.createdAt ?? 0).getTime() -
            new Date(eventB?.createdAt ?? 0).getTime()
          );
        });
        return messageEvents;
      })
    );
  }

  protected mapCommentToMessageEvent(
    comment: Comment,
    entry?: OrderEntry
  ): MessageEvent {
    const messages: MessageEvent = {
      author: comment.author?.name,
      text: comment.text,
      createdAt: comment.creationDate?.toString(),
      rightAlign: !comment.fromCustomer,
      item: this.convertToItem(entry),
    };
    return messages;
  }
}
