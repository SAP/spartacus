import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Product, PaginationModel, SortModel } from '@spartacus/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageLayoutService } from '../../../../cms-structure/page/index';
import { ViewModes } from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';

@Component({
  selector: 'cx-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  pagination: PaginationModel;
  sorts: SortModel[] = [];

  resultThing: any;

  isPagination = false;
  isLoaded = false;
  isMaxProducts = false;
  isLoadingItems = false;
  isAppendProducts = false;

  observeScroll = new Subject();
  private subscription = new Subscription();

  viewMode$ = new BehaviorSubject<ViewModes>(ViewModes.Grid);
  ViewModes = ViewModes;

  constructor(
    private pageLayoutService: PageLayoutService,
    private productListComponentService: ProductListComponentService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productListComponentService.clearSearchResults();

    this.pageLayoutService.templateName$.pipe(take(1)).subscribe(template => {
      this.viewMode$.next(
        template === 'ProductGridPageTemplate' ? ViewModes.Grid : ViewModes.List
      );

      this.subscription.add(
        this.productListComponentService.model$.subscribe(result => {
          this.resultThing = result;
          if (result.products) {
            this.products = this.isAppendProducts
              ? this.products.concat(result.products)
              : result.products;
            this.pagination = result.pagination;
            this.sorts = result.sorts;

            this.isMaxProducts =
              this.products.length === result.pagination.totalResults;
            this.isLoadingItems = false;
            this.isAppendProducts = false;
            this.isLoaded = true;
            this.ref.markForCheck();
          }
        })
      );
    });
  }

  viewPage(pageNumber: number): void {
    this.productListComponentService.viewPage(pageNumber);
  }

  scrollEvent() {
    if (this.isMaxProducts) {
      return;
    }
    this.isAppendProducts = true;
    this.isLoadingItems = true;
    this.ref.markForCheck();
    this.scrollPage(this.pagination.currentPage + 1);
  }

  scrollPage(page: number): void {
    this.productListComponentService.scrollPage(page);
  }

  sortList(sortCode: string): void {
    this.productListComponentService.sort(sortCode);
  }

  setViewMode(mode: ViewModes): void {
    this.viewMode$.next(mode);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
