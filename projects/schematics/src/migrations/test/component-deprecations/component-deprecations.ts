import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ComponentData } from '../../../shared/utils/file-utils';
import { migrateComponentMigration } from '../../mechanism/component-deprecations/component-deprecations';
import { ANONYMOUS_CONSENT_DIALOG_COMPONENT_MIGRATION } from './data/anonymous-consent-dialog.component.migration';
import { CONSENT_MANAGEMENT_FORM_COMPONENT_MIGRATION } from './data/consent-management-form.component.migration';
import { CONSENT_MANAGEMENT_COMPONENT_MIGRATION } from './data/consent-management.component.migration';
import { NAVIGATION_UI_COMPONENT_MIGRATION } from './data/navigation-ui.component.migration';
import { PRODUCT_FACET_NAVIGATION_COMPONENT_MIGRATION } from './data/product-facet-navigation-component.migration';
import { PRODUCT_IMAGES_COMPONENT_MIGRATION } from './data/product-images.component.migration';

export const COMPONENT_DEPRECATION_DATA: ComponentData[] = [
  CONSENT_MANAGEMENT_FORM_COMPONENT_MIGRATION,
  CONSENT_MANAGEMENT_COMPONENT_MIGRATION,
  PRODUCT_IMAGES_COMPONENT_MIGRATION,
  ANONYMOUS_CONSENT_DIALOG_COMPONENT_MIGRATION,
  NAVIGATION_UI_COMPONENT_MIGRATION,
  PRODUCT_FACET_NAVIGATION_COMPONENT_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateComponentMigration(tree, context, COMPONENT_DEPRECATION_DATA);
  };
}
