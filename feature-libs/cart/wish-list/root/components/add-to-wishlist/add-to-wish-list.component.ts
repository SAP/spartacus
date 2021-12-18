import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/main/root';
import { AuthService, isNotNullable, Product } from '@spartacus/core';
import { CurrentProductService, ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { WishListFacade } from '../../facade/wish-list.facade';

@Component({
  selector: 'cx-add-to-wishlist',
  templateUrl: './add-to-wish-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToWishListComponent {
  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter(isNotNullable),
    tap((product) => this.setStockInfo(product))
  );

  wishListEntries$: Observable<OrderEntry[]> = this.getWishListEntries();

  userLoggedIn$: Observable<boolean> = this.authService.isUserLoggedIn();
  loading$: Observable<boolean> = this.getWishListLoading();

  hasStock = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected wishListFacade: WishListFacade,
    protected currentProductService: CurrentProductService,
    protected authService: AuthService
  ) {}

  add(product: Product): void {
    if (product.code) {
      this.wishListFacade.addEntry(product.code);
    }
  }

  remove(entry: OrderEntry): void {
    this.wishListFacade.removeEntry(entry);
  }

  getProductInWishList(
    product: Product,
    entries: OrderEntry[]
  ): OrderEntry | undefined {
    const item = entries.find((entry) => entry.product?.code === product.code);
    return item;
  }

  protected setStockInfo(product: Product): void {
    this.hasStock = Boolean(
      product.stock && product.stock.stockLevelStatus !== 'outOfStock'
    );
  }

  protected getWishListLoading(): Observable<boolean> {
    return this.wishListDataRequired().pipe(
      switchMap((wishListDataRequired) => {
        if (wishListDataRequired) {
          return this.wishListFacade.getWishListLoading();
        } else {
          return of(false);
        }
      })
    );
  }

  protected getWishListEntries(): Observable<OrderEntry[]> {
    return this.wishListDataRequired().pipe(
      switchMap((wishListDataRequired) => {
        if (wishListDataRequired) {
          return this.getWishListEntriesFromFacade();
        } else {
          return of([]);
        }
      })
    );
  }

  protected getWishListEntriesFromFacade(): Observable<OrderEntry[]> {
    return this.wishListFacade.getWishList().pipe(
      filter((wishlist) => Boolean(wishlist)),
      map((wishList) => wishList.entries ?? [])
    );
  }

  protected wishListDataRequired(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      distinctUntilChanged(),
      takeWhile((isUserLoggedIn) => !isUserLoggedIn, true)
    );
  }
}
