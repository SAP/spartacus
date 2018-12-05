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
    return this.routingService.routerState$.pipe(
      map(routerState => routerState.state.context),
      take(1),
      mergeMap(pageContext => this.cmsService.hasPage(pageContext))
    );
  }
}
