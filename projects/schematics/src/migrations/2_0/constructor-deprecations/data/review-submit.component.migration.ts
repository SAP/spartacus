import {
  ACTIVE_CART_SERVICE,
  REVIEW_SUBMIT_COMPONENT,
  CART_SERVICE,
  SPARTACUS_CORE,
  PROMOTION_SERVICE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';
// projects/storefrontlib/src/cms-components/checkout/components/review-submit/review-submit.component.ts
export const   REVIEW_SUBMIT_COMPONENT_MIGRATION: ConstructorDeprecation = {
  class: REVIEW_SUBMIT_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: PROMOTION_SERVICE,
      importPath: SPARTACUS_CORE,
    }
  ],
};
