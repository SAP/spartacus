import { Injectable } from '@angular/core';
import * as fromStore from '../store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NavigationExtras } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(private store: Store<fromStore.RouterState>) {}

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
  go(path: string[], query?: object, extras?: NavigationExtras): void {
    this.store.dispatch(
      new fromStore.Go({
        path,
        query,
        extras
      })
    );
  }

  /**
   * Navigating back
   */
  back(): void {
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
}
