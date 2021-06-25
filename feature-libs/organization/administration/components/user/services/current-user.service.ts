import { Injectable } from '@angular/core';
import { B2BUser, RoutingService } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService extends CurrentItemService<B2BUser> {
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

  getError(code: string): Observable<boolean> {
    return this.b2bUserService.getErrorState(code);
  }
}
