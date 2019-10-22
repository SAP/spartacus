import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { BehaviorSubject, fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { QualtricsConfig } from './config/qualtrics-config';

@Injectable({
  providedIn: 'root',
})
export class QualtricsLoaderService {
  private qualtricsLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(private winRef: WindowRef, private config: QualtricsConfig) {
    if (
      Boolean(this.winRef.nativeWindow) &&
      Boolean(this.winRef.document) &&
      this.isQualtricsConfigured()
    ) {
      this.initialize();
      this.setup();
    }
  }

  private initialize(): void {
    fromEvent(this.winRef.nativeWindow, 'qsi_js_loaded').subscribe(_ =>
      this.qualtricsLoaded$.next(true)
    );
  }

  private setup(): void {
    const qualtricsScript = this.winRef.document.createElement('script');
    qualtricsScript.type = 'text/javascript';
    qualtricsScript.defer = true;
    qualtricsScript.src = 'assets/qualtricsIntegration.js';

    const idScript = this.winRef.document.createElement('div');
    idScript.id = this.config.qualtrics.projectId;

    this.winRef.document
      .getElementsByTagName('head')[0]
      .appendChild(qualtricsScript);

    this.winRef.document.getElementsByTagName('head')[0].appendChild(idScript);
  }

  private isQualtricsConfigured(): boolean {
    return (
      Boolean(this.config.qualtrics) && Boolean(this.config.qualtrics.projectId)
    );
  }

  load(): Observable<boolean> {
    return this.qualtricsLoaded$.pipe(
      filter(loaded => loaded),
      switchMap(_ => {
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

  /**
   * This logic exist in order to let the client(s) add their own logic to wait for any kind of page data
   * If client(s) does not extend this service to override this implementation, it returns true
   * Return false otherwise.
   */
  protected isDataLoaded(): Observable<boolean> {
    return of(true);
  }
}
