import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductSearchPage } from '@spartacus/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageLayoutService } from '../../../../cms-structure/page/index';
import { PaginationConfig } from '../../config/pagination-config';
import { ViewModes } from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';

@Component({
  selector: 'cx-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  model: ProductSearchPage;

  //Variables used for infinite scroll
  isInfiniteScroll: boolean;
  isAppendProducts = false;
  isLoadingItems = false;
  isResetList = false;

  productLimit: number;
  isProductLimit = false;
  isLastPage = false;

  viewMode$ = new BehaviorSubject<ViewModes>(ViewModes.Grid);
  ViewModes = ViewModes;

  constructor(
    private pageLayoutService: PageLayoutService,
    private productListComponentService: ProductListComponentService,
    private ref: ChangeDetectorRef,
    private paginationConfig: PaginationConfig
  ) {}

  ngOnInit(): void {
    this.isInfiniteScroll = this.paginationConfig.pagination.infiniteScroll.isActive;
    this.productLimit = this.paginationConfig.pagination.infiniteScroll.limit;

    this.productListComponentService.clearSearchResults();

    this.subscription.add(
      this.pageLayoutService.templateName$.pipe(take(1)).subscribe(template => {
        this.viewMode$.next(
          template === 'ProductGridPageTemplate'
            ? ViewModes.Grid
            : ViewModes.List
        );
      })
    );

    this.subscription.add(
      this.productListComponentService.model$.subscribe(subModel => {
        if (this.isInfiniteScroll) {
          this.infiniteScrollOperations(subModel);
        } else {
          this.paginationOperations(subModel);
        }
        this.ref.markForCheck();
      })
    );
  }

  infiniteScrollOperations(subModel: ProductSearchPage) {
    if (this.isSamePage(subModel)) {
      return;
    }

    if (this.isAppendProducts) {
      this.model = {
        ...subModel,
        products: this.model.products.concat(subModel.products),
      };
      this.resetConditions();
    } else {
      this.model = subModel;
    }

    this.isLastPage =
      this.model.pagination.currentPage ===
      this.model.pagination.totalPages - 1;

    this.isProductLimit =
      this.productLimit !== 0 &&
      this.model.products.length >= this.productLimit;
  }

  paginationOperations(subModel: ProductSearchPage) {
    this.model = subModel;
  }

  isSamePage(subModel: ProductSearchPage): boolean {
    if (
      !this.isResetList &&
      !this.isAppendProducts &&
      this.model &&
      this.model.breadcrumbs.length > 0 &&
      subModel.breadcrumbs.length > 0
    ) {
      if (this.model.breadcrumbs.length === subModel.breadcrumbs.length) {
        for (let i = 0; i < this.model.breadcrumbs.length; i++) {
          if (
            this.model.breadcrumbs[i].facetCode ===
              subModel.breadcrumbs[i].facetCode &&
            this.model.breadcrumbs[i].facetValueCode ===
              subModel.breadcrumbs[i].facetValueCode &&
            this.model.breadcrumbs[i].removeQuery.query.value ===
              subModel.breadcrumbs[i].removeQuery.query.value &&
            this.model.pagination.currentPage ===
              subModel.pagination.currentPage
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  //Reset booleans after products have been retrieved
  resetConditions(): void {
    this.isAppendProducts = false;
    this.isLoadingItems = false;
    this.isResetList = false;
  }

  viewPage(pageNumber: number): void {
    this.productListComponentService.viewPage(pageNumber);
  }

  scrollPage(pageNumber: number): void {
    if (this.isLastPage) {
      return;
    }

    this.isAppendProducts = true;
    this.isLoadingItems = true;
    this.ref.markForCheck();
    this.productListComponentService.getPageItems(pageNumber);
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  sortList(sortCode: string): void {
    this.productListComponentService.sort(sortCode);
  }

  setViewMode(mode: ViewModes): void {
    if (this.isInfiniteScroll) {
      //Reset products to initial state to avoid rendering large lists on ViewMode change
      this.isResetList = true;
      this.productListComponentService.getPageItems(0);
    }
    this.viewMode$.next(mode);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
