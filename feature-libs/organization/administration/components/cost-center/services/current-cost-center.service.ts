/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CostCenter, RoutingService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentCostCenterService extends CurrentItemService<CostCenter> {
  protected override routingService = inject(RoutingService);
  protected costCenterService = inject(CostCenterService);

  protected getParamKey() {
    return ROUTE_PARAMS.costCenterCode;
  }

  protected getItem(code: string): Observable<CostCenter> {
    return this.costCenterService.get(code);
  }

  getError(code: string): Observable<boolean> {
    return this.costCenterService.getErrorState(code);
  }
}
