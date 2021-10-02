import { Injectable } from '@angular/core';
import { facadeFactory, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_CORE_FEATURE } from '../feature-name';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: WishListFacade,
      feature: CART_CORE_FEATURE,
      methods: [
        'createWishList',
        'getWishList',
        'loadWishList',
        'addEntry',
        'removeEntry',
        'getWishListLoading',
      ],
      async: true,
    }),
})
export abstract class WishListFacade {
  abstract createWishList(
    userId: string,
    name?: string,
    description?: string
  ): void;

  abstract getWishList(): Observable<Cart>;

  abstract loadWishList(userId: string, customerId: string): void;

  abstract addEntry(productCode: string): void;

  abstract removeEntry(entry: OrderEntry): void;

  abstract getWishListLoading(): Observable<boolean>;
}
