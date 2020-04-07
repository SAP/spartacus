import {
  SPARTACUS_STOREFRONTLIB,
  PRODUCT_REVIEWS_COMPONENT,
  ANGULAR_CORE,
  FORM_BUILDER,
  ANGULAR_FORMS,
  CHANGE_DETECTOR_REF
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PRODUCT_REVIEWS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\product\product-tabs\product-reviews\product-reviews.component.ts
  class: PRODUCT_REVIEWS_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: FORM_BUILDER,
      importPath: ANGULAR_FORMS
    }
  ],
  addParams: [
    {
      className: CHANGE_DETECTOR_REF,
      importPath: ANGULAR_CORE
    }
  ]
};
