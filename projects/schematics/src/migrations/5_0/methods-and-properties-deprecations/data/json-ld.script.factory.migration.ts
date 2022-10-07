import {
  JSON_LD_SCRIPT_FACTORY, SANITIZE_METHOD,
  TODO_SPARTACUS
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// fil path
export const JSON_LD_SCRIPT_FACTORY_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: JSON_LD_SCRIPT_FACTORY,
      importPath: SPARTACUS_STOREFRONTLIB,
      deprecatedNode: SANITIZE_METHOD,
      comment: `// ${TODO_SPARTACUS} Method '${JSON_LD_SCRIPT_FACTORY}.${SANITIZE_METHOD}' was removed. Use 'escapeHtml' instead.`,
    },
  ];
