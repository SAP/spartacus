import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  isLoaded$: Observable<boolean>;
  sortType: string;

  // MOCK
  savedCarts = [];

  private PAGE_SIZE = 5;

  ngOnInit() {}

  constructor(protected translation: TranslationService) {}

  getSortLabels(): Observable<{ byDate: string; byCartNumber: string }> {
    return combineLatest([
      this.translation.translate('savedCartList.sorting.date'),
      this.translation.translate('savedCartList.sorting.cartNumber'),
    ]).pipe(
      map(([textByDate, textByCartNumber]) => {
        return {
          byDate: textByDate,
          byCartNumber: textByCartNumber,
        };
      })
    );
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchCarts(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchCarts(event);
  }

  private fetchCarts(event: { sortCode: string; currentPage: number }): void {
    // TO DO
  }
}
