/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import {
  RulebasedConfiguratorModule,
  VARIANT_CONFIGURATOR_NORMALIZER,
} from '@spartacus/product-configurator/rulebased';
import { RulebasedCpqConfiguratorModule } from '@spartacus/product-configurator/rulebased/cpq';
import { environment } from '../../../../environments/environment';
import { CustomAttributeHeaderModule } from '../../../custom/components/custom-attribute-header.module';
import { CustomAttributeRadioButtonModule } from '../../../custom/components/custom-attribute-radio-button.module';
import { CustomConfiguratorVariantNormalizer } from '../../../custom/converters/custom-configurator-variant-normalizer';

const extensions: Type<any>[] = [];

if (environment.cpq) {
  extensions.push(RulebasedCpqConfiguratorModule);
}

@NgModule({
  imports: [
    RulebasedConfiguratorModule,

    CustomAttributeRadioButtonModule,
    CustomAttributeHeaderModule,
    ...extensions,
  ],
  providers: [
    {
      provide: VARIANT_CONFIGURATOR_NORMALIZER,
      useExisting: CustomConfiguratorVariantNormalizer,
      multi: true,
    },
  ],
})
export class RulebasedConfiguratorWrapperModule {}
