import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  ClearCheckoutService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { ImportExportService } from 'projects/storefrontlib/src/shared/services/import-export/import-export.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImportToCartService } from '../../core/services/import-to-cart.service';

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './saved-cart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  isLoading$: Observable<boolean>;
  savedCarts$: Observable<Cart[]> = this.savedCartService.getList().pipe(
    map((lists) =>
      lists.sort((a: Cart, b: Cart) => {
        let date1: number = a.saveTime
          ? new Date(a.saveTime).getTime()
          : new Date().getTime();
        let date2: number = b.saveTime
          ? new Date(b.saveTime).getTime()
          : new Date().getTime();
        return date2 - date1;
      })
    )
  );
  constructor(
    protected routing: RoutingService,
    protected translation: TranslationService,
    protected savedCartService: SavedCartService,
    protected clearCheckoutService: ClearCheckoutService,
    protected importExportService: ImportExportService,
    protected importToCartService: ImportToCartService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.savedCartService.getSavedCartListProcessLoading();
    this.savedCartService.loadSavedCarts();

    this.subscription.add(
      this.savedCartService
        .getRestoreSavedCartProcessSuccess()
        .subscribe((success) => this.onRestoreComplete(success))
    );
  }

  importProducts(file: FileList): void {
    this.importExportService
      .importFile(file, true, {
        maxSize: 1,
        allowedExtensions: ['text/csv'],
        checkEmptyFile: true,
      })
      .then((extractedData) =>
        this.importToCartService.addProductsToCart(extractedData)
      )
      .catch(console.log);
  }

  goToSavedCartDetails(cart: Cart): void {
    this.routing.go({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: cart?.code },
    });
  }

  restoreSavedCart(event: Event, cartId: string): void {
    this.savedCartService.restoreSavedCart(cartId);
    event.stopPropagation();
  }

  onRestoreComplete(success: boolean): void {
    if (success) {
      this.savedCartService.clearRestoreSavedCart();
      this.savedCartService.clearSaveCart();
      this.clearCheckoutService.resetCheckoutProcesses();
    }
  }

  ngOnDestroy(): void {
    this.savedCartService.clearSavedCarts();
    this.savedCartService.clearSaveCart();
    this.savedCartService.clearRestoreSavedCart();
    this.subscription?.unsubscribe();
  }
}
