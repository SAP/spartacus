import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { CallExpression, Node, SourceFile, ts } from 'ts-morph';
import {
  ANGULAR_CORE,
  ANGULAR_ROUTER,
  SPARTACUS_ROUTING_MODULE,
} from '../shared/constants';
import { isImportedFrom } from '../shared/utils/import-utils';
import { addModuleImport } from '../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

/** Migration that ensures that we have correct RouterModule.forRoot set */
export function setupRouterModule(project: string): Rule {
  return (tree: Tree): Tree => {
    const { buildPaths } = getProjectTsConfigPaths(tree, project);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot set RouterModule.'
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      configureRouterModule(tree, tsconfigPath, basePath);
    }
    return tree;
  };
}

function configureRouterModule(
  tree: Tree,
  tsconfigPath: string,
  basePath: string
): void {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (
      sourceFile.getFilePath().includes(`${SPARTACUS_ROUTING_MODULE}.module.ts`)
    ) {
      let routerModule = getRouterModule(sourceFile);
      if (!routerModule) {
        routerModule = addModuleImport(sourceFile, {
          import: {
            moduleSpecifier: ANGULAR_ROUTER,
            namedImports: ['RouterModule'],
          },
          content: `RouterModule.forRoot([])`,
        }) as CallExpression;
      }
      configureOptionsInRouterModule(routerModule);

      saveAndFormat(sourceFile);

      break;
    }
  }
}

function getRouterModule(sourceFile: SourceFile): CallExpression | undefined {
  let routerNode;

  function visitor(node: Node) {
    if (Node.isCallExpression(node)) {
      const expression = node.getExpression();
      if (Node.isPropertyAccessExpression(expression)) {
        const exp = expression.getExpression();
        if (
          Node.isIdentifier(exp) &&
          exp.getText() === 'RouterModule' &&
          isImportedFrom(exp, ANGULAR_ROUTER) &&
          expression.getName() === 'forRoot'
        ) {
          const assignment = node.getFirstAncestorByKind(
            ts.SyntaxKind.PropertyAssignment
          );
          if (assignment) {
            const name = assignment.getStructure().name;
            if (name === 'imports') {
              const callExpression = node.getFirstAncestorByKind(
                ts.SyntaxKind.CallExpression
              );
              if (callExpression) {
                const exp = callExpression.getExpression();
                if (
                  Node.isIdentifier(exp) &&
                  exp.getText() === 'NgModule' &&
                  isImportedFrom(exp, ANGULAR_CORE)
                ) {
                  routerNode = node;
                }
              }
            }
          }
        }
      }
    }
    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return routerNode;
}

function configureOptionsInRouterModule(routerModule: CallExpression): void {
  const args = routerModule.getArguments();
  const options = `{
  anchorScrolling: 'enabled',
  relativeLinkResolution: 'corrected',
  initialNavigation: 'enabled',
}`;
  if (args.length === 0) {
    routerModule.addArguments(['[]', options]);
  } else if (args.length === 1) {
    routerModule.addArgument(options);
  } else {
    // TODO: Maybe check the second argument and adjust properties
  }
}
