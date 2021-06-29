import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  isDevMode,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { ScriptLoader, WindowRef } from '@spartacus/core';
import { EMPTY, fromEvent, Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

export const QUALTRICS_EVENT_NAME = 'qsi_js_loaded';

interface QualtricsWindow extends Window {
  QSI?: any;
}

/**
 * Service to integration Qualtrics.
 *
 * The integration observes the Qualtrics API, and when available, it runs the QSI API
 * to let Qualtrics evaluate the application.
 *
 * The service supports an additional _hook_ (`isDataLoaded()`) that can be used to load application
 * data before pulling the QSI API. This is beneficial in a single page application when additional
 * data is required before the Qualtrics _creatives_ run.
 *
 * This service also supports the creation of the Qualtrics deployment script. This is optional, as
 * the script can be added in alternatives ways.
 */
@Injectable({
  providedIn: 'root',
})
export class QualtricsLoaderService implements OnDestroy {
  protected subscription = new Subscription();

  /**
   * Reference to the QSI API.
   */
  protected qsiApi: any;

  /**
   * QSI load event that happens when the QSI JS file is loaded.
   */
  private qsiLoaded$: Observable<any> =
    isPlatformBrowser(this.platformId) && this.window
      ? fromEvent(this.window, QUALTRICS_EVENT_NAME)
      : of();

  /**
   * Emits the Qualtrics Site Intercept (QSI) JavaScript API whenever available.
   *
   * The API is emitted when the JavaScript resource holding this API is fully loaded.
   * The API is also stored locally in the service, in case it's required later on.
   */
  protected qsi$: Observable<any> = this.qsiLoaded$.pipe(
    switchMap(() => this.isDataLoaded()),
    map((dataLoaded: boolean) => (dataLoaded ? this.window?.QSI : EMPTY)),
    filter((qsi: any) => Boolean(qsi)),
    tap((qsi: any) => (this.qsiApi = qsi))
  );

  get window(): QualtricsWindow | undefined {
    return this.winRef.nativeWindow;
  }

  constructor(
    protected winRef: WindowRef,
    @Inject(PLATFORM_ID) protected platformId: any,
    protected scriptLoader: ScriptLoader
  ) {
    this.initialize();
  }

  /**
   * Adds the deployment script to the DOM.
   *
   * The script will not be added twice if it was loaded before. In that case, we use
   * the Qualtrics API directly to _unload_ and _run_ the project.
   */
  addScript(scriptSource: string): void {
    if (this.hasScript(scriptSource)) {
      this.run(true);
    } else {
      this.scriptLoader.embedScript({
        src: scriptSource,
      });
    }
  }

  /**
   * Indicates if the script is already added to the DOM.
   */
  hasScript(source?: string): boolean {
    return !!this.winRef.document.querySelector(`script[src="${source}"]`);
  }

  /**
   * Starts observing the Qualtrics integration. The integration is based on a
   * Qualtrics specific event (`qsi_js_loaded`). As soon as this events happens,
   * we run the API.
   */
  protected initialize(): void {
    this.subscription.add(this.qsi$.subscribe(() => this.run()));
  }

  /**
   * Evaluates the Qualtrics project code for the application.
   *
   * In order to reload the evaluation in Qualtrics, the API requires to unload the API before
   * running it again. We don't do this by default, but offer a flag to conditionally unload the API.
   */
  protected run(reload = false): void {
    if (!this.qsiApi?.API) {
      if (isDevMode()) {
        console.log('The QSI api is not available');
      }
      return;
    }

    if (reload) {
      // Removes any currently displaying creatives
      this.qsiApi.API.unload();
    }

    // Starts the intercept code evaluation right after loading the Site Intercept
    // code for any defined intercepts or creatives
    this.qsiApi.API.load().done(this.qsiApi.API.run());
  }

  /**
   * This logic exist in order to let the client(s) add their own logic to wait for any kind of page data.
   * You can observe any data in this method.
   *
   * Defaults to true.
   */
  protected isDataLoaded(): Observable<boolean> {
    return of(true);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
