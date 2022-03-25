import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { addLibraryFeature, FeatureConfig, LibraryOptions } from './lib-utils';
import { getSchematicsConfigurationByFeature } from './schematics-config-utils';

/**
 * Override the pre-defined configurations for the given feature
 */
export interface FeatureConfigurationOverrides<T = LibraryOptions> {
  /**
   * If specified, overrides the pre-defined schematics configuration.
   * Usually used when customConfig needs to be provided.
   */
  schematics?: FeatureConfig;
  /**
   * If specified, overrides the pre-defined schematics options.
   */
  options?: T;
}

// TODO:#schematics - [at the end] move some of the methods from lib-utils?

/**
 * Configures feature modules for the given array of features.
 *
 * Optionally, an override can be provided for the default
 * schematics options and/or feature-schematics configuration.
 */
export function addFeatures<T extends LibraryOptions>(
  options: SpartacusOptions,
  features: string[],
  configurationOverrides?: Record<string, FeatureConfigurationOverrides<T>>
): Rule {
  return (_tree: Tree, _context: SchematicContext): Rule => {
    const genericLibraryOptions: LibraryOptions = {
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

      const config =
        configurationOverrides?.[feature]?.schematics ??
        schematicsConfiguration;
      const libraryOptions =
        configurationOverrides?.[feature]?.options ?? genericLibraryOptions;
      rules.push(addLibraryFeature(libraryOptions, config));
    }
    return chain(rules);
  };
}
