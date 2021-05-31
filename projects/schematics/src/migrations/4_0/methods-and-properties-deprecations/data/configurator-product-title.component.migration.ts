import {
  CLICK_ON_ENTER,
  CONFIGURATOR_PRODUCT_TITLE_COMPONENT,
  GET_PRODUCT_IMAGE_ALT,
  GET_PRODUCT_IMAGE_URL,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//feature-libs/product-configurator/rulebased/components/product-title/configurator-product-title.component.ts
export const CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CONFIGURATOR_PRODUCT_TITLE_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedNode: GET_PRODUCT_IMAGE_URL,
    comment: `// ${TODO_SPARTACUS} Method '${GET_PRODUCT_IMAGE_URL}' was removed from '${CONFIGURATOR_PRODUCT_TITLE_COMPONENT}'. It is no longer used.`,
  },
  {
    class: CONFIGURATOR_PRODUCT_TITLE_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedNode: GET_PRODUCT_IMAGE_ALT,
    comment: `// ${TODO_SPARTACUS} Method '${GET_PRODUCT_IMAGE_ALT}' was removed from '${CONFIGURATOR_PRODUCT_TITLE_COMPONENT}'. It is no longer used.`,
  },
  {
    class: CONFIGURATOR_PRODUCT_TITLE_COMPONENT,
    importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedNode: CLICK_ON_ENTER,
    comment: `// ${TODO_SPARTACUS} Method '${CLICK_ON_ENTER}' was removed from '${CONFIGURATOR_PRODUCT_TITLE_COMPONENT}'. It is no longer used.`,
  },
];
