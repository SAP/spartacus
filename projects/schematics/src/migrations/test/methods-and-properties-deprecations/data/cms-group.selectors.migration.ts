import {
  CMS_SELECTORS,
  COMPONENTS_SELECTOR_FACTORY_NEW_API,
  COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API,
  COMPONENT_SELECTOR_FACTORY_OLD_API,
  COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
  GET_COMPONENTS_STATE_NEW_API,
  GET_COMPONENT_ENTITIES_OLD_API,
  GET_COMPONENT_STATE_OLD_API,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CMS_SELECTORS_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CMS_SELECTORS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_COMPONENT_STATE_OLD_API,
    newNode: GET_COMPONENTS_STATE_NEW_API,
  },
  {
    class: CMS_SELECTORS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_COMPONENT_ENTITIES_OLD_API,
    comment: `// ${TODO_SPARTACUS} '${GET_COMPONENT_ENTITIES_OLD_API}' has been removed, please use some of the newer API methods.`,
  },
  {
    class: CMS_SELECTORS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
    newNode: COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API,
  },
  {
    class: CMS_SELECTORS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: COMPONENT_SELECTOR_FACTORY_OLD_API,
    newNode: COMPONENTS_SELECTOR_FACTORY_NEW_API,
  },
];
