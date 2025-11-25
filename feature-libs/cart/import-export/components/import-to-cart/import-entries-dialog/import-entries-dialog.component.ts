/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AddOrderEntriesContext,
  OrderEntriesSource,
  ProductData,
  ProductimportInfo,
  ProductimportStatus,
  ProductimportSummary,
} from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import {
  FocusConfig,
  FocusDirective,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { importEntriesFormComponent } from './import-entries-form/import-entries-form.component';
import { importEntriesSummaryComponent } from './import-entries-summary/import-entries-summary.component';
import { importToNewSavedCartFormComponent } from './import-to-new-saved-cart-form/import-to-new-saved-cart-form.component';

@Component({
  selector: 'cx-import-entries-dialog',
  templateUrl: './import-entries-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FocusDirective,
    IconComponent,
    NgIf,
    importToNewSavedCartFormComponent,
    importEntriesFormComponent,
    importEntriesSummaryComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class importEntriesDialogComponent {
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  formState: boolean = true;
  summary$ = new BehaviorSubject<ProductimportSummary>({
    loading: false,
    cartName: '',
    count: 0,
    total: 0,
    successesCount: 0,
    warningMessages: [],
    errorMessages: [],
  });

  context$: Observable<AddOrderEntriesContext> =
    this.launchDialogService.data$.pipe(
      map((data) => data.orderEntriesContext)
    );

  constructor(protected launchDialogService: LaunchDialogService) {}

  isNewCartForm(context: AddOrderEntriesContext) {
    return context.type === OrderEntriesSource.NEW_SAVED_CART;
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
      .subscribe((action: ProductimportInfo) => {
        this.populateSummary(action);
      });
  }

  protected populateSummary(action: ProductimportInfo): void {
    if (action.statusCode === ProductimportStatus.SUCCESS) {
      this.summary$.next({
        ...this.summary$.value,
        count: this.summary$.value.count + 1,
        successesCount: this.summary$.value.successesCount + 1,
      });
    } else if (action.statusCode === ProductimportStatus.LOW_STOCK) {
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
