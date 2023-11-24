import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import { Address, UserAddressService } from '@spartacus/core';
import { throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class CartHandlerService {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected userAddressService: UserAddressService
  ) {}

  addProductTocart(
    productCode: string,
    quantity: number,
    pickupStore?: string | undefined
  ) {
    this.activeCartFacade.addEntry(productCode, quantity, pickupStore);

    return this.checkStableCart();
  }

  removeProductFromCart(productId: string) {
    if (!productId) {
      return throwError('');
    }
    if (productId) {
      return (
        this.activeCartFacade.getLastEntry(productId).pipe(take(1)),
        tap((entry) => {
          if (entry) {
            this.activeCartFacade.removeEntry(entry);
          }
        }),
        switchMap(() => {
          return this.checkStableCart();
        })
      );
    }
  }

  checkStableCart() {
    return this.activeCartFacade.isStable().pipe(
      filter((isStable) => !!isStable),
      take(1)
    );
  }

  getShippingMethods() {
    return this.checkoutDeliveryModesFacade.getSupportedDeliveryModes();
  }

  setDeliveryAddress(address: Address) {
    return this.checkoutDeliveryAddressFacade
      .createAndSetAddress(address)
      .pipe(switchMap(() => this.checkStableCart()));
  }

  updateDeliveryAddress(targetId: string, address: Address) {
    this.userAddressService.updateUserAddress(targetId, address);
    this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state) => !state.loading),
      take(1),
      map((state) => {
        return state.data as Address;
      })
    );
  }
}
