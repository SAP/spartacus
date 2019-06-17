import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductSearchPage, SearchConfig } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageLayoutService } from '../../../../cms-structure/page/index';
import { ViewModes } from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';

@Component({
  selector: 'cx-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  query: string;
  categoryCode: string;
  brandCode: string;
  itemPerPage: number;

  model$: Observable<ProductSearchPage>;
  searchConfig: SearchConfig = {};
  options: SearchConfig;
  gridMode$ = new BehaviorSubject<ViewModes>(ViewModes.Grid);

  constructor(
    private pageLayoutService: PageLayoutService,
    private productListComponentService: ProductListComponentService
  ) {}

  ngOnInit(): void {
    this.productListComponentService.onInit();
    this.model$ = this.productListComponentService.getSearchResults();

    this.pageLayoutService.templateName$.pipe(take(1)).subscribe(template => {
      this.gridMode$.next(
        template === 'ProductGridPageTemplate' ? ViewModes.Grid : ViewModes.List
      );
    });
  }

  viewPage(pageNumber: number): void {
    this.productListComponentService.viewPage(pageNumber);
  }

  sortList(sortCode: string): void {
    this.productListComponentService.sort(sortCode);
  }

  setGridMode(mode: ViewModes): void {
    this.gridMode$.next(mode);
  }

  ngOnDestroy() {
    this.productListComponentService.onDestroy();
  }
}
