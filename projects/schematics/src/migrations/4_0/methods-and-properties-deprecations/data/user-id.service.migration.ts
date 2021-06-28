import {
  MethodPropertyDeprecation,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
  USER_ID_SERVICE,
} from '@spartacus/schematics';

export const USER_ID_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: USER_ID_SERVICE,
    importPath: SPARTACUS_CORE,
    deprecatedNode: `invokeWithUserId`,
    comment: `// ${TODO_SPARTACUS} this method was removed. Use \`takeUserId\` method instead`,
  },
];
