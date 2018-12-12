import { Injectable } from '@angular/core';
import * as fromStore from '../store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavigationExtras } from '@angular/router';
import { UrlTranslationService } from '../configurable-routes/url-translation/url-translation.service';
import { TranslateUrlOptions } from '../configurable-routes/url-translation/translate-url-options';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(
    private store: Store<fromStore.RouterState>,
    private urlTranslator: UrlTranslationService
  ) {}

  /**
   * Get the current router state
   */
  getRouterState(): Observable<any> {
    return this.store.pipe(select(fromStore.getRouterState));
  }

  /**
   * Navigation with a new state into history
   * @param pathOrTranslateUrlOptions: Path or options to translate url
   * @param query
   * @param extras: Represents the extra options used during navigation.
   */
  go(
    pathOrTranslateUrlOptions: any[] | TranslateUrlOptions,
    query?: object,
    extras?: NavigationExtras
  ) {
    let path: any[];

    if (Array.isArray(pathOrTranslateUrlOptions)) {
      path = pathOrTranslateUrlOptions;
    } else {
      const translateUrlOptions = pathOrTranslateUrlOptions;
      const translatedPath = this.urlTranslator.translate(translateUrlOptions);
      path = Array.isArray(translatedPath) ? translatedPath : [translatedPath];
    }
    return this.navigate(path, query, extras);
  }

  /**
   * Navigating back
   */
  back() {
    const isLastPageInApp =
      document.referrer.indexOf(window.location.origin) > -1;
    if (isLastPageInApp) {
      this.store.dispatch(new fromStore.Back());
      return;
    }
    this.go(['/']);
    return;
  }

  /**
   * Navigating forward
   */
  forward() {
    this.store.dispatch(new fromStore.Forward());
  }

  /**
   * Get the redirect url from store
   */
  getRedirectUrl(): Observable<string> {
    return this.store.pipe(select(fromStore.getRedirectUrl));
  }

  /**
   * Remove the redirect url from store
   */
  clearRedirectUrl() {
    this.store.dispatch(new fromStore.ClearRedirectUrl());
  }

  /**
   * Put redirct url into store
   * @param url: redirect url
   */
  saveRedirectUrl(url: string) {
    this.store.dispatch(new fromStore.SaveRedirectUrl(url));
  }

  /**
   * Navigation with a new state into history
   * @param path
   * @param query
   * @param extras: Represents the extra options used during navigation.
   */
  private navigate(path: any[], query?: object, extras?: NavigationExtras) {
    this.store.dispatch(
      new fromStore.Go({
        path,
        query,
        extras
      })
    );
  }
}
