import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AuthService,
  isNotNullable,
  OrderEntry,
  Product,
  WishListService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { CurrentProductService } from '../../product/current-product.service';

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
      map((wishList) => wishList.entries)
    );

  userLoggedIn$: Observable<boolean> = this.authService.isUserLoggedIn();
  loading$: Observable<boolean> = this.wishListService.getWishListLoading();

  hasStock = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected wishListService: WishListService,
    protected currentProductService: CurrentProductService,
    protected authService: AuthService
  ) {}

  add(product: Product): void {
    this.wishListService.addEntry(product.code);
  }

  remove(entry: OrderEntry): void {
    this.wishListService.removeEntry(entry);
  }

  getProductInWishList(product: Product, entries: OrderEntry[]): OrderEntry {
    const item = entries.find((entry) => entry.product.code === product.code);
    return item;
  }

  protected setStockInfo(product: Product): void {
    this.hasStock = Boolean(
      product.stock && product.stock.stockLevelStatus !== 'outOfStock'
    );
  }
}
