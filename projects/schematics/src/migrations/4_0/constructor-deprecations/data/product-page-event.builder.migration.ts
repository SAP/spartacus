import {
  EVENT_SERVICE,
  FEATURE_CONFIG_SERVICE,
  PRODUCT_PAGE_EVENT_BUILDER,
  PRODUCT_SEARCH_SERVICE,
  PRODUCT_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION: ConstructorDeprecation =
  {
    // projects/storefrontlib/events/product/product-page-event.builder.spec.ts
    class: PRODUCT_PAGE_EVENT_BUILDER,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
      { className: EVENT_SERVICE, importPath: SPARTACUS_CORE },
      { className: PRODUCT_SERVICE, importPath: SPARTACUS_CORE },
      { className: PRODUCT_SEARCH_SERVICE, importPath: SPARTACUS_CORE },
      { className: FEATURE_CONFIG_SERVICE, importPath: SPARTACUS_CORE },
    ],
    removeParams: [
      { className: FEATURE_CONFIG_SERVICE, importPath: SPARTACUS_CORE },
    ],
  };
