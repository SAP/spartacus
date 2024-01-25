/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfiguratorBasicEffects } from './configurator-basic.effect';
import { ConfiguratorCartEffects } from './configurator-cart.effect';
import { ConfiguratorVariantEffects } from './configurator-variant.effect';

export const ConfiguratorEffects: any[] = [
  ConfiguratorBasicEffects,
  ConfiguratorCartEffects,
  ConfiguratorVariantEffects,
];
