import {
  ANGULAR_CORE,
  ELEMENT_REF,
  HAMBURGER_MENU_SERVICE,
  KEYBOARD_FOCUS_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  STOREFRONT_COMPONENT,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const STOREFRONT_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects\storefrontlib\src\layout\main\storefront.component.ts
  class: STOREFRONT_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: HAMBURGER_MENU_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: ELEMENT_REF,
      importPath: ANGULAR_CORE,
    },
    {
      className: KEYBOARD_FOCUS_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
