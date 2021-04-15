import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  Product,
  UserIdService,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { QuickOrderAdapter } from '../connectors/quick-order.adapter';
import { QuickOrderEntry } from '../model/quick-order-entry.model';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderService {
  protected entries$: BehaviorSubject<OrderEntry[]> = new BehaviorSubject<
    OrderEntry[]
  >([]);

  constructor(
    protected activeCartService: ActiveCartService,
    protected quickOrderAdapter: QuickOrderAdapter,
    protected userIdService: UserIdService
  ) {}

  /**
   * Get entries
   */
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return this.entries$;
  }

  /**
   * Search product using sku
   */
  search(productCode: string): void {
    // TODO
    this.quickOrderAdapter.search(productCode).subscribe(
      (product: Product) => {
        console.log('product', product);
        const entry = this.generateOrderEntry(product);
        this.addEntry(entry);
      },
      (error: HttpErrorResponse) => {
        console.log('error', error);
      }
    );
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
  loadEntries(entries: OrderEntry[]): void {
    this.entries$.next(entries);
    console.log('loadEntries', entries);
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
   * Create new cart
   */
  createCart(): Observable<Cart> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) => {
        console.log('createCart', userId);
        return this.quickOrderAdapter.createCart(userId);
      })
    );
  }

  /**
   * Add entries to active cart
   */
  addToCart(cartCode: string, cartGuid?: string): Observable<Cart[]> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.getEntries(),
    ]).pipe(
      switchMap(([userId, entries]) => {
        console.log(userId, entries);
        const newEntries: QuickOrderEntry[] = (entries || []).map(
          (entry: OrderEntry) => {
            return {
              quantity: entry.quantity,
              product: {
                code: entry?.product?.code,
              },
            } as QuickOrderEntry;
          }
        );

        const cart = userId === 'anonymous' ? cartGuid : cartCode;

        return this.quickOrderAdapter.addToCart(
          userId,
          cart as string,
          newEntries
        );
      })
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
    console.log(entries);

    if (entry.product?.code && this.isProductOnTheList(entry.product.code)) {
      const entryIndex = entries.findIndex(
        (item: OrderEntry) => item.product?.code === entry.product?.code
      );

      const quantity = entries[entryIndex].quantity;

      if (quantity && entry.quantity) {
        entries[entryIndex].quantity = quantity + entry?.quantity;
      }
    }

    this.entries$.next([...entries, ...[entry]]);
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
