/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CDS_CONFIG } from '../../constants';
import {
  CDS_FEATURE_NAME,
  SPARTACUS_CDS,
  TRACKING_PERSONALIZATION_FEATURE_NAME,
} from '../../libs-constants';
import {
  AdditionalFeatureConfiguration,
  AdditionalProviders,
} from '../../utils/feature-utils';
import { LibraryOptions, SchematicConfig } from '../../utils/lib-utils';

export interface SpartacusCdsOptions extends LibraryOptions {
  site?: string;
  tenant?: string;
  baseUrl?: string;
  profileTagLoadUrl?: string;
  profileTagConfigUrl?: string;
  site2?: string;
  tenant2?: string;
  baseUrl2?: string;
  profileTagLoadUrl2?: string;
  profileTagConfigUrl2?: string;
}

export const CDS_FOLDER_NAME = 'cds';
export const CDS_MODULE_NAME = 'Cds';

export const CDS_MODULE = 'CdsModule';

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
};

function buildCdsConfig(
  options: SpartacusCdsOptions
): AdditionalFeatureConfiguration<SpartacusCdsOptions> {
  const cdsConfigs = getCdsConfigs(options);

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
        site: '${options.site || 'DEFAULT'}',
        tenant: '${options.tenant || 'TENANT_PLACEHOLDER'}',
        baseUrl: '${options.baseUrl || 'BASE_URL_PLACEHOLDER'}',
        endpoints: {
          strategyProducts: '/strategy/\${tenant}/strategies/\${strategyId}/products',
        },
        merchandising: {
          defaultCarouselViewportThreshold: 80,
        },
      },
      ${cdsConfigs.length ? `cdsConfigs: [${cdsConfigs}]` : ''}
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

function getCdsConfigs(options: SpartacusCdsOptions) {
  const cdsConfigs = [];

  if (options.tenant2 || options.site2 || options.baseUrl2) {
    cdsConfigs.push(
      `      {
      site: '${options.site2 || 'ADDITIONAL_SITE'}',
      tenant: '${options.tenant2 || 'TENANT_PLACEHOLDER'}',
      baseUrl: '${options.baseUrl2 || 'BASE_URL_PLACEHOLDER'}',
      endpoints: {
        strategyProducts: '/strategy/\${tenant}/strategies/\${strategyId}/products',
      },
      merchandising: {
        defaultCarouselViewportThreshold: 80,
      },
      ${
        options.profileTagLoadUrl2 || options.profileTagConfigUrl2
          ? `    profileTag: {
              javascriptUrl:
                '${
                  options.profileTagLoadUrl2 ||
                  'PROFILE_TAG_LOAD_URL_PLACEHOLDER'
                }',
              configUrl:
                '${
                  options.profileTagConfigUrl2 ||
                  'PROFILE_TAG_CONFIG_URL_PLACEHOLDER'
                }',
              allowInsecureCookies: true,
            },`
          : ''
      }
    }`
    );
  }
  return cdsConfigs;
}
