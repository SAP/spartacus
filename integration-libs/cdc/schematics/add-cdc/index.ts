import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependencies,
  addSchematicsTasks,
  CORE_SPARTACUS_SCOPES,
  createDependencies,
  createSpartacusFeatureOptionsForLibrary,
  FEATURES_LIBS_SKIP_SCOPES,
  LibraryOptions as SpartacusCdcOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CDC,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CDC_CONFIG,
  CDC_FEATURE,
  CDC_FOLDER_NAME,
  CDC_MODULE,
  CDC_ROOT_MODULE,
  CLI_CDC_FEATURE,
  SPARTACUS_CDC_ROOT,
} from '../constants';

export function addCdcFeature(options: SpartacusCdcOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_CDC_FEATURE, options.features)
        ? addCdc(options)
        : noop(),

      addCdcPackageJsonDependencies(packageJson, context, options),
    ]);
  };
}

function addCdcPackageJsonDependencies(
  packageJson: any,
  context: SchematicContext,
  options: SpartacusCdcOptions
): Rule {
  const spartacusLibraries = createDependencies(peerDependencies, {
    skipScopes: CORE_SPARTACUS_SCOPES,
    onlyIncludeScopes: FEATURES_LIBS_SKIP_SCOPES,
  });
  const thirdPartyDependencies = createDependencies(peerDependencies);
  const dependencies = spartacusLibraries.concat(thirdPartyDependencies);

  const rule = addPackageJsonDependencies(dependencies, packageJson);

  const featureOptions = createSpartacusFeatureOptionsForLibrary(
    spartacusLibraries.map((dependency) => dependency.name),
    options
  );
  addSchematicsTasks(featureOptions, context);

  return rule;
}

function addCdc(options: SpartacusCdcOptions): Rule {
  return addLibraryFeature(options, {
    folderName: CDC_FOLDER_NAME,
    name: CLI_CDC_FEATURE,
    rootModule: {
      importPath: SPARTACUS_CDC_ROOT,
      name: CDC_ROOT_MODULE,
      content: `${CDC_ROOT_MODULE}`,
    },
    featureModule: {
      importPath: SPARTACUS_CDC,
      name: CDC_MODULE,
    },
    lazyModuleName: `[CDC_FEATURE]`,
    customConfig: {
      import: [
        {
          moduleSpecifier: SPARTACUS_CDC_ROOT,
          namedImports: [CDC_CONFIG, CDC_FEATURE],
        },
      ],
      content: `<${CDC_CONFIG}>{
          cdc: [
            {
              baseSite: 'electronics-spa',
              javascriptUrl: '<url-to-cdc-script>',
              sessionExpiration: 3600
            },
          ],
        }`,
    },
  });
}
