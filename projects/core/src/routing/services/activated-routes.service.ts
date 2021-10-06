import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';

/**
 * Helper service to expose all activated routes
 */
@Injectable({ providedIn: 'root' })
export class ActivatedRoutesService {
  constructor(protected router: Router) {}

  /**
   * Array of currently activated routes (from the root route to the leaf route).
   */
  readonly routes$: Observable<ActivatedRouteSnapshot[]> =
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      // eslint-disable-next-line import/no-deprecated
      startWith(undefined), // emit value for consumer who subscribed lately after NavigationEnd event
      map(() => {
        let route = this.router.routerState.snapshot.root;
        const routes: ActivatedRouteSnapshot[] = [route];

        // traverse to the leaf route:
        while ((route = route.firstChild)) {
          routes.push(route);
        }

        return routes;
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
}
