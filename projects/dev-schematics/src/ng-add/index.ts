import {
  chain,
  noop,
  Rule,
  schematic,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { getSpartacusVersion } from '../shared/utils/package-utils';
import { Schema as DevSpartacusOptions } from './schema';

export default function (options: DevSpartacusOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!getSpartacusVersion(host)) {
      throw new SchematicsException(
        'Could not find Spartacus in package dependencies. Please install Spartacus before using this schematic.'
      );
    }

    return chain([
      options['default-base-sites']
        ? schematic('add-baseSites', options)
        : noop(),

      options['default-routing'] ? schematic('add-routing', options) : noop(),

      options['test-outlets'] ? schematic('add-test-outlets', options) : noop(),
    ])(host, context);
  };
}
