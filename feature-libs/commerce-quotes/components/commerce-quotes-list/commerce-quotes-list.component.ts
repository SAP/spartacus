import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuoteList } from '@spartacus/commerce-quotes/root';
import { QueryState, SortModel, TranslationService } from '@spartacus/core';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-commerce-quotes-list',
  templateUrl: './commerce-quotes-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesListComponent {
  sorts: SortModel[];
  sortType: string;

  quotesState$: Observable<QueryState<QuoteList | undefined>> =
    this.commerceQuotesFacade.getQuotesState().pipe(
      tap((quotesState: QueryState<QuoteList | undefined>) => {
        if (quotesState.data?.pagination?.sort) {
          this.sortType = quotesState.data.pagination.sort;
        }
        this.setSortModel(quotesState.data);
      })
    );

  constructor(
    protected commerceQuotesFacade: CommerceQuotesFacade,
    protected translationService: TranslationService
  ) {}

  getSortLabels(): Observable<{ [key: string]: string }> {
    return combineLatest([
      this.translationService.translate('sorting.date'),
      this.translationService.translate('sorting.quoteId'),
      this.translationService.translate('sorting.name'),
      this.translationService.translate('sorting.status'),
    ]).pipe(
      map(
        ([
          textByQuoteUpdatedDate,
          textByQuoteCode,
          textByQuoteName,
          textByQuoteStatus,
        ]) => {
          return {
            byDate: textByQuoteUpdatedDate,
            byCode: textByQuoteCode,
            byName: textByQuoteName,
            byState: textByQuoteStatus,
          };
        }
      )
    );
  }

  changeSortCode(sortCode: string): void {
    this.commerceQuotesFacade.setSort(sortCode);
  }

  changePage(page: number): void {
    this.commerceQuotesFacade.setCurrentPage(page);
  }

  //TODO: temporary solution caused by gaps in the API
  private setSortModel(data: QuoteList | undefined): void {
    try {
      if (data?.sorts) {
        throw new Error();
      }
    } catch {
      console.warn(
        'Quote list sorts has been received from the API, but static values are still in used'
      );
    } finally {
      this.sorts = [
        { code: 'byDate' },
        { code: 'byCode' },
        { code: 'byName' },
        { code: 'byState' },
      ];
    }
  }
}
