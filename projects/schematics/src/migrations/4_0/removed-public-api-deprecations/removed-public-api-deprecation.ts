import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  QUALTRICS_COMPONENT,
  QUALTRICS_CONFIG,
  QUALTRICS_EVENT_NAME,
  QUALTRICS_LOADER_SERVICE,
  QUALTRICS_MODULE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

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
  // projects/storefrontlib/src/cms-components/misc/qualtrics/config/qualtrics-config.ts
  {
    node: QUALTRICS_CONFIG,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${QUALTRICS_CONFIG}' was moved to @spartacus/qualtrics/components.`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics-loader.service.ts
  {
    node: QUALTRICS_EVENT_NAME,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${QUALTRICS_EVENT_NAME}' was moved to @spartacus/qualtrics/components.`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics-loader.service.ts
  {
    node: QUALTRICS_LOADER_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${QUALTRICS_LOADER_SERVICE}' was moved to @spartacus/qualtrics/components.`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics.component.ts
  {
    node: QUALTRICS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${QUALTRICS_COMPONENT}' was moved to @spartacus/qualtrics/components.`,
  },
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics.module.ts
  {
    node: QUALTRICS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${QUALTRICS_MODULE}' was moved to @spartacus/qualtrics/components.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
