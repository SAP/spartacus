import {
  SPARTACUS_STOREFRONTLIB,
  HAMBURGER_MENU_SERVICE,
  NAVIGATION_UI_COMPONENT,
  NAVIGATION_UI_CONFIG,
  ANGULAR_ROUTER,
  ROUTER,
  ANGULAR_CORE,
  RENDERER_2,
  ELEMENT_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const NAVIGATION_UI_COMPONENT_MIGRATION: ConstructorDeprecation = {
  //projects/storefrontlib/src/cms-components/navigation/navigation/navigation-ui.component.ts
  class: NAVIGATION_UI_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    { className: ROUTER, importPath: ANGULAR_ROUTER },
    { className: RENDERER_2, importPath: ANGULAR_CORE },
    { className: ELEMENT_REF, importPath: ANGULAR_CORE },
  ],
  addParams: [
    {
      className: NAVIGATION_UI_CONFIG,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: HAMBURGER_MENU_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
