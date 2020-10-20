import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { B2BUser, RoutingService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../../constants';
// import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';
import { MessageService } from '../../shared/organization-message/services/message.service';
import { CurrentUserService } from '../services/current-user.service';
// import { GlobalMessageType } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ExistUserGuard {
  protected code = ROUTE_PARAMS.userCode;

  constructor(
    protected userService: CurrentUserService,
    protected router: Router,
    protected routingService: RoutingService,
    protected semanticPathService: SemanticPathService,
    protected messageService: MessageService
  ) {}

  // canActivate(
  // ): Observable<boolean | UrlTree> {
  //   const urlParams = {
  //     code:
  //       activatedRoute.params[this.code] ??
  //       activatedRoute.parent?.params[this.code],
  //   };

  //   return this.getItem(urlParams.code).pipe(
  //     map((item: T) => {
  //       if (item && this.isValid(item)) {
  //         return true;
  //       }
  //       this.showErrorMessage();
  //       return this.getRedirectUrl(urlParams);
  //     })
  //   );
  // }

  // canActivate(item: any): Observable<boolean | UrlTree> {

  //   return this.getItem().pipe(
  //     map((item) => {
  //       if (item && this.isValid(item)) {
  //         return true;
  //       }
  //       this.showErrorMessage();
  //       return this.getRedirectUrl();
  //     })
  //   );
  // }
  canActivate(item: any): boolean {
    return this.isValid(item);
  }

  protected isValid(item): boolean {
    return Object.keys(item).length !== 0;
  }

  protected getItem(): Observable<B2BUser> {
    return this.userService.item$;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('user'));
  }

  redirect(route: string) {
    this.routingService.go({ cxRoute: route });
  }

  showErrorMessage() {
    console.log('showing error triggered');
    this.messageService.add({
      message: {
        key: 'organization.notification.notExist',
        params: {
          item: 'User',
        },
      },
    });
  }
}
