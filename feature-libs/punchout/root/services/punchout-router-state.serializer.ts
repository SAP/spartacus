import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import {
  ActivatedRouterStateSnapshot,
  CmsActivatedRouteSnapshot,
  CustomSerializer,
} from '@spartacus/core';

@Injectable()
export class PunchoutRouterStateSerializer extends CustomSerializer {
  serialize(routerState: RouterStateSnapshot): ActivatedRouterStateSnapshot {
    let state: CmsActivatedRouteSnapshot =
      routerState.root as CmsActivatedRouteSnapshot;

    while (state.firstChild) {
      state = state.firstChild as CmsActivatedRouteSnapshot;
    }

    if (
      state.url.length > 0 &&
      state.url[0].path === 'punchout' &&
      state.url[1].path === 'cxml' &&
      state.url[2].path === 'session'
    ) {
      return { ...super.serialize(routerState), context: undefined };
    }
    return super.serialize(routerState);
  }
}
