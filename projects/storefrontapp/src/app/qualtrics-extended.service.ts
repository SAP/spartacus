import { Injectable } from '@angular/core';
import {
  CartService,
  QualtricsConfig,
  QualtricsLoaderService,
  WindowRef,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QualtricsExtendedService extends QualtricsLoaderService {
  constructor(
    winRef: WindowRef,
    config: QualtricsConfig,
    private cartService: CartService
  ) {
    super(winRef, config);
  }

  isDataLoaded(): Observable<boolean> {
    return this.cartService
      .getEntries()
      .pipe(map(entries => entries.length === 1));
  }
}
