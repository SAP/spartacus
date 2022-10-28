/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { GENERATED_CONSTRUCTOR_MIGRATIONS } from './data/generated-constructor.migration';
import { REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/register.component.migration';
import { STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/stock-notification-dialog.component.migration';
import { STOCK_NOTIFICATION_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/stock-notification.component.migration';
import { SUGGESTED_ADDRESS_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/suggested-addresses-dialog.component-migration';
import { TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/tracking-events.component.migration';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  ...GENERATED_CONSTRUCTOR_MIGRATIONS,
  TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION,
  SUGGESTED_ADDRESS_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  STOCK_NOTIFICATION_COMPONENT_CONSTRUCTOR_MIGRATION,
  REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateConstructorDeprecation(
      tree,
      context,
      CONSTRUCTOR_DEPRECATIONS_DATA
    );
  };
}
