import {
  RenamedSymbol,
  SPARTACUS_CHECKOUT_B2B_ROOT,
  SPARTACUS_SETUP,
} from '@spartacus/schematics';

export const CHECKOUT_RENAMED_SYMBOLS_DATA: RenamedSymbol[] = [
  // core-libs/setup/recipes/b2b/config/default-b2b-checkout-config.ts
  {
    previousImportPath: SPARTACUS_SETUP,
    previousNode: `defaultB2bCheckoutConfig`,
    newImportPath: SPARTACUS_CHECKOUT_B2B_ROOT,
  },
  // core-libs/setup/recipes/b2b/config/default-b2b-occ-config.ts
  {
    previousImportPath: SPARTACUS_SETUP,
    previousNode: `defaultB2bOccConfig`,
    newImportPath: SPARTACUS_CHECKOUT_B2B_ROOT,
  },
];
