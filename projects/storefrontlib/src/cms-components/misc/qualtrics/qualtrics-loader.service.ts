import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { BehaviorSubject, EMPTY, fromEvent, iif, Observable, of } from 'rxjs';
import { distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import { QualtricsConfig } from '../../../shared/config/qualtrics-config';

@Injectable({
  providedIn: 'root',
})
export class QualtricsLoaderService {
  qualtricsLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private winRef: WindowRef, private config: QualtricsConfig) {
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

  load(): Observable<boolean> {
    return iif(
      () => Boolean(this.winRef.nativeWindow) && this.isQualtricsConfigured(),
      fromEvent(this.winRef.nativeWindow, 'qsi_js_loaded').pipe(
        mergeMap(d => {
          console.log('test', d);
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
      ),
      EMPTY
    );

    // P.S Just for testing! qsi_js_loaded timing issue again...
    // return iif(
    //   () => Boolean(this.winRef.nativeWindow) && this.isQualtricsConfigured(),
    //   this.isDataLoaded().pipe(
    //     distinctUntilChanged(),
    //     tap(dataLoaded => {
    //       if (dataLoaded) {
    //         console.log('in');
    //         const qsi = this.winRef.nativeWindow['QSI'];
    //         qsi.API.unload();

    //         qsi.API.load().done(qsi.API.run());
    //       }
    //     })
    //   ),
    //   EMPTY
    // );
  }

  private isQualtricsConfigured(): boolean {
    return (
      Boolean(this.config.qualtrics) && Boolean(this.config.qualtrics.projectId)
    );
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
