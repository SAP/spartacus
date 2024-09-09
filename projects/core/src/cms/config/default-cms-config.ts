/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsConfig } from './cms-config';

export const defaultCmsModuleConfig: CmsConfig = {
  backend: {
    occ: {
      endpoints: {
        component: 'cms/components/${id}',
        components: 'cms/components',
        pages: 'cms/pages',
        page: 'cms/pages/${id}',
      },
    },
  },
  cmsComponents: {},
  componentsLoading: {
    pageSize: 50,
  },
};

// TODO: (CXSPA-4886) replace and remove this with defaultCmsModuleConfig in the major
export const defaultUserCmsModuleConfig: CmsConfig = {
  ...defaultCmsModuleConfig,
  backend: {
    occ: {
      endpoints: {
        component: 'users/${userId}/cms/components/${id}',
        components: 'users/${userId}/cms/components',
        pages: 'users/${userId}/cms/pages',
        page: 'users/${userId}/cms/pages/${id}',
      },
    },
  },
};
