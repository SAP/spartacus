/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OPF_BASE_FEATURE_NAME,
  SPARTACUS_OPF,
  SPARTACUS_OPF_BASE,
  SPARTACUS_OPF_BASE_ASSETS,
  SPARTACUS_OPF_BASE_ROOT,
} from '../../libs-constants';
import { AdditionalFeatureConfiguration } from '../../utils/feature-utils';
import { LibraryOptions, SchematicConfig } from '../../utils/lib-utils';

export interface SpartacusOpfOptions extends LibraryOptions {
  baseUrl?: string;
  commerceCloudPublicKey?: string;
}

export const OPF_FOLDER_NAME = 'opf';
export const OPF_MODULE_NAME = 'Opf';
export const OPF_SCSS_FILE_NAME = 'opf.scss';

export const OPF_CONFIG = 'OpfConfig';

export const OPF_CHECKOUT_FEATURE_NAME_CONSTANT = 'OPF_CHECKOUT_FEATURE';
export const OPF_CHECKOUT_MODULE = 'OpfCheckoutModule';
export const OPF_CHECKOUT_ROOT_MODULE = 'OpfCheckoutRootModule';
export const OPF_CHECKOUT_TRANSLATIONS = 'opfCheckoutTranslations';
export const OPF_CHECKOUT_TRANSLATION_CHUNKS_CONFIG =
  'opfCheckoutTranslationChunksConfig';

export const OPF_BASE_FEATURE_NAME_CONSTANT = 'OPF_BASE_FEATURE';
export const OPF_BASE_MODULE = 'OpfBaseModule';
export const OPF_BASE_ROOT_MODULE = 'OpfBaseRootModule';
export const OPF_BASE_TRANSLATIONS = 'opfBaseTranslations';
export const OPF_BASE_TRANSLATION_CHUNKS_CONFIG =
  'opfBaseTranslationChunksConfig';

export const OPF_BASE_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: OPF_BASE_FEATURE_NAME,
    mainScope: SPARTACUS_OPF,
    featureScope: SPARTACUS_OPF_BASE,
  },
  folderName: OPF_FOLDER_NAME,
  moduleName: OPF_MODULE_NAME,
  featureModule: {
    name: OPF_BASE_MODULE,
    importPath: SPARTACUS_OPF_BASE,
  },
  rootModule: {
    name: OPF_BASE_ROOT_MODULE,
    importPath: SPARTACUS_OPF_BASE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_OPF_BASE_ROOT,
    namedImports: [OPF_BASE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: OPF_BASE_TRANSLATIONS,
    chunks: OPF_BASE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_OPF_BASE_ASSETS,
  },
  styles: {
    scssFileName: OPF_SCSS_FILE_NAME,
    importStyle: SPARTACUS_OPF,
  },
  customConfig: buildOpfBaseConfig,
};

function buildOpfBaseConfig(
  options: SpartacusOpfOptions
): AdditionalFeatureConfiguration<SpartacusOpfOptions> {
  return {
    providers: {
      import: [
        {
          moduleSpecifier: SPARTACUS_OPF_BASE_ROOT,
          namedImports: [OPF_CONFIG],
        },
      ],
      content: `<${OPF_CONFIG}>{
          opf: {
            baseUrl: "${options.baseUrl || 'PLACEHOLDER_OPF_BASE_URL'}",
            commerceCloudPublicKey: "${
              options.commerceCloudPublicKey ||
              'PLACEHOLDER_COMMERCE_CLOUD_PUBLIC_KEY'
            }",
          },
        }`,
    },
  };
}
