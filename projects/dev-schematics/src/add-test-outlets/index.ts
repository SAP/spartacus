import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  renameTemplateFiles,
  Rule,
  SchematicContext,
  SchematicsException,
  Source,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { isImported } from '@schematics/angular/utility/ast-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  addImport,
  addToModuleImportsAndCommitChanges,
  getProjectTargets,
  getTsSourceFile,
  SPARTACUS_CORE,
  TEST_CONFIG_MODULE,
  TEST_OUTLET_MODULE,
} from '@spartacus/schematics';
import { Schema as DevSpartacusOptions } from '../ng-add/schema';

function provideTestOutletsModuleImports(options: DevSpartacusOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const projectTargets = getProjectTargets(tree, options.project);
    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }
    const mainPath = projectTargets.build.options.main;
    const modulePath = getAppModulePath(tree, mainPath);
    const moduleSource = getTsSourceFile(tree, modulePath);

    if (!isImported(moduleSource, TEST_CONFIG_MODULE, SPARTACUS_CORE)) {
      addImport(tree, modulePath, TEST_CONFIG_MODULE, SPARTACUS_CORE);
      addToModuleImportsAndCommitChanges(tree, modulePath, TEST_CONFIG_MODULE);
    }

    if (!isImported(moduleSource, TEST_OUTLET_MODULE, SPARTACUS_CORE)) {
      addImport(
        tree,
        modulePath,
        TEST_OUTLET_MODULE,
        './test-outlets/test-outlet.module'
      );
      addToModuleImportsAndCommitChanges(tree, modulePath, TEST_OUTLET_MODULE);
    }
  };
}

function provideTestOutletsModuleFiles(): Source {
  return apply(url('./files'), [renameTemplateFiles(), move('.', './src/app')]);
}

export default function (options: DevSpartacusOptions): Rule {
  return (_tree: Tree) => {
    return chain([
      provideTestOutletsModuleImports(options),
      mergeWith(provideTestOutletsModuleFiles(), MergeStrategy.Overwrite),
    ]);
  };
}
