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
    cartName: '',
    count: 0,
    total: 0,
    successesCount: 0,
    problemsCount: 0,
    messages: [],
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
      total: products.length,
      cartName: name,
    });
    this.importToCartService
      .loadProductsToCart(products, {
        name,
        description,
      })
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
    } else {
      this.summary$.next({
        ...this.summary$.value,
        count: this.summary$.value.count + 1,
        problemsCount: this.summary$.value.problemsCount + 1,
        messages: [...this.summary$.value.messages, action],
      });
    }
  }
}
