import {
  PAYMENT_METHODS_COMPONENT,
  GLOBAL_MESSAGE_SERVICE,
  SPARTACUS_CORE,
  USER_PAYMENT_SERVICE,
  TRANSLATION_SERVICE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PAYMENT_METHODS_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/myaccount/payment-methods/payment-methods.component.ts
  class: PAYMENT_METHODS_COMPONENT,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: USER_PAYMENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: TRANSLATION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: GLOBAL_MESSAGE_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
