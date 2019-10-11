import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { BehaviorSubject, fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, mergeMap, tap } from 'rxjs/operators';
import { QualtricsConfig } from '../../../shared/config/qualtrics-config';

@Injectable({
  providedIn: 'root',
})
export class QualtricsLoaderService {
  qualtricsLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(private winRef: WindowRef, private config: QualtricsConfig) {
    if (Boolean(this.winRef.nativeWindow)) {
      this.verifyQualtrics();
      this.loadQualtrics();
    }
  }

  load(): Observable<boolean> {
    return this.qualtricsLoaded$.pipe(
      filter(loaded => loaded),
      mergeMap(_ => {
        const qsi = this.winRef.nativeWindow['QSI'];

        return this.isDataLoaded().pipe(
          distinctUntilChanged(),
          tap(dataLoaded => {
            if (dataLoaded) {
              qsi.API.unload();
              qsi.API.load().done(qsi.API.run());
            }
          })
        );
      })
    );
  }

  private isQualtricsConfigured(): boolean {
    return (
      Boolean(this.config.qualtrics) && Boolean(this.config.qualtrics.projectId)
    );
  }

  private verifyQualtrics() {
    fromEvent(this.winRef.nativeWindow, 'qsi_js_loaded')
      .pipe(filter(_ => this.isQualtricsConfigured()))
      .subscribe(_ => this.qualtricsLoaded$.next(true));
  }

  private loadQualtrics() {
    const qualtricsScript = this.winRef.document.createElement('script');
    qualtricsScript.type = 'text/javascript';
    qualtricsScript.defer = true;
    qualtricsScript.src = 'assets/qualtricsIntegration.js';

    const idScript = this.winRef.document.createElement('div');
    if (this.isQualtricsConfigured) {
      idScript.id = this.config.qualtrics.projectId;
    }

    this.winRef.document
      .getElementsByTagName('head')[0]
      .appendChild(qualtricsScript);

    this.winRef.document.getElementsByTagName('head')[0].appendChild(idScript);
  }

  /**
   * This logic exist in order to let the user add their own logic to wait for any kind of page data
   * If a user does not extend this service to override this implementation, it returns an Observable(true)
   * Return Observable(false) otherwise.
   */
  protected isDataLoaded(): Observable<boolean> {
    return of(true);
  }
}
