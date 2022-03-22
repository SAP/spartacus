import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatures,
  addPackageJsonDependenciesForLibrary,
  analyzeCrossFeatureDependencies,
  CLI_EPD_VISUALIZATION_FEATURE,
  CustomConfig,
  EPD_SCHEMATICS_CONFIG,
  EPD_VISUALIZATION_CONFIG,
  FeatureConfigurationOverrides,
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

    const features = analyzeCrossFeatureDependencies(options.features ?? []);
    const overrides = buildEpdVisualizationConfig(options);

    return chain([
      addFeatures(options, features, overrides),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),
    ]);
  };
}

function buildEpdVisualizationConfig(
  options: SpartacusEpdVisualizationOptions
): Record<string, FeatureConfigurationOverrides> {
  if (!shouldAddFeature(CLI_EPD_VISUALIZATION_FEATURE, options.features)) {
    return {};
  }

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

  return {
    [CLI_EPD_VISUALIZATION_FEATURE]: {
      schematics: { ...EPD_SCHEMATICS_CONFIG, customConfig },
    },
  };
}
