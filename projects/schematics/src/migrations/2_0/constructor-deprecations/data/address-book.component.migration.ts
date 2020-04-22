import {
  SPARTACUS_STOREFRONTLIB,
  ADDRESS_BOOK_COMPONENT_SERVICE,
  TRANSLATION_SERVICE,
  SPARTACUS_CORE,
  USER_ADDRESS_SERVICE,
  CHECKOUT_DELIVERY_SERVICE,
  ADDRESS_BOOK_COMPONENT,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const ADDRESS_BOOK_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\cms-components\myaccount\address-book\address-book.component.ts
  class: ADDRESS_BOOK_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: ADDRESS_BOOK_COMPONENT_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
  addParams: [
    {
      className: TRANSLATION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: USER_ADDRESS_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CHECKOUT_DELIVERY_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
