import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  NavigationBehaviorOptions,
  NavigationExtras,
  Router,
} from '@angular/router';
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
    protected router: Router,
    protected location: Location
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
   * @param extras: Represents the extra options used during navigation.
   *
   * @returns Promise that resolves to `true` when navigation succeeds,
   *          to `false` when navigation fails, or is rejected on error.
   */
  go(commands: UrlCommands, extras?: NavigationExtras): Promise<boolean> {
    const path = this.semanticPathService.transform(commands);
    return this.navigate(path, extras);
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
   * Navigation using absolute route path
   * @param url
   * @param extras: Represents the extra options used during navigation.
   *
   * @returns Promise that resolves to `true` when navigation succeeds,
   *          to `false` when navigation fails, or is rejected on error.
   */
  goByUrl(url: string, extras?: NavigationBehaviorOptions): Promise<boolean> {
    return this.router.navigateByUrl(url, extras);
  }

  /**
   * Navigating back
   */
  back(): void {
    const isLastPageInApp = this.winRef.document.referrer.includes(
      this.winRef.nativeWindow.location.origin
    );
    if (isLastPageInApp) {
      this.location.back();
      return;
    }
    this.go(['/']);
    return;
  }

  /**
   * Navigating forward
   */
  forward(): void {
    this.location.forward();
  }

  /**
   * Navigation with a new state into history
   * @param path
   * @param extras: Represents the extra options used during navigation.
   *
   * @returns Promise that resolves to `true` when navigation succeeds,
   *          to `false` when navigation fails, or is rejected on error.
   */
  protected navigate(path: any[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(path, extras);
  }
}
