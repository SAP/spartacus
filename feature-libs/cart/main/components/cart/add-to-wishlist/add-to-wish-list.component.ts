import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry, WishListFacade } from '@spartacus/cart/main/root';
import { AuthService, isNotNullable, Product } from '@spartacus/core';
import { CurrentProductService, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

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

  wishListEntries$: Observable<OrderEntry[]> = this.wishListService
    .getWishList()
    .pipe(
      filter((wishlist) => Boolean(wishlist)),
      map((wishList) => wishList.entries ?? [])
    );

  userLoggedIn$: Observable<boolean> = this.authService.isUserLoggedIn();
  loading$: Observable<boolean> = this.wishListService.getWishListLoading();

  hasStock = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected wishListService: WishListFacade,
    protected currentProductService: CurrentProductService,
    protected authService: AuthService
  ) {}

  add(product: Product): void {
    if (product.code) {
      this.wishListService.addEntry(product.code);
    }
  }

  remove(entry: OrderEntry): void {
    this.wishListService.removeEntry(entry);
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
}
