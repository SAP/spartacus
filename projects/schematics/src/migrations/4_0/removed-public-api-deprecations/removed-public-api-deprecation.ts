import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';
import {
  SPARTACUS_CORE,
  OCC_CONFIG_LOADER_SERVICE,
  OCC_LOADED_CONFIG_CONVERTER,
  OCC_LOADED_CONFIG,
  OCC_SITES_CONFIG_LOADER,
  OCC_CONFIG_LOADER_MODULE,
} from '../../../shared/constants';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
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
  //projects/core/src/occ/config-loader/occ-config-loader.module.ts
  {
    node: OCC_CONFIG_LOADER_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_CONFIG_LOADER_MODULE} has been removed and is no longer part of the public API.`,
  },
  //projects/core/src/occ/config-loader/occ-config-loader.service.ts
  {
    node: OCC_CONFIG_LOADER_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_CONFIG_LOADER_SERVICE} has been removed and is no longer part of the public API.`,
  },
  //projects/core/src/occ/config-loader/occ-loaded-config-converter.ts
  {
    node: OCC_LOADED_CONFIG_CONVERTER,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_LOADED_CONFIG_CONVERTER} has been removed and is no longer part of the public API.`,
  },
  //projects/core/src/occ/config-loader/occ-loaded-config.ts
  {
    node: OCC_LOADED_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_LOADED_CONFIG} has been removed and is no longer part of the public API.`,
  },
  //projects/core/src/occ/config-loader/occ-sites-config-loader.ts
  {
    node: OCC_SITES_CONFIG_LOADER,
    importPath: SPARTACUS_CORE,
    comment: `'${OCC_SITES_CONFIG_LOADER} has been removed and is no longer part of the public API.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
