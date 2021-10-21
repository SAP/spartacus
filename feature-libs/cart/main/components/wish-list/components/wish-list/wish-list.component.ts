import { Component } from '@angular/core';
import { Cart, OrderEntry, WishListFacade } from '@spartacus/cart/main/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-wish-list',
  templateUrl: './wish-list.component.html',
})
export class WishListComponent {
  wishList$: Observable<Cart> = this.wishListService.getWishList();
  loading$: Observable<boolean> = this.wishListService.getWishListLoading();

  constructor(protected wishListService: WishListFacade) {}

  removeEntry(item: OrderEntry) {
    this.wishListService.removeEntry(item);
  }
}
