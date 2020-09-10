import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';

const config: MyCompanyConfig = {
  name: 'Units',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/user`,
  apiEndpoint: '/orgCustomers',
  objectType: 'users',
  selector: 'cx-user',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/user/',
      inputType: 'text',
      createValue: 'Test Entity',
      updateValue: 'Edited Test Entity',
    },
    {
      label: 'Email',
      sortByUrl: '?sort=byUid',
      variableName: 'uid',
      inputType: 'text',
      createValue: 'test-entity',
      updateValue: 'edited-entity',
    },
    {
      label: 'Roles',
      variableName: 'roles',
      inputType: 'ngSelect',
      createValue: 'Custom Retail',
      updateValue: 'Rustic',
    },
    {
      label: 'Parent Unit',
      sortByUrl: '?sort=byGroupID',
      variableName: 'orgUnit.name',
      link: `/organization/units/`,
      inputType: 'ngSelect',
      createValue: 'Custom Retail',
      updateValue: 'Rustic',
    },
  ],
  subCategories: [
    {
      name: 'Approvers',
      baseUrl: `/approvers`,
      apiEndpoint: '**/approvers**',
      selector: 'approver',
      objectType: 'users',
      rows: [
        {
          label: 'Name',
          variableName: 'name',
          link: '/organization/user/',
        },
        {
          label: 'Email',
          sortByUrl: '?sort=byUid',
          variableName: 'uid',
        },
        {
          label: 'Roles',
          variableName: 'roles',
        },
        {
          label: 'Parent Unit',
          sortByUrl: '?sort=byGroupID',
          variableName: 'orgUnit.name',
          link: `/organization/units/`,
        },
      ],
    },
    {
      name: 'User groups',
      baseUrl: `/user-groups`,
      apiEndpoint: '**/orgUserGroups**',
      selector: 'user-group',
      objectType: 'orgUnitUserGroups',
      rows: [
        {
          label: 'Name',
          variableName: 'name',
          link: '/organization/user-groups/',
        },
        {
          label: 'Code',
          sortByUrl: '?sort=byUnitName',
          variableName: 'uid',
        },
        {
          label: 'Parent Unit',
          sortByUrl: '?sort=byGroupID',
          variableName: 'orgUnit.name',
          link: `/organization/units/`,
        },
      ],
    },
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
  ],
};

testMyCompanyFeatureFromConfig(config);
