import { Rule, Tree } from '@angular-devkit/schematics';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';

export const RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
  {
    previousNode: 'OtherComponent1',
    previousImportPath: '@spartacus/storefront',
    newImportPath: '@spartacus/storefinder/components',
  },
  {
    previousNode: 'OtherComponent2',
    previousImportPath: '@spartacus/storefront',
    newNode: 'OtherComponentTest2',
    newImportPath: '@spartacus/storefinder/components',
  },
  {
    previousNode: 'OtherComponent3',
    previousImportPath: '@spartacus/storefront',
    newImportPath: '@spartacus/storefinder/components',
  },
  {
    previousNode: 'OtherComponent4',
    previousImportPath: '@spartacus/storefront',
    newNode: 'OtherComponentTest4',
    newImportPath: '@spartacus/storefinder/components',
  },
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
