import { Component } from '@angular/core';
import { Cart, WishListService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent {
  wishList$: Observable<Cart> = this.wishListService.getWishList();

  constructor(protected wishListService: WishListService) {}
}
