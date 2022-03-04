import { Rule, Tree } from '@angular-devkit/schematics';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { migrateRenamedSymbols } from '../../mechanism/rename-symbol/rename-symbol';
import { CART_LIB_CHECKOUT_RENAMED_SYMBOLS_DATA } from './cart-lib-checkout.migration';
import { CHECKOUT_RENAMED_SYMBOLS_DATA } from './checkout-rename-symbol';

export const RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
  ...CHECKOUT_RENAMED_SYMBOLS_DATA,
  ...CART_LIB_CHECKOUT_RENAMED_SYMBOLS_DATA,
];

export function migrate(): Rule {
  return (tree: Tree) => {
    return migrateRenamedSymbols(tree, RENAMED_SYMBOLS_DATA);
  };
}
