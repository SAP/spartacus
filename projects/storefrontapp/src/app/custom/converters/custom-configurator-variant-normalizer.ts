/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Configurator,
  OccConfigurator,
  OccConfiguratorVariantNormalizer,
} from '@spartacus/product-configurator/rulebased';

@Injectable({ providedIn: 'root' })
export class CustomConfiguratorVariantNormalizer extends OccConfiguratorVariantNormalizer {
  convertAttribute(
    sourceAttribute: OccConfigurator.Attribute,
    attributeList: Configurator.Attribute[]
  ): void {
    super.convertAttribute(sourceAttribute, attributeList);
    const currentAttribute = attributeList[attributeList.length - 1];
    if (currentAttribute.name.includes('CLRX')) {
      currentAttribute.uiTypeVariation = 'STRING___color';
    }
  }
}
