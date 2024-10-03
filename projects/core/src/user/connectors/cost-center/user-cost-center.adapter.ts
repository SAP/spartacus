/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { CostCenter } from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';

export abstract class UserCostCenterAdapter {
  /**
   * Returns the list of all active cost centers of the login user
   * @param userId
   */
  abstract loadActiveList(
    userId: string
  ): Observable<EntitiesModel<CostCenter>>;
}
