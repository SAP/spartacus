import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class ExistOrganizationItemGuard<T> implements CanActivate {
  protected code: string;

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const urlParams = {
      code:
        activatedRoute.params[this.code] ??
        activatedRoute.parent.params[this.code],
    };

    return this.getItem(urlParams.code).pipe(
      map((item: T) => {
        if (item && this.isValid(item)) {
          return true;
        }
        this.showErrorMessage();
        return this.getRedirectUrl(urlParams);
      })
    );
  }

  protected isValid(item: T): boolean {
    return Object.keys(item).length !== 0;
  }

  protected showErrorMessage() {}

  protected abstract getRedirectUrl(_urlParams?: any): UrlTree;

  protected abstract getItem(code: string): Observable<T>;
}
