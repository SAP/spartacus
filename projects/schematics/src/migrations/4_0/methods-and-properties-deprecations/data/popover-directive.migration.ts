import {
  HANDLE_OPEN,
  POPOVER_DIRECTIVE,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
  TOGGLE,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/src/shared/components/popover/popover.directive.ts

export const POPOVER_DIRECTIVE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: POPOVER_DIRECTIVE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: HANDLE_OPEN,
    comment: `// ${TODO_SPARTACUS} Method '${HANDLE_OPEN}' was removed, use methods 'handleEscape', 'handleClick', 'handlePress', 'handleTab' instead.`,
  },
  {
    class: POPOVER_DIRECTIVE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: TOGGLE,
    comment: `// ${TODO_SPARTACUS} Method '${TOGGLE}' was removed, use methods 'handleEscape', 'handleClick', 'handlePress', 'handleTab' instead.`,
  },
];
