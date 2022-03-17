import {
  CLI_CDS_FEATURE,
  CLI_TRACKING_PERSONALIZATION_FEATURE,
  SPARTACUS_CDS,
  SPARTACUS_TRACKING,
} from '../../libs-constants';
import { FeatureConfig } from '../../utils/lib-utils';

export const CDS_FOLDER_NAME = 'cds';
export const CDS_MODULE_NAME = 'Cds';

export const CDS_MODULE = 'CdsModule';

export const CDS_SCHEMATICS_CONFIG: FeatureConfig = {
  folderName: CDS_FOLDER_NAME,
  moduleName: CDS_MODULE_NAME,
  featureModule: {
    importPath: SPARTACUS_CDS,
    name: CDS_MODULE,
    content: `${CDS_MODULE}.forRoot()`,
  },
  dependencyManagement: {
    featureName: CLI_CDS_FEATURE,
    featureDependencies: {
      [SPARTACUS_TRACKING]: [CLI_TRACKING_PERSONALIZATION_FEATURE],
    },
  },
};
