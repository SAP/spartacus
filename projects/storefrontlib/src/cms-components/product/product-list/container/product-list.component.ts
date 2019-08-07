import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProductSearchPage } from '@spartacus/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageLayoutService } from '../../../../cms-structure/page/index';
import { ViewModes } from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';

@Component({
  selector: 'cx-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  model: ProductSearchPage;

  isPagination = false;
  isLoadingItems = false;
  isAppendProducts = false;

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
        if (this.isSameList(this.model, subModel)) {
          return;
        }

        if (this.isAppendProducts) {
          this.model = {
            ...subModel,
            products: this.model.products.concat(subModel.products),
          };
          this.isAppendProducts = false;
          this.isLoadingItems = false;
        } else {
          this.model = subModel;
        }
        this.ref.markForCheck();
      })
    );
  }

  isSameList(model: any, subModel: any): boolean {
    //If the lists are not meant to be appended and they are the same
    //Do not replace the lists
    if (!this.isAppendProducts && model) {
      return (
        model.breadcrumbs[0].removeQuery.query.value ===
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
    const nextPage = page + 1;

    if (isMaxProducts) {
      return;
    }

    this.isAppendProducts = true;
    this.isLoadingItems = true;
    this.ref.markForCheck();
    this.productListComponentService.scrollPage(nextPage);
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
