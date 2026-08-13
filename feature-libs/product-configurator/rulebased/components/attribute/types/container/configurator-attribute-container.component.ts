/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';

/**
 * Renders a CPQ container attribute and its individually configurable
 * sub-product rows.
 */
@Component({
  selector: 'cx-configurator-attribute-container',
  templateUrl: './configurator-attribute-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeContainerComponent extends ConfiguratorAttributeBaseComponent {
  attribute: Configurator.Attribute;

  constructor(
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext
  ) {
    super();
    this.attribute = attributeComponentContext.attribute;
  }
}
