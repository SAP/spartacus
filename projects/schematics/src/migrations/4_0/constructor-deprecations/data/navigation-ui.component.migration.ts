import {
  SPARTACUS_STOREFRONTLIB,
  HAMBURGER_MENU_SERVICE,
  NAVIGATION_UI_COMPONENT,
  NAVIGATION_UI_CONFIG,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const NAVIGATION_UI_COMPONENT_MIGRATION: ConstructorDeprecation = {
  //projects/storefrontlib/src/cms-components/navigation/navigation/navigation-ui.component.ts
  class: NAVIGATION_UI_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [],
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
