import { Rule, Tree } from '@angular-devkit/schematics';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';

export const RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
  {
    // 1) For import change
    previousNode: 'OtherComponent1',
    previousImportPath: '@spartacus/storefront',
    newImportPath: '@spartacus/storefinder/components',
  },
  {
    // 2) For import and rename change with alias
    previousNode: 'OtherComponent2',
    previousImportPath: '@spartacus/storefront',
    newNode: 'OtherComponentTest2',
    newImportPath: '@spartacus/storefinder/components',
  },
  {
    // 3) For import and rename change
    previousNode: 'OtherComponent3',
    previousImportPath: '@spartacus/storefront',
    newNode: 'OtherComponentTest3',
    newImportPath: '@spartacus/storefinder/components',
  },
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
