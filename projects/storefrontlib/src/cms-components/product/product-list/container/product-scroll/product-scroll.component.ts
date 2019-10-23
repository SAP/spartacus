import {
  Component,
  Input,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ProductSearchPage } from '@spartacus/core';
import { ViewModes } from '../../product-view/product-view.component';
import { ProductListComponentService } from '../product-list-component.service';
import { ViewConfig } from '../../../../../shared/config/view-config';

@Component({
  selector: 'cx-product-scroll',
  templateUrl: './product-scroll.component.html',
})
export class ProductScrollComponent implements AfterViewChecked {
  @Input('scrollConfig')
  set setConfig(inputConfig: ViewConfig) {
    this.setComponentConfigurations(inputConfig);
  }

  model: ProductSearchPage;
  @Input('model')
  set setModel(inputModel: ProductSearchPage) {
    this.infiniteScrollOperations(inputModel);
  }

  inputViewMode: ViewModes;
  @Input('inputViewMode')
  set setViewMode(inputViewMode: ViewModes) {
    this.inputViewMode = inputViewMode;
    //If viewMode is already set (meaning it is not the first load)
    //Reset the product list
    if (this.viewMode) {
      this.resetListOnViewModeChange();
    } else {
      //If viewMode is not set (meaning it is the first load)
      //Set the viewMode
      this.viewMode = inputViewMode;
    }
  }

  viewMode: ViewModes;
  productLimit: number;
  maxProducts: number;

  ViewModes = ViewModes;
  appendProducts = false;
  resetList = false;
  isMaxProducts = false;
  isLastPage = false;
  isEmpty = false;

  doneAutoScroll = false;
  lastScrollTime = 0;

  constructor(
    productListComponentService: ProductListComponentService,
    ref: ChangeDetectorRef,
    viewportScroller: ViewportScroller // tslint:disable-line
  );
  /**
   * @deprecated since 1.2
   * NOTE: check issue:#4362 for more info
   *
   * TODO(issue:#4362) Deprecated since 1.2
   */
  constructor(
    productListComponentService: ProductListComponentService,
    ref: ChangeDetectorRef
  );
  constructor(
    private productListComponentService: ProductListComponentService,
    private ref: ChangeDetectorRef,
    private viewportScroller?: ViewportScroller
  ) {}

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
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  private setComponentConfigurations(scrollConfig: ViewConfig): void {
    const isButton = scrollConfig.view.infiniteScroll.showMoreButton;
    const configProductLimit = scrollConfig.view.infiniteScroll.productLimit;

    //Display "show more" button every time when button configuration is true
    //Otherwise, only display "show more" when the configuration product limit is reached
    this.productLimit = isButton ? 1 : configProductLimit;
  }

  private infiniteScrollOperations(inputModel: ProductSearchPage): void {
    if (this.isSamePage(inputModel)) {
      return;
    }

    if (this.appendProducts) {
      this.model = {
        ...inputModel,
        products: this.model.products.concat(inputModel.products),
      };
    } else {
      this.model = inputModel;
      this.maxProducts = this.productLimit;
    }
    this.setConditions();
    this.ref.markForCheck();

    if (
      this.productListComponentService.latestScrollCriteria &&
      this.model.pagination.currentPage <
        this.productListComponentService.latestScrollCriteria.currentPage
    ) {
      // load next page to expend the list
      this.loadNextPage(this.model.pagination.currentPage + 1);
    }
  }

  private resetListOnViewModeChange(): void {
    this.scrollToTop();
    this.resetList = true;
    this.productListComponentService.getPageItems(0);
  }

  //Set booleans after model has been retrieved
  private setConditions(): void {
    this.isEmpty = !this.model.products || this.model.products.length === 0;

    this.isLastPage =
      this.model.pagination.currentPage ===
      this.model.pagination.totalPages - 1;

    this.isMaxProducts =
      this.productLimit &&
      this.productLimit !== 0 &&
      this.model.products.length >= this.maxProducts;

    //Add the productLimit to the current number of products to determine the next max number of products
    if (this.isMaxProducts) {
      this.maxProducts = this.model.products.length + this.productLimit;
    }

    //Only change viewMode once the new model is set
    //This prevents flickering issues
    if (this.viewMode !== this.inputViewMode) {
      this.viewMode = this.inputViewMode;
    }

    this.resetList = false;
    this.appendProducts = false;
  }

  /**
   * @deprecated at release 2.0.
   * If the new list is the same and it is not intended to reset the list then return true
   * Return false otherwise.
   */
  private isSamePage(inputModel: ProductSearchPage): boolean {
    if (
      !this.resetList &&
      this.model &&
      this.model.breadcrumbs &&
      inputModel.breadcrumbs &&
      this.model.breadcrumbs.length > 0 &&
      inputModel.breadcrumbs.length > 0
    ) {
      if (this.model.breadcrumbs.length === inputModel.breadcrumbs.length) {
        for (let i = 0; i < this.model.breadcrumbs.length; i++) {
          if (
            this.model.breadcrumbs[i].facetCode ===
              inputModel.breadcrumbs[i].facetCode &&
            this.model.breadcrumbs[i].facetValueCode ===
              inputModel.breadcrumbs[i].facetValueCode &&
            this.model.breadcrumbs[i].removeQuery.query.value ===
              inputModel.breadcrumbs[i].removeQuery.query.value &&
            this.model.pagination.currentPage ===
              inputModel.pagination.currentPage
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  ngAfterViewChecked(): void {
    // if auto scroll positon exists
    if (
      this.productListComponentService.autoScrollPosition[0] !== 0 ||
      this.productListComponentService.autoScrollPosition[1] !== 0
    ) {
      // 1. no scroll done then do the scroll.
      // 2. even the scroll done, but we want another scroll if there is a view change during 1000ms.
      if (!this.doneAutoScroll || Date.now() - this.lastScrollTime < 1000) {
        this.viewportScroller.scrollToPosition(
          this.productListComponentService.autoScrollPosition
        );
        this.lastScrollTime = Date.now();
        this.doneAutoScroll = true;
      } else {
        // reset auto scroll position
        this.productListComponentService.autoScrollPosition = [0, 0];
      }
    }
  }
}
