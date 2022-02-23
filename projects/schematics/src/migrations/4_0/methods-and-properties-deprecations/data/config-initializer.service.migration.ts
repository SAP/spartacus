import {
  CONFIG_INITIALIZER_SERVICE,
  GET_STABLE,
  GET_STABLE_CONFIG,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//projects/core/src/config/config-initializer/config-initializer.service.ts
export const CONFIG_INITIALIZER_SERVICE_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIG_INITIALIZER_SERVICE,
      importPath: SPARTACUS_CORE,
      deprecatedNode: GET_STABLE_CONFIG,
      comment: `// ${TODO_SPARTACUS} Method '${CONFIG_INITIALIZER_SERVICE}.${GET_STABLE_CONFIG}' was removed from '${CONFIG_INITIALIZER_SERVICE}'. Instead use method '${GET_STABLE}'`,
    },
  ];
