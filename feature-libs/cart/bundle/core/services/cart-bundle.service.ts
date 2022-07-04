import { Injectable } from '@angular/core';
import { Product, ProductService, UserIdService } from '@spartacus/core';
import {
  ActiveCartFacade,
  EntryGroup,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';
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
    protected productService: ProductService,
    protected activeCartService: ActiveCartFacade
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
  startBundle(starter: BundleStarter) {
    this.activeCartService
      .getActiveCartId()
      .pipe(take(1))
      .subscribe((cartId) => {
        this.userIdService.takeUserId().subscribe((userId) => {
          this.bundleService.startBundle(cartId, userId, starter);
        });
      });
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
