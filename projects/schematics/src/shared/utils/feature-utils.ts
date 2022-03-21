import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { addLibraryFeature, LibraryOptions } from './lib-utils';
import { getSchematicsConfigurationByFeature } from './schematics-config-utils';

// TODO:#schematics - test
// TODO:#schematics - move some of the methods from lib-utils?

// TODO:#schematics - comment
export function addFeatures(
  options: SpartacusOptions,
  features: string[]
): Rule {
  return (_tree: Tree, _context: SchematicContext): Rule => {
    const libraryOptions: LibraryOptions = {
      project: options.project,
      lazy: options.lazy,
      debug: options.debug,
      interactive: options.interactive,
    };

    const rules: Rule[] = [];
    for (const feature of features) {
      const schematicsConfiguration =
        getSchematicsConfigurationByFeature(feature);
      if (!schematicsConfiguration) {
        throw new SchematicsException(
          `No feature config found for ${feature}. Please check if you added the schematics config to the projects/schematics/src/shared/updateable-constants.ts`
        );
      }

      rules.push(addLibraryFeature(libraryOptions, schematicsConfiguration));
    }
    return chain(rules);
  };
}
