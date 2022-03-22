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
  CLI_SMARTEDIT_FEATURE,
  CustomConfig,
  FeatureConfig,
  FeatureConfigurationOverrides,
  readPackageJson,
  SMARTEDIT_SCHEMATICS_CONFIG,
  SMART_EDIT_CONFIG,
  SPARTACUS_SMARTEDIT_ROOT,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import { Schema as SpartacusSmartEditOptions } from './schema';

export function addSmartEditFeatures(options: SpartacusSmartEditOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(options.features ?? []);

    const smartEditSchematicsConfig: FeatureConfig =
      buildSmartEditConfig(options);

    const overrides: FeatureConfigurationOverrides = {
      schematics: {
        [CLI_SMARTEDIT_FEATURE]: smartEditSchematicsConfig,
      },
    };

    return chain([
      addFeatures(options, features, overrides),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),
    ]);
  };
}

function buildSmartEditConfig(
  options: SpartacusSmartEditOptions
): FeatureConfig {
  const customConfig: CustomConfig[] = [];
  if (options.storefrontPreviewRoute || options.allowOrigin) {
    let content = `<${SMART_EDIT_CONFIG}>{
      smartEdit: {\n`;
    if (options.storefrontPreviewRoute) {
      content += `storefrontPreviewRoute: '${options.storefrontPreviewRoute}',\n`;
    }
    if (options.allowOrigin) {
      content += `allowOrigin: '${options.allowOrigin}',\n`;
    }
    content += `},\n}`;

    customConfig.push({
      import: [
        {
          moduleSpecifier: SPARTACUS_SMARTEDIT_ROOT,
          namedImports: [SMART_EDIT_CONFIG],
        },
      ],
      content,
    });
  }

  return {
    ...SMARTEDIT_SCHEMATICS_CONFIG,
    customConfig,
  };
}
