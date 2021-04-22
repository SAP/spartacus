import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WindowRef } from '../../window/window-ref';
import { SemanticPathService } from '../configurable-routes/url-translation/semantic-path.service';
import { UrlCommands } from '../configurable-routes/url-translation/url-command';
import { PageContext } from '../models/page-context.model';
import { RoutingActions } from '../store/actions/index';
import { RouterState } from '../store/routing-state';
import { RoutingSelector } from '../store/selectors/index';
import { RoutingParamsService } from './routing-params.service';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(
    protected store: Store<RouterState>,
    protected winRef: WindowRef,
    protected semanticPathService: SemanticPathService,
    protected routingParamsService: RoutingParamsService,
    protected router: Router
  ) {}

  /**
   * Get the list of all parameters of the full route. This includes
   * active child routes.
   */
  getParams(): Observable<{ [key: string]: string }> {
    return this.routingParamsService?.getParams();
  }

  /**
   * Get the current router state
   */
  getRouterState(): Observable<RouterState> {
    return this.store.pipe(select(RoutingSelector.getRouterState));
  }

  /**
   * Get the `PageContext` from the state
   */
  getPageContext(): Observable<PageContext> {
    return this.store.pipe(select(RoutingSelector.getPageContext));
  }

  /**
   * Get the next `PageContext` from the state
   */
  getNextPageContext(): Observable<PageContext> {
    return this.store.pipe(select(RoutingSelector.getNextPageContext));
  }

  /**
   * Allow to change next page context for the ongoing navigation
   *
   * @param pageContext
   */
  changeNextPageContext(pageContext: PageContext) {
    this.store.dispatch(new RoutingActions.ChangeNextPageContext(pageContext));
  }

  /**
   * Get the `isNavigating` info from the state
   */
  isNavigating(): Observable<boolean> {
    return this.store.pipe(select(RoutingSelector.isNavigating));
  }

  /**
   * Navigation with a new state into history
   * @param commands: url commands
   * @param query
   * @param extras: Represents the extra options used during navigation.
   */
  go(commands: UrlCommands, query?: object, extras?: NavigationExtras): void {
    const path = this.semanticPathService.transform(commands);

    return this.navigate(path, query, extras);
  }

  /**
   * Resolves the relative url for the given `UrlCommands` and `NavigationExtras`.
   *
   * The absolute url can be resolved using `getFullUrl()`.
   */
  getUrl(commands: UrlCommands, extras?: NavigationExtras): string {
    let url = this.router.serializeUrl(
      this.router.createUrlTree(
        this.semanticPathService.transform(commands),
        extras
      )
    );
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }
    return url;
  }

  /**
   * Returns the absolute url for the given `UrlCommands` and `NavigationExtras`.
   *
   * The absolute url uses the origin of the current location.
   */
  getFullUrl(commands: UrlCommands, extras?: NavigationExtras) {
    return `${this.winRef.document.location.origin}${this.getUrl(
      commands,
      extras
    )}`;
  }

  /**
   * Navigation using URL
   * @param url
   */
  goByUrl(url: string) {
    this.store.dispatch(new RoutingActions.RouteGoByUrlAction(url));
  }

  /**
   * Navigating back
   */
  back(): void {
    const isLastPageInApp = this.winRef.document.referrer.includes(
      this.winRef.nativeWindow.location.origin
    );
    if (isLastPageInApp) {
      this.store.dispatch(new RoutingActions.RouteBackAction());
      return;
    }
    this.go(['/']);
    return;
  }

  /**
   * Navigating forward
   */
  forward(): void {
    this.store.dispatch(new RoutingActions.RouteForwardAction());
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
      new RoutingActions.RouteGoAction({
        path,
        query,
        extras,
      })
    );
  }
}
