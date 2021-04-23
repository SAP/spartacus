import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  CART_PAGE_META_RESOLVER,
  CONTENT_PAGE_META_RESOLVER,
  SPARTACUS_CORE,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  {
    node: CART_PAGE_META_RESOLVER,
    importPath: SPARTACUS_CORE,
    comment: `'${CART_PAGE_META_RESOLVER}' was removed since all data is now data driven by CMS page data and is resolved by the ${CONTENT_PAGE_META_RESOLVER}`,
  },
  // uncomment product variants deprecation on 4.0 migration works (#11391)
  // // projects/storefrontlib/src/cms-components/product/product-variants/product-variants.component.ts
  // {
  //   node: PRODUCT_VARIANT_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${PRODUCT_VARIANT_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-color-selector/variant-color-selector.component.ts
  // {
  //   node: VARIANT_COLOR_SELECTOR_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_COLOR_SELECTOR_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-size-selector/variant-size-selector.component.ts
  // {
  //   node: VARIANT_SIZE_SELECTOR_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_SIZE_SELECTOR_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.component.ts
  // {
  //   node: VARIANT_STYLE_ICONS_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_STYLE_ICONS_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
  // // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-selector/variant-style-selector.component.ts
  // {
  //   node: VARIANT_STYLE_SELECTOR_COMPONENT,
  //   importPath: SPARTACUS_STOREFRONTLIB,
  //   comment: `'${VARIANT_STYLE_SELECTOR_COMPONENT}' was moved to @spartacus/product/variants.`,
  // },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
