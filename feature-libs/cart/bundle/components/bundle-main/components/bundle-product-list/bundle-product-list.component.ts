/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductBtnActionTypes } from '@spartacus/cart/bundle/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  Product,
  ProductSearchPage,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService, PageLayoutService, ViewConfig, ViewModes } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, skip, take } from 'rxjs/operators';
import { BundleProductListComponentService } from './bundle-product-list.service';

@Component({
  selector: 'cx-bundle-product-list',
  templateUrl: './bundle-product-list.component.html',
})
export class BundleProductListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  productBtnActions = ProductBtnActionTypes;

  isInfiniteScroll: boolean | undefined;

  availableEntities$: Observable<ProductSearchPage> =
    this.bundleProductListService.availableEntities$;

  viewMode$ = new BehaviorSubject<ViewModes>(ViewModes.List);
  ViewModes = ViewModes;

  constructor(
    private pageLayoutService: PageLayoutService,
    private globalMessageService: GlobalMessageService,
    protected bundleProductListService: BundleProductListComponentService,
    public scrollConfig: ViewConfig,
    protected launchDialogService: LaunchDialogService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {}

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
      combineLatest([this.availableEntities$, this.viewMode$])
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
    this.bundleProductListService.sort(sortCode);
  }

  setViewMode(mode: ViewModes): void {
    this.viewMode$.next(mode);
  }

  checkDetails(selectedProduct: Product): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { productCode: selectedProduct.code },
      queryParamsHandling: 'merge',
    });

    const data = { product: selectedProduct, function: () => console.log(selectedProduct.code + ' selected')};
    this.launchDialogService?.openDialogAndSubscribe(
      LAUNCH_CALLER.PRODUCT_DETAILS_DIALOG,
      undefined,
      data
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
