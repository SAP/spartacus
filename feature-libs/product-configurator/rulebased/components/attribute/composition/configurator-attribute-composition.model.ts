/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '../../../core/model/configurator.model';

@Injectable()
export class ConfiguratorAttributeCompositionContext {
  componentKey: string;
  attribute: Configurator.Attribute;
  owner: CommonConfigurator.Owner;
  group: Configurator.Group;
  language: string;
  expMode: boolean;
  isNavigationToGroupEnabled?: boolean;
}
