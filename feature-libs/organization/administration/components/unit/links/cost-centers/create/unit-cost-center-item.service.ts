/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CostCenter } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CostCenterItemService } from '../../../../cost-center/services/cost-center-item.service';

@Injectable({
  providedIn: 'root',
})
export class UnitCostCenterItemService extends CostCenterItemService {
  save(
    form: UntypedFormGroup,
    key?: string
  ): Observable<OrganizationItemStatus<CostCenter>> {
    // we enable the unit so that the underlying
    // save method can read the complete form.value.
    form.get('unit')?.enable();
    return super.save(form, key);
  }

  /**
   * @override
   * Returns 'orgUnitCostCenters'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitCostCenters';
  }

  protected buildRouteParams(item: CostCenter) {
    return { uid: item.unit?.uid };
  }
}
