import { Injectable } from '@angular/core';
import {
  QuickOrderAddEntryEvent,
  QuickOrderFacade,
} from '@spartacus/cart/quick-order/root';
import {
  ActiveCartService,
  CartAddEntrySuccessEvent,
  EventService,
  OrderEntry,
  Product,
  ProductAdapter,
  CartAddEntryFailEvent,
  ProductSearchAdapter,
  ProductSearchPage,
  SearchConfig,
} from '@spartacus/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderService implements QuickOrderFacade {
  protected productAdded$: Subject<string> = new Subject<string>();
  protected entries$: BehaviorSubject<OrderEntry[]> = new BehaviorSubject<
    OrderEntry[]
  >([]);

  constructor(
    protected activeCartService: ActiveCartService,
    protected productAdapter: ProductAdapter,
    protected productSearchAdapter: ProductSearchAdapter,
    protected eventService: EventService
  ) {}

  /**
   * Get entries
   */
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return this.entries$;
  }

  /**
   * Search product using query
   */
  search(query: string, maxProducts: number): Observable<Product[]> {
    const searchConfig: SearchConfig = {
      pageSize: maxProducts,
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
    let evt: QuickOrderAddEntryEvent = {
      productCode: cartEvent.productCode,
      quantity: cartEvent.quantity,
      entry: (cartEvent as CartAddEntrySuccessEvent).entry || undefined,
      quantityAdded: (cartEvent as CartAddEntrySuccessEvent).quantityAdded,
      // @ts-ignore
      error: cartEvent.error || undefined,
    };

    if (evt.error?.details?.length) {
      let isOutOfStock = evt.error?.details.some(
        (e: any) => e.type === 'InsufficientStockError'
      );
      evt.quantityAdded = isOutOfStock ? 0 : evt.quantity;
    }

    return evt;
  }
}
