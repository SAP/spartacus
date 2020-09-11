import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { CurrentUnitService } from '../current-unit.service';
import { UnitFormService } from '../form/unit-form.service';

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

  update(code, value: B2BUnit) {
    this.unitService.update(code, value);
  }

  protected create(value: B2BUnit) {
    this.unitService.create(value);
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitDetails';
  }
}
