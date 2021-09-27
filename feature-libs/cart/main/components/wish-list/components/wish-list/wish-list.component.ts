import { Component } from '@angular/core';
import { WishListService } from '@spartacus/cart/main/core';
import { Cart, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-wish-list',
  templateUrl: './wish-list.component.html',
})
export class WishListComponent {
  wishList$: Observable<Cart> = this.wishListService.getWishList();
  loading$: Observable<boolean> = this.wishListService.getWishListLoading();

  constructor(protected wishListService: WishListService) {}

  removeEntry(item: OrderEntry) {
    this.wishListService.removeEntry(item);
  }
}
