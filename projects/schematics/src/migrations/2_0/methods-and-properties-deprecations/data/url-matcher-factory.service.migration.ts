import {
  GET_FALSY_URL_MATCHER,
  GET_GLOB_URL_MATCHER,
  GET_MULTIPLE_PATHS_URL_MATCHER,
  GET_OPPOSITE_URL_MATCHER,
  GET_PATH_URL_MATCHER,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
  URL_MATCHER_FACTORY_SERVICE,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

//projects/core/src/routing/services/url-matcher.service.ts
export const URL_MATCHER_FACTORY_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: URL_MATCHER_FACTORY_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_FALSY_URL_MATCHER,
    comment: `// ${TODO_SPARTACUS} - method '${GET_FALSY_URL_MATCHER}' has been renamed to 'getFalsy'.`,
  },
  {
    class: URL_MATCHER_FACTORY_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_MULTIPLE_PATHS_URL_MATCHER,
    comment: `// ${TODO_SPARTACUS} - method '${GET_MULTIPLE_PATHS_URL_MATCHER}' has been renamed to 'getFromPaths'.`,
  },
  {
    class: URL_MATCHER_FACTORY_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_PATH_URL_MATCHER,
    comment: `// ${TODO_SPARTACUS} - method '${GET_PATH_URL_MATCHER}' has been renamed to 'getFromPath'.`,
  },
  {
    class: URL_MATCHER_FACTORY_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_OPPOSITE_URL_MATCHER,
    comment: `// ${TODO_SPARTACUS} - method '${GET_OPPOSITE_URL_MATCHER}' has been renamed to 'getOpposite'.`,
  },
  {
    class: URL_MATCHER_FACTORY_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: GET_GLOB_URL_MATCHER,
    comment: `// ${TODO_SPARTACUS} - method '${GET_GLOB_URL_MATCHER}' has been renamed to 'getFromGlob'.`,
  },
];
