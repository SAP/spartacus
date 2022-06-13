import { Injectable } from '@angular/core';
import {
  CommerceQuotesFacade,
  CommerceQuotesListReloadQueryEvent,
  QuoteList,
} from '@spartacus/commerce-quotes/root';
import {
  EventService,
  Query,
  QueryService,
  QueryState,
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

  constructor(
    protected userIdService: UserIdService,
    protected commerceQuotesConnector: CommerceQuotesConnector,
    protected eventService: EventService,
    protected queryService: QueryService,
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
}
