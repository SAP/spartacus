import { Injectable } from '@angular/core';
import { EMPTY, iif, Observable, of } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { WindowRef } from '../../window/index';
import { QualtricsConfig } from '../config/qualtrics-config';

@Injectable({
  providedIn: 'root',
})
export class QualtricsLoaderService {
  constructor(private winRef: WindowRef, private config: QualtricsConfig) {}

  load(): Observable<boolean> {
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

  protected isDataLoaded(): Observable<boolean> {
    return of(true);
  }
}
