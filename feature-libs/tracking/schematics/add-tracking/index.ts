import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addModuleImport,
  addModuleProvider,
  createProgram,
  getAppModule,
  getProjectTsConfigPaths,
  Import,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusTrackingOptions,
  PROVIDE_CONFIG_FUNCTION,
  readPackageJson,
  saveAndFormat,
  shouldAddFeature,
  SPARTACUS_CORE,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  CLI_PERSONALIZATION_FEATURE,
  CLI_TMS_AEP_FEATURE,
  CLI_TMS_GTM_FEATURE,
  PERSONALIZATION_FEATURE_NAME,
  PERSONALIZATION_MODULE,
  PERSONALIZATION_ROOT_MODULE,
  SPARTACUS_PERSONALIZATION,
  SPARTACUS_PERSONALIZATION_ROOT,
  SPARTACUS_TMS_AEP,
  SPARTACUS_TMS_CORE,
  SPARTACUS_TMS_GTM,
  TMS_AEP_MODULE,
  TMS_BASE_MODULE,
  TMS_CONFIG,
  TMS_GTM_MODULE,
} from '../constants';

export function addTrackingFeatures(options: SpartacusTrackingOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      shouldAddFeature(options.features, CLI_TMS_GTM_FEATURE)
        ? addGtm(options)
        : noop(),
      shouldAddFeature(options.features, CLI_TMS_AEP_FEATURE)
        ? addAep(options)
        : noop(),
      shouldAddFeature(options.features, CLI_PERSONALIZATION_FEATURE)
        ? addPersonalizationFeature(appModulePath, options)
        : noop(),

      installPackageJsonDependencies(),
    ]);
  };
}

function addGtm(options: SpartacusTrackingOptions): Rule {
  return addTmsFeature(
    options.project,
    {
      import: {
        moduleSpecifier: SPARTACUS_TMS_GTM,
        namedImports: [TMS_GTM_MODULE],
      },
      content: TMS_GTM_MODULE,
    },
    {
      import: [
        { moduleSpecifier: SPARTACUS_TMS_GTM, namedImports: [TMS_GTM_MODULE] },
        { moduleSpecifier: SPARTACUS_TMS_CORE, namedImports: [TMS_CONFIG] },
      ],
      content: `
      provideConfig({
        tagManager: {
          gtm: {
            events: [],
          },
        },
     } as TmsConfig)`,
    }
  );
}

function addAep(options: SpartacusTrackingOptions): Rule {
  return addTmsFeature(
    options.project,
    {
      import: {
        moduleSpecifier: SPARTACUS_TMS_AEP,
        namedImports: [TMS_AEP_MODULE],
      },
      content: TMS_AEP_MODULE,
    },
    {
      import: [
        {
          moduleSpecifier: SPARTACUS_CORE,
          namedImports: [PROVIDE_CONFIG_FUNCTION],
        },
        { moduleSpecifier: SPARTACUS_TMS_AEP, namedImports: [TMS_AEP_MODULE] },
        { moduleSpecifier: SPARTACUS_TMS_CORE, namedImports: [TMS_CONFIG] },
      ],
      content: `provideConfig({
        tagManager: {
          aep: {
            events: [],
          },
        },
     } as TmsConfig)`,
    }
  );
}

function addTmsFeature(
  project: string,
  importOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  providerOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  }
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const { buildPaths } = getProjectTsConfigPaths(tree, project);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot configure TMS feature.'
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        // TODO:#11501 - update to the feature module
        if (sourceFile.getFilePath().includes(`app.module.ts`)) {
          addModuleImport(sourceFile, {
            import: {
              moduleSpecifier: SPARTACUS_TMS_CORE,
              namedImports: [TMS_BASE_MODULE],
            },
            content: `${TMS_BASE_MODULE}.forRoot()`,
          });
          addModuleImport(sourceFile, importOptions);
          addModuleProvider(sourceFile, providerOptions);

          saveAndFormat(sourceFile);

          break;
        }
      }
    }

    return tree;
  };
}

function addPersonalizationFeature(
  appModulePath: string,
  options: SpartacusTrackingOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: PERSONALIZATION_FEATURE_NAME,
    featureModule: {
      name: PERSONALIZATION_MODULE,
      importPath: SPARTACUS_PERSONALIZATION,
    },
    rootModule: {
      name: PERSONALIZATION_ROOT_MODULE,
      importPath: SPARTACUS_PERSONALIZATION_ROOT,
    },
  });
}
