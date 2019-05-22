import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromStore from '../store';
import { PageContext } from '../models/page-context.model';
import { WindowRef } from '../../window/window-ref';
import { UrlCommands } from '../configurable-routes/url-translation/url-command';
import { UrlService } from '../configurable-routes/url-translation/url.service';
import { RouterState } from '../store/reducers/router.reducer';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(
    protected store: Store<fromStore.RouterState>,
    protected winRef: WindowRef,
    protected urlService: UrlService
  ) {}

  /**
   * Get the current router state
   */
  getRouterState(): Observable<RouterState> {
    return this.store.pipe(select(fromStore.getRouterState));
  }

  /**
   * Get the `PageContext` from the state
   */
  getPageContext(): Observable<PageContext> {
    return this.store.pipe(select(fromStore.getPageContext));
  }

  /**
   * Get the next `PageContext` from the state
   */
  getNextPageContext(): Observable<PageContext> {
    return this.store.pipe(select(fromStore.getNextPageContext));
  }

  /**
   * Get the `isNavigating` info from the state
   */
  isNavigating(): Observable<boolean> {
    return this.store.pipe(select(fromStore.isNavigating));
  }

  /**
   * Navigation with a new state into history
   * @param commands: url commands
   * @param query
   * @param extras: Represents the extra options used during navigation.
   */
  go(commands: UrlCommands, query?: object, extras?: NavigationExtras): void {
    const path = this.urlService.generateUrl(commands);

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
    const isLastPageInApp = this.winRef.document.referrer.includes(
      this.winRef.nativeWindow.location.origin
    );
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
   * Navigation with a new state into history
   * @param path
   * @param query
   * @param extras: Represents the extra options used during navigation.
   */
  protected navigate(
    path: any[],
    query?: object,
    extras?: NavigationExtras
  ): void {
    this.store.dispatch(
      new fromStore.Go({
        path,
        query,
        extras,
      })
    );
  }
}
