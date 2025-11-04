/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { COST_CENTER_NORMALIZER } from '../../../../cost-center/connectors/cost-center/converters';
import { EntitiesModel } from '../../../../model/misc.model';
import { CostCenter } from '../../../../model/org-unit.model';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class OccCostCenterListNormalizer
  implements Converter<Occ.CostCentersList, EntitiesModel<CostCenter>>
{
  private converter = inject(ConverterService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  convert(
    source: Occ.CostCentersList,
    target?: EntitiesModel<CostCenter>
  ): EntitiesModel<CostCenter> {
    if (target === undefined) {
      target = { ...(source as any) } as EntitiesModel<CostCenter>;
    }
    target.values = source.costCenters.map((costCenter) => ({
      ...this.converter.convert(costCenter, COST_CENTER_NORMALIZER),
    }));

    return target;
  }
}
