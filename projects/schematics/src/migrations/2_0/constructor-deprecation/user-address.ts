import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import {
  NGRX_STORE,
  STORE,
  USER_ADDRESS_SERVICE,
} from '../../../shared/constants';
import {
  ClassType,
  collectConstructorParameterNames,
  findConstructor,
  getAllTsSourceFiles,
  isCandidateForConstructorDeprecation,
} from '../../../shared/utils/file-utils';

const DELETE_ME = true;
const DEPRECATED_CONSTRUCTOR_PARAMETERS: ClassType[] = [
  {
    className: STORE,
    importPath: NGRX_STORE,
  },
];
if (DELETE_ME) {
  // const NEW_CONSTRUCTOR_PARAMETERS: ClassType[] = [
  //   ...DEPRECATED_CONSTRUCTOR_PARAMETERS,
  //   {
  //     className: AUTH_SERVICE,
  //     importPath: SPARTACUS_CORE,
  //   },
  // ];
}

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Handling constructor deprecation for user-address');

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree);
    for (const tsconfigPath of buildPaths) {
      const sourceFiles = getAllTsSourceFiles(tsconfigPath, tree, basePath);
      for (const source of sourceFiles) {
        if (DELETE_ME) {
          // const sourcePath = relative(basePath, source.fileName);}
          const candidate = isCandidateForConstructorDeprecation(
            source,
            USER_ADDRESS_SERVICE,
            DEPRECATED_CONSTRUCTOR_PARAMETERS
          );
          if (DELETE_ME) console.log('candidate: ', candidate);

          const nodes = getSourceNodes(source);
          const constructorNode = findConstructor(nodes);
          const parameterNames = collectConstructorParameterNames(
            constructorNode
          );
          if (DELETE_ME) console.log('param names: ', ...parameterNames);
        }
      }
    }

    return tree;
  };
}
