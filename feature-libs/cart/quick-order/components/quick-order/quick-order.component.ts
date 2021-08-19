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
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  OrderEntry,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { finalize, first, map } from 'rxjs/operators';

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
  showErrors: boolean = false;

  private cartErrors: any[] = [];
  private cartEventsSubscription: Subscription;
  private subscription = new Subscription();

  constructor(
    protected activeCartService: ActiveCartService,
    protected component: CmsComponentData<CmsQuickOrderComponent>,
    protected eventService: EventService,
    protected globalMessageService: GlobalMessageService,
    protected quickOrderService: QuickOrderFacade,
    protected quickOrderStatePersistenceService: QuickOrderStatePersistenceService
  ) {}

  ngOnInit(): void {
    this.cartId$ = this.activeCartService.getActiveCartId();
    this.entries$ = this.quickOrderService.getEntries();
    this.quickOrderStatePersistenceService.initSync();
  }

  get errors(): CartAddEntrySuccessEvent[] {
    return this.cartErrors;
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
    this.watchCartAddEntryEvents();

    this.quickOrderService
      .addToCart()
      .pipe(
        first(),
        finalize(() => this.cartEventsSubscription?.unsubscribe())
      )
      .subscribe((entriesLength: number) => {
        if (this.errors.length) {
          this.showErrors = true;
        }

        const noAddedEntries = this.errors.filter(
          (error) => error.quantityAdded === 0
        );

        if (entriesLength !== noAddedEntries.length) {
          this.showAddedToCartSuccessMessage();
        }
      });
  }

  clearErrors(): void {
    this.cartErrors = [];
    this.showErrors = false;
  }

  protected showAddedToCartSuccessMessage(): void {
    this.globalMessageService.add(
      {
        key: 'quickOrderTable.addedtoCart',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  protected watchCartAddEntryEvents(): void {
    const watchCartAddEntrySuccessEvent = this.eventService
      .get(CartAddEntrySuccessEvent)
      .subscribe((cartEvent: CartAddEntrySuccessEvent) => {
        if (
          cartEvent.quantityAdded === 0 ||
          (!!cartEvent.quantityAdded &&
            cartEvent.quantityAdded < cartEvent.quantity)
        ) {
          this.addError(cartEvent);
        }
      });

    this.cartEventsSubscription = new Subscription();
    this.cartEventsSubscription.add(watchCartAddEntrySuccessEvent);
  }

  protected addError(error: CartAddEntrySuccessEvent): void {
    this.cartErrors.push(error);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.cartEventsSubscription?.unsubscribe();
  }
}
