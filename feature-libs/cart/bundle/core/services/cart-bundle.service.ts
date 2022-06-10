import { Injectable } from '@angular/core';
import { Product, ProductService, UserIdService } from '@spartacus/core';
import { Cart, EntryGroup, MultiCartFacade } from 'feature-libs/cart/base/root';
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
    protected multiCartService: MultiCartFacade,
    protected userIdService: UserIdService,
    protected bundleService: BundleService,
    protected productService: ProductService
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
   * Get bundle for given cart id
   *
   * @param cartId
   */
  getBundle(cartId: string): Observable<EntryGroup> {
    return this.multiCartService.getEntryGroups(cartId).pipe(
      map(
        (groups) =>
          // There is always cart created for each new bundle so our cart will have only one bundle entry group
          groups.find((group) =>
            this.bundleService.isBundle(group)
          ) as EntryGroup
      )
    );
  }

  toggleProductSelection(
    isSelected: boolean,
    cartId: string,
    bundleId: number,
    sectionId: number,
    product: Product
  ): void {
    if (isSelected) {
      this.bundleService.removeProductFromBundle(
        cartId,
        bundleId,
        sectionId,
        product
      );
    } else {
      this.bundleService.addProductToBundle(
        cartId,
        bundleId,
        sectionId,
        product
      );
    }
  }
}
