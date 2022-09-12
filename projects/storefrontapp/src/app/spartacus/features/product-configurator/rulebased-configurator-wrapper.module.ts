/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { RulebasedConfiguratorModule } from '@commerce-storefront-toolset/product-configurator/rulebased';
import { RulebasedCpqConfiguratorModule } from '@commerce-storefront-toolset/product-configurator/rulebased/cpq';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.cpq) {
  extensions.push(RulebasedCpqConfiguratorModule);
}

@NgModule({
  imports: [RulebasedConfiguratorModule, ...extensions],
})
export class RulebasedConfiguratorWrapperModule {}
