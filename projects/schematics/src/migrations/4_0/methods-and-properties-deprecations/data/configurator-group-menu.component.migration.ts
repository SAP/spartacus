import {
  CLICK_ON_ENTER,
  CONFIGURATOR_GROUP_MENU_COMPONENT,
  NAVIGATE_UP_ON_ENTER,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  TODO_SPARTACUS,
} from '../../../../shared/constants';

import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//feature-libs/product-configurator/rulebased/components/group-menu/configurator-group-menu.component.ts
export const CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CONFIGURATOR_GROUP_MENU_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedNode: CLICK_ON_ENTER,
    comment: `// ${TODO_SPARTACUS} Method '${CLICK_ON_ENTER}' was removed from '${CONFIGURATOR_GROUP_MENU_COMPONENT}'. It is no longer used.`,
  },
  {
    class: CONFIGURATOR_GROUP_MENU_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedNode: NAVIGATE_UP_ON_ENTER,
    comment: `// ${TODO_SPARTACUS} Method '${NAVIGATE_UP_ON_ENTER}' was removed from '${CONFIGURATOR_GROUP_MENU_COMPONENT}'. It is no longer used.`,
  },
];
