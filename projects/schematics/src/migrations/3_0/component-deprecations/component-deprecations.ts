import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ComponentData } from '../../../shared/utils/file-utils';
import { migrateComponentMigration } from '../../mechanism/component-deprecations/component-deprecations';
import { ATTRIBUTES_DIRECTIVE_MIGRATION } from './data/attributes.directive.migration';

export const COMPONENT_DEPRECATION_DATA: ComponentData[] = [
  ATTRIBUTES_DIRECTIVE_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateComponentMigration(tree, context, COMPONENT_DEPRECATION_DATA);
  };
}
