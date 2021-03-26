import {
  SPARTACUS_STOREFRONTLIB,
  PRODUCT_REVIEWS_COMPONENT,
  ANGULAR_CORE,
  FORM_BUILDER,
  ANGULAR_FORMS,
  CHANGE_DETECTOR_REF,
  CURRENT_PRODUCT_SERVICE,
  SPARTACUS_CORE,
  PRODUCT_REVIEW_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_REVIEWS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\product\product-tabs\product-reviews\product-reviews.component.ts
  class: PRODUCT_REVIEWS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: PRODUCT_REVIEW_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CURRENT_PRODUCT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: FORM_BUILDER,
      importPath: ANGULAR_FORMS,
    },
  ],
  addParams: [
    {
      className: CHANGE_DETECTOR_REF,
      importPath: ANGULAR_CORE,
    },
  ],
};
