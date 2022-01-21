import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { AUTH_HTTP_HEADER_SERVICE_MIGRATION } from './data/auth-http-header.service.migration';
import { PROGRESS_BUTTON_COMPONENT_MIGRATION } from './data/progress-button.component.migration';
import { QUICK_ORDER_SERVICE_MIGRATION } from './data/quick-order.service.migration';

export const METHODS_AND_PROPERTIES_DEPRECATIONS_DATA: MethodPropertyDeprecation[] =
  [
    ...AUTH_HTTP_HEADER_SERVICE_MIGRATION,
    ...QUICK_ORDER_SERVICE_MIGRATION,
    ...PROGRESS_BUTTON_COMPONENT_MIGRATION,
  ];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateMethodPropertiesDeprecation(
      tree,
      context,
      METHODS_AND_PROPERTIES_DEPRECATIONS_DATA
    );
  };
}
