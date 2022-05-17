import { Injectable } from '@angular/core';
import {
  Query,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { CommerceQuotesFacade } from 'feature-libs/commerce-quotes/root/facade/commerce-quotes.facade';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommerceQuotesConnector } from '../connectors';
import { QuoteList } from '../model';

@Injectable()
export class CommerceQuotesService implements CommerceQuotesFacade {
  protected quotesState$: Query<QuoteList, unknown[]> =
    this.queryService.create<QuoteList>(() =>
      this.userIdService
        .getUserId()
        .pipe(
          switchMap((userId) =>
            this.commerceQuotesConnector.getQuotes(userId, { currentPage: 0 })
          )
        )
    );

  constructor(
    protected userIdService: UserIdService,
    protected commerceQuotesConnector: CommerceQuotesConnector,
    protected queryService: QueryService
  ) {}

  getQuotesState(): Observable<QueryState<QuoteList | undefined>> {
    return this.quotesState$.getState();
  }
}
