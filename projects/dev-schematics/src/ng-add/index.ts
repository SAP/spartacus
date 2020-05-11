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

export default function (options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!getSpartacusVersion(host)) {
      throw new SchematicsException(
        'Could not find Spartacus in package dependencies. Please install Spartacus before using this schematic.'
      );
    }

    return chain([
      options['default-base-sites'] && JSON.parse(options['default-base-sites'])
        ? schematic('add-baseSite', options)
        : noop(),

      options['default-routing'] && JSON.parse(options['default-routing'])
        ? schematic('add-routing', options)
        : noop(),

      options['test-outlets'] && JSON.parse(options['test-outlets'])
        ? schematic('add-test-outlets', options)
        : noop(),
    ])(host, context);
  };
}
