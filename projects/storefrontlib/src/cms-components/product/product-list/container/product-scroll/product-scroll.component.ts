import { Component, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProductSearchPage } from '@spartacus/core';
import { ViewModes } from '../../product-view/product-view.component';
import { Subscription } from 'rxjs';
import { ProductListComponentService } from '../product-list-component.service';
import { ViewConfig } from '../../../../../shared/config/view-config';

@Component({
  selector: 'cx-product-scroll',
  templateUrl: './product-scroll.component.html',
})
export class ProductScrollComponent implements OnDestroy {
  private subscription = new Subscription();

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

  constructor(
    private productListComponentService: ProductListComponentService,
    private ref: ChangeDetectorRef
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
    window.scroll(0, 0);
  }

  private setComponentConfigurations(scrollConfig: ViewConfig): void {
    const isButton = scrollConfig.view?.infiniteScroll?.showMoreButton;
    const configProductLimit = scrollConfig.view?.infiniteScroll?.productLimit;

    //Display "show more" button every time when button configuration is true
    //Otherwise, only display "show more" when the configuration product limit is reached
    this.productLimit = isButton ? 1 : configProductLimit;
  }

  private infiniteScrollOperations(inputModel: ProductSearchPage): void {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
