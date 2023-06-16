/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  Comment,
  QuoteFacade,
  CommerceQuotesListReloadQueryEvent,
  Quote,
  QuoteActionType,
  QuoteDetailsReloadQueryEvent,
  QuoteList,
  QuoteMetadata,
  QuotesStateParams,
  QuoteStarter,
} from '@spartacus/commerce-quotes/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  LoginEvent,
  Query,
  QueryService,
  QueryState,
  RoutingService,
  uniteLatest,
  UserIdService,
} from '@spartacus/core';
import { NavigationEvent, ViewConfig } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable, of, zip } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CommerceQuotesConnector } from '../connectors/commerce-quotes.connector';

@Injectable()
export class CommerceQuotesService implements QuoteFacade {
  /**
   * Indicator whether an action is currently performing.
   */
  protected isActionPerforming$ = new BehaviorSubject<boolean>(false);

  protected createQuoteCommand: Command<
    { quoteMetadata: QuoteMetadata; quoteComment: Comment },
    Quote
  > = this.commandService.create<
    { quoteMetadata: QuoteMetadata; quoteComment: Comment },
    Quote
  >(
    (payload) =>
      combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.takeActiveCartId(),
      ]).pipe(
        take(1),
        switchMap(([userId, cartId]) =>
          zip(
            of(userId),
            this.commerceQuotesConnector.createQuote(userId, { cartId })
          )
        ),
        concatMap(([userId, quote]) =>
          zip(
            combineLatest([
              this.commerceQuotesConnector.editQuote(
                userId,
                quote.code,
                payload.quoteMetadata
              ),
              this.commerceQuotesConnector.addComment(
                userId,
                quote.code,
                payload.quoteComment
              ),
            ]),
            of(userId),
            of(quote)
          )
        ),
        tap(([_, userId, quote]) => {
          this.multiCartService.loadCart({
            cartId: quote.cartId as string,
            userId,
            extraData: {
              active: true,
            },
          });
          this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
        }),
        map(([_, _userId, quote]) => quote)
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
        switchMap((userId) =>
          this.commerceQuotesConnector.editQuote(
            userId,
            payload.quoteCode,
            payload.quoteMetadata
          )
        )
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
        switchMap((userId) =>
          this.commerceQuotesConnector.addComment(
            userId,
            payload.quoteCode,
            payload.quoteComment
          )
        )
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  protected performQuoteActionCommand: Command<
    { quoteCode: string; quoteAction: QuoteActionType },
    unknown
  > = this.commandService.create<
    { quoteCode: string; quoteAction: QuoteActionType },
    unknown
  >(
    (payload) => {
      this.isActionPerforming$.next(true);
      return this.userIdService.takeUserId().pipe(
        take(1),
        switchMap((userId) =>
          this.commerceQuotesConnector.performQuoteAction(
            userId,
            payload.quoteCode,
            payload.quoteAction
          )
        ),
        tap(() => {
          this.isActionPerforming$.next(false);
          this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
        })
      );
    },
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  protected requoteCommand: Command<{ quoteStarter: QuoteStarter }, Quote> =
    this.commandService.create<{ quoteStarter: QuoteStarter }, Quote>(
      (payload) => {
        this.isActionPerforming$.next(true);
        return this.userIdService.takeUserId().pipe(
          take(1),
          switchMap((userId) =>
            this.commerceQuotesConnector
              .createQuote(userId, payload.quoteStarter)
              .pipe(
                tap((quote) => {
                  this.routingService.go({
                    cxRoute: 'quoteDetails',
                    params: { quoteId: quote.code },
                  });
                  this.isActionPerforming$.next(false);
                })
              )
          )
        );
      },
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected quoteDetailsState$: Query<Quote, unknown[]> =
    this.queryService.create<Quote>(
      () =>
        this.routingService.getRouterState().pipe(
          withLatestFrom(this.userIdService.takeUserId()),
          switchMap(([{ state }, userId]) =>
            this.commerceQuotesConnector.getQuote(userId, state.params.quoteId)
          )
        ),
      {
        reloadOn: [QuoteDetailsReloadQueryEvent, LoginEvent],
      }
    );

  protected getQuotesStateQuery = ({
    currentPage$,
    sort$,
  }: QuotesStateParams) =>
    this.queryService.create<QuoteList>(
      () =>
        this.userIdService.takeUserId().pipe(
          //use withLatestFrom and reloadOn to get full functionality of query
          withLatestFrom(currentPage$, sort$),
          distinctUntilChanged(),
          switchMap(([userId, currentPage, sort]) => {
            console.log(userId, currentPage, sort);
            return this.commerceQuotesConnector.getQuotes(userId, {
              currentPage,
              sort,
              pageSize: this.config.view?.defaultPageSize,
            });
          })
        ),
      {
        reloadOn: [
          CommerceQuotesListReloadQueryEvent,
          uniteLatest([currentPage$, sort$]), // combine all streams that should trigger a reload to decrease initial http calls
        ],
        resetOn: [LoginEvent, NavigationEvent],
      }
    );

  constructor(
    protected userIdService: UserIdService,
    protected commerceQuotesConnector: CommerceQuotesConnector,
    protected eventService: EventService,
    protected queryService: QueryService,
    protected config: ViewConfig,
    protected commandService: CommandService,
    protected activeCartService: ActiveCartFacade,
    protected routingService: RoutingService,
    protected multiCartService: MultiCartFacade
  ) {}

  createQuote(
    quoteMetadata: QuoteMetadata,
    quoteComment: Comment
  ): Observable<Quote> {
    return this.createQuoteCommand.execute({
      quoteMetadata,
      quoteComment,
    });
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

  performQuoteAction(
    quoteCode: string,
    quoteAction: QuoteActionType
  ): Observable<unknown> {
    return this.performQuoteActionCommand.execute({ quoteCode, quoteAction });
  }

  requote(quoteCode: string): Observable<Quote> {
    return this.requoteCommand.execute({ quoteStarter: { quoteCode } });
  }

  getQuotesState(
    params: QuotesStateParams
  ): Observable<QueryState<QuoteList | undefined>> {
    return this.getQuotesStateQuery(params).getState();
  }

  getQuoteDetails(): Observable<QueryState<Quote | undefined>> {
    return combineLatest([
      this.isActionPerforming$,
      this.quoteDetailsState$.getState(),
    ]).pipe(
      map(([isLoading, state]) => ({
        ...state,
        loading: state.loading || isLoading,
      }))
    );
  }
}
