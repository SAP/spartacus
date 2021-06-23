import {
  ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
  LOAD_ANONYMOUS_CONSENTS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR,
      importPath: SPARTACUS_CORE,
      deprecatedNode: LOAD_ANONYMOUS_CONSENTS,
      newNode: LOAD_ANONYMOUS_CONSENTS,
      comment: `// ${TODO_SPARTACUS} Method ${LOAD_ANONYMOUS_CONSENTS} changed the return type from 'Observable<AnonymousConsent[] | null>' to 'Observable<AnonymousConsent[]>'`,
    },
  ];
