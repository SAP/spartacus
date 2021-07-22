import {
  FORM$,
  FORM_GROUP,
  SPARTACUS_ORGANIZATION,
  TODO_SPARTACUS,
  UNIT_FORM_COMPONENT,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// feature-libs\organization\administration\components\unit\form\unit-form.component.ts
export const UNIT_FORM_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: UNIT_FORM_COMPONENT,
    importPath: SPARTACUS_ORGANIZATION,
    deprecatedNode: FORM_GROUP,
    comment: `// ${TODO_SPARTACUS} Property '${UNIT_FORM_COMPONENT}.${FORM_GROUP}' has been renamed to 'form'.`,
  },
  {
    class: UNIT_FORM_COMPONENT,
    importPath: SPARTACUS_ORGANIZATION,
    deprecatedNode: FORM$,
    comment: `// ${TODO_SPARTACUS} Property '${UNIT_FORM_COMPONENT}.${FORM$}' was removed. Please use 'form' property instead.`,
  },
];
