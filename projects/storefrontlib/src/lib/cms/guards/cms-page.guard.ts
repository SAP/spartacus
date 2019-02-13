import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { RoutingService, CmsService } from '@spartacus/core';

@Injectable()
export class CmsPageGuards implements CanActivate {
  static guardName = 'CmsPageGuards';

  constructor(
    private routingService: RoutingService,
    private cmsService: CmsService
  ) {}

  canActivate(): Observable<boolean> {
    return this.hasPage().pipe(
      switchMap(found => of(found)),
      catchError(() => of(false))
    );
  }

  hasPage(): Observable<boolean> {
    // TODO:#1135 - use the new method?
    return this.routingService.getRouterState().pipe(
      map(routerState => routerState.state.context),
      // TODO:#1135 - why take(1)?
      take(1),
      mergeMap(pageContext => this.cmsService.hasPage(pageContext))
    );
  }
}
