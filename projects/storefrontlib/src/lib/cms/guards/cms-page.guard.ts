import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { RoutingService, CmsService } from '@spartacus/core';

import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CmsPageGuards implements CanActivate {
  static guardName = 'CmsPageGuards';

  constructor(
    private routingService: RoutingService,
    private cmsService: CmsService
  ) {}

  canActivate(): Observable<boolean> {
    return this.routingService.getPageContext().pipe(
      switchMap(pageContext => this.cmsService.hasPage(pageContext)),
      catchError(() => of(false)),
      tap(hasPage => {
        if (!hasPage) {
          this.routingService.go({ route: ['pageNotFound'] });
        }
      })
    );
  }
}
