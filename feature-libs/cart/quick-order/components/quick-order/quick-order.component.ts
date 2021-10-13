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
import {
  QuickOrderAddEntryEvent,
  QuickOrderFacade,
} from '@spartacus/cart/quick-order/root';
import {
  ActiveCartService,
  GlobalMessageService,
  GlobalMessageType,
  OrderEntry,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'cx-quick-order',
  templateUrl: './quick-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderComponent implements OnInit, OnDestroy {
  cartId$: Observable<string>;
  entries$: Observable<OrderEntry[]>;
  quickOrderListLimit$: Observable<number | undefined> =
    this.component.data$.pipe(map((data) => data.quickOrderListLimit));
  isCartStable$: Observable<boolean> = combineLatest([
    this.activeCartService.getActiveCartId(),
    this.activeCartService.isStable(),
  ]).pipe(map(([activeCartId, isStable]) => (!activeCartId ? true : isStable)));
  globalMessageType = GlobalMessageType;

  private cartErrors$ = new BehaviorSubject<QuickOrderAddEntryEvent[]>([]);
  private cartWarnings$ = new BehaviorSubject<QuickOrderAddEntryEvent[]>([]);
  private cartSuccesses$ = new BehaviorSubject<OrderEntry[]>([]);

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

  ngOnDestroy(): void {
    this.quickOrderService.clearDeletedEntries();
  }

  get errors$(): Observable<QuickOrderAddEntryEvent[]> {
    return this.cartErrors$.asObservable();
  }

  get warnings$(): Observable<QuickOrderAddEntryEvent[]> {
    return this.cartWarnings$.asObservable();
  }

  get successes$(): Observable<OrderEntry[]> {
    return this.cartSuccesses$.asObservable();
  }
  get softDeletedEntries$(): Observable<Record<string, OrderEntry>> {
    return this.quickOrderService.getSoftDeletedEntries();
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

  addToCart(orderEntries: OrderEntry[]): void {
    this.clearStatuses();

    this.quickOrderService
      .addToCart()
      .pipe(first())
      .subscribe(([entries, errors]) => {
        errors.forEach((err) => {
          if (!err.entry) {
            err.entry = orderEntries.find(
              (e) => e.product?.code === err.productCode
            );
          }
        });

        this.extractErrors(errors);
        this.extractWarnings(errors);

        if (!errors.length) {
          this.showAddedToCartSuccessMessage();
        } else {
          this.extractSuccesses(errors, entries);
        }
      });
  }

  clearErrors(): void {
    this.cartErrors$.next([]);
  }

  clearWarnings(): void {
    this.cartWarnings$.next([]);
  }

  clearSuccesses(): void {
    this.cartSuccesses$.next([]);
  }

  undoDeletion(entry: OrderEntry): void {
    if (entry.product?.code) {
      this.quickOrderService.restoreSoftDeletedEntry(entry.product?.code);
    }
  }

  clearDeletion(entry: OrderEntry): void {
    if (entry.product?.code) {
      this.quickOrderService.hardDeleteEntry(entry.product?.code);
    }
  }

  protected extractErrors(errors: QuickOrderAddEntryEvent[]): void {
    const noAddedEntries = errors.filter((error) => error.quantityAdded === 0);

    this.setErrors(noAddedEntries);
  }

  protected extractWarnings(errors: QuickOrderAddEntryEvent[]): void {
    const warnings = errors.filter((error) => error.quantityAdded !== 0);

    this.setWarnings(warnings);
  }

  protected extractSuccesses(
    errors: QuickOrderAddEntryEvent[],
    entries: OrderEntry[]
  ): void {
    const successAddedEntries: OrderEntry[] = [];

    entries.forEach((entry) => {
      const element = errors.find(
        (error) => error.productCode === entry.product?.code
      );
      if (!element) {
        successAddedEntries.push(entry);
      }
    });

    this.setSuccesses(successAddedEntries);
  }

  protected clearStatuses(): void {
    this.clearErrors();
    this.clearWarnings();
    this.clearSuccesses();
  }

  protected showAddedToCartSuccessMessage(): void {
    this.globalMessageService.add(
      {
        key: 'quickOrderTable.addedtoCart',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  protected setErrors(errors: QuickOrderAddEntryEvent[]): void {
    this.cartErrors$.next(errors);
  }

  protected setWarnings(warnings: QuickOrderAddEntryEvent[]): void {
    this.cartWarnings$.next(warnings);
  }

  protected setSuccesses(entries: OrderEntry[]): void {
    this.cartSuccesses$.next(entries);
  }
}
