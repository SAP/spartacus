/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ConfiguratorAttributeHeaderComponent } from '@spartacus/product-configurator/rulebased';

@Component({
  selector: 'cx-configurator-attribute-header',
  templateUrl: './custom-attribute-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeHeaderComponent extends ConfiguratorAttributeHeaderComponent {
  get isPriceRelevant(): boolean {
    const attrName = this.attribute.name;
    return attrName.startsWith('CHHI_HY') || attrName.startsWith('CHHI_BATT');
  }
}
