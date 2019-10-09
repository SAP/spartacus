import { Injectable } from '@angular/core';
import { CartService, WindowRef } from '@spartacus/core';
import { QualtricsConfig, QualtricsLoaderService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DemoQualtricsLoaderService extends QualtricsLoaderService {
  constructor(
    winRef: WindowRef,
    config: QualtricsConfig,
    private cartService: CartService
  ) {
    super(winRef, config);
  }

  /**
   * This logic exist in order to let the user add their own logic to wait for any kind of page data
   * Example: a user wants to wait for the page data and is listening to a data stream
   * where it returns Observable(true) when there is 1 item in the cart
   */
  isDataLoaded(): Observable<boolean> {
    return this.cartService
      .getEntries()
      .pipe(map(entries => entries.length === 1));
  }
}
