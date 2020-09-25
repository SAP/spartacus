import { Injectable } from '@angular/core';
import { B2BUser, RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  OrgUnitService,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { UnitUserRolesFormService } from '../roles/unit-user-roles-form.service';
import { CurrentUnitUserService } from './current-unit-user.service';
import { ItemInfo } from '../../../../../core/model/LoadStatus';
@Injectable({
  providedIn: 'root',
})
export class UnitUserItemService extends OrganizationItemService<B2BUser> {
  constructor(
    protected currentItemService: CurrentUnitUserService,
    protected routingService: RoutingService,
    protected formService: UnitUserRolesFormService,
    protected unitService: OrgUnitService,
    protected b2bUserService: B2BUserService
  ) {
    super(currentItemService, routingService, formService);
  }

  load(unitUid: string): Observable<B2BUser> {
    return this.b2bUserService.get(unitUid);
  }

  update(_customerId: string, _user: B2BUser): Observable<ItemInfo<B2BUser>> {
    return this.b2bUserService.getLoadingStatus(_customerId);
  }

  protected create(_customerId: B2BUser): void {}

  protected getDetailsRoute(): string {
    return this.currentItemService.getDetailsRoute();
  }
}
