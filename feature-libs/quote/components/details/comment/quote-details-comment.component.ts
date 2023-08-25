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
  Quote,
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
import { Observable, of } from 'rxjs';
import { delay, finalize, map, take } from 'rxjs/operators';
import { QuoteUIConfig } from '../../config/quote-ui.config';
import { QuoteDetailsCartComponentService } from '../cart/quote-details-cart.component.service';

const DEFAULT_COMMENT_MAX_CHARS = 1000;
const ALL_PRODUCTS_ID = '';

@Component({
  selector: 'cx-quote-details-comment',
  templateUrl: './quote-details-comment.component.html',
})
export class QuoteDetailsCommentComponent {
  @ViewChild(MessagingComponent) commentsComponent: MessagingComponent;

  expandComments = true;
  iconTypes = ICON_TYPE;

  quoteDetails$: Observable<Quote> = of(null); // this.quoteFacade.getQuoteDetails();
  messageEvents$: Observable<Array<MessageEvent>> = this.prepareMessageEvents();

  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();
  constructor(
    protected quoteFacade: QuoteFacade,
    protected eventService: EventService,
    protected translationService: TranslationService,
    protected quoteUiConfig: QuoteUIConfig,
    @Inject(DOCUMENT) protected document: Document,
    protected quoteDetailsCartComponentService: QuoteDetailsCartComponentService
  ) {}

  onSend(event: { message: string; itemId?: string }, code: string) {
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
    this.quoteDetailsCartComponentService.setQuoteEntriesExpanded(true);
    this.quoteDetailsCartComponentService
      .getQuoteEntriesExpanded()
      .pipe(take(1), delay(0)) // delay this task until the UI has expanded
      .subscribe(() => {
        const aTags = Array.from(this.document.getElementsByTagName('a'));
        for (const aTag of aTags) {
          if (aTag.textContent === event.item.name) {
            aTag.scrollIntoView({ block: 'center' });
            return;
          }
        }
      });
  }

  showComments(quote: Quote): boolean {
    let numItemComments = 0;
    quote.entries?.forEach(
      (entry: OrderEntry) => (numItemComments += entry.comments?.length ?? 0)
    );
    return (
      quote.isEditable ||
      (quote.comments?.length ?? 0) > 0 ||
      numItemComments > 0
    );
  }

  protected prepareMessagingConfigs(): MessagingConfigs {
    return {
      charactersLimit:
        this.quoteUiConfig.quote?.maxCharsForComments ??
        DEFAULT_COMMENT_MAX_CHARS,
      displayAddMessageSection: this.quoteDetails$.pipe(
        map((quote) => quote?.isEditable)
      ),
      dateFormat: 'MMMM d, yyyy h:mm aa',
      defaultItemId: ALL_PRODUCTS_ID,
      itemList$: this.prepareItemList(),
    };
  }

  protected prepareItemList(): Observable<Item[]> {
    let allProducts: string = 'quote.comments.allProducts';
    this.translationService
      .translate(allProducts)
      .pipe(take(1))
      .subscribe((text) => (allProducts = text));

    return this.quoteDetails$.pipe(
      map((quote) => {
        const itemList: Item[] = [{ id: ALL_PRODUCTS_ID, name: allProducts }];
        quote?.entries?.forEach((entry: OrderEntry) => {
          itemList.push(this.convertToItem(entry));
        });
        return itemList;
      })
    );
  }

  protected convertToItem(entry: OrderEntry): Item {
    if (entry.entryNumber === undefined) {
      throw Error(
        'entryNumber may not be undefined, entry: ' + JSON.stringify(entry)
      );
    }
    return {
      id: entry.entryNumber.toString(),
      name:
        entry.product?.name ??
        entry.product?.code ??
        entry.entryNumber.toString(),
    };
  }

  protected prepareMessageEvents(): Observable<MessageEvent[]> {
    return this.quoteDetails$.pipe(
      map((quote) => {
        const messageEvents: MessageEvent[] = [];
        quote?.comments?.forEach((comment: Comment) =>
          messageEvents.push(this.mapCommentToMessageEvent(comment))
        );
        quote?.entries?.forEach((entry: OrderEntry) => {
          entry.comments?.forEach((comment: Comment) =>
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
      item: entry ? this.convertToItem(entry) : undefined,
    };
    return messages;
  }
}
