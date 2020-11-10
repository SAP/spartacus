import { FULL_BASE_URL_EN_USD } from '../../../site-context-selector';
import { randomString } from '../../../user';
import { INPUT_TYPE, MyCompanyConfig } from '../models';

export const userGroupConfig: MyCompanyConfig = {
  name: 'User Group',
  baseUrl: `${FULL_BASE_URL_EN_USD}/organization/user-groups`,
  apiEndpoint: '/users/current/orgUnitUserGroup',
  objectType: 'orgUnitUserGroups',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/budgets/',
      inputType: INPUT_TYPE.TEXT,
      createValue: `Test Entity ${randomString()}`,
      updateValue: `Edited Test Entity ${randomString()}`,
      sortLabel: 'name',
      showInTable: true,
      formLabel: 'Name',
      showInDetails: true,
    },
    {
      label: 'Code',
      sortLabel: 'group',
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
      link: `/organization/units/`,
      sortLabel: 'unit',
      inputType: INPUT_TYPE.NG_SELECT,
      createValue: 'Custom Retail',
      updateValue: 'Rustic',
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
};
