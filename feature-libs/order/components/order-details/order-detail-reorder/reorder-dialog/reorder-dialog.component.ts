/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AddOrderEntriesContext,
  OrderEntriesSource,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
  ProductImportSummary,
} from '@spartacus/cart/base/root';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, pluck } from 'rxjs/operators';

@Component({
  selector: 'cx-reorder-dialog',
  templateUrl: './reorder-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReorderDialogComponent implements OnInit, OnDestroy{
  protected subscriptions = new Subscription();
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  formState: boolean = true;
  summary$ = new BehaviorSubject<ProductImportSummary>({
    loading: false,
    cartName: '',
    count: 0,
    total: 0,
    successesCount: 0,
    warningMessages: [],
    errorMessages: [],
  });

  products: ProductData[];
  addOrderEntriesContext: AddOrderEntriesContext;
  context$: Observable<AddOrderEntriesContext> =
    this.launchDialogService.data$.pipe(pluck('orderEntriesContext'));

  constructor(protected launchDialogService: LaunchDialogService) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.launchDialogService.data$.subscribe(
        (data: any) => {
          debugger;
          this.products = data.products;
          this.addOrderEntriesContext = data.orderEntriesContext as AddOrderEntriesContext;

          this.formState = false;
          this.summary$.next({
            ...this.summary$.value,
            loading: true,
            total: this.products.length,
          });
          this.addOrderEntriesContext
            .addEntries(this.products, undefined)
            .pipe(
              finalize(() => {
                this.summary$.next({
                  ...this.summary$.value,
                  loading: false,
                });
              })
            )
            .subscribe((action: ProductImportInfo) => {
              this.populateSummary(action);
            });
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  isNewCartForm() {
    return this.addOrderEntriesContext.type === OrderEntriesSource.ORDER_DETAILS;
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  importProducts(
    context: AddOrderEntriesContext,
    {
      products,
      savedCartInfo,
    }: {
      products: ProductData[];
      savedCartInfo?: {
        name: string;
        description: string;
      };
    }
  ): void {
    console.log("Jatt");
    debugger;
    this.formState = false;
    this.summary$.next({
      ...this.summary$.value,
      loading: true,
      total: products.length,
      cartName: savedCartInfo?.name,
    });
    context
      .addEntries(products, savedCartInfo)
      .pipe(
        finalize(() => {
          this.summary$.next({
            ...this.summary$.value,
            loading: false,
          });
        })
      )
      .subscribe((action: ProductImportInfo) => {
        this.populateSummary(action);
      });
  }

  protected populateSummary(action: ProductImportInfo): void {
    if (action.statusCode === ProductImportStatus.SUCCESS) {
      this.summary$.next({
        ...this.summary$.value,
        count: this.summary$.value.count + 1,
        successesCount: this.summary$.value.successesCount + 1,
      });
    } else if (action.statusCode === ProductImportStatus.LOW_STOCK) {
      this.summary$.next({
        ...this.summary$.value,
        count: this.summary$.value.count + 1,
        warningMessages: [...this.summary$.value.warningMessages, action],
      });
    } else {
      this.summary$.next({
        ...this.summary$.value,
        count: this.summary$.value.count + 1,
        errorMessages: [...this.summary$.value.errorMessages, action],
      });
    }
  }
}
