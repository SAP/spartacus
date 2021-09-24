import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  PaginationModel,
  Product,
  ProductInterestEntryRelation,
  ProductInterestSearchResult,
  ProductScope,
  ProductService,
  TranslationService,
  UserInterestsService,
} from '@spartacus/core';
import { map, tap } from 'rxjs/operators';

interface ProductInterestSearchResultUI extends ProductInterestSearchResult {
  results?: (ProductInterestEntryRelation & {
    product$?: Observable<Product>;
  })[];
}

@Component({
  selector: 'cx-my-interests',
  templateUrl: './my-interests.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyInterestsComponent implements OnInit, OnDestroy {
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

  interests$: Observable<ProductInterestSearchResultUI>;
  isRemoveDisabled$: Observable<boolean>;
  getInterestsloading$: Observable<boolean>;
  sortLabels: Observable<{ byNameAsc: string; byNameDesc: string }>;

  constructor(
    private productInterestService: UserInterestsService,
    private translationService: TranslationService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.interests$ = this.productInterestService
      .getAndLoadProductInterests(this.DEFAULT_PAGE_SIZE)
      .pipe(
        tap(
          (interests) =>
            (this.pagination = {
              currentPage: interests.pagination.page,
              pageSize: interests.pagination.count,
              totalPages: interests.pagination.totalPages,
              totalResults: interests.pagination.totalCount,
              sort: 'byNameAsc',
            })
        ),
        map((interest) => ({
          ...interest,
          results: interest.results
            ? interest.results.map((result) => ({
                ...result,
                product$: this.getProduct(result),
              }))
            : interest.results,
        }))
      );

    this.getInterestsloading$ =
      this.productInterestService.getProdutInterestsLoading();
    this.isRemoveDisabled$ = combineLatest([
      this.getInterestsloading$,
      this.productInterestService.getRemoveProdutInterestLoading(),
    ]).pipe(map(([getLoading, removeLoading]) => getLoading || removeLoading));

    this.sortLabels = this.getSortLabels();
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

  private getProduct(
    interest: ProductInterestEntryRelation
  ): Observable<Product> {
    return this.productService.get(interest.product.code, ProductScope.DETAILS);
  }

  removeInterest(
    relation: ProductInterestEntryRelation & {
      product$?: Observable<Product>;
    }
  ): void {
    this.productInterestService.removeProdutInterest({
      product: relation.product,
      productInterestEntry: relation.productInterestEntry,
    });
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
