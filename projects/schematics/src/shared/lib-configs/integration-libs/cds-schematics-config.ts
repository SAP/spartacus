/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CDS_CONFIG } from '../../constants';
import {
  CDS_FEATURE_NAME,
  SPARTACUS_CDS,
  SPARTACUS_CDS_ASSETS,
  TRACKING_PERSONALIZATION_FEATURE_NAME,
} from '../../libs-constants';
import {
  AdditionalFeatureConfiguration,
  AdditionalProviders,
} from '../../utils/feature-utils';
import { LibraryOptions, SchematicConfig } from '../../utils/lib-utils';

export interface SpartacusCdsOptions extends LibraryOptions {
  tenant?: string;
  baseUrl?: string;
  profileTagLoadUrl?: string;
  profileTagConfigUrl?: string;
}

export const CDS_FOLDER_NAME = 'cds';
export const CDS_MODULE_NAME = 'Cds';

export const CDS_MODULE = 'CdsModule';

export const CDS_TRANSLATIONS = 'cdsTranslations';
export const CDS_TRANSLATION_CHUNKS_CONFIG = 'cdsTranslationChunksConfig';

export const CDS_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: CDS_FEATURE_NAME,
    mainScope: SPARTACUS_CDS,
  },
  folderName: CDS_FOLDER_NAME,
  moduleName: CDS_MODULE_NAME,
  featureModule: {
    importPath: SPARTACUS_CDS,
    name: CDS_MODULE,
    content: `${CDS_MODULE}.forRoot()`,
  },
  customConfig: buildCdsConfig,
  dependencyFeatures: [TRACKING_PERSONALIZATION_FEATURE_NAME],
  i18n: {
    resources: CDS_TRANSLATIONS,
    chunks: CDS_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CDS_ASSETS,
  },
};

function buildCdsConfig(
  options: SpartacusCdsOptions
): AdditionalFeatureConfiguration<SpartacusCdsOptions> {
  const customConfig: AdditionalProviders[] = [
    {
      import: [
        {
          moduleSpecifier: SPARTACUS_CDS,
          namedImports: [CDS_CONFIG],
        },
      ],
      content: `<${CDS_CONFIG}>{
      cds: {
        tenant: '${options.tenant || 'TENANT_PLACEHOLDER'}',
        baseUrl: '${options.baseUrl || 'BASE_URL_PLACEHOLDER'}',
        merchandising: {
          defaultCarouselViewportThreshold: 80,
        },
      },
    }`,
    },
  ];

  customConfig.push({
    import: [
      {
        moduleSpecifier: SPARTACUS_CDS,
        namedImports: [CDS_CONFIG],
      },
    ],
    content: `<${CDS_CONFIG}>{
          cds: {
            profileTag: {
              javascriptUrl:
                '${
                  options.profileTagLoadUrl ||
                  'PROFILE_TAG_LOAD_URL_PLACEHOLDER'
                }',
              configUrl:
                '${
                  options.profileTagConfigUrl ||
                  'PROFILE_TAG_CONFIG_URL_PLACEHOLDER'
                }',
              allowInsecureCookies: true,
            },
          },
        }`,
  });

  return {
    providers: customConfig,
    options: {
      ...options,
      lazy: false,
    },
  };
}
