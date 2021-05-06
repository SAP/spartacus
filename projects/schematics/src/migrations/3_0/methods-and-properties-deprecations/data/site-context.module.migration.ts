import {
  SPARTACUS_CORE,
  TODO_SPARTACUS,
  SITE_CONTEXT_MODULE,
  INIT_SITE_CONTEXT_CONFIG

} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const SITE_CONTEXT_MODULE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: SITE_CONTEXT_MODULE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: INIT_SITE_CONTEXT_CONFIG,
    newNode: INIT_SITE_CONTEXT_CONFIG,
    comment: `// ${TODO_SPARTACUS} Method ${INIT_SITE_CONTEXT_CONFIG} sigurature has changed. No longer requires FeatureConfigService argument when called.'`,
  },
];
