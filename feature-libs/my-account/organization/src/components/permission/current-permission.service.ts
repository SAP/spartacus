import { Injectable } from '@angular/core';
import { Budget, PermissionService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationService } from '../shared/base-current.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentPermissionService extends CurrentOrganizationService<
  Budget
> {
  readonly name$: Observable<string> = this.model$.pipe(pluck('name'));

  constructor(
    protected routingService: RoutingService,
    protected permissionService: PermissionService
  ) {
    super(routingService);
  }

  protected getParam() {
    return ROUTE_PARAMS.permissionCode;
  }

  protected getModel(code: string): Observable<Budget> {
    return this.permissionService.get(code);
  }
}
