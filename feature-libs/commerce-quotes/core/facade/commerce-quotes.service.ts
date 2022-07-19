import { Injectable } from '@angular/core';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  CommerceQuotesFacade,
  CommerceQuotesListReloadQueryEvent,
  Quote,
  QuoteList,
  QuoteMetadata,
  Comment,
  QuoteAction,
} from '@spartacus/commerce-quotes/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  Query,
  QueryService,
  QueryState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { NavigationEvent, ViewConfig } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable, of, zip } from 'rxjs';
import {
  switchMap,
  withLatestFrom,
  take,
  concatMap,
  map,
  tap,
} from 'rxjs/operators';
import { CommerceQuotesConnector } from '../connectors/commerce-quotes.connector';

@Injectable()
export class CommerceQuotesService implements CommerceQuotesFacade {
  protected currentPage$ = new BehaviorSubject<number>(0);
  protected sortBy$ = new BehaviorSubject<string>('byCode');

  protected quotesState$: Query<QuoteList, unknown[]> =
    this.queryService.create<QuoteList>(
      () =>
        this.userIdService.takeUserId().pipe(
          withLatestFrom(this.currentPage$, this.sortBy$),
          switchMap(([userId, currentPage, sort]) =>
            this.commerceQuotesConnector.getQuotes(userId, {
              currentPage,
              sort,
              pageSize: this.config.view?.defaultPageSize,
            })
          )
        ),
      { reloadOn: [CommerceQuotesListReloadQueryEvent] }
    );

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
        tap(([_, userId, quote]) =>
          this.multiCartService.loadCart({
            cartId: quote.cartId as string,
            userId,
            extraData: {
              active: true,
            },
          })
        ),
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
    { quoteCode: string; quoteAction: QuoteAction },
    unknown
  > = this.commandService.create<
    { quoteCode: string; quoteAction: QuoteAction },
    unknown
  >(
    (payload) =>
      this.userIdService.takeUserId().pipe(
        take(1),
        switchMap((userId) =>
          this.commerceQuotesConnector.performQuoteAction(
            userId,
            payload.quoteCode,
            payload.quoteAction
          )
        ),
        tap(() => {
          this.globalMessageService.add(
            {
              key: 'commerceQuotes.commons.creationSuccess',
              params: { code: payload.quoteCode },
            },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        })
      ),
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
      { resetOn: [NavigationEvent] }
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
    protected globalMessageService: GlobalMessageService,
    protected multiCartService: MultiCartFacade
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
    quoteAction: QuoteAction
  ): Observable<unknown> {
    return this.performQuoteActionCommand.execute({ quoteCode, quoteAction });
  }

  getQuoteDetails(): Observable<Quote | undefined> {
    return this.quoteDetailsState$.get();
  }
}
