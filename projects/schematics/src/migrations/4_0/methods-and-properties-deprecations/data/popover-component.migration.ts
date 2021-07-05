import {
  INSIDE_CLICKED,
  POPOVER_COMPONENT,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const POPOVER_COMPONENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: POPOVER_COMPONENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: INSIDE_CLICKED,
    comment: `// ${TODO_SPARTACUS} Property '${INSIDE_CLICKED}' was removed.`,
  },
];
