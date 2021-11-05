import { Injectable } from '@angular/core';
import {
  Cart,
  CartType,
  OrderEntry,
  SelectiveCartFacade,
} from '@spartacus/cart/main/root';
import {
  BaseSiteService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { MultiCartService } from './multi-cart.service';

@Injectable({
  providedIn: 'root',
})
export class SelectiveCartService implements SelectiveCartFacade {
  constructor(
    protected userService: UserService,
    protected multiCartService: MultiCartService,
    protected baseSiteService: BaseSiteService,
    protected userIdService: UserIdService
  ) {}

  getCart(): Observable<Cart> {
    return combineLatest([
      this.getSelectiveCartId(),
      this.userService.get(),
      this.userIdService.getUserId(),
      this.baseSiteService.getActive(),
    ]).pipe(
      distinctUntilChanged(),
      tap(([selectiveId, user, userId, activeBaseSite]) => {
        if (
          !Boolean(selectiveId) &&
          userId !== OCC_USER_ID_ANONYMOUS &&
          user?.customerId
        ) {
          this.multiCartService.loadCart({
            userId: userId,
            cartId: `selectivecart${activeBaseSite}${user.customerId}`,
          });
        }
      }),
      filter(([selectiveId]) => Boolean(selectiveId)),
      switchMap(([selectiveId]) => this.multiCartService.getCart(selectiveId)),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.getSelectiveCartId().pipe(
      switchMap((selectiveId) => this.multiCartService.getEntries(selectiveId))
    );
  }

  isStable(): Observable<boolean> {
    return this.getSelectiveCartId().pipe(
      switchMap((selectiveId) => this.multiCartService.isStable(selectiveId))
    );
  }

  addEntry(productCode: string, quantity: number): void {
    this.prepareEntryAction().subscribe(([selectiveId, userId]) => {
      this.multiCartService.addEntry(
        userId,
        selectiveId,
        productCode,
        quantity
      );
    });
  }

  removeEntry(entry: OrderEntry): void {
    this.prepareEntryAction().subscribe(([selectiveId, userId]) => {
      this.multiCartService.removeEntry(
        userId,
        selectiveId,
        entry.entryNumber as number
      );
    });
  }

  updateEntry(entryNumber: number, quantity: number): void {
    this.prepareEntryAction().subscribe(([selectiveId, userId]) => {
      this.multiCartService.updateEntry(
        userId,
        selectiveId,
        entryNumber,
        quantity
      );
    });
  }

  getEntry(productCode: string): Observable<OrderEntry | undefined> {
    return this.getSelectiveCartId().pipe(
      switchMap((selectiveId) =>
        this.multiCartService.getEntry(selectiveId, productCode)
      )
    );
  }

  protected getSelectiveCartId(): Observable<string> {
    return this.multiCartService.getCartIdByType(CartType.SELECTIVE);
  }

  private prepareEntryAction(): Observable<string[]> {
    return this.getSelectiveCartId().pipe(
      distinctUntilChanged(),
      withLatestFrom(this.userIdService.getUserId()),
      take(1)
    );
  }
}
