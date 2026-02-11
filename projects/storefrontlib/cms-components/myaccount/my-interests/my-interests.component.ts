/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CxDatePipe,
  GlobalMessageService,
  GlobalMessageType,
  PaginationModel,
  Product,
  ProductInterestEntryRelation,
  ProductInterestSearchResult,
  ProductScope,
  ProductService,
  TranslatePipe,
  TranslationService,
  UrlPipe,
  UserInterestsService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AtMessageDirective } from '../../../shared/components/assistive-technology-message/assistive-technology-message.directive';
import { PaginationComponent } from '../../../shared/components/list-navigation/pagination/pagination.component';
import { SortingComponent } from '../../../shared/components/list-navigation/sorting/sorting.component';
import { MediaComponent } from '../../../shared/components/media/media.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

interface ProductInterestSearchResultUI extends ProductInterestSearchResult {
  results?: (ProductInterestEntryRelation & {
    product$?: Observable<Product | undefined>;
  })[];
}

@Component({
  selector: 'cx-my-interests',
  templateUrl: './my-interests.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    SortingComponent,
    PaginationComponent,
    NgFor,
    RouterLink,
    MediaComponent,
    AtMessageDirective,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
    CxDatePipe,
    UrlPipe,

    CxDatePipe,
  ],
})
export class MyInterestsComponent implements OnInit, OnDestroy {
  private DEFAULT_PAGE_SIZE = 10;
  private sortMapping: { [key: string]: string } = {
    byNameAsc: 'name:asc',
    byNameDesc: 'name:desc',
  };
  private sortChanged = false;

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
    private productService: ProductService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit() {
    this.interests$ = this.productInterestService
      .getAndLoadProductInterests(this.DEFAULT_PAGE_SIZE)
      .pipe(
        tap(
          (interests) =>
            (this.pagination = {
              currentPage: interests.pagination?.page,
              pageSize: interests.pagination?.count,
              totalPages: interests.pagination?.totalPages,
              totalResults: interests.pagination?.totalCount,
              sort: 'byNameAsc',
            })
        ),
        tap(() => {
          if (this.sortChanged) {
            this.sortChanged = false;
            this.globalMessageService?.add(
              { key: 'sorting.pageViewUpdated' },
              GlobalMessageType.MSG_TYPE_ASSISTIVE,
              500
            );
          }
        }),
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
  ): Observable<Product | undefined> {
    return this.productService.get(
      interest.product?.code ?? '',
      ProductScope.DETAILS
    );
  }

  removeInterest(
    relation: ProductInterestEntryRelation & {
      product$?: Observable<Product | undefined>;
    }
  ): void {
    this.productInterestService.removeProdutInterest({
      product: relation.product,
      productInterestEntry: relation.productInterestEntry,
    });
  }

  sortChange(sort: string): void {
    this.sort = sort;
    this.sortChanged = true;
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
