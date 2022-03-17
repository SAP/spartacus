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
  CLI_SMARTEDIT_FEATURE,
  CustomConfig,
  FeatureConfig,
  readPackageJson,
  shouldAddFeature,
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

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_SMARTEDIT_FEATURE, options.features)
        ? addSmartEditFeature(options)
        : noop(),
    ]);
  };
}

function addSmartEditFeature(options: SpartacusSmartEditOptions): Rule {
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

  const config: FeatureConfig = {
    ...SMARTEDIT_SCHEMATICS_CONFIG,
    customConfig,
  };

  return addLibraryFeature(options, config);
}
