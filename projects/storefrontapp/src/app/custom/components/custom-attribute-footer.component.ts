/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ConfiguratorAttributeFooterComponent } from '@spartacus/product-configurator/rulebased';

@Component({
  selector: 'custom-attribute-footer',
  templateUrl: './custom-attribute-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomAttributeFooterComponent extends ConfiguratorAttributeFooterComponent {}
