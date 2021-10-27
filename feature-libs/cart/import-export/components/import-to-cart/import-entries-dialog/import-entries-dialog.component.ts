import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AddOrderEntriesContext,
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
  OrderEntriesSource,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
  ProductImportSummary,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, pluck } from 'rxjs/operators';

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

  context$: Observable<AddOrderEntriesContext> =
    this.launchDialogService.data$.pipe(pluck('orderEntriesContext'));

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
