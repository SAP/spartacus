import { CmsConfig } from '@spartacus/core';
import { PUNCHOUT_FEATURE } from '@spartacus/punchout/root';

export const defaultPunchoutCmsComponentsConfig: CmsConfig = {
  featureModules: {
    [PUNCHOUT_FEATURE]: {
      cmsComponents: [
        'PunchoutSessionComponent',
        'PunchoutErrorComponent',
        'PunchoutButtonsComponent',
        'PunchoutRequisitionComponent',
        'PunchoutCloseSessionComponent',
        'PunchoutInspectCartComponent',
      ],
    },
  },
};
