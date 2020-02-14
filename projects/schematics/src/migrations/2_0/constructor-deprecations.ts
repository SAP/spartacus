import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { relative } from 'path';
import {
  AUTH_SERVICE,
  CMS_SERVICE,
  FEATURE_CONFIG_SERVICE,
  NGRX_STORE,
  PAGE_META_RESOLVER,
  PAGE_META_SERVICE,
  SPARTACUS_CORE,
  STORE,
  USER_ADDRESS_SERVICE,
} from '../../shared/constants';
import {
  addConstructorParam,
  commitChanges,
  ConstructorDeprecation,
  findConstructor,
  getAllTsSourceFiles,
  InsertDirection,
  isCandidateForConstructorDeprecation,
  removeConstructorParam,
} from '../../shared/utils/file-utils';

const CONSTRUCTOR_DEPRECATION: ConstructorDeprecation[] = [
  // projects/core/src/user/facade/user-address.service.ts
  {
    class: USER_ADDRESS_SERVICE,
    deprecatedParams: [
      {
        className: STORE,
        importPath: NGRX_STORE,
      },
    ],
    addParams: [
      {
        className: AUTH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
  // projects/core/src/cms/facade/page-meta.service.ts
  {
    class: PAGE_META_SERVICE,
    deprecatedParams: [
      { className: PAGE_META_RESOLVER, importPath: SPARTACUS_CORE },
      { className: CMS_SERVICE, importPath: SPARTACUS_CORE },
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    removeParams: [
      {
        className: FEATURE_CONFIG_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Checking constructor deprecations...');
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree);
    for (const tsconfigPath of buildPaths) {
      const sourceFiles = getAllTsSourceFiles(tsconfigPath, tree, basePath);
      for (const source of sourceFiles) {
        const sourcePath = relative(basePath, source.fileName);

        for (const constructorDeprecation of CONSTRUCTOR_DEPRECATION) {
          if (
            !isCandidateForConstructorDeprecation(
              source,
              constructorDeprecation.class,
              constructorDeprecation.deprecatedParams
            )
          ) {
            continue;
          }

          const nodes = getSourceNodes(source);
          const constructorNode = findConstructor(nodes);
          if (constructorDeprecation.addParams) {
            for (const newConstructorParam of constructorDeprecation.addParams) {
              const changes = addConstructorParam(
                source,
                sourcePath,
                constructorNode,
                newConstructorParam
              );
              if (changes.length) {
                commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
              }
            }
          }

          if (constructorDeprecation.removeParams) {
            for (const constructorParamToRemove of constructorDeprecation.removeParams) {
              const changes = removeConstructorParam(
                source,
                sourcePath,
                constructorNode,
                constructorParamToRemove
              );
              if (changes.length) {
                commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
              }
            }
          }
        }
      }
    }

    return tree;
  };
}
