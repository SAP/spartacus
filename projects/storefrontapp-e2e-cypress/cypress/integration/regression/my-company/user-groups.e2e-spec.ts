import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';
import { randomString } from '../../../helpers/user';

const config: MyCompanyConfig = {
  name: 'User Group',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/user-group`,
  apiEndpoint: '/users/current/orgUnitUserGroup',
  objectType: 'orgUnitUserGroups',
  selector: 'cx-user-group',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/budgets/',
      inputType: 'text',
      createValue: `Test Entity ${randomString()}`,
      updateValue: `Edited Test Entity ${randomString()}`,
      sortLabel: 'name',
      showInTable: true,
      formControlName: 'name',
      showInDetails: true,
    },
    {
      label: 'Code',
      sortLabel: 'group',
      variableName: 'uid',
      inputType: 'text',
      createValue: `test-entity-${randomString()}`,
      updateValue: `edited-entity-${randomString()}`,
      formControlName: 'code',
      showInTable: true,
      showInDetails: true,
    },
    {
      label: 'Unit',
      variableName: 'orgUnit.name',
      link: `/organization/units/`,
      sortLabel: 'unit',
      inputType: 'ngSelect',
      createValue: 'Custom Retail',
      updateValue: 'Rustic',
      showInTable: true,
      formControlName: 'uid',
      showInDetails: true,
    },
  ],
  subCategories: [
    {
      name: 'Purchase limits',
      baseUrl: `/purchase-limits`,
      apiEndpoint: '**/availableOrderApprovalPermissions**',
      selector: 'permission',
      objectType: 'orderApprovalPermissions',
      rows: [
        {
          label: 'Code',
          variableName: 'code',
          // link: '/organization/purchase-limit/',
          sortByUrl: '',
        },
        { label: 'Limit', variableName: 'orderApprovalPermissionType.name' },
        {
          label: 'Unit',
          variableName: 'orgUnit.name',
          link: `/organization/unit/`,
          sortByUrl: '?sort=byUnitName',
        },
      ],
    },
    {
      name: 'Users',
      baseUrl: `/users`,
      apiEndpoint: '**/availableOrgCustomers**',
      selector: 'user',
      objectType: 'members',
      canUnassignAll: true,
      rows: [
        {
          variableName: 'name',
          label: 'Name',
          link: '/organization/user/',
          sortByUrl: '',
        },
        {
          label: 'Email',
          variableName: 'email',
        },
        {
          label: 'Roles',
          variableName: 'roles',
        },
        {
          label: 'Unit',
          variableName: 'orgUnit.name',
          link: `/organization/unit/`,
          sortByUrl: '?sort=byUnitName',
        },
      ],
    },
  ],
};

testMyCompanyFeatureFromConfig(config);
