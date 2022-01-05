import {
  CONFIGURATOR_CONFIGURATION_OBS,
  CONFIGURATOR_GROUP_TITLE_COMPONENT,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATOR_GROUP_TITLE_COMPONENT_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: CONFIGURATOR_GROUP_TITLE_COMPONENT,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
      deprecatedNode: CONFIGURATOR_CONFIGURATION_OBS,
      comment: `// ${TODO_SPARTACUS} Method '${CONFIGURATOR_GROUP_TITLE_COMPONENT}.${CONFIGURATOR_CONFIGURATION_OBS}' was removed. Consult the migration documentation on how to deal with that`,
    },
  ];
