import { Injectable } from '@angular/core';
import { B2BUser, RoutingService } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../../constants';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService extends CurrentOrganizationItemService<
  B2BUser
> {
  readonly name$: Observable<string> = this.item$.pipe(
    map((user: B2BUser) => user.name)
  );

  constructor(
    protected routingService: RoutingService,
    protected b2bUserService: B2BUserService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.userCode;
  }

  protected getItem(code: string): Observable<B2BUser> {
    return this.b2bUserService.get(code);
  }

  hasError(code: string): Observable<boolean> {
    return this.b2bUserService.getErrorState(code);
  }
}
