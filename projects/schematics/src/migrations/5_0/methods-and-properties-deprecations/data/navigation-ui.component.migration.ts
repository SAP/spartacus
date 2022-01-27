import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';
import {
  NAVIGATION_UI_COMPONENT,
  REINITALIZE_MENU,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';

export const NAVIGATION_UI_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: NAVIGATION_UI_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: REINITALIZE_MENU,
    comment: `// ${TODO_SPARTACUS} Method '${NAVIGATION_UI_COMPONENT}.${REINITALIZE_MENU}' was removed. Use 'reinitializeMenu' instead.`,
  },
];
