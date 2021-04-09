import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  OrderEntry,
  Product,
  UserIdService,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { QuickOrderAdapter } from '../connectors/quick-order.adapter';

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
   * Get products
   */
  getProducts(): BehaviorSubject<OrderEntry[]> {
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
        this.addProduct(entry);
      },
      (error: HttpErrorResponse) => {
        console.log('error', error);
      }
    );
  }

  /**
   * Clear a list of added products
   */
  clearList(): void {
    this.entries$.next([]);
  }

  /**
   * Remove single product from the list
   */
  removeProduct(index: number): void {
    this.entries$.pipe(take(1)).subscribe((entries: OrderEntry[]) => {
      const entriesList = entries;
      entriesList.splice(index, 1);
      this.entries$.next(entriesList);
    });
  }

  /**
   * Add products to active cart
   */
  addToCart(): Observable<void> {
    return combineLatest([
      this.activeCartService.getActive(),
      this.userIdService.takeUserId(true),
      this.getProducts(),
    ]).pipe(
      switchMap(([cart, userId, entries]) =>
        this.quickOrderAdapter.addToCart(userId, cart.code as string, entries)
      )
    );
  }

  /**
   * Generate Order Entry from Product
   */
  protected generateOrderEntry(product: Product): OrderEntry {
    return {
      product: product,
      quantity: 1,
    } as OrderEntry;
  }

  /**
   * Add single product to the list
   */
  protected addProduct(entry: OrderEntry): void {
    this.entries$.next([...this.entries$.getValue(), ...[entry]]);
  }
}
