import {
  CLI_SMARTEDIT_FEATURE,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_SMARTEDIT_ROOT,
} from '../libs-constants';
import { FeatureConfig } from '../utils/lib-utils';

export const SMARTEDIT_FOLDER_NAME = 'smartedit';
export const SMARTEDIT_MODULE_NAME = 'SmartEdit';
export const SMARTEDIT_MODULE = 'SmartEditModule';
export const SMARTEDIT_ROOT_MODULE = 'SmartEditRootModule';
export const SMARTEDIT_FEATURE_NAME_CONSTANT = 'SMART_EDIT_FEATURE';
export const SPARTACUS_SMARTEDIT_ASSETS = 'smartedit/assets';

export const SMARTEDIT_SCHEMATICS_CONFIG: FeatureConfig = {
  library: {
    cli: CLI_SMARTEDIT_FEATURE,
    mainScope: SPARTACUS_SMARTEDIT,
  },
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
  assets: {
    input: SPARTACUS_SMARTEDIT_ASSETS,
    glob: '**/*',
  },
};
