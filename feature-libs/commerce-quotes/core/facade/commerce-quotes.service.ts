import { Injectable } from '@angular/core';
import {
  CommerceQuotesFacade,
  CommerceQuotesListReloadQueryEvent,
  Quote,
  QuoteList,
} from '@spartacus/commerce-quotes/root';
import {
  EventService,
  Query,
  QueryService,
  QueryState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { ViewConfig } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { CommerceQuotesConnector } from '../connectors';

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

  protected quoteDetailsState$: Query<Quote, unknown[]> =
    this.queryService.create<Quote>(() =>
      this.routingService.getRouterState().pipe(
        withLatestFrom(this.userIdService.takeUserId()),
        switchMap(([{ state }, userId]) =>
          this.commerceQuotesConnector.getQuote(userId, state.params.quoteId)
        )
      )
    );

  constructor(
    protected userIdService: UserIdService,
    protected commerceQuotesConnector: CommerceQuotesConnector,
    protected eventService: EventService,
    protected queryService: QueryService,
    protected routingService: RoutingService,
    protected config: ViewConfig
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

  getQuoteDetails(): Observable<Quote | undefined> {
    return this.quoteDetailsState$.get();
  }
}
