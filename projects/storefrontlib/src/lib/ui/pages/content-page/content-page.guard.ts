import { Injectable } from '@angular/core';
import { PageType, CmsService, RoutingService } from '@spartacus/core';
import { timeout, filter, take, catchError, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class ContentPageGuard implements CanActivate {
  constructor(
    private cmsService: CmsService,
    private routingService: RoutingService
  ) {}

  private readonly LOAD_CMS_PAGE_TIMEOUT = 3000;

  private getPath(route: ActivatedRouteSnapshot): string {
    return route.url.map(urlSegment => urlSegment.path).join('/');
  }

  // The timeout is needed since CmsService.hasPage does not emit "false" when there is no page in CMS.
  // When CmsService.hasPage is fixed, the timeout can be removed here.
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasCmsPage$(this.getPath(route)).pipe(
      timeout(this.LOAD_CMS_PAGE_TIMEOUT),
      filter(hasPage => hasPage === true || hasPage === false),
      take(1),
      tap(hasPage => {
        if (!hasPage) {
          this.redirectToPageNotFound();
        }
      }),
      catchError(e => {
        this.redirectToPageNotFound();
        return of(e);
      })
    );
  }

  private hasCmsPage$(path: string): Observable<boolean> {
    const pageContext = {
      id: path,
      type: PageType.CONTENT_PAGE
    };
    return this.cmsService.hasPage(pageContext);
  }

  private redirectToPageNotFound() {
    this.routingService.go({ route: ['pageNotFound'] });
  }
}
