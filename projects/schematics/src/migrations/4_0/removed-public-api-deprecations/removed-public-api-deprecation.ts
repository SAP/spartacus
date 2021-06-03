import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  PERSONALIZATION_ACTION,
  PERSONALIZATION_CONFIG,
  PERSONALIZATION_CONTEXT,
  PERSONALIZATION_CONTEXT_SERVICE,
  PERSONALIZATION_MODULE,
  DEFAULT_LOCAL_STORAGE_KEY,
  DEFAULT_SESSION_STORAGE_KEY,
  DEFAULT_STATE_CONFIG,
  SPARTACUS_CORE,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';
import {
  ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
  REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
  SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
  SPARTACUS_CART_SAVED_CART_COMPONENTS,
  SPARTACUS_STOREFRONTLIB,
  PRODUCT_VARIANT_COMPONENT,
  PRODUCT_VARIANT_GUARD,
  PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
  PRODUCT_VARIANT_STYLE_ICONS_MODULE,
  PRODUCT_VARIANTS_MODULE,
  SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
  SPARTACUS_STOREFRONTLIB,
  VARIANT_COLOR_SELECTOR_COMPONENT,
  VARIANT_COLOR_SELECTOR_MODULE,
  VARIANT_SIZE_SELECTOR_COMPONENT,
  VARIANT_SIZE_SELECTOR_MODULE,
  VARIANT_STYLE_ICONS_COMPONENT,
  VARIANT_STYLE_ICONS_MODULE,
  VARIANT_STYLE_SELECTOR_COMPONENT,
  VARIANT_STYLE_SELECTOR_MODULE
} from '../../../shared/constants';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  {
    node: SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
    importPath: SPARTACUS_CART_SAVED_CART_COMPONENTS,
    comment: `'${SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE}' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.`,
  },
  {
    node: ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${ANONYMOUS_CONSENT_LAUNCH_DIALOG_SERVICE}' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.`,
  },
  {
    node: REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${REPLENISHMENT_ORDER_CANCELLATION_LAUNCH_DIALOG_SERVICE}' has been removed.' 'openDialog' method has been moved to 'LaunchDialogService'.`,
  },
  // projects/core/src/personalization/personalization.module.ts
  {
    node: PERSONALIZATION_MODULE,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_MODULE} was removed. Use @spartacus/tracking/personalization instead.`,
  },
  // projects/core/src/personalization/config/personalization-config.ts
  {
    node: PERSONALIZATION_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_CONFIG} was moved to @spartacus/tracking/personalization/root.`,
  },
  // projects/core/src/personalization/services/personalization-context.service.ts
  {
    node: PERSONALIZATION_CONTEXT_SERVICE,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_CONTEXT_SERVICE} was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    node: PERSONALIZATION_ACTION,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_ACTION} was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/core/src/personalization/model/personalization-context.model.ts
  {
    node: PERSONALIZATION_CONTEXT,
    importPath: SPARTACUS_CORE,
    comment: `${PERSONALIZATION_CONTEXT} was moved to @spartacus/tracking/personalization/core.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/product-variants.module.ts
  {
    node: PRODUCT_VARIANTS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANTS_MODULE}' was removed from @spartacus/storefront. Use @spartacus/product/variants feature-library instead.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/product-variants.component.ts
  {
    node: PRODUCT_VARIANT_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANT_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantsContainerComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-color-selector/variant-color-selector.component.ts
  {
    node: VARIANT_COLOR_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_COLOR_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantColorSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-color-selector/variant-color-selector.module.ts
  {
    node: VARIANT_COLOR_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_COLOR_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantColorSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-size-selector/variant-size-selector.component.ts
  {
    node: VARIANT_SIZE_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_SIZE_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-size-selector/variant-size-selector.module.ts
  {
    node: VARIANT_SIZE_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_SIZE_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantSizeSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-selector/variant-style-selector.component.ts
  {
    node: VARIANT_STYLE_SELECTOR_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_SELECTOR_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorComponent from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-selector/variant-style-selector.module.ts
  {
    node: VARIANT_STYLE_SELECTOR_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_SELECTOR_MODULE}' was removed from @spartacus/storefront. Use ProductVariantStyleSelectorModule from @spartacus/product/variants/components as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.component.ts
  {
    node: VARIANT_STYLE_ICONS_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_ICONS_COMPONENT}' was removed from @spartacus/storefront. Use ProductVariantStyleIconsComponent from @spartacus/product/variants/root as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/variant-style-icons/variant-style-icons.module.ts
  {
    node: VARIANT_STYLE_ICONS_MODULE,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${VARIANT_STYLE_ICONS_MODULE}' was removed from @spartacus/storefront. Use ProductVariantStyleIconsModule from @spartacus/product/variants/root as a replacement.`,
  },
  // projects/storefrontlib/src/cms-components/product/product-variants/guards/product-variant.guard.ts
  {
    node: PRODUCT_VARIANT_GUARD,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PRODUCT_VARIANT_GUARD}' was removed from @spartacus/storefront. Use ProductVariantsGuard from @spartacus/product/variants/components instead. Additionally method: findVariant was renamed to findPurchasableProductCode.`,
  },
  {
    node: PRODUCT_VARIANT_STYLE_ICONS_MODULE,
    importPath: SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
    comment: `'${PRODUCT_VARIANT_STYLE_ICONS_MODULE}' was removed from ${SPARTACUS_PRODUCT_VARIANTS_COMPONENTS}. Use @spartacus/product/variants/root instead.`,
  },
  {
    node: PRODUCT_VARIANT_STYLE_ICONS_COMPONENT,
    importPath: SPARTACUS_PRODUCT_VARIANTS_COMPONENTS,
    comment: `'${PRODUCT_VARIANT_STYLE_ICONS_COMPONENT}' was removed from ${SPARTACUS_PRODUCT_VARIANTS_COMPONENTS}. Use @spartacus/product/variants/root instead.`,
  },
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
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
