import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from '../store';
import { PageContext } from '../models/page-context.model';
import { WindowRef } from '../../window/window-ref';
import { TranslateUrlOptions } from '../configurable-routes/url-translation/translate-url-options';
import { UrlTranslationService } from '../configurable-routes/url-translation/url-translation.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(
    private store: Store<fromStore.RouterState>,
    private winRef: WindowRef,
    private urlTranslator: UrlTranslationService
  ) {}

  /**
   * Get the current router state
   */
  getRouterState(): Observable<any> {
    return this.store.pipe(select(fromStore.getRouterState));
  }

  /**
   * Get the `PageContext` from the state
   */
  getPageContext(): Observable<PageContext> {
    return this.store.pipe(select(fromStore.getPageContext));
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
  ): void {
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
   * Navigation using URL
   * @param url
   */
  goByUrl(url: string) {
    this.store.dispatch(new fromStore.GoByUrl(url));
  }

  /**
   * Navigating back
   */
  back(): void {
    const isLastPageInApp =
      this.winRef.document.referrer.indexOf(
        this.winRef.nativeWindow.location.origin
      ) > -1;
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
  forward(): void {
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
  clearRedirectUrl(): void {
    this.store.dispatch(new fromStore.ClearRedirectUrl());
  }

  /**
   * Put redirct url into store
   * @param url: redirect url
   */
  saveRedirectUrl(url: string): void {
    this.store.dispatch(new fromStore.SaveRedirectUrl(url));
  }

  /**
   * Navigation with a new state into history
   * @param path
   * @param query
   * @param extras: Represents the extra options used during navigation.
   */
  private navigate(
    path: any[],
    query?: object,
    extras?: NavigationExtras
  ): void {
    this.store.dispatch(
      new fromStore.Go({
        path,
        query,
        extras
      })
    );
  }
}
