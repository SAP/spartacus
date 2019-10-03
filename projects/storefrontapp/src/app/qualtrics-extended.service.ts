import { Injectable } from '@angular/core';
import { CartService, WindowRef } from '@spartacus/core';
import { QualtricsService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QualtricsExtendedService extends QualtricsService {
  constructor(winRef: WindowRef, private cartService: CartService) {
    super(winRef);
  }

  isDataLoaded(): Observable<boolean> {
    return this.cartService
      .getEntries()
      .pipe(map(entries => entries.length === 1));
  }
}
