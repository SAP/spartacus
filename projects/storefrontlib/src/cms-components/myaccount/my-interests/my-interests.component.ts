import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UserInterestsService,
  ProductInterestSearchResult,
  ProductInterestEntryRelation,
  PaginationModel,
} from '@spartacus/core';
import { tap } from 'rxjs/operators';
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
  sortLabels = {
    byNameAsc: 'NAME(ASCENDING)',
    byNameDesc: 'NAME(DESCENDING)',
  };
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

  constructor(private productInterestService: UserInterestsService) {}

  ngOnInit() {
    this.interests$ = this.productInterestService
      .getProdutInterests(this.DEFAULT_PAGE_SIZE)
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
  }

  removeInterest(result: ProductInterestEntryRelation): void {
    this.productInterestService.removeProdutInterest(result);
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
