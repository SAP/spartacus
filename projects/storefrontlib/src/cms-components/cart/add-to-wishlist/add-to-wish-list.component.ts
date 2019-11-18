import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry, Product } from '@spartacus/core';
import { WishListService } from 'projects/core/src/cart/facade/wish-list.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentProductService } from '../../product';

@Component({
  selector: 'cx-add-to-wishlist',
  templateUrl: './add-to-wish-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToWishListComponent {
  product$: Observable<Product> = this.currentProductService.getProduct();
  wishListEntries$: Observable<
    OrderEntry[]
  > = this.wishListService
    .getWishList()
    .pipe(map(wishList => wishList.entries));

  constructor(
    protected wishListService: WishListService,
    protected currentProductService: CurrentProductService
  ) {}

  add(product: Product): void {
    this.wishListService.addEntry(product.code);
  }

  remove(entry: OrderEntry): void {
    this.wishListService.removeEntry(entry);
  }

  getProductInWishList(product: Product, entries: OrderEntry[]): OrderEntry {
    const item = entries.find(entry => entry.product.code === product.code);
    return item;
  }
}
