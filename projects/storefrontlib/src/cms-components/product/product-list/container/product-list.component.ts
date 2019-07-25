import { Component, OnInit } from '@angular/core';
import { ProductSearchPage } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PageLayoutService } from '../../../../cms-structure/page/index';
import { ViewModes } from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';

@Component({
  selector: 'cx-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  model$: Observable<ProductSearchPage> = this.productListComponentService
    .model$;
  viewMode$ = new BehaviorSubject<ViewModes>(ViewModes.Grid);
  ViewModes = ViewModes;

  constructor(
    private pageLayoutService: PageLayoutService,
    private productListComponentService: ProductListComponentService
  ) {}

  ngOnInit(): void {
    this.productListComponentService.clearSearchResults();

    this.pageLayoutService.templateName$.pipe(take(1)).subscribe(template => {
      this.viewMode$.next(
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

  setViewMode(mode: ViewModes): void {
    this.viewMode$.next(mode);
  }
}
