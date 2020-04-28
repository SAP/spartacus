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
   * Tells whether there is a pending navigation at the moment, so we can avoid an infinite loop caused by the cyclic dependency:
   * - `subscribeChanges` method triggers a navigation on update of site context state
   * - `subscribeRouting` method updates the site context state on navigation
   */
  private isNavigating = false;

  /**
   * Initializes the two-way synchronization between the site context state and the URL.
   *
   * @returns Promise that is resolved when the site context state is initialized (updated for the first time) based on the URL.
   */
  init(): Promise<void> {
    return new Promise((resolve) => {
      this.router = this.injector.get<Router>(Router);

      this.location = this.injector.get<Location>(Location);
      const routingParams = this.siteContextParams.getUrlEncodingParameters();

      if (routingParams.length) {
        this.subscribeChanges(routingParams);
        this.subscribeRouting(resolve);
      } else {
        resolve();
      }
    });
  }

  /**
   * After each change of the site context state, it modifies the current URL in place.
   * But it happens only for the parameters configured to be persisted in the URL.
   */
  private subscribeChanges(params: string[]) {
    params.forEach((param) => {
      const service = this.siteContextParams.getSiteContextService(param);
      if (service) {
        this.subscription.add(
          service.getActive().subscribe((value) => {
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
   * After each Angular NavigationStart event it updates the site context state based on
   * site context params encoded in the anticipated URL.
   *
   * In particular, it's responsible for initializing the state of the context params
   * on page start, reading the values from the URL.
   *
   * @param onContextInitialized notify that the initialization of the context was done based on the URL
   */
  private subscribeRouting(onContextInitialized: Function) {
    let contextInitialized = false;

    this.subscription.add(
      this.router.events
        .pipe(
          filter(
            (event) =>
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
   * Updates the site context state based on the context params encoded in the given URL
   *
   * @param url URL with encoded context params
   */
  private setContextParamsFromRoute(url: string) {
    const { params } = this.serializer.urlExtractContextParameters(url);
    Object.keys(params).forEach((param) =>
      this.siteContextParams.setValue(param, params[param])
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
