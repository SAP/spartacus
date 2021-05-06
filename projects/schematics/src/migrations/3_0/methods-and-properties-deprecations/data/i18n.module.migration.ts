import {
  SPARTACUS_CORE,
  TODO_SPARTACUS,
  I18N_MODULE,
  INIT_I18N_CONFIG

} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const I18N_MODULE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: I18N_MODULE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: INIT_I18N_CONFIG,
    newNode: INIT_I18N_CONFIG,
    comment: `// ${TODO_SPARTACUS} Method ${INIT_I18N_CONFIG} sigurature has changed. No longer requires FeatureConfigService argument when called.'`,
  },
];
