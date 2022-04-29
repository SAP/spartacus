import { CDS_CONFIG } from '../../constants';
import {
  CLI_CDS_FEATURE,
  CLI_TRACKING_PERSONALIZATION_FEATURE,
  SPARTACUS_CDS,
  SPARTACUS_TRACKING,
} from '../../libs-constants';
import {
  AdditionalFeatureConfiguration,
  AdditionalProviders,
} from '../../utils/feature-utils';
import { FeatureConfig, LibraryOptions } from '../../utils/lib-utils';

export interface SpartacusCdsOptions extends LibraryOptions {
  tenant?: string;
  baseUrl?: string;
  profileTagLoadUrl?: string;
  profileTagConfigUrl?: string;
}

export const CDS_FOLDER_NAME = 'cds';
export const CDS_MODULE_NAME = 'Cds';

export const CDS_MODULE = 'CdsModule';

export const CDS_SCHEMATICS_CONFIG: FeatureConfig = {
  library: {
    featureName: CLI_CDS_FEATURE,
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
  dependencyManagement: {
    [SPARTACUS_TRACKING]: [CLI_TRACKING_PERSONALIZATION_FEATURE],
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
        tenant: '${options.tenant ?? 'TENANT_PLACEHOLDER'}',
        baseUrl: '${options.baseUrl ?? 'BASE_URL_PLACEHOLDER'}',
        endpoints: {
          strategyProducts: '/strategy/\${tenant}/strategies/\${strategyId}/products',
        },
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
                  options.profileTagLoadUrl ??
                  'PROFILE_TAG_LOAD_URL_PLACEHOLDER'
                }',
              configUrl:
                '${
                  options.profileTagConfigUrl ??
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
