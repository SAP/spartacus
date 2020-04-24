import { Location } from '@angular/common';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SiteContextParamsService } from './site-context-params.service';
import { SiteContextUrlSerializer } from './site-context-url-serializer';

/**
 * It's responsible for synchronizing the site context state with the URL for
 * site context parameters configured to be persisted in the URL.
 */
@Injectable({
  providedIn: 'root',
})
export class SiteContextRoutesHandler implements OnDestroy {
  constructor(
    private siteContextParams: SiteContextParamsService,
    private serializer: SiteContextUrlSerializer,
    private injector: Injector
  ) {}

  private subscription = new Subscription();

  private contextValues: {
    [param: string]: string;
  } = {};

  private router: Router;
  private location: Location;

  /**
   * Tells whether there is a pending navigation at the moment, so we can avoid an infinite loop
   * caused by the cyclic dependency:
   * - `subscribeChanges` method triggers a navigation on update of site context state
   * - `subscribeRouting` method updates the site context state on navigation
   */
  private isNavigating = false;

  /**
   * Initializes the two-way synchronization between the site context state and the URL.
   *
   * @returns Promise that is resolved when the site context state is initialized
   * based on the URL - which happens just after the initial Angular navigation.
   */
  init(): Promise<void> {
    return new Promise(resolve => {
      this.router = this.injector.get<Router>(Router);

      this.location = this.injector.get<Location>(Location);
      const routingParams = this.siteContextParams.getUrlEncodingParameters();

      if (routingParams.length) {
        // this.setContextParamsFromRoute(this.router.url); // commented out - as it updates state incorrectly, based on default config, not b URL

        this.subscribeChanges(routingParams);
        this.subscribeRouting(resolve);
      }
    });
  }

  /**
   * Subscribes to the state of the site context and updates the URL whenever context is updated.
   */
  private subscribeChanges(params: string[]) {
    params.forEach(param => {
      const service = this.siteContextParams.getSiteContextService(param);
      if (service) {
        this.subscription.add(
          service.getActive().subscribe(value => {
            if (
              !this.isNavigating &&
              this.contextValues[param] &&
              this.contextValues[param] !== value
            ) {
              const parsed = this.router.parseUrl(this.router.url);
              const serialized = this.router.serializeUrl(parsed);
              this.location.replaceState(serialized);
            }
            this.contextValues[param] = value;
          })
        );
      }
    });
  }

  /**
   * Subscribes to Angular NavigationStart event and updates the site context based on the URL.
   *
   * In particular, it's responsible for initializing the state of the context params on the initial page load.
   *
   * @param onContextInitialized callback to notify that the initialization of the context was done based on the URL
   */
  private subscribeRouting(onContextInitialized: Function) {
    let contextInitialized = false;

    this.subscription.add(
      this.router.events
        .pipe(
          filter(
            event =>
              event instanceof NavigationStart ||
              event instanceof NavigationEnd ||
              event instanceof NavigationError ||
              event instanceof NavigationCancel
          )
        )
        .subscribe((event: RouterEvent) => {
          this.isNavigating = event instanceof NavigationStart;
          if (this.isNavigating) {
            this.setContextParamsFromRoute(event.url);

            if (!contextInitialized) {
              contextInitialized = true;
              onContextInitialized();
            }
          }
        })
    );
  }

  /**
   * Updates the site context based on the context params encoded in the given URL
   *
   * @param url URL with encoded context params
   */
  private setContextParamsFromRoute(url: string) {
    const { params } = this.serializer.urlExtractContextParameters(url);
    Object.keys(params).forEach(param =>
      this.siteContextParams.setValue(param, params[param])
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
