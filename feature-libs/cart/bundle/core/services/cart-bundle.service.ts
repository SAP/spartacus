import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { Product, ProductService, UserIdService } from '@spartacus/core';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { BundleService } from '../facade/bundle.service';
import { BundleProductScope } from '../model';
import { BundleTemplate } from '../model/bundle-template.model';
import { BundleStarter } from '../model/bundle.model';

@Injectable({
  providedIn: 'root',
})
export class CartBundleService {
  protected readonly PRODUCT_SCOPE = BundleProductScope.TEMPLATES;

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected bundleService: BundleService,
    protected productService: ProductService,
    protected multiCartService: MultiCartFacade
  ) {}

  getBundleTemplates(
    productCode: string
  ): Observable<BundleTemplate[] | undefined> {
    return this.productService.get(productCode, this.PRODUCT_SCOPE).pipe(
      switchMap((productBundleScope: Product) => {
        return of(productBundleScope?.bundleTemplates ?? []);
      })
    );
  }

  /**
   * Start bundle
   *
   * @param productCode
   * @param quantity
   * @param templateId
   */
  startBundle(starter: BundleStarter): Observable<Cart> {
    let newCart = new Subject<Cart>();

    this.userIdService
      .getUserId()
      .pipe(
        switchMap((userId) =>
          this.multiCartService
            .createCart({ userId })
            .pipe(map((cart) => ({ userId, cart })))
        ),
        take(1)
      )
      .subscribe(({ userId, cart }) => {
        newCart.next(cart);
        newCart.complete();
        if (cart.code) {
          this.bundleService.startBundle(cart.code, userId, starter);
        }
      });

    return newCart.asObservable();
  }

  /**
   * Get allowed Bundle Products
   *
   * @param entryGroupNumber
   */
  getBundleAllowedProducts(entryGroupNumber: number) {
    this.activeCartService
      .getActiveCartId()
      .pipe(take(1))
      .subscribe((cartId) => {
        this.userIdService.takeUserId().subscribe((userId) => {
          this.bundleService?.getBundleAllowedProducts(
            cartId,
            userId,
            entryGroupNumber
          );
        });
      });
  }

  /**
   * Get allowed Bundle Products
   *
   * @param entryGroupNumber
   */
  getAvailableEntries(entryGroupNumber: number) {
    let cartId;

    this.activeCartService
      .getActiveCartId()
      .pipe(take(1))
      .subscribe((activeCartId) => {
        cartId = activeCartId;
      });

    return this.bundleService.getAvailableEntriesEntity(
      cartId,
      entryGroupNumber
    );
  }
}
