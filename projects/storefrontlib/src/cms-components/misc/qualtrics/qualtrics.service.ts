import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class QualtricsService {
  constructor(protected winRef: WindowRef) {
    console.log('Inject the script here');
  }

  trigger(): void {
    this.isDataLoaded().subscribe(dataLoaded => {
      if (this.winRef.nativeWindow['QSI'] && dataLoaded) {
        // TODO: why the 'unload' needs to be called?
        this.winRef.nativeWindow['QSI'].API.unload();
        this.winRef.nativeWindow['QSI'].API.load().done(
          this.winRef.nativeWindow['QSI'].API.run()
        );
      }
    });
  }

  abstract isDataLoaded(): Observable<boolean>;
}
