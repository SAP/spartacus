/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { EventService, TranslationService } from '@spartacus/core';
import { QuoteDetailsReloadQueryEvent } from '@spartacus/quote/core';
import { Quote, QuoteComment, QuoteFacade } from '@spartacus/quote/root';
import {
  ICON_TYPE,
  MessageEvent,
  MessageEventBoundItem,
  MessagingComponent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { delay, finalize, map, take } from 'rxjs/operators';
import { QuoteUIConfig } from '../config/quote-ui.config';
import { QuoteItemsComponentService } from '../items/quote-items.component.service';

const DEFAULT_COMMENT_MAX_CHARS = 1000;
const ALL_PRODUCTS_ID = '';

@Component({
  selector: 'cx-quote-comments',
  templateUrl: './quote-comments.component.html',
})
export class QuoteCommentsComponent {
  protected quoteFacade = inject(QuoteFacade);
  protected quoteItemsComponentService = inject(QuoteItemsComponentService);
  protected eventService = inject(EventService);
  protected translationService = inject(TranslationService);
  protected quoteUIConfig = inject(QuoteUIConfig);
  protected document = inject(DOCUMENT);

  @ViewChild(MessagingComponent) commentsComponent: MessagingComponent;

  expandComments = true;
  iconTypes = ICON_TYPE;

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  messageEvents$: Observable<Array<MessageEvent>> = this.prepareMessageEvents();
  messagingConfigs: MessagingConfigs = this.prepareMessagingConfigs();

  /**
   * Creates a quote comment based on the provided message event.
   * In case it contains an itemId the comment will be associated with this item, otherwise a header comment is created.
   *
   * @param event - message event
   * @param code - quote code
   */
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

  /**
   * Ensures that the quote item list is expanded, before scrolling to the corresponding item.
   *
   * @param event - click event containing the target item
   */
  onItemClicked(event: { item: MessageEventBoundItem }) {
    this.quoteItemsComponentService.setQuoteEntriesExpanded(true);
    this.quoteItemsComponentService
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

  /**
   * Checks whether the comment section shall be shown at all.
   * In case the quote is in readonly mode and no comments are present, comment section is hidden, as there is nothing to display.
   * In case the quote is editable the comment section is always shown, as you could at least add comments from it.
   *
   * @param quote - quote
   * @returns true, only is the comment section shall be shown
   */
  showComments(quote: Quote): boolean {
    let numItemComments = 0;
    quote.entries?.forEach(
      (entry) => (numItemComments += entry.comments?.length ?? 0)
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
        this.quoteUIConfig.quote?.maxCharsForComments ??
        DEFAULT_COMMENT_MAX_CHARS,
      displayAddMessageSection: this.quoteDetails$.pipe(
        map((quote) => quote.isEditable)
      ),
      dateFormat: 'MMMM d, yyyy h:mm aa',
      defaultItemId: ALL_PRODUCTS_ID,
      itemList$: this.prepareItemList(),
      sendBtnIsNotPrimary: true,
    };
  }

  protected prepareItemList(): Observable<MessageEventBoundItem[]> {
    return combineLatest([
      this.quoteDetails$.pipe(),
      this.translationService.translate('quote.comments.allProducts'),
    ]).pipe(
      map(([quote, allProductsLabel]) => {
        const itemList: MessageEventBoundItem[] = [
          { id: ALL_PRODUCTS_ID, name: allProductsLabel },
        ];
        quote.entries?.forEach((entry: OrderEntry) => {
          itemList.push(this.convertToItem(entry));
        });
        return itemList;
      })
    );
  }

  protected convertToItem(entry: OrderEntry): MessageEventBoundItem {
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
    comment: QuoteComment,
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
