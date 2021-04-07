import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  getAppModule,
  installPackageJsonDependencies,
  readPackageJson,
  validateSpartacusInstallation,
  LibraryOptions as SpartacusQuickOrderOptions,
} from '@spartacus/schematics';

import {
  QUICK_ORDER_FEATURE_NAME,
  QUICK_ORDER_MODULE,
  QUICK_ORDER_ROOT_MODULE,
  SPARTACUS_QUICK_ORDER,
  SPARTACUS_QUICK_ORDER_ROOT,
  SPARTACUS_QUICK_ORDER_ASSETS,
  QUICK_ORDER_TRANSLATION_CHUNKS_CONFIG,
  QUICK_ORDER_TRANSLATIONS,
} from './../constants';

export function addQucikOrderFeatures(
  options: SpartacusQuickOrderOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);
    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addQuickOrderFeature(appModulePath, options),
      installPackageJsonDependencies(),
    ]);
  };
}

function addQuickOrderFeature(
  appModulePath: string,
  options: SpartacusQuickOrderOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: QUICK_ORDER_FEATURE_NAME,
    featureModule: {
      name: QUICK_ORDER_MODULE,
      importPath: SPARTACUS_QUICK_ORDER,
    },
    rootModule: {
      name: QUICK_ORDER_ROOT_MODULE,
      importPath: SPARTACUS_QUICK_ORDER_ROOT,
    },
    i18n: {
      resources: QUICK_ORDER_TRANSLATIONS,
      chunks: QUICK_ORDER_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_QUICK_ORDER_ASSETS,
    },
  });
}
