/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  Comment,
  QuoteCartService,
  QuoteDiscount,
  QuoteFacade,
  QuoteListReloadQueryEvent,
  Quote,
  QuoteActionType,
  QuoteDetailsReloadQueryEvent,
  QuoteList,
  QuoteMetadata,
  QuotesStateParams,
  QuoteStarter,
} from '@spartacus/quote/root';
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
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { QuoteConnector } from '../connectors/quote.connector';
import { CartUtilsService } from '../services/cart-utils.service';

@Injectable()
export class QuoteService implements QuoteFacade {
  /**
   * Indicator whether an action is currently performing.
   */
  protected isActionPerforming$ = new BehaviorSubject<boolean>(false);

  protected createQuoteCommand: Command<
    { quoteMetadata: QuoteMetadata },
    Quote
  > = this.commandService.create<{ quoteMetadata: QuoteMetadata }, Quote>(
    (payload) =>
      combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.takeActiveCartId(),
      ]).pipe(
        take(1),
        switchMap(([userId, cartId]) =>
          zip(of(userId), this.quoteConnector.createQuote(userId, { cartId }))
        ),
        concatMap(([userId, quote]) =>
          zip(
            combineLatest([
              this.quoteConnector.editQuote(
                userId,
                quote.code,
                payload.quoteMetadata
              ),
            ]),
            of(userId),
            of(quote)
          )
        ),
        tap(([_, userId, quote]) => {
          this.multiCartService.loadCart({
            userId,
            cartId: quote.cartId as string,
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

  protected editQuoteCommand: Command<{
    quoteCode: string;
    quoteMetadata: QuoteMetadata;
  }> = this.commandService.create<{
    quoteCode: string;
    quoteMetadata: QuoteMetadata;
  }>(
    (payload) =>
      this.userIdService.takeUserId().pipe(
        take(1),

        switchMap((userId) =>
          this.quoteConnector.editQuote(
            userId,
            payload.quoteCode,
            payload.quoteMetadata
          )
        ),
        tap(() => {
          this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
        })
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  protected addQuoteCommentCommand: Command<{
    quoteCode: string;
    quoteComment: Comment;
    entryNumber?: string;
  }> = this.commandService.create<{
    quoteCode: string;
    quoteComment: Comment;
    entryNumber: string;
  }>(
    (payload) =>
      this.userIdService.takeUserId().pipe(
        take(1),
        switchMap((userId) => {
          if (payload.entryNumber) {
            return this.quoteConnector.addCartEntryComment(
              userId,
              payload.quoteCode,
              payload.entryNumber,
              payload.quoteComment
            );
          } else {
            return this.quoteConnector.addComment(
              userId,
              payload.quoteCode,
              payload.quoteComment
            );
          }
        })
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  protected addDiscountCommand: Command<{
    quoteCode: string;
    quoteDiscount: QuoteDiscount;
  }> = this.commandService.create<{
    quoteCode: string;
    quoteDiscount: QuoteDiscount;
  }>(
    (payload) =>
      this.userIdService.takeUserId().pipe(
        take(1),
        switchMap((userId) => {
          return this.quoteConnector.addDiscount(
            userId,
            payload.quoteCode,
            payload.quoteDiscount
          );
        }),
        tap(() => {
          this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
        })
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  protected performQuoteActionCommand: Command<{
    quote: Quote;
    quoteAction: QuoteActionType;
  }> = this.commandService.create<{
    quote: Quote;
    quoteAction: QuoteActionType;
  }>(
    (payload) => {
      this.isActionPerforming$.next(true);
      return this.userIdService.takeUserId().pipe(
        take(1),
        switchMap((userId) =>
          zip(
            this.quoteConnector.performQuoteAction(
              userId,
              payload.quote.code,
              payload.quoteAction
            ),
            of(userId)
          )
        ),
        tap(([_result, userId]) => {
          if (
            payload.quoteAction === QuoteActionType.SUBMIT ||
            payload.quoteAction === QuoteActionType.CANCEL
          ) {
            this.cartUtilsService.createNewCartAndGoToQuoteList();
            this.triggerReloadAndCompleteAction();
          }
          if (
            payload.quoteAction === QuoteActionType.EDIT ||
            payload.quoteAction === QuoteActionType.CHECKOUT
          ) {
            //no cartId present: ensure that we re-fetch quote cart id from quote
            const cartId = payload.quote.cartId;
            if (!cartId) {
              this.quoteConnector
                .getQuote(userId, payload.quote.code)
                .pipe(
                  filter((quote) => quote.cartId !== undefined),
                  take(1)
                )
                .subscribe((quote) => {
                  this.loadQuoteCartAndProceed(
                    userId,
                    quote.cartId as string,
                    quote.code,
                    payload.quoteAction
                  );
                });
            } else {
              this.loadQuoteCartAndProceed(
                userId,
                cartId,
                payload.quote.code,
                payload.quoteAction
              );
            }
          } else {
            this.isActionPerforming$.next(false);
          }
        })
      );
    },
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  /**
   * Loads the quote cart and waits until load is done. Afterwards triggers specific actions depending on the
   * action we perform
   * @param userId Current user
   * @param cartId Quote cart ID
   * @param actionType The action we are currently processing
   */
  protected loadQuoteCartAndProceed(
    userId: string,
    cartId: string,
    quoteId: string,
    actionType: QuoteActionType
  ) {
    this.multiCartService.loadCart({
      userId: userId,
      cartId: cartId,
      extraData: {
        active: true,
      },
    });
    this.activeCartService
      .getActive()
      .pipe(
        filter((cart) => cart.code === cartId),
        take(1)
      )
      .subscribe(() => {
        this.triggerReloadAndCompleteAction();
        if (actionType === QuoteActionType.CHECKOUT) {
          this.quoteCartService.setCheckoutAllowed(true);
          this.routingService.go({ cxRoute: 'checkout' });
        } else if (actionType === QuoteActionType.REQUOTE) {
          this.routingService.go({
            cxRoute: 'quoteDetails',
            params: { quoteId: quoteId },
          });
        }
      });
  }

  protected triggerReloadAndCompleteAction() {
    this.isActionPerforming$.next(false);
    this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
  }

  protected requoteCommand: Command<{ quoteStarter: QuoteStarter }, Quote> =
    this.commandService.create<{ quoteStarter: QuoteStarter }, Quote>(
      (payload) => {
        this.isActionPerforming$.next(true);
        return this.userIdService.takeUserId().pipe(
          take(1),
          switchMap((userId) =>
            this.quoteConnector.createQuote(userId, payload.quoteStarter).pipe(
              tap((quote) => {
                this.loadQuoteCartAndProceed(
                  userId,
                  quote.cartId as string,
                  quote.code,
                  QuoteActionType.REQUOTE
                );
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
        //we need to ensure that the active cart has been loaded, in order to determine if the
        //quote is connected to a quote cart (and then directly ready for edit)
        this.activeCartService.requireLoadedCart().pipe(
          switchMap(() => {
            return this.routingService.getRouterState().pipe(
              //we don't need to cover the intermediate router states where a future route is already known.
              //only changes to the URL are relevant. Otherwise we get unneeded hits when e.g. navigating back from quotes
              filter((routingData) => routingData.nextState === undefined),
              withLatestFrom(this.userIdService.takeUserId()),
              switchMap(([{ state }, userId]) =>
                this.quoteConnector.getQuote(userId, state.params.quoteId)
              )
            );
          })
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
            return this.quoteConnector.getQuotes(userId, {
              currentPage,
              sort,
              pageSize: this.config.view?.defaultPageSize,
            });
          }),
          tap(() => {
            this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
          })
        ),
      {
        reloadOn: [
          QuoteListReloadQueryEvent,
          uniteLatest([currentPage$, sort$]), // combine all streams that should trigger a reload to decrease initial http calls
        ],
        resetOn: [LoginEvent, NavigationEvent],
      }
    );

  constructor(
    protected userIdService: UserIdService,
    protected quoteConnector: QuoteConnector,
    protected eventService: EventService,
    protected queryService: QueryService,
    protected config: ViewConfig,
    protected commandService: CommandService,
    protected activeCartService: ActiveCartFacade,
    protected routingService: RoutingService,
    protected multiCartService: MultiCartFacade,
    protected quoteCartService: QuoteCartService,
    protected cartUtilsService: CartUtilsService
  ) {}

  addDiscount(quoteCode: string, discount: QuoteDiscount): Observable<unknown> {
    return this.addDiscountCommand.execute({
      quoteCode,
      quoteDiscount: discount,
    });
  }

  createQuote(quoteMetadata: QuoteMetadata): Observable<Quote> {
    return this.createQuoteCommand.execute({
      quoteMetadata,
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
    quoteComment: Comment,
    entryNumber?: string
  ): Observable<unknown> {
    return this.addQuoteCommentCommand.execute({
      quoteCode,
      quoteComment,
      entryNumber,
    });
  }

  performQuoteAction(
    quote: Quote,
    quoteAction: QuoteActionType
  ): Observable<unknown> {
    return this.performQuoteActionCommand.execute({ quote, quoteAction });
  }

  requote(quoteCode: string): Observable<Quote> {
    return this.requoteCommand.execute({ quoteStarter: { quoteCode } });
  }

  getQuotesState(
    params: QuotesStateParams
  ): Observable<QueryState<QuoteList | undefined>> {
    return this.getQuotesStateQuery(params).getState();
  }

  getQuoteDetailsQueryState(): Observable<QueryState<Quote | undefined>> {
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

  getQuoteDetails(): Observable<Quote> {
    return this.getQuoteDetailsQueryState().pipe(
      filter((state) => !state.loading),
      filter((state) => state.data !== undefined),
      map((state) => state.data),
      map((quote) => quote as Quote)
    );
  }
}
