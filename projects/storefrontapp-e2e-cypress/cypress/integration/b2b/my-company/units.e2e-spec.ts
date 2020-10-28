import { INPUT_TYPE } from '../../../helpers/b2b/my-company/models';
import { MyCompanyConfig } from '../../../helpers/b2b/my-company/models/my-company.config';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/b2b/my-company/my-company.utils';
import { FULL_BASE_URL_EN_USD } from '../../../helpers/site-context-selector';
import { costCenterConfig } from './cost-centers.e2e-spec';

export const unitConfig: MyCompanyConfig = {
  name: 'Unit',
  baseUrl: `${FULL_BASE_URL_EN_USD}/organization/units`,
  apiEndpoint: '/orgUnitsRootNodeTree',
  objectType: 'children',
  nestedTableRows: true,
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/user/',
      inputType: INPUT_TYPE.TEXT,
      createValue: 'Test Entity',
      updateValue: 'Edited Test Entity',
      showInTable: true,
    },
    {
      label: 'Status',
      variableName: 'Active',
      inputType: INPUT_TYPE.TEXT,
      createValue: 'test-entity',
      updateValue: 'edited-entity',
      showInTable: true,
    },
    {
      label: 'ID',
      variableName: 'id',
      link: `/organization/units/`,
      inputType: INPUT_TYPE.NG_SELECT,
      createValue: 'Custom Retail',
      updateValue: 'Rustic',
      showInTable: true,
    },
  ],
  subCategories: [
    {
      name: 'Child Units',
      baseUrl: `/Rustic`,
      apiEndpoint: '**/orgUnitsRootNodeTree**',
      objectType: 'children',
      createConfig: unitConfig,
    },
    {
      name: 'Users',
      baseUrl: `/users`,
      apiEndpoint: '**/availableOrgCustomers**',
      objectType: 'members',
      canCreate: true,
      canManageRoles: true,
    },
    {
      name: 'Approvers',
      baseUrl: `/approvers`,
      apiEndpoint: '**/availableOrgCustomers**',
      objectType: 'members',
      canManage: true,
    },
    {
      name: 'Shipping Addresses',
      baseUrl: `/approvers`,
      apiEndpoint: '**/availableOrgCustomers**',
      objectType: 'members',
      canManage: true,
    },
    {
      name: 'Cost Centers',
      baseUrl: `/approvers`,
      apiEndpoint: '**/availableOrgCustomers**',
      objectType: 'members',
      createConfig: costCenterConfig,
    },
  ],
};

testMyCompanyFeatureFromConfig(unitConfig);
