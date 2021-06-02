import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  DEFAULT_LOCAL_STORAGE_KEY,
  DEFAULT_SESSION_STORAGE_KEY,
  DEFAULT_STATE_CONFIG,
  SPARTACUS_CORE,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  {
    node: DEFAULT_STATE_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${DEFAULT_STATE_CONFIG}' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.`,
  },
  {
    node: DEFAULT_LOCAL_STORAGE_KEY,
    importPath: SPARTACUS_CORE,
    comment: `'${DEFAULT_LOCAL_STORAGE_KEY}' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.`,
  },
  {
    node: DEFAULT_SESSION_STORAGE_KEY,
    importPath: SPARTACUS_CORE,
    comment: `'${DEFAULT_SESSION_STORAGE_KEY}' was removed with the whole storage sync mechanism. For syncing your data to and from browser storage use StatePersistenceService.`,
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
