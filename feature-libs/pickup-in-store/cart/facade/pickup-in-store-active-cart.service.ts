import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  getCartIdByUserId,
} from '@spartacus/cart/base/core';
import { MultiCartFacade } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import { withLatestFrom } from 'rxjs/operators';

@Injectable()
export class PickupInStoreActiveCartService extends ActiveCartService {
  constructor(
    protected readonly userIdService: UserIdService,
    protected readonly multiCartFacade: MultiCartFacade,
    protected readonly intendedPickupLocationFacade: IntendedPickupLocationFacade
  ) {
    super(multiCartFacade, userIdService);
  }

  addEntry(productCode: string, quantity: number): void {
    this.requireLoadedCart()
      .pipe(
        withLatestFrom(
          this.userIdService.getUserId(),
          this.intendedPickupLocationFacade.getIntendedLocation(productCode)
        )
      )
      .subscribe(([cart, userId, location]) => {
        this.multiCartFacade.addEntry(
          userId,
          getCartIdByUserId(cart, userId),
          productCode,
          quantity,
          location?.pickupOption === 'pickup' ? location.name : undefined
        );
      });
  }
}
