import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  CartAddEntrySuccessEvent,
  EventService,
  OrderEntry,
  Product,
  ProductAdapter,
} from '@spartacus/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { filter, finalize, first, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderService {
  protected productAdded$: Subject<string> = new Subject<string>();
  protected entries$: BehaviorSubject<OrderEntry[]> = new BehaviorSubject<
    OrderEntry[]
  >([]);
  protected showErrors = false;
  protected cartErrors: CartAddEntrySuccessEvent[] = [];

  private cartEventsSubscription: Subscription;

  constructor(
    protected activeCartService: ActiveCartService,
    protected productAdapter: ProductAdapter,
    protected eventService: EventService
  ) {}

  /**
   * Get entries
   */
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return this.entries$;
  }

  /**
   * Get show error flag
   */
  getShowError(): boolean {
    return this.showErrors;
  }

  /**
   * Set show error flag
   */
  setShowError(value: boolean): void {
    this.showErrors = value;
  }

  /**
   * Get cart errors
   */
  getCartErrors(): CartAddEntrySuccessEvent[] {
    return this.cartErrors;
  }

  /**
   * Set cart errors
   */
  setCartError(value: CartAddEntrySuccessEvent): void {
    this.cartErrors.push(value);
  }

  /**
   * Clear cart errors
   */
  clearCartErrors(): void {
    this.cartErrors = [];
    this.setShowError(false);
  }

  /**
   * Search product using sku
   */
  search(productCode: string): Observable<Product> {
    return this.productAdapter.load(productCode);
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
  addToCart(): Observable<number> {
    this.watchCartAddEntryEvents();
    let entriesLength = 0;

    return this.getEntries().pipe(
      first(),
      switchMap((entries) => {
        entriesLength = entries.length;
        this.activeCartService.addEntries(entries);
        this.clearList();

        return this.activeCartService.isStable();
      }),
      filter(Boolean),
      map(() => entriesLength),
      finalize(() => this.cartEventsSubscription?.unsubscribe())
    );
  }

  /**
   * Watch cart add entry events
   */
  protected watchCartAddEntryEvents(): void {
    const watchCartAddEntrySuccessEvent = this.eventService
      .get(CartAddEntrySuccessEvent)
      .subscribe((cartEvent: CartAddEntrySuccessEvent) => {
        if (
          cartEvent.quantityAdded === 0 ||
          (!!cartEvent.quantityAdded &&
            cartEvent.quantityAdded < cartEvent.quantity)
        ) {
          this.addCartError(cartEvent);
        }
      });

    this.cartEventsSubscription = new Subscription();
    this.cartEventsSubscription.add(watchCartAddEntrySuccessEvent);
  }

  /**
   * Add cart error
   */
  protected addCartError(error: CartAddEntrySuccessEvent): void {
    this.setCartError(error);
    this.setShowError(true);
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
}
