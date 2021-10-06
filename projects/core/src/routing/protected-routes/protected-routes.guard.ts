import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthGuard } from '../../auth/user-auth/guards/auth.guard';
import { ProtectedRoutesService } from './protected-routes.service';

@Injectable({ providedIn: 'root' })
export class ProtectedRoutesGuard implements CanActivate {
  constructor(
    protected service: ProtectedRoutesService,
    protected authGuard: AuthGuard
  ) {}

  /**
   * When the anticipated url is protected, it switches to the AuthGuard. Otherwise emits true.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    let urlSegments: string[] = route.url.map((seg) => seg.path);

    // For the root path `/` ActivatedRoute contains an empty array of segments:
    urlSegments = urlSegments.length ? urlSegments : [''];

    if (this.service.isUrlProtected(urlSegments)) {
      return this.authGuard.canActivate();
    }
    return of(true);
  }
}
