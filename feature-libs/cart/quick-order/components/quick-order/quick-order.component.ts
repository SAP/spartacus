import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
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
  Product,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { QuickOrderFormComponent } from './form/quick-order-form.component';

@Component({
  selector: 'cx-quick-order',
  templateUrl: './quick-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickOrderComponent implements OnInit, OnDestroy {
  cartId$: Observable<string>;
  entries$: Observable<OrderEntry[]>;
  quickOrderListLimit$: Observable<number | undefined> =
    this.component.data$.pipe(
      map((data) => data.quickOrderListLimit),
      tap((limit) => {
        if (!!limit) {
          this.quickOrderService.setListLimit(limit);
        }
      })
    );
  isCartStable$: Observable<boolean> = combineLatest([
    this.activeCartService.getActiveCartId(),
    this.activeCartService.isStable(),
  ]).pipe(map(([activeCartId, isStable]) => (!activeCartId ? true : isStable)));
  globalMessageType = GlobalMessageType;
  listLimitReached$: Observable<boolean>;

  @ViewChild('quickOrderForm')
  quickOrderForm: QuickOrderFormComponent;

  protected cartErrors$ = new BehaviorSubject<QuickOrderAddEntryEvent[]>([]);
  protected cartWarnings$ = new BehaviorSubject<QuickOrderAddEntryEvent[]>([]);
  protected cartSuccesses$ = new BehaviorSubject<OrderEntry[]>([]);
  protected showAddToCartInformation$ = new BehaviorSubject<boolean>(false);
  protected nonPurchasableProductError$ = new BehaviorSubject<Product | null>(
    null
  );

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

  get nonPurchasableError$(): Observable<Product | null> {
    return this.quickOrderService.getNonPurchasableProductError();
  }

  get addToCartInformation$(): Observable<boolean> {
    return this.showAddToCartInformation$.asObservable();
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
    if (!orderEntries.length) {
      this.showAddToCartInformation$.next(true);
      return;
    }

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

  clearAddToCartInformation(): void {
    this.showAddToCartInformation$.next(false);
  }

  undoDeletion(entry: OrderEntry): void {
    if (entry.product?.code) {
      this.quickOrderService.restoreSoftDeletedEntry(entry.product.code);
    }
  }

  clearDeletion(entry: OrderEntry): void {
    if (entry.product?.code) {
      this.quickOrderService.hardDeleteEntry(entry.product.code);
    }
  }

  clearNonPurchasableError(): void {
    this.quickOrderService.clearNonPurchasableProductError();
  }

  canAddProduct(): Observable<boolean> {
    return this.quickOrderService.canAdd();
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
