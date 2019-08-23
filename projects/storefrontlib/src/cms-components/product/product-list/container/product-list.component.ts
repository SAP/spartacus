import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductSearchPage } from '@spartacus/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageLayoutService } from '../../../../cms-structure/page/index';
import { ViewConfig } from '../../config/view-config';
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
  productLimit: number;
  maxProducts: number;
  appendProducts = false;
  resetList = false;
  isMaxProducts = false;
  isLastPage = false;
  isEmpty = false;

  viewMode$ = new BehaviorSubject<ViewModes>(ViewModes.Grid);
  ViewModes = ViewModes;

  constructor(
    pageLayoutService: PageLayoutService,
    productListComponentService: ProductListComponentService,
    ref: ChangeDetectorRef,
    scrollConfig: ViewConfig
  );

  /**
   * @deprecated since version 1.x
   *  Use constructor(pageLayoutService: PageLayoutService,
   *  productListComponentService: ProductListComponentService,
   *  ref: ChangeDetectorRef,
   *  scrollConfig: ViewConfig) instead
   */
  constructor(
    pageLayoutService: PageLayoutService,
    productListComponentService: ProductListComponentService
  );
  constructor(
    private pageLayoutService: PageLayoutService,
    private productListComponentService: ProductListComponentService,
    private ref?: ChangeDetectorRef,
    private scrollConfig?: ViewConfig
  ) {}

  ngOnInit(): void {
    this.setComponentConfigurations();

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

  paginationOperations(subModel: ProductSearchPage): void {
    this.model = subModel;
  }

  infiniteScrollOperations(subModel: ProductSearchPage): void {
    if (this.isSamePage(subModel)) {
      return;
    }

    if (this.appendProducts) {
      this.model = {
        ...subModel,
        products: this.model.products.concat(subModel.products),
      };
    } else {
      this.model = subModel;
      this.maxProducts = this.productLimit;
    }
    this.setConditions();
  }

  viewPage(pageNumber: number): void {
    this.productListComponentService.viewPage(pageNumber);
  }

  sortList(sortCode: string): void {
    this.productListComponentService.sort(sortCode);
  }

  setViewMode(mode: ViewModes): void {
    if (this.isInfiniteScroll) {
      //Reset products to initial state to avoid rendering large lists on ViewMode change
      this.scrollToTop();
      this.resetList = true;
      this.productListComponentService.getPageItems(0);
    }
    this.viewMode$.next(mode);
  }

  scrollPage(pageNumber: number): void {
    this.appendProducts = true;
    this.ref.markForCheck();
    this.productListComponentService.getPageItems(pageNumber);
  }

  loadNextPage(pageNumber: number): void {
    this.isMaxProducts = false;
    this.scrollPage(pageNumber);
  }

  scrollToTop(): void {
    window.scroll(0, 0);
  }

  private setComponentConfigurations(): void {
    this.isInfiniteScroll = this.scrollConfig.view.infiniteScroll.active;

    if (this.isInfiniteScroll) {
      const isButton = this.scrollConfig.view.infiniteScroll.showMoreButton;
      const configProductLimit = this.scrollConfig.view.infiniteScroll
        .productLimit;

      //Display "show more" button every time when button configuration is true
      //Otherwise, only display "show more" when the configuration product limit is reached
      this.productLimit = isButton ? 1 : configProductLimit;
    }
  }

  //Set booleans after model has been retrieved
  private setConditions(): void {
    this.isEmpty = this.model.products.length === 0;

    this.isLastPage =
      this.model.pagination.currentPage ===
      this.model.pagination.totalPages - 1;

    this.isMaxProducts =
      this.productLimit &&
      this.productLimit !== 0 &&
      this.model.products.length >= this.maxProducts;

    //Add the productLimit to the current number of products to determine the next max number of products
    this.maxProducts = this.isMaxProducts
      ? this.model.products.length + this.productLimit
      : this.maxProducts;

    this.appendProducts = false;
    this.resetList = false;
  }

  /**
   * @deprecate at release 2.0.
   * If the new list is the same and it is not intended to reset the list then return true
   * Return false otherwise.
   */
  private isSamePage(subModel: ProductSearchPage): boolean {
    if (
      !this.resetList &&
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
