import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import {
  SemanticPathService,
  GlobalMessageService,
  GlobalMessageType,
  Translatable,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class ExistOrganizationItemGuard<T> implements CanActivate {
  protected code: string;
  protected message: string | Translatable = {
    key: 'organization.warning.noExistItem',
    params: { item: 'Item' },
  };

  constructor(
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService?: GlobalMessageService
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const urlParams = {
      code: activatedRoute.params[this.code],
    };

    return this.getItem(urlParams.code).pipe(
      map((item: T) => {
        if (item && this.isValid(item)) {
          return true;
        }
        this.notify();
        return this.getRedirectUrl(urlParams);
      })
    );
  }

  protected isValid(item: T): boolean {
    return Object.keys(item).length !== 0;
  }

  protected notify() {
    this.globalMessageService?.add(
      this.message,
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }

  protected abstract getRedirectUrl(_urlParams?: any): UrlTree;

  protected abstract getItem(code: string): Observable<T>;
}
