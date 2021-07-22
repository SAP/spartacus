import { Rule, Tree } from '@angular-devkit/schematics';
import {
  getDefaultProjectNameFromWorkspace,
  scaffoldStructure,
} from '../../../shared/utils/workspace-utils';

export function scaffoldAppStructure(tree: Tree): Rule {
  const project = getDefaultProjectNameFromWorkspace(tree);
  return scaffoldStructure({ project });
}
