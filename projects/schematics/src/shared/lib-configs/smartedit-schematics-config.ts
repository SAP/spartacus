/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SMART_EDIT_CONFIG } from '../constants';
import {
  SMARTEDIT_FEATURE_NAME,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_SMARTEDIT_ROOT,
} from '../libs-constants';
import { AdditionalFeatureConfiguration } from '../utils/feature-utils';
import { LibraryOptions, SchematicConfig } from '../utils/lib-utils';

export interface SpartacusSmartEditOptions extends LibraryOptions {
  storefrontPreviewRoute?: string;
  allowOrigin?: string;
}

export const SMARTEDIT_FOLDER_NAME = 'smartedit';
export const SMARTEDIT_MODULE_NAME = 'SmartEdit';
export const SMARTEDIT_MODULE = 'SmartEditModule';
export const SMARTEDIT_ROOT_MODULE = 'SmartEditRootModule';
export const SMARTEDIT_FEATURE_NAME_CONSTANT = 'SMART_EDIT_FEATURE';
export const SPARTACUS_SMARTEDIT_ASSETS = 'smartedit/assets';

export const SMARTEDIT_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: SMARTEDIT_FEATURE_NAME,
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
  customConfig: buildSmartEditConfig,
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_SMARTEDIT_ROOT,
    namedImports: [SMARTEDIT_FEATURE_NAME_CONSTANT],
  },
  assets: {
    input: SPARTACUS_SMARTEDIT_ASSETS,
    glob: '**/*',
  },
};

function buildSmartEditConfig(
  options: SpartacusSmartEditOptions
): AdditionalFeatureConfiguration {
  return {
    providers: {
      import: [
        {
          moduleSpecifier: SPARTACUS_SMARTEDIT_ROOT,
          namedImports: [SMART_EDIT_CONFIG],
        },
      ],
      content: `<${SMART_EDIT_CONFIG}>{
        smartEdit: {
          storefrontPreviewRoute: '${
            options.storefrontPreviewRoute ||
            'STOREFRONT_PREVIEW_ROUTE_PLACEHOLDER'
          }',
          allowOrigin: '${options.allowOrigin || 'ALLOWED_ORIGIN_PLACEHOLDER'}',
        },}`,
    },
  };
}
