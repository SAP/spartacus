import { FULL_BASE_URL_EN_USD } from '../../../site-context-selector';
import { randomString } from '../../../user';
import { INPUT_TYPE, MyCompanyConfig, MY_COMPANY_FEATURE } from '../models';

export const userGroupConfig: MyCompanyConfig = {
  name: 'User Group',
  baseUrl: `${FULL_BASE_URL_EN_USD}/organization/user-groups`,
  apiEndpoint: '/users/current/orgUnitUserGroup',
  objectType: 'orgUnitUserGroups',
  selectOptionsEndpoint: ['*availableOrgUnitNodes*'],
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      inputType: INPUT_TYPE.TEXT,
      createValue: `Test Entity ${randomString()}`,
      updateValue: `Edited Test Entity ${randomString()}`,
      sortLabel: 'Name',
      showInTable: true,
      formLabel: 'Name',
      showInDetails: true,
    },
    {
      label: 'Code',
      sortLabel: 'Group',
      variableName: 'uid',
      inputType: INPUT_TYPE.TEXT,
      createValue: `test-entity-${randomString()}`,
      updateValue: `edited-entity-${randomString()}`,
      formLabel: 'Code',
      showInTable: true,
      showInDetails: true,
      useInUrl: true,
    },
    {
      label: 'Unit',
      variableName: 'orgUnit.name',
      link: `/organization/units/Custom%20Retail`,
      updatedLink: `/organization/units/Rustic%20Retail`,
      sortLabel: 'Unit',
      inputType: INPUT_TYPE.NG_SELECT,
      createValue: 'Custom Retail',
      updateValue: 'Rustic Retail',
      showInTable: true,
      formLabel: 'Unit',
      showInDetails: true,
    },
  ],
  subCategories: [
    {
      name: 'Purchase limits',
      baseUrl: `/purchase-limits`,
      apiEndpoint: '**/availableOrderApprovalPermissions**',
      objectType: 'orderApprovalPermissions',
      manageAssignments: true,
    },
    {
      name: 'Users',
      baseUrl: `/users`,
      apiEndpoint: '**/availableOrgCustomers**',
      objectType: 'members',
      canUnassignAll: true,
      manageAssignments: true,
    },
  ],
  features: [
    MY_COMPANY_FEATURE.CREATE,
    MY_COMPANY_FEATURE.UPDATE,
    MY_COMPANY_FEATURE.LIST,
    MY_COMPANY_FEATURE.ASSIGNMENTS,
  ],
  coreFeatures: [
    MY_COMPANY_FEATURE.CREATE,
    MY_COMPANY_FEATURE.UPDATE,
    MY_COMPANY_FEATURE.LIST,
  ],
};
