import {
  CMS_SERVICE,
  IS_LAUNCHED_IN_SMART_EDIT,
  IS_LAUNCH_IN_SMART_EDIT,
  SMART_EDIT_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/cms/facade/cms.service.ts
export const CMS_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CMS_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: IS_LAUNCH_IN_SMART_EDIT,
    newNode: IS_LAUNCHED_IN_SMART_EDIT,
    comment: `// ${TODO_SPARTACUS} Method '${IS_LAUNCH_IN_SMART_EDIT}' was removed from '${CMS_SERVICE}'. Instead use new method '${IS_LAUNCHED_IN_SMART_EDIT}' from '${SMART_EDIT_SERVICE}'.`,
  },
];
