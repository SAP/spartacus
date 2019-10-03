import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class QualtricsService {
  constructor(private winRef: WindowRef) {
    console.log('Iinject the script here');
  }

  trigger(): void {
    if (this.winRef.nativeWindow['QSI']) {
      // TODO: why the 'unload' needs to be called?
      this.winRef.nativeWindow['QSI'].API.unload();
      this.winRef.nativeWindow['QSI'].API.load().done(
        this.winRef.nativeWindow['QSI'].API.run()
      );
    }
  }
}
