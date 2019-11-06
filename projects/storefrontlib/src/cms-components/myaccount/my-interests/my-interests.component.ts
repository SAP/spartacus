import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import {
  UserInterestsService,
  ProductInterestSearchResult,
  ProductInterestEntryRelation,
  PaginationModel,
  TranslationService,
} from '@spartacus/core';
import { tap, map } from 'rxjs/operators';
import { ICON_TYPE } from '../../misc/icon/icon.model';
@Component({
  selector: 'cx-my-interests',
  templateUrl: './my-interests.component.html',
})
export class MyInterestsComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;
  private DEFAULT_PAGE_SIZE = 10;
  private sortMapping = {
    byNameAsc: 'name:asc',
    byNameDesc: 'name:desc',
  };

  sort = 'byNameAsc';
  sortOptions = [
    {
      code: 'byNameAsc',
      selected: false,
    },
    {
      code: 'byNameDesc',
      selected: false,
    },
  ];
  pagination: PaginationModel;

  interests$: Observable<ProductInterestSearchResult>;
  getInterestsloading$: Observable<boolean>;
  getRemoveInterestsloading$: Observable<boolean>;
  sortLabels: Observable<{ byNameAsc: string; byNameDesc: string }>;

  constructor(
    private productInterestService: UserInterestsService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.productInterestService.clearProductInterests();
    this.interests$ = this.productInterestService
      .getAndLoadProductInterests(this.DEFAULT_PAGE_SIZE)
      .pipe(
        tap(
          interests =>
            (this.pagination = {
              currentPage: interests.pagination.page,
              pageSize: interests.pagination.count,
              totalPages: interests.pagination.totalPages,
              totalResults: interests.pagination.totalCount,
              sort: 'byNameAsc',
            })
        )
      );
    this.getInterestsloading$ = this.productInterestService.getProdutInterestsLoading();
    this.getRemoveInterestsloading$ = this.productInterestService.getRemoveProdutInterestLoading();
    this.sortLabels = this.getSortLabels();
  }

  removeInterest(result: ProductInterestEntryRelation): void {
    this.productInterestService.removeProdutInterest(result);
  }

  private getSortLabels(): Observable<{
    byNameAsc: string;
    byNameDesc: string;
  }> {
    return combineLatest([
      this.translationService.translate('myInterests.sorting.byNameAsc'),
      this.translationService.translate('myInterests.sorting.byNameDesc'),
    ]).pipe(
      map(([asc, desc]) => {
        return {
          byNameAsc: asc,
          byNameDesc: desc,
        };
      })
    );
  }

  sortChange(sort: string): void {
    this.sort = sort;
    this.productInterestService.loadProductInterests(
      this.DEFAULT_PAGE_SIZE,
      0,
      this.sortMapping[sort]
    );
  }

  pageChange(page: number): void {
    this.productInterestService.loadProductInterests(
      this.DEFAULT_PAGE_SIZE,
      page,
      this.sortMapping[this.sort]
    );
  }

  ngOnDestroy(): void {
    this.productInterestService.clearProductInterests();
    this.productInterestService.resetRemoveInterestState();
  }
}
