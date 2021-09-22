import {
  ON_SUCCESS,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
  UPDATE_EMAIL_COMPONENT,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/cms-components/myaccount/update-email/update-email.component.ts
export const UPDATE_EMAIL_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: UPDATE_EMAIL_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: ON_SUCCESS,
    comment: `// ${TODO_SPARTACUS} Method '${ON_SUCCESS}' return type from '${UPDATE_EMAIL_COMPONENT}' was changed from void to 'Promise<void>'`,
  },
];
