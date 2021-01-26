import { Injectable, Injector, Provider } from '@angular/core';
import {
  NavigationError,
  Router,
  ROUTER_CONFIGURATION,
  ɵangular_packages_router_router_h as RouterInitializer,
} from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class CustomRouterInitializer extends RouterInitializer {
  appInitializer(): Promise<any> {
    const injector: Injector = (this as any).injector;
    const opts = injector.get(ROUTER_CONFIGURATION);

    if (
      opts.initialNavigation ===
      'enabled' /* for Ng11: || opts.initialNavigation === 'enabledBlocking' */
    ) {
      let resolve: any;
      const res = new Promise((r) => (resolve = r));

      injector
        .get(Router)
        .events.pipe(
          // We want to explicitly react on NavigationError event occurs just
          // after the first navigation start event
          take(2),
          filter((event) => event instanceof NavigationError)
        )
        .subscribe(() => resolve(false));

      super.appInitializer().then((val) => resolve(val));
      return res;
    }

    return super.appInitializer();
  }
}

export const routerFixProvider: Provider = {
  provide: RouterInitializer,
  useClass: CustomRouterInitializer,
};
