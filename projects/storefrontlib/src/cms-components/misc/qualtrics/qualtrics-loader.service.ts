import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { fromEvent, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMap,
} from 'rxjs/operators';
import { QualtricsConfig } from './config/qualtrics-config';

/**
 * Service to integration Qualtrics.
 *
 * The integration observes the Qualtrics API and when it's available, it runs the QSI API
 * to ensure that Qualtrics can evaluate the application.
 *
 * The service supports an additional _hook_ that can be used to load application data before
 * pulling the QSI API. This is benefitial in a single page application when additional data is
 * requried for the Qualtrics _creatives_.
 *
 * This service also supports the creation of the Qualtrics deployment script by a URL.
 */
@Injectable({
  providedIn: 'root',
})
export class QualtricsLoaderService {
  /**
   * QSI load event that happens when the QSI JS file is loaded.
   */
  private qsiLoaded$ = fromEvent(this.winRef.nativeWindow, 'qsi_js_loaded');

  /**
   * Emits the Qualtrics Site Intercept (QSI) JavaScript API.
   *
   * The API is emitted when the JavaScript resource holding this API is fully loaded.
   * We only emit the API once, in case it's accidentally loaded multiple times.
   *
   */
  protected qsi$: Observable<any> = this.qsiLoaded$.pipe(
    first(),
    switchMap(() => this.isDataLoaded().pipe(distinctUntilChanged())),
    map(() => this.winRef.nativeWindow['QSI']),
    filter((api) => Boolean(api))
  );

  constructor(
    protected winRef: WindowRef,
    protected config: QualtricsConfig,
    protected rendererFactory: RendererFactory2
  ) {
    this.initialize();
  }

  /**
   * Starts observing the Qualtrics integration. The integration is based on a
   * Qualtrics specific event (`qsi_js_loaded`). As soon as this events happens,
   * the
   */
  protected initialize() {
    this.qsi$.subscribe(this.run);
  }

  /**
   * Evaluates the Qualtrics project code for the application. In order to evaluate several
   * times, we _unload_ the API before loading and running.
   */
  protected run(QSI: any) {
    // Removes any currently displaying creatives
    QSI.API.unload();

    // Starts the intercept code evaluation right after loading the Site Intercept
    // code for any defined intercepts or creatives
    QSI.API.load().then(QSI.API.run());
  }

  /**
   * This logic exist in order to let the client(s) add their own logic to wait for any kind of page data.
   *
   * If client(s) does not extend this service to override this implementation, it returns true
   * Return false otherwise.
   */
  protected isDataLoaded(): Observable<boolean> {
    return of(true);
  }

  /**
   * Adds the deployment script to the DOM.
   *
   * If the script has been added before, it will not be added a 2nd time.
   *
   * @param scriptUrl optional, defaults to the global configured `qualtrics.scriptSrc`.
   */
  addScript(source?: string) {
    if (this.winRef.document?.querySelector(`script[src="${source}"]`)) {
      return;
    }
    const script: HTMLScriptElement = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.src = source || this.config.qualtrics.scriptSource;
    this.renderer.appendChild(this.winRef.document.body, script);
  }

  protected get renderer(): Renderer2 {
    return this.rendererFactory.createRenderer(null, null);
  }
}
