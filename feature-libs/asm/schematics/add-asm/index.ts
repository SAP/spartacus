import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  addLibraryFeature,
  addPackageJsonDependencies,
  DEFAULT_B2B_OCC_CONFIG,
  getAppModule,
  getSpartacusSchematicsVersion,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusAsmOptions,
  readPackageJson,
  SPARTACUS_SETUP,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  ASM_FEATURE_NAME,
  ASM_MODULE,
  ASM_ROOT_MODULE,
  ASM_TRANSLATIONS,
  ASM_TRANSLATION_CHUNKS_CONFIG,
  SPARTACUS_ASM,
  SPARTACUS_ASM_ASSETS,
  SPARTACUS_ASM_ROOT,
} from '../constants';

export function addAsmFeatures(options: SpartacusAsmOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      addAsmFeature(appModulePath, options),
      addAsmPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addAsmFeature(
  appModulePath: string,
  options: SpartacusAsmOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: ASM_FEATURE_NAME,
    defaultConfig: {
      name: DEFAULT_B2B_OCC_CONFIG,
      importPath: SPARTACUS_SETUP,
    },
    featureModule: {
      name: ASM_MODULE,
      importPath: SPARTACUS_ASM,
    },
    rootModule: {
      name: ASM_ROOT_MODULE,
      importPath: SPARTACUS_ASM_ROOT,
    },
    i18n: {
      resources: ASM_TRANSLATIONS,
      chunks: ASM_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_ASM_ASSETS,
    },
  });
}

function addAsmPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_ASM,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
