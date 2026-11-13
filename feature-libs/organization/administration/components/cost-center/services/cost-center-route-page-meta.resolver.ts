/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CostCenter, DefaultRoutePageMetaResolver } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentCostCenterService } from './current-cost-center.service';

@Injectable({ providedIn: 'root' })
export class CostCenterRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  protected currentItemService = inject(CurrentCostCenterService);

  protected getParams(): Observable<CostCenter | undefined> {
    return this.currentItemService.item$;
  }
}
