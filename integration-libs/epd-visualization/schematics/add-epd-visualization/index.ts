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
  EPD_SCHEMATICS_CONFIG,
  EPD_VISUALIZATION_CONFIG,
  FeatureConfig,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_EPD_VISUALIZATION_ROOT,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
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
            bootstrapUrl: "https://sapui5.hana.ondemand.com/1.98.0/resources/sap-ui-core.js"
          },

          apis: {
            baseUrl: "${options.baseUrl}"
          }
        }
      }`,
    },
  ];

  const config: FeatureConfig = {
    ...EPD_SCHEMATICS_CONFIG,
    customConfig,
  };

  return addLibraryFeature(options, config);
}
