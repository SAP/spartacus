/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { RulebasedConfiguratorModule } from '@spartacus/product-configurator/rulebased';
import { RulebasedCpqConfiguratorModule } from '@spartacus/product-configurator/rulebased/cpq';
import { environment } from '../../../../environments/environment';
import { CustomAttributeFooterModule } from '../../../custom/components/custom-attribute-footer.module';
import { CustomAttributeRadioButtonModule } from '../../../custom/components/custom-attribute-radio-button.module';

const extensions: Type<any>[] = [];

if (environment.cpq) {
  extensions.push(RulebasedCpqConfiguratorModule);
}

@NgModule({
  imports: [
    RulebasedConfiguratorModule,
    CustomAttributeFooterModule,
    CustomAttributeRadioButtonModule,
    ...extensions,
  ],
})
export class RulebasedConfiguratorWrapperModule {}
