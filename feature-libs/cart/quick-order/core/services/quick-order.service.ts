import { Injectable, OnDestroy } from '@angular/core';
import {
  defaultQuickOrderConfig,
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
  ProductSearchConnector,
  ProductSearchPage,
  SearchConfig,
} from '@spartacus/core';
import {
  BehaviorSubject,
  Observable,
  of,
  Subject,
  Subscription,
  timer,
} from 'rxjs';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class QuickOrderService implements QuickOrderFacade, OnDestroy {
  protected productAdded$: Subject<string> = new Subject<string>();
  protected entries$: BehaviorSubject<OrderEntry[]> = new BehaviorSubject<
    OrderEntry[]
  >([]);
  protected softDeletedEntries$: BehaviorSubject<Record<string, OrderEntry>> =
    new BehaviorSubject<Record<string, OrderEntry>>({});
  protected nonPurchasableProductError$: BehaviorSubject<Product | null> =
    new BehaviorSubject<Product | null>(null);
  protected hardDeleteTimeout = 5000;
  protected quickOrderListLimit = 0;
  protected clearDeleteTimeouts: Record<string, Subscription> = {};

  constructor(
    protected activeCartService: ActiveCartService,
    protected eventService: EventService,
    protected productSearchConnector: ProductSearchConnector //TODO(#14059): Make it required
  ) {}

  ngOnDestroy(): void {
    this.clearDeletedEntries();
  }

  /**
   * Get entries
   */
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return this.entries$;
  }

  /**
   * Search products using query
   */
  searchProducts(query: string, maxProducts?: number): Observable<Product[]> {
    // TODO(#14059): Remove condition
    if (this.productSearchConnector) {
      const searchConfig: SearchConfig = {
        pageSize:
          maxProducts ||
          defaultQuickOrderConfig.quickOrder?.searchForm?.maxProducts,
      };
      return this.productSearchConnector
        .search(query, searchConfig)
        .pipe(
          map((searchPage: ProductSearchPage) => searchPage.products || [])
        );
    } else {
      return of([]);
    }
  }

  /**
   * Clear a list of added entries
   */
  clearList(): void {
    this.entries$.next([]);
  }

  /**
   * Get information about the possibility to add the next product
   */
  canAdd(code?: string): Observable<boolean> {
    if (code) {
      return of(this.isProductOnTheList(code) || !this.isLimitExceeded());
    } else {
      return of(!this.isLimitExceeded());
    }
  }

  /**
   * Set quick order list limit property
   */
  setListLimit(limit: number): void {
    this.quickOrderListLimit = limit;
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
   * Delete single entry from the list
   */
  softDeleteEntry(index: number): void {
    this.entries$.pipe(take(1)).subscribe((entries: OrderEntry[]) => {
      const entriesList = entries;
      this.addSoftEntryDeletion(entriesList[index], true);
      entriesList.splice(index, 1);
      this.entries$.next(entriesList);
    });
  }

  /**
   * Add product to the quick order list
   */
  addProduct(product: Product, quantity: number = 1): void {
    const entry = this.generateOrderEntry(product, quantity);
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
   * Return soft deleted entries
   */
  getSoftDeletedEntries(): Observable<Record<string, OrderEntry>> {
    return this.softDeletedEntries$;
  }

  /**
   * Restore soft deleted entry
   */
  restoreSoftDeletedEntry(productCode: string): void {
    const entry = this.getSoftDeletedEntry(productCode);

    this.addEntry(entry);
    this.hardDeleteEntry(productCode);
  }

  /**
   * Clear deleted entry from the list
   */
  hardDeleteEntry(productCode: string): void {
    const entry = this.getSoftDeletedEntry(productCode);
    const deletedEntries = this.softDeletedEntries$.getValue();

    if (entry) {
      delete deletedEntries[productCode];
      this.softDeletedEntries$.next(deletedEntries);
    }

    this.clearDeleteTimeout(productCode);
  }

  /**
   * Clear all deleted entries and timeout subscriptions
   */
  clearDeletedEntries(): void {
    Object.values(this.clearDeleteTimeouts).forEach(
      (subscription: Subscription) => subscription.unsubscribe()
    );

    this.softDeletedEntries$.next({});
    this.clearDeleteTimeouts = {};
  }

  /**
   *  Return non purchasable product error
   */
  getNonPurchasableProductError(): Observable<Product | null> {
    return this.nonPurchasableProductError$;
  }

  /**
   * Set error that selected product is not purchasable
   */
  setNonPurchasableProductError(product: Product): void {
    this.nonPurchasableProductError$.next(product);
  }

  /**
   * Clear not purchasable product error
   */
  clearNonPurchasableProductError(): void {
    this.nonPurchasableProductError$.next(null);
  }

  /**
   * Add soft deleted entry to the cached list
   */
  protected addSoftEntryDeletion(
    entry: OrderEntry,
    clearTimeout: boolean = true
  ): void {
    const deletedEntries = this.softDeletedEntries$.getValue();
    const productCode = entry?.product?.code;

    if (productCode) {
      deletedEntries[productCode] = entry;

      this.softDeletedEntries$.next(deletedEntries);

      if (clearTimeout) {
        const subscription: Subscription = timer(
          this.hardDeleteTimeout
        ).subscribe(() => {
          this.hardDeleteEntry(productCode);
        });

        this.clearDeleteTimeouts[productCode] = subscription;
      }
    }
  }

  /**
   * Get soft deletion entry
   */
  protected getSoftDeletedEntry(productCode: string): OrderEntry {
    const deletedEntries = this.softDeletedEntries$.getValue();

    return deletedEntries[productCode];
  }

  /**
   * Generate Order Entry from Product
   */
  protected generateOrderEntry(
    product: Product,
    quantity?: number
  ): OrderEntry {
    return {
      basePrice: product.price,
      product,
      quantity,
      totalPrice: product.price,
    } as OrderEntry;
  }

  /**
   * Add single entry to the list
   */
  protected addEntry(entry: OrderEntry): void {
    if (
      entry?.product?.code &&
      !this.isProductOnTheList(entry.product.code) &&
      this.isLimitExceeded()
    ) {
      return;
    }

    const entries = this.entries$.getValue() || [];
    const entryStockLevel = entry.product?.stock?.stockLevel;

    if (entryStockLevel && entry.quantity && entry.quantity > entryStockLevel) {
      entry.quantity = entryStockLevel;
    }

    if (entry.product?.code && this.isProductOnTheList(entry.product.code)) {
      const entryIndex = entries.findIndex(
        (item: OrderEntry) => item.product?.code === entry.product?.code
      );
      let quantity = entries[entryIndex].quantity;

      if (quantity && entry.quantity) {
        entries[entryIndex].quantity = quantity + entry?.quantity;
        let newQuantity = entries[entryIndex].quantity;

        if (newQuantity && entryStockLevel && newQuantity > entryStockLevel) {
          entries[entryIndex].quantity = entryStockLevel;
        }

        this.entries$.next([...entries]);
      }
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

  protected isLimitExceeded(): boolean {
    const entries = this.entries$.getValue() || [];

    return entries.length >= this.quickOrderListLimit;
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

  protected clearDeleteTimeout(productCode: string): void {
    const clearMessageTimout = this.clearDeleteTimeouts[productCode];

    if (clearMessageTimout) {
      clearMessageTimout.unsubscribe();
      delete this.clearDeleteTimeouts[productCode];
    }
  }
}
