import { Injectable } from '@angular/core';
import { B2BUserService, Budget, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationService } from '../shared/base-current.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService extends CurrentOrganizationService<Budget> {
  readonly name$: Observable<string> = this.model$.pipe(pluck('name'));

  constructor(
    protected routingService: RoutingService,
    protected b2bUserService: B2BUserService
  ) {
    super(routingService);
  }

  protected getParam() {
    return ROUTE_PARAMS.userCode;
  }

  protected getModel(code: string): Observable<Budget> {
    return this.b2bUserService.get(code);
  }
}
