import { Rule, Tree } from '@angular-devkit/schematics';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';
import { RENAMED_SYMBOLS_DATA } from './rename-symbol.migration';

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
