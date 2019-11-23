import { Component } from '@angular/core';
import { AuthService, Cart, WishListService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-wish-list',
  templateUrl: './wish-list.component.html',
})
export class WishListComponent {
  wishList$: Observable<Cart> = this.wishListService.getWishList();

  userLoggedIn$: Observable<boolean> = this.authService.isUserLoggedIn();

  constructor(
    protected wishListService: WishListService,
    protected authService: AuthService
  ) {}
}
