import { Injectable } from '@angular/core';
import { EMPTY, fromEvent, iif, Observable, of } from 'rxjs';
import { distinctUntilChanged, mergeMap, tap } from 'rxjs/operators';
import { WindowRef } from '../../window/index';
import { QualtricsConfig } from '../config/qualtrics-config';

@Injectable({
  providedIn: 'root',
})
export class QualtricsConfigService {
  constructor(private winRef: WindowRef, private config: QualtricsConfig) {}

  load(): Observable<boolean> {
    return iif(
      () => Boolean(this.winRef.nativeWindow) && this.isQualtricsConfigured(),
      fromEvent(this.winRef.nativeWindow, 'qsi_js_loaded').pipe(
        mergeMap(_ => {
          const qsi = this.winRef.nativeWindow['QSI'];
          if (this.config.qualtrics.multi) {
            qsi.API.unload();
          }
          return this.isDataLoaded().pipe(
            distinctUntilChanged(),
            tap(dataLoaded => {
              if (dataLoaded) {
                qsi.API.load().done(qsi.API.run());
              }
            })
          );
        })
      ),
      EMPTY
    );
  }

  private isQualtricsConfigured(): boolean {
    return Boolean(this.config.qualtrics) && this.config.qualtrics.active;
  }

  isDataLoaded(): Observable<boolean> {
    return of(true);
  }
}
