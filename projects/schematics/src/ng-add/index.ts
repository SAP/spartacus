/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  noop,
  Rule,
  schematic,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';

export default function (options: SpartacusOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      schematic('add-spartacus', options),
      options.pwa ? schematic('add-pwa', options) : noop(),
      options.ssr ? schematic('add-ssr', options) : noop(),
    ])(host, context);
  };
}
