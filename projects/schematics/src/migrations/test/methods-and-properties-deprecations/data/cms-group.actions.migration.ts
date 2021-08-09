import {
  CMS_ACTIONS,
  CMS_GET_COMPONENT_FROM_PAGE,
  LOAD_CMS_COMPONENT_CLASS,
  LOAD_CMS_COMPONENT_FAIL_CLASS,
  LOAD_CMS_COMPONENT_SUCCESS_CLASS,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CMS_ACTIONS_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CMS_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: LOAD_CMS_COMPONENT_CLASS,
    comment: `// ${TODO_SPARTACUS} please convert all the parameters to the 'payload' object's properties for '${LOAD_CMS_COMPONENT_CLASS}' action`,
  },
  {
    class: CMS_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: LOAD_CMS_COMPONENT_FAIL_CLASS,
    comment: `// ${TODO_SPARTACUS} please convert all the parameters to the 'payload' object's properties for '${LOAD_CMS_COMPONENT_FAIL_CLASS}' action`,
  },
  {
    class: CMS_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: LOAD_CMS_COMPONENT_SUCCESS_CLASS,
    comment: `// ${TODO_SPARTACUS} please convert all the parameters to the 'payload' object's properties for '${LOAD_CMS_COMPONENT_SUCCESS_CLASS}' action`,
  },
  {
    class: CMS_ACTIONS,
    importPath: SPARTACUS_CORE,
    deprecatedNode: CMS_GET_COMPONENT_FROM_PAGE,
    comment: `// ${TODO_SPARTACUS} please convert all the parameters to the 'payload' object's properties for '${CMS_GET_COMPONENT_FROM_PAGE}' action`,
  },
];
