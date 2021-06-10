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
  readPackageJson,
  shouldAddFeature,
  SMART_EDIT_CONFIG,
  SPARTACUS_SMARTEDIT,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  SMARTEDIT_FEATURE_NAME_CONSTANT,
  SMARTEDIT_FOLDER_NAME,
  SMARTEDIT_MODULE,
  SMARTEDIT_MODULE_NAME,
  SMARTEDIT_ROOT_MODULE,
  SPARTACUS_SMARTEDIT_ASSETS,
  SPARTACUS_SMARTEDIT_ROOT,
} from '../constants';
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

  return addLibraryFeature(options, {
    folderName: SMARTEDIT_FOLDER_NAME,
    moduleName: SMARTEDIT_MODULE_NAME,
    featureModule: {
      name: SMARTEDIT_MODULE,
      importPath: SPARTACUS_SMARTEDIT,
    },
    rootModule: {
      name: SMARTEDIT_ROOT_MODULE,
      importPath: SPARTACUS_SMARTEDIT_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_SMARTEDIT_ROOT,
      namedImports: [SMARTEDIT_FEATURE_NAME_CONSTANT],
    },
    customConfig,
    assets: {
      input: SPARTACUS_SMARTEDIT_ASSETS,
      glob: '**/*',
    },
  });
}
