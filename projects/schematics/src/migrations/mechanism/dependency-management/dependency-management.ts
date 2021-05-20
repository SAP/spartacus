import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addPackageJsonDependencies,
  installPackageJsonDependencies,
} from '../../../shared/utils/lib-utils';
import { prepare3rdPartyDependencies } from '../../../shared/utils/package-utils';

export function migrate(): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      addPackageJsonDependencies(prepare3rdPartyDependencies()),
      installPackageJsonDependencies(),
    ]);
  };
}
