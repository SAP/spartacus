import { Component, OnInit } from '@angular/core';
import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
import { WishListService } from '../../../../../core/src/cart/facade';

@Component({
  selector: 'cx-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  wishList$: Observable<Cart>;
  constructor(protected wishListService: WishListService) {}

  ngOnInit() {
    this.wishList$ = this.wishListService.getWishList();
  }
}
