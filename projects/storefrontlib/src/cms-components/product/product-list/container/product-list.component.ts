import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProductSearchPage } from '@spartacus/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageLayoutService } from '../../../../cms-structure/page/index';
import { ViewModes } from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';
import { PaginationConfig } from '../../config/pagination-config';

@Component({
  selector: 'cx-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  model: ProductSearchPage;

  isInfiniteScroll: boolean;
  isAppendProducts = false;
  isLoadingItems = false;
  isViewChange = false;

  viewMode$ = new BehaviorSubject<ViewModes>(ViewModes.Grid);
  ViewModes = ViewModes;

  constructor(
    private pageLayoutService: PageLayoutService,
    private productListComponentService: ProductListComponentService,
    private ref: ChangeDetectorRef,
    private paginationConfig: PaginationConfig
  ) {}

  ngOnInit(): void {
    this.isInfiniteScroll = this.paginationConfig.pagination.infiniteScroll;

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
      this.isAppendProducts = false;
      this.isLoadingItems = false;
      this.isViewChange = false;
    } else {
      this.model = subModel;
    }
  }

  paginationOperations(subModel: ProductSearchPage) {
    this.model = subModel;
  }

  isSamePage(subModel: ProductSearchPage): boolean {
    //If we are not changing viewMode or appending items, do not replace the list
    //This prevents flickering issues when using filters/sorts
    if (!this.isViewChange && !this.isAppendProducts && this.model) {
      return (
        this.model.breadcrumbs[0].removeQuery.query.value ===
        subModel.breadcrumbs[0].removeQuery.query.value
      );
    }
    return false;
  }

  viewPage(pageNumber: number): void {
    this.productListComponentService.viewPage(pageNumber);
  }

  scrollPage(page: number): void {
    const isMaxProducts =
      this.model.products.length === this.model.pagination.totalResults;

    if (isMaxProducts) {
      return;
    }

    this.isAppendProducts = true;
    this.isLoadingItems = true;
    this.ref.markForCheck();
    this.productListComponentService.getPageItems(page);
  }

  sortList(sortCode: string): void {
    this.productListComponentService.sort(sortCode);
  }

  setViewMode(mode: ViewModes): void {
    if (this.isInfiniteScroll) {
      this.isViewChange = true;
      this.productListComponentService.getPageItems(0);
    }
    this.viewMode$.next(mode);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
