import { Component } from '@angular/core';
import { Cart, WishListService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-wish-list',
  templateUrl: './wish-list.component.html',
})
export class WishListComponent {
  wishList$: Observable<Cart> = this.wishListService.getWishList();

  constructor(protected wishListService: WishListService) {}
}
