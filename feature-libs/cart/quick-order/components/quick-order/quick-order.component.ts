import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  CmsQuickOrderComponent,
  QuickOrderStatePersistenceService,
} from '@spartacus/cart/quick-order/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  ActiveCartService,
  CartAddEntrySuccessEvent,
  GlobalMessageService,
  GlobalMessageType,
  OrderEntry,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'cx-quick-order',
  templateUrl: './quick-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderComponent implements OnInit, OnDestroy {
  cartId$: Observable<string>;
  entries$: Observable<OrderEntry[]>;
  quickOrderListLimit$: Observable<
    number | undefined
  > = this.component.data$.pipe(map((data) => data.quickOrderListLimit));
  isCartStable$: Observable<boolean> = combineLatest([
    this.activeCartService.getActiveCartId(),
    this.activeCartService.isStable(),
  ]).pipe(map(([activeCartId, isStable]) => (!activeCartId ? true : isStable)));
  globalMessageType = GlobalMessageType;

  private cartErrors$ = new BehaviorSubject<CartAddEntrySuccessEvent[]>([]);
  private subscription = new Subscription();

  constructor(
    protected activeCartService: ActiveCartService,
    protected component: CmsComponentData<CmsQuickOrderComponent>,
    protected globalMessageService: GlobalMessageService,
    protected quickOrderService: QuickOrderFacade,
    protected quickOrderStatePersistenceService: QuickOrderStatePersistenceService
  ) {}

  ngOnInit(): void {
    this.cartId$ = this.activeCartService.getActiveCartId();
    this.entries$ = this.quickOrderService.getEntries();
    this.quickOrderStatePersistenceService.initSync();
  }

  get errors$(): Observable<CartAddEntrySuccessEvent[]> {
    return this.cartErrors$.asObservable();
  }

  clear(): void {
    this.quickOrderService.clearList();
    this.globalMessageService.add(
      {
        key: 'quickOrderTable.listCleared',
      },
      GlobalMessageType.MSG_TYPE_INFO
    );
  }

  addToCart(): void {
    this.clearErrors();

    this.quickOrderService
      .addToCart()
      .pipe(first())
      .subscribe(([entriesLength, errors]) => {
        this.setErrors(errors);
        const noAddedEntries = errors.filter(
          (error) => error.quantityAdded === 0
        );

        if (entriesLength !== noAddedEntries.length) {
          this.showAddedToCartSuccessMessage();
        }
      });
  }

  clearErrors(): void {
    this.cartErrors$.next([]);
  }

  protected showAddedToCartSuccessMessage(): void {
    this.globalMessageService.add(
      {
        key: 'quickOrderTable.addedtoCart',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  protected setErrors(errors: CartAddEntrySuccessEvent[]): void {
    this.cartErrors$.next(errors);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
