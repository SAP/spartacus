/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { UnitFormService } from '../form/unit-form.service';
import { CurrentUnitService } from './current-unit.service';

@Injectable({
  providedIn: 'root',
})
export class UnitItemService extends ItemService<B2BUnit> {
  protected override currentItemService = inject(CurrentUnitService);
  protected override routingService = inject(RoutingService);
  protected override formService = inject(UnitFormService);
  protected unitService = inject(OrgUnitService);

  /**
   * @override
   * Returns the unit for the given code.
   *
   * Loads the unit each time, to ensure accurate data is resolved.
   */
  load(code: string): Observable<B2BUnit> {
    this.unitService.load(code);
    return this.unitService.get(code);
  }

  update(
    code: string,
    value: B2BUnit
  ): Observable<OrganizationItemStatus<B2BUnit>> {
    this.unitService.update(code, value);
    return this.unitService.getLoadingStatus(value.uid ?? '');
  }

  protected create(
    value: B2BUnit
  ): Observable<OrganizationItemStatus<B2BUnit>> {
    this.unitService.create(value);
    return this.unitService.getLoadingStatus(value.uid ?? '');
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitDetails';
  }
}
