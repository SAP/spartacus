import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import {
  B2BUser,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class ExistUserGuard {
  protected code = ROUTE_PARAMS.userCode;

  constructor(
    protected userService: B2BUserService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService: GlobalMessageService,
    protected route: ActivatedRoute,
    protected routingService: RoutingService
  ) {}

  canActivate() {
    const urlParams = {
      code:
        this.route.params[this.code] ?? this.route.parent?.params[this.code],
    };

    return this.getItem(urlParams.code).pipe(
      map((item) => {
        if (item && this.isValid(item)) {
          return;
        }
        this.showErrorMessage();
        this.routingService.go({
          cxRoute: `userDetails`,
          params: { userCode: urlParams.code },
        });
      })
    );
  }

  protected isValid(item): boolean {
    // change it, since the reducer initial state is undefined now
    return Object.keys(item).length !== 0;
  }

  protected getItem(code: string): Observable<B2BUser> {
    return this.userService.get(code);
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('user'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.notExist',
        params: { item: 'User' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}
