import {
  ANONYMOUS_CONSENT_TEMPLATES_ADAPTER,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
  LOAD_ANONYMOUS_CONSENTS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENT_TEMPLATES_ADAPTER_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: ANONYMOUS_CONSENT_TEMPLATES_ADAPTER,
      importPath: SPARTACUS_CORE,
      deprecatedNode: LOAD_ANONYMOUS_CONSENTS,
      comment: `// ${TODO_SPARTACUS} Method ${LOAD_ANONYMOUS_CONSENTS} is no longer optional`,
    },
  ];
