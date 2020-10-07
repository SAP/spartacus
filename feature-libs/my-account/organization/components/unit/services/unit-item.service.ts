import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  OrgUnitService,
  OrganizationItemStatus,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UnitFormService } from '../form/unit-form.service';
import { CurrentUnitService } from '../services/current-unit.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UnitItemService extends OrganizationItemService<B2BUnit> {
  constructor(
    protected currentItemService: CurrentUnitService,
    protected routingService: RoutingService,
    protected formService: UnitFormService,
    protected unitService: OrgUnitService
  ) {
    super(currentItemService, routingService, formService);
  }

  /**
   * @override
   * Returns the budget for the given code.
   *
   * Loads the budget each time, to ensure accurate data is resolved.
   */
  load(code: string): Observable<B2BUnit> {
    this.unitService.load(code);
    return this.unitService.get(code);
  }

  update(code, value: B2BUnit): Observable<OrganizationItemStatus<B2BUnit>> {
    this.unitService.update(code, value);
    return this.unitService.getLoadingStatus(code);
  }

  protected create(value: B2BUnit) {
    this.unitService.create(value);
  }

  protected save(form: FormGroup, key?: string) {
    form.get('parentOrgUnit').enable();
    super.save(form, key);
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitDetails';
  }
}
