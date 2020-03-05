import { CART_EFFECTS, SPARTACUS_CORE } from '../../shared/constants';
import { DeprecatedNode } from '../../shared/utils/file-utils';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // projects/core/src/cart/store/effects/cart.effect.ts
  {
    node: CART_EFFECTS,
    importPath: SPARTACUS_CORE,
  },
];
