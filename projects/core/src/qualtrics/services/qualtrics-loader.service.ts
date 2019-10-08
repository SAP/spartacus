import { Injectable } from '@angular/core';
import { EMPTY, iif, Observable, of } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { WindowRef } from '../../window/index';
import { QualtricsConfig } from '../config/qualtrics-config';

@Injectable({
  providedIn: 'root',
})
export class QualtricsLoaderService {
  constructor(private winRef: WindowRef, private config: QualtricsConfig) {
    // const qualtricsScript = this.winRef.document.createElement('script');
    // qualtricsScript.type = 'text/javascript';
    // qualtricsScript.defer = true;
    // qualtricsScript.src = 'assets/qualtricsIntegration.js';
    // this.winRef.document
    //   .getElementsByTagName('head')[0]
    //   .appendChild(qualtricsScript);
    // const idScript = this.winRef.document.createElement('div');
    // idScript.id = 'ZN_6Y9SmdaSBA8Uogl';
    // this.winRef.document.getElementsByTagName('body')[0].appendChild(idScript);
  }

  load(): Observable<boolean> {
    // console.log('test1');
    // return iif(
    //   () => Boolean(this.winRef.nativeWindow) && this.isQualtricsConfigured(),
    //   fromEvent(this.winRef.nativeWindow, 'qsi_js_loaded').pipe(
    //     mergeMap(test => {
    //       console.log('qsi_js_loaded', test);
    //       const qsi = this.winRef.nativeWindow['QSI'];
    //       if (this.config.qualtrics.multi) {
    //         qsi.API.unload();
    //       }
    //       return this.isDataLoaded().pipe(
    //         distinctUntilChanged(),
    //         tap(dataLoaded => {
    //           if (dataLoaded) {
    //             qsi.API.load().done(qsi.API.run());
    //           }
    //         })
    //       );
    //     })
    //   ),
    //   EMPTY
    // );

    // P.S Just for testing! qsi_js_loaded timing issue again...
    return iif(
      () => Boolean(this.winRef.nativeWindow) && this.isQualtricsConfigured(),
      this.isDataLoaded().pipe(
        distinctUntilChanged(),
        tap(dataLoaded => {
          if (dataLoaded) {
            const qsi = this.winRef.nativeWindow['QSI'];
            if (this.config.qualtrics.multi) {
              qsi.API.unload();
            }
            qsi.API.load().done(qsi.API.run());
          }
        })
      ),
      EMPTY
    );
  }

  private isQualtricsConfigured(): boolean {
    return Boolean(this.config.qualtrics) && this.config.qualtrics.active;
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
