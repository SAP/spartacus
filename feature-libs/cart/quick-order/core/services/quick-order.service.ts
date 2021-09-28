import { Injectable, OnDestroy } from '@angular/core';
import {
  defaultQuickOrderFormConfig,
  QuickOrderAddEntryEvent,
  QuickOrderFacade,
} from '@spartacus/cart/quick-order/root';
import {
  ActiveCartService,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  EventService,
  HttpErrorModel,
  OrderEntry,
  Product,
  ProductSearchAdapter,
  ProductSearchPage,
  SearchConfig,
} from '@spartacus/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  timer,
} from 'rxjs';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';
import { ClearMessageTimout } from '../models/clear-message-timeout.model';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderService implements QuickOrderFacade, OnDestroy {
  protected productAdded$: Subject<string> = new Subject<string>();
  protected entries$: BehaviorSubject<OrderEntry[]> = new BehaviorSubject<
    OrderEntry[]
  >([]);
  protected deletedEntries$: BehaviorSubject<OrderEntry[]> =
    new BehaviorSubject<OrderEntry[]>([]);
  protected deletionClearTimeout = 5000;

  private clearMessageTimeoutArray: ClearMessageTimout[] = [];

  constructor(
    protected activeCartService: ActiveCartService,
    protected productSearchAdapter: ProductSearchAdapter,
    protected eventService: EventService
  ) {}

  ngOnDestroy(): void {
    (this.clearMessageTimeoutArray || []).forEach(
      (element: ClearMessageTimout) => {
        element.subscription?.unsubscribe();
      }
    );
  }

  /**
   * Get entries
   */
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return this.entries$;
  }

  /**
   * Search product using query
   */
  search(query: string, maxProducts?: number): Observable<Product[]> {
    const searchConfig: SearchConfig = {
      pageSize:
        maxProducts || defaultQuickOrderFormConfig.quickOrderForm?.maxProducts,
    };
    return this.productSearchAdapter
      .search(query, searchConfig)
      .pipe(map((searchPage: ProductSearchPage) => searchPage.products || []));
  }

  /**
   * Clear a list of added entries
   */
  clearList(): void {
    this.entries$.next([]);
  }

  /**
   * Load a list of entries
   */
  loadEntries(entries: OrderEntry[] = []): void {
    this.entries$.next(entries);
  }

  /**
   * Load a list of entries
   */
  updateEntryQuantity(entryIndex: number, quantity: number): void {
    const entries = this.entries$.getValue() || [];
    entries[entryIndex].quantity = quantity;

    this.entries$.next(entries);
  }

  /**
   * Remove single entry from the list
   */
  removeEntry(index: number): void {
    this.entries$.pipe(take(1)).subscribe((entries: OrderEntry[]) => {
      const entriesList = entries;
      this.addDeletedEntry(entriesList[index], true);
      entriesList.splice(index, 1);
      this.entries$.next(entriesList);
    });
  }

  /**
   * Add product to the quick order list
   */
  addProduct(product: Product): void {
    const entry = this.generateOrderEntry(product);
    this.addEntry(entry);
  }

  /**
   * Return product added subject
   */
  getProductAdded(): Subject<string> {
    return this.productAdded$;
  }

  /**
   * Set product added subject
   */
  setProductAdded(productCode: string): void {
    this.productAdded$.next(productCode);
  }

  /**
   * Adding to cart all products from the list
   */
  addToCart(): Observable<[OrderEntry[], QuickOrderAddEntryEvent[]]> {
    let entries: OrderEntry[] = [];
    const events: QuickOrderAddEntryEvent[] = [];
    const subscription = this.eventService
      .get(CartAddEntrySuccessEvent)
      .subscribe((cartEvent: CartAddEntrySuccessEvent) => {
        if (
          cartEvent.quantityAdded === 0 ||
          (!!cartEvent.quantityAdded &&
            cartEvent.quantityAdded < cartEvent.quantity)
        ) {
          events.push(this.createQuickOrderResultEvent(cartEvent));
        }
      });

    subscription.add(
      this.eventService
        .get(CartAddEntryFailEvent)
        .subscribe((cartEvent: CartAddEntryFailEvent) => {
          events.push(this.createQuickOrderResultEvent(cartEvent));
        })
    );

    return this.getEntries().pipe(
      first(),
      switchMap((elements) => {
        entries = elements;
        this.activeCartService.addEntries(elements);
        this.clearList();

        return this.activeCartService.isStable();
      }),
      filter((isStable) => isStable),
      map(() => [entries, events] as [OrderEntry[], QuickOrderAddEntryEvent[]]),
      tap(() => subscription.unsubscribe())
    );
  }

  /**
   * Add deleted entry
   */
  addDeletedEntry(entry: OrderEntry, clearTimeout?: boolean): void {
    const deletedEntries = this.deletedEntries$.getValue() || [];

    if (entry.product?.code) {
      deletedEntries.push(entry);

      this.deletedEntries$.next(deletedEntries);

      if (clearTimeout) {
        const subscription: Subscription = timer(
          this.deletionClearTimeout
        ).subscribe(() => {
          if (entry.product?.code) {
            this.clearDeletedEntry(entry.product?.code);
          }
        });

        const newClearMessageTimeout: ClearMessageTimout = {
          productCode: entry.product?.code,
          subscription,
        };

        this.clearMessageTimeoutArray.push(newClearMessageTimeout);
      }
    }
  }

  /**
   * Return deleted entries
   */
  getDeletedEntries(): Observable<OrderEntry[]> {
    return this.deletedEntries$;
  }

  /**
   * Undo deleted entry
   */
  undoDeletedEntry(productCode: string): void {
    const deletedEntries = this.deletedEntries$.getValue() || [];
    const entryIndex = this.getDeletedEntryIndex(productCode);

    if (entryIndex !== -1) {
      this.addEntry(deletedEntries[entryIndex]);
      deletedEntries.splice(entryIndex, 1);
      this.deletedEntries$.next(deletedEntries);
    }
  }

  /**
   * Clear deleted entry from the list
   */
  clearDeletedEntry(productCode: string): void {
    const deletedEntries = this.deletedEntries$.getValue() || [];
    const entryIndex = this.getDeletedEntryIndex(productCode);

    if (entryIndex !== -1) {
      deletedEntries.splice(entryIndex, 1);
      this.deletedEntries$.next(deletedEntries);
    }

    this.getAndUnsubscribeClearMessageTimout(productCode);
  }

  /**
   * Get deletion entry index
   */
  protected getDeletedEntryIndex(productCode: string): number {
    const deletedEntries = this.deletedEntries$.getValue() || [];

    return (deletedEntries || []).findIndex(
      (element: OrderEntry) => element.product?.code === productCode
    );
  }

  /**
   * Generate Order Entry from Product
   */
  protected generateOrderEntry(product: Product): OrderEntry {
    return {
      basePrice: product.price,
      product: product,
      quantity: 1,
      totalPrice: product.price,
    } as OrderEntry;
  }

  /**
   * Add single entry to the list
   */
  protected addEntry(entry: OrderEntry): void {
    const entries = this.entries$.getValue() || [];

    if (entry.product?.code && this.isProductOnTheList(entry.product.code)) {
      const entryIndex = entries.findIndex(
        (item: OrderEntry) => item.product?.code === entry.product?.code
      );
      const quantity = entries[entryIndex].quantity;

      if (quantity && entry.quantity) {
        entries[entryIndex].quantity = quantity + entry?.quantity;
      }

      this.entries$.next([...entries]);
    } else {
      this.entries$.next([...entries, ...[entry]]);
    }

    this.productAdded$.next(entry.product?.code);
  }

  /**
   * Verify if product is already on the list
   */
  protected isProductOnTheList(productCode: string): boolean {
    const entries = this.entries$.getValue() || [];

    return !!entries.find(
      (item: OrderEntry) => item.product?.code === productCode
    );
  }

  private createQuickOrderResultEvent(
    cartEvent: CartAddEntrySuccessEvent | CartAddEntryFailEvent
  ): QuickOrderAddEntryEvent {
    const evt: QuickOrderAddEntryEvent = {
      productCode: cartEvent.productCode,
      quantity: cartEvent.quantity,
    };

    if ('entry' in cartEvent) {
      evt.entry = cartEvent.entry;
    }
    if ('quantityAdded' in cartEvent) {
      evt.quantityAdded = cartEvent.quantityAdded;
    }
    if ('error' in cartEvent && cartEvent.error instanceof HttpErrorModel) {
      evt.error = cartEvent.error;
    }

    if (evt.error?.details?.length) {
      const isOutOfStock = evt.error?.details.some(
        (e) => e.type === 'InsufficientStockError'
      );
      evt.quantityAdded = isOutOfStock ? 0 : evt.quantity;
    }

    return evt;
  }

  protected getAndUnsubscribeClearMessageTimout(productCode: string): void {
    const clearMessageTimoutIndex = (
      this.clearMessageTimeoutArray || []
    ).findIndex(
      (element: ClearMessageTimout) => element.productCode === productCode
    );

    if (clearMessageTimoutIndex !== -1) {
      this.clearMessageTimeoutArray[
        clearMessageTimoutIndex
      ].subscription?.unsubscribe();

      this.clearMessageTimeoutArray.splice(clearMessageTimoutIndex, 1);
    }
  }
}
