/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CostCenter } from '../../../../model/org-unit.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class OccCostCenterSerializer
  implements Converter<CostCenter, Occ.CostCenter>
{
  convert(source: CostCenter, target?: Occ.CostCenter): Occ.CostCenter {
    if (target === undefined) {
      target = { ...(source as any) } as Occ.CostCenter;
    }
    target.activeFlag = source.active;
    delete target.active;
    return target;
  }
}
