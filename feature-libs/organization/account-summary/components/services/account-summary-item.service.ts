import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  CurrentUnitService,
  ItemService,
  UnitFormService,
} from '@spartacus/organization/administration/components';
import {
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryItemService extends ItemService<B2BUnit> {
  constructor(
    protected currentItemService: CurrentUnitService,
    protected routingService: RoutingService,
    protected formService: UnitFormService,
    protected unitService: OrgUnitService
  ) {
    super(currentItemService, routingService, formService);
  }

  load(): Observable<B2BUnit> {
    throw new Error('Method not implemented.');
  }

  launchDetails(item: B2BUnit): void {
    const detailsPageRoute = this.getDetailsRoute();
    const selectedUnit = this.buildRouteParams(item);
    if (detailsPageRoute && item && Object.keys(item).length > 0) {
      this.routingService.go({
        cxRoute: detailsPageRoute,
        params: selectedUnit,
      });
    }
  }

  protected create(
    _value: B2BUnit
  ): Observable<OrganizationItemStatus<B2BUnit>> {
    throw new Error('Method not implemented.');
  }
  update(
    _key: string,
    _value: B2BUnit
  ): Observable<OrganizationItemStatus<B2BUnit>> {
    throw new Error('Method not implemented.');
  }

  protected getDetailsRoute(): string {
    return 'orgAccountSummaryDetails';
  }
}
