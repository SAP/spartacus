import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UnitFormService } from '../form/unit-form.service';
import { CurrentUnitService } from './current-unit.service';
import { MessageService } from '../../shared/organization-message/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class UnitItemService extends OrganizationItemService<B2BUnit> {
  constructor(
    protected currentItemService: CurrentUnitService,
    protected routingService: RoutingService,
    protected formService: UnitFormService,
    protected unitService: OrgUnitService,
    protected messageService: MessageService
  ) {
    super(currentItemService, routingService, formService, messageService);
  }

  protected i18nRoot = 'unit';

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

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'unitDetails';
  }
}
