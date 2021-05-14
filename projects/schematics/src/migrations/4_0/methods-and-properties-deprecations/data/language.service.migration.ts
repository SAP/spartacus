import {
  INITIALIZE,
  LANGUAGE_SERVICE,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/site-context/facade/language.service.ts
export const LANGUAGE_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: LANGUAGE_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: INITIALIZE,
    comment: `// ${TODO_SPARTACUS} Method '${INITIALIZE}' was removed. The state initialization is done with the 'LanguageInitializer' .`,
  },
];
