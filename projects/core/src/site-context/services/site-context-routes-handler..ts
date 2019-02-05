import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SiteContextParamsService } from '../facade/site-context-params.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteContextRoutesHandler implements OnDestroy {
  constructor(
    private siteContextParams: SiteContextParamsService,
    private injector: Injector
  ) {}

  private subscription = new Subscription();

  private contextValues: {
    [param: string]: string;
  } = {};

  private router: Router;
  private location: Location;

  init() {
    this.router = this.injector.get<Router>(Router);

    this.location = this.injector.get<Location>(Location);
    const routingParams = this.siteContextParams.getContextParameters('route');

    if (routingParams.length) {
      this.subscribeChanges(routingParams);
      this.subscribeRouting(routingParams);
    }
  }

  private subscribeChanges(params: string[]) {
    params.forEach(param => {
      this.subscription.add(
        this.siteContextParams
          .getSiteContextService(param)
          .getActive()
          .subscribe(value => {
            if (
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
    });
  }

  private subscribeRouting(params: string[]) {
    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationStart))
        .subscribe((event: NavigationStart) =>
          this.setContextParamsFromRoute(event.url, params)
        )
    );
  }

  private setContextParamsFromRoute(url: string, params: string[]) {
    const segments = url.split('/');

    if (segments[0] === '') {
      segments.shift();
    }

    for (let i = 0; i < params.length && i < segments.length; i++) {
      const paramName = params[i];
      const paramValues = this.siteContextParams.getParamValues(paramName);
      if (paramValues.indexOf(segments[i]) > -1) {
        this.siteContextParams.setValue(paramName, segments[i]);
      } else {
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
