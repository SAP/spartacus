import { Injectable, RendererFactory2 } from '@angular/core';
import { ActiveCartService, WindowRef } from '@spartacus/core';
import { QualtricsLoaderService } from '@spartacus/qualtrics/components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DemoQualtricsLoaderService extends QualtricsLoaderService {
  constructor(
    winRef: WindowRef,
    rendererFactory: RendererFactory2,
    private cartService: ActiveCartService
  ) {
    super(winRef, rendererFactory);
  }

  isDataLoaded(): Observable<boolean> {
    return this.cartService
      .getEntries()
      .pipe(map((entries) => entries.length === 1));
  }
}
