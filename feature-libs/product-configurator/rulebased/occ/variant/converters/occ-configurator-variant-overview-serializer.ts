/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, ConverterService } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from '../../../core/model/configurator.model';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantOverviewSerializer
  implements Converter<Configurator.Overview, OccConfigurator.Overview>
{
  constructor(protected converterService: ConverterService) {}

  convert(
    source: Configurator.Overview,
    target?: OccConfigurator.Overview
  ): OccConfigurator.Overview {
    return {
      ...target,
      id: source.configId,
      productCode: source.productCode,
      appliedCsticFilter: this.convertAttributeFilters(source.attributeFilters),
      groupFilterList: this.convertGroupFilters(source.groupFilters),
    };
  }

  protected convertAttributeFilters(
    attributeFilters?: Configurator.OverviewFilter[]
  ): OccConfigurator.OverviewFilter[] {
    const result: OccConfigurator.OverviewFilter[] = [];
    attributeFilters?.forEach((filter) => {
      result.push({ key: filter, selected: true });
    });
    return result;
  }

  protected convertGroupFilters(
    groupFilters?: string[]
  ): OccConfigurator.OverviewFilter[] {
    const result: OccConfigurator.OverviewFilter[] = [];
    groupFilters?.forEach((filter) => {
      result.push({ key: filter, selected: true });
    });
    return result;
  }
}
