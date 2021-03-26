import { Injectable } from '@angular/core';
import { ActiveCartService, UserIdService } from '@spartacus/core';
import {
  take,
} from 'rxjs/operators';
import { BundleService } from '../facade/bundle.service';
import { BundleStarter } from '../model/bundle.model';

@Injectable({
  providedIn: 'root',
})
export class CartBundleService {
  constructor(
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected bundleService: BundleService
  ) {
  }


  /**
   * Start bundle
   *
   * @param productCode
   * @param quantity
   * @param templateId
   */
  startBundle(starter: BundleStarter) {
    this.activeCartService.getActiveCartId().pipe(take(1)).subscribe((cartId) => {
      this.userIdService.takeUserId().subscribe((userId) => {
        this.bundleService.startBundle(
          cartId,
          userId,
          starter
        );
      });
    });
  }

  /**
   * Get allowed Bundle Products
   *
   * @param entryGroupNumber
   */
  getBundleAllowedProducts(entryGroupNumber: number) {
    this.activeCartService.getActiveCartId().pipe(take(1)).subscribe((cartId) => {
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
    let cartId

    this.activeCartService.getActiveCartId().pipe(take(1)).subscribe((activeCartId) => {
      cartId = activeCartId
    });

    return this.bundleService.getAvailableEntriesEntity(
      cartId,
      entryGroupNumber
    );
  }
}
