import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { SPARTACUS_CORE } from '../../../shared/constants';
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
  // projects/core/src/personalization/personalization.module.ts
  {
    node: 'PersonalizationModule',
    importPath: SPARTACUS_CORE,
    comment: `'PersonalizationModule was removed. Use @spartacus/tracking/personalization instead.`,
  },
  // projects/core/src/personalization/config/personalization-config.ts
  {
    node: 'PersonalizationConfig',
    importPath: SPARTACUS_CORE,
    comment: `'PersonalizationConfig was moved to @spartacus/tracking/personalization/root.`,
  },
  // projects/core/src/personalization/services/personalization-context.service.ts
  {
    node: 'PersonalizationContextService',
    importPath: SPARTACUS_CORE,
    comment: `'PersonalizationContextService was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    node: 'PersonalizationAction',
    importPath: SPARTACUS_CORE,
    comment: `'PersonalizationAction was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    node: 'PersonalizationContext',
    importPath: SPARTACUS_CORE,
    comment: `'PersonalizationContext was moved to @spartacus/tracking/personalization/core.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
