import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CLI_EPD_VISUALIZATION_FEATURE,
  CustomConfig,
  EPD_VISUALIZATION_CONFIG,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_EPD_VISUALIZATION,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  EPD_VISUALIZATION_FEATURE_NAME_CONSTANT,
  EPD_VISUALIZATION_FOLDER_NAME,
  EPD_VISUALIZATION_MODULE,
  EPD_VISUALIZATION_MODULE_NAME,
  EPD_VISUALIZATION_ROOT_MODULE,
  EPD_VISUALIZATION_TRANSLATIONS,
  EPD_VISUALIZATION_TRANSLATION_CHUNKS_CONFIG,
  SCSS_FILE_NAME,
  SPARTACUS_EPD_VISUALIZATION_ASSETS,
  SPARTACUS_EPD_VISUALIZATION_ROOT,
} from '../constants';
import { Schema as SpartacusEpdVisualizationOptions } from './schema';

export function addEpdVisualizationFeature(
  options: SpartacusEpdVisualizationOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_EPD_VISUALIZATION_FEATURE, options.features)
        ? chain([addEpdVisualization(options)])
        : noop(),
    ]);
  };
}

function addEpdVisualization(options: SpartacusEpdVisualizationOptions): Rule {
  const customConfig: CustomConfig[] = [
    {
      import: [
        {
          moduleSpecifier: SPARTACUS_EPD_VISUALIZATION_ROOT,
          namedImports: [EPD_VISUALIZATION_CONFIG],
        },
      ],
      content: `<${EPD_VISUALIZATION_CONFIG}>{
        epdVisualization: {
          ui5: {
            bootstrapUrl: "https://sapui5.hana.ondemand.com/1.97.0/resources/sap-ui-core.js"
          },

          apis: {
            baseUrl: "${options.baseUrl}"
          }
        }
      }`,
    },
  ];

  return addLibraryFeature(options, {
    folderName: EPD_VISUALIZATION_FOLDER_NAME,
    moduleName: EPD_VISUALIZATION_MODULE_NAME,
    featureModule: {
      name: EPD_VISUALIZATION_MODULE,
      importPath: SPARTACUS_EPD_VISUALIZATION,
    },
    rootModule: {
      name: EPD_VISUALIZATION_ROOT_MODULE,
      importPath: SPARTACUS_EPD_VISUALIZATION_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_EPD_VISUALIZATION_ROOT,
      namedImports: [EPD_VISUALIZATION_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: EPD_VISUALIZATION_TRANSLATIONS,
      chunks: EPD_VISUALIZATION_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_EPD_VISUALIZATION_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_EPD_VISUALIZATION,
    },
    customConfig,
    dependencyManagement: {
      featureName: CLI_EPD_VISUALIZATION_FEATURE,
      featureDependencies: {},
    },
  });
}
