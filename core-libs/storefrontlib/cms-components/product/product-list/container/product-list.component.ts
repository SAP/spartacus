/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  ProductSearchPage,
  TranslatePipe,
  useFeatureStyles,
} from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { filter, skip, take } from 'rxjs/operators';
import { PageLayoutService } from '../../../../cms-structure/page';
import { PaginationComponent } from '../../../../shared/components/list-navigation/pagination/pagination.component';
import { SortingComponent } from '../../../../shared/components/list-navigation/sorting/sorting.component';
import { ViewConfig } from '../../../../shared/config/view-config';
import { ProductGridItemComponent } from '../product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import {
  ProductViewComponent,
  ViewModes,
} from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';
import { ProductScrollComponent } from './product-scroll/product-scroll.component';

@Component({
  selector: 'cx-product-list',
  templateUrl: './product-list.component.html',
  imports: [
    NgIf,
    SortingComponent,
    PaginationComponent,
    ProductViewComponent,
    NgFor,
    ProductGridItemComponent,
    ProductListItemComponent,
    ProductScrollComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  isInfiniteScroll: boolean | undefined;

  model$: Observable<ProductSearchPage> =
    this.productListComponentService.model$;

  viewMode$ = new BehaviorSubject<ViewModes>(ViewModes.Grid);
  ViewModes = ViewModes;

  constructor(
    private pageLayoutService: PageLayoutService,
    private productListComponentService: ProductListComponentService,
    private globalMessageService: GlobalMessageService,
    public scrollConfig: ViewConfig
  ) {
    useFeatureStyles('reserveSpaceForImagesOnPdpAndPlp');
  }

  ngOnInit(): void {
    this.isInfiniteScroll = this.scrollConfig.view?.infiniteScroll?.active;

    this.subscription.add(
      this.pageLayoutService.templateName$
        .pipe(take(1))
        .subscribe((template) => {
          this.viewMode$.next(
            template === 'ProductGridPageTemplate'
              ? ViewModes.Grid
              : ViewModes.List
          );
        })
    );

    this.subscription.add(
      combineLatest([this.model$, this.viewMode$])
        .pipe(
          skip(1),
          filter(([model, mode]) => !!model && !!mode)
        )
        .subscribe(() =>
          this.globalMessageService.add(
            { key: 'sorting.pageViewUpdated' },
            GlobalMessageType.MSG_TYPE_ASSISTIVE,
            500
          )
        )
    );
  }

  sortList(sortCode: string): void {
    this.productListComponentService.sort(sortCode);
  }

  setViewMode(mode: ViewModes): void {
    this.viewMode$.next(mode);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
