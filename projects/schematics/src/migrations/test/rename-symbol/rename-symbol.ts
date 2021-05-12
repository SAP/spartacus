import { Rule, Tree } from '@angular-devkit/schematics';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';

export const RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
  {
    previousNode: 'StoreFinderMapComponent',
    previousImportPath: '@spartacus/storefront',
    newNode: 'StoreFinderMapComponent', // optional when the name doesn't change
    newImportPath: '@spartacus/storefinder/components',
  },
  {
    previousNode: 'OtherComponent',
    previousImportPath: '@spartacus/storefront',
    newNode: 'OtherComponent', // optional when the name doesn't change
    newImportPath: '@spartacus/storefinder/components',
  },
  {
    previousNode: 'StoreFinderMapComponent3',
    previousImportPath: '@spartacus/storefront3',
    newNode: 'StoreFinderMapComponent3', // optional when the name doesn't change
    newImportPath: '@spartacus/storefinder/components3',
  },
  {
    previousNode: 'OtherComponent3',
    previousImportPath: '@spartacus/storefront3',
    newNode: 'OtherComponent3', // optional when the name doesn't change
    newImportPath: '@spartacus/storefinder/components3',
  },
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
