import {
  TODO_SPARTACUS,
  SPARTACUS_CORE,
  ROUTING_SERVICE,
  GO,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/core/src/routing/facade/routing.service.ts
export const ROUTING_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: ROUTING_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GO,
    comment: `// ${TODO_SPARTACUS} The second argument of the method ${GO} has been removed. Use extras.queryParams instead.`,
  },
];
