import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  getCartIdByUserId,
} from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { PointOfService, User, UserIdService } from '@spartacus/core';
import { IntendedPickupLocationFacade } from 'feature-libs/pickup-in-store/root';
import { Observable } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class PickupInStoreActiveCartService implements ActiveCartFacade {
  constructor(
    protected readonly activeCartService: ActiveCartService,
    protected readonly userIdService: UserIdService,
    protected readonly multiCartFacade: MultiCartFacade,
    protected readonly intendedPickupLocationFacade: IntendedPickupLocationFacade
  ) {}

  getActive(): Observable<Cart> {
    return this.activeCartService.getActive();
  }
  takeActive(): Observable<Cart> {
    return this.activeCartService.takeActive();
  }
  getActiveCartId(): Observable<string> {
    return this.activeCartService.getActiveCartId();
  }
  takeActiveCartId(): Observable<string> {
    return this.activeCartService.takeActiveCartId();
  }
  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartService.getEntries();
  }
  getLastEntry(productCode: string): Observable<OrderEntry | undefined> {
    return this.activeCartService.getLastEntry(productCode);
  }
  getLoading(): Observable<boolean> {
    return this.activeCartService.getLoading();
  }
  isStable(): Observable<boolean> {
    return this.activeCartService.isStable();
  }
  addEntry(productCode: string, quantity: number): void {
    // here we check if the product is going to be picked up in store
    // if it is we do our own snazzy logic
    // if it is not (i.e. for delivery) we just fallback to the default behaviour (i.e. activeCartService)

    // TODO check feature level, maybe
    // this.featureConfigService.isLevel('5.1');

    // If we have an intended Pickup Location, then add to cart with it
    this.intendedPickupLocationFacade
      .getIntendedLocation(productCode)
      .pipe(
        filter((location): location is PointOfService => !!location),
        withLatestFrom(this.requireLoadedCart(), this.userIdService.getUserId())
      )
      .subscribe(([location, cart, userId]) => {
        this.multiCartFacade.addEntry(
          userId,
          getCartIdByUserId(cart, userId),
          productCode,
          quantity,
          location.name
        );
      });

    // Otherwise, use the current implementation
    // The current impl has a subscribe in it which is an issue
    return this.activeCartService.addEntry(productCode, quantity);
  }
  removeEntry(entry: OrderEntry): void {
    return this.activeCartService.removeEntry(entry);
  }
  updateEntry(entryNumber: number, quantity: number): void {
    return this.activeCartService.updateEntry(entryNumber, quantity);
  }
  getEntry(productCode: string): Observable<OrderEntry | undefined> {
    return this.activeCartService.getEntry(productCode);
  }
  addEmail(email: string): void {
    return this.activeCartService.addEmail(email);
  }
  getAssignedUser(): Observable<User> {
    return this.activeCartService.getAssignedUser();
  }
  isGuestCart(cart?: Cart | undefined): Observable<boolean> {
    return this.activeCartService.isGuestCart(cart);
  }
  addEntries(cartEntries: OrderEntry[]): void {
    return this.activeCartService.addEntries(cartEntries);
  }
  requireLoadedCart(forGuestMerge?: boolean | undefined): Observable<Cart> {
    return this.activeCartService.requireLoadedCart(forGuestMerge);
  }
  reloadActiveCart(): void {
    return this.activeCartService.reloadActiveCart();
  }
}
