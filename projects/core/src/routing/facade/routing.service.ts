import { Injectable } from '@angular/core';
import * as fromStore from '../store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavigationExtras } from '@angular/router';
import { UrlTranslatorService } from '../configurable-routes/url-translator/url-translator.service';
import { TranslateUrlOptions } from '../configurable-routes/url-translator/translate-url-options';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(
    private store: Store<fromStore.RouterState>,
    private urlTranslator: UrlTranslatorService
  ) {}

  /**
   * Get the current router state
   */
  getRouterState(): Observable<any> {
    return this.store.pipe(select(fromStore.getRouterState));
  }

  /**
   * Navigation with a new state into history
   * @param path
   * @param query
   * @param extras: Represents the extra options used during navigation.
   */
  go(path: any[], query?: object, extras?: NavigationExtras) {
    this.store.dispatch(
      new fromStore.Go({
        path,
        query,
        extras
      })
    );
  }

  /**
   * Translation of an URL and navigation to it with a new state into history
   * @param translateUrlOptions
   * @param query
   * @param extras: Represents the extra options used during navigation.
   */
  public translateAndGo(
    translateUrlOptions: TranslateUrlOptions,
    query?: object,
    extras?: NavigationExtras
  ) {
    const path = this.urlTranslator.translate(translateUrlOptions) as any[];
    this.go(path, query, extras);
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
}
