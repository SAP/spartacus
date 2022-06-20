import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CommerceQuotesFacade,
  CommerceQuotesListReloadQueryEvent,
  Quote,
  QuoteList,
  QuoteMetadata,
  Comment,
} from '@spartacus/commerce-quotes/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  Query,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { ViewConfig } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, withLatestFrom, take } from 'rxjs/operators';
import { CommerceQuotesConnector } from '../connectors/commerce-quotes.connector';

import { tap } from 'rxjs/operators';

@Injectable()
export class CommerceQuotesService implements CommerceQuotesFacade {
  protected currentPage$ = new BehaviorSubject<number>(0);
  protected sortBy$ = new BehaviorSubject<string>('byCode');

  protected quotesState$: Query<QuoteList, unknown[]> =
    this.queryService.create<QuoteList>(
      () =>
        this.userIdService.takeUserId().pipe(
          withLatestFrom(this.currentPage$, this.sortBy$),
          switchMap(([userId, currentPage, sort]) => {
            return this.commerceQuotesConnector.getQuotes(userId, {
              currentPage,
              sort,
              pageSize: this.config.view?.defaultPageSize,
            });
          })
        ),
      { reloadOn: [CommerceQuotesListReloadQueryEvent] }
    );

  protected createQuoteCommand: Command<void, Quote> =
    this.commandService.create<void, Quote>(
      () =>
        combineLatest([
          this.userIdService.takeUserId(),
          this.activeCartFacade.takeActiveCartId(),
        ]).pipe(
          take(1),
          switchMap(([userId, cartId]) => {
            return this.commerceQuotesConnector.createQuote(userId, { cartId });
          }),
          tap(() => {
            this.activeCartFacade.reloadActiveCart();
          })
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected editQuoteCommand: Command<
    { quoteCode: string; quoteMetadata: QuoteMetadata },
    unknown
  > = this.commandService.create<
    { quoteCode: string; quoteMetadata: QuoteMetadata },
    unknown
  >(
    (payload) =>
      this.userIdService.takeUserId().pipe(
        take(1),
        switchMap((userId) => {
          return this.commerceQuotesConnector.editQuote(
            userId,
            payload.quoteCode,
            payload.quoteMetadata
          );
        })
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  protected addQuoteCommentCommand: Command<
    { quoteCode: string; quoteComment: Comment },
    unknown
  > = this.commandService.create<
    { quoteCode: string; quoteComment: Comment },
    unknown
  >(
    (payload) =>
      this.userIdService.takeUserId().pipe(
        take(1),
        switchMap((userId) => {
          return this.commerceQuotesConnector.addComment(
            userId,
            payload.quoteCode,
            payload.quoteComment
          );
        })
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(
    protected userIdService: UserIdService,
    protected commerceQuotesConnector: CommerceQuotesConnector,
    protected eventService: EventService,
    protected queryService: QueryService,
    protected config: ViewConfig,
    protected commandService: CommandService,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  setCurrentPage(page: number): void {
    this.currentPage$.next(page);
    this.eventService.dispatch({}, CommerceQuotesListReloadQueryEvent);
  }

  setSort(sort: string): void {
    this.sortBy$.next(sort);
    this.eventService.dispatch({}, CommerceQuotesListReloadQueryEvent);
  }

  getQuotesState(): Observable<QueryState<QuoteList | undefined>> {
    return this.quotesState$.getState();
  }

  createQuote(): Observable<Quote> {
    return this.createQuoteCommand.execute();
  }

  editQuote(
    quoteCode: string,
    quoteMetadata: QuoteMetadata
  ): Observable<unknown> {
    return this.editQuoteCommand.execute({ quoteCode, quoteMetadata });
  }

  addQuoteComment(
    quoteCode: string,
    quoteComment: Comment
  ): Observable<unknown> {
    return this.addQuoteCommentCommand.execute({ quoteCode, quoteComment });
  }
}
