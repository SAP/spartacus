import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import {
  ProductImportSummary,
  ProductImportStatus,
  ProductImportInfo,
  ProductsData,
} from '@spartacus/cart/import-export/core';
import { ImportToCartService } from '../import-to-cart.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'cx-import-entries-dialog',
  templateUrl: './import-entries-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesDialogComponent {
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  formState: Boolean = true;
  summary$ = new BehaviorSubject<ProductImportSummary>({
    loading: false,
    cartName: '',
    count: 0,
    total: 0,
    successesCount: 0,
    warningMessages: [],
    errorMessages: [],
    warningDetailsOpened: false,
    errorDetailsOpened: false,
  });

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected importToCartService: ImportToCartService
  ) {}

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  importProducts({
    name,
    description,
    products,
  }: {
    name: string;
    description: string;
    products: ProductsData;
  }): void {
    this.formState = false;
    this.summary$.next({
      ...this.summary$.value,
      loading: true,
      total: products.length,
      cartName: name,
    });
    this.importToCartService
      .loadProductsToCart(products, {
        name,
        description,
      })
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

  protected populateSummary(action: ProductImportInfo) {
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
