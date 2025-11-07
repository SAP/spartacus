/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitService extends CurrentItemService<B2BUnit> {
  protected routingService: RoutingService;
  protected orgUnitService = inject(OrgUnitService);

  constructor() {
    const routingService = inject(RoutingService);

    super(routingService);
  
    this.routingService = routingService;
  }

  protected getParamKey() {
    return ROUTE_PARAMS.unitCode;
  }

  protected getItem(code: string): Observable<B2BUnit> {
    return this.orgUnitService.get(code);
  }

  getError(code: string): Observable<boolean> {
    return this.orgUnitService.getErrorState(code);
  }
}
