import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';

const config: MyCompanyConfig = {
  name: 'User Group',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/user-group`,
  apiEndpoint: '/orgUnitUserGroup',
  objectType: 'orgUnitUserGroups',
  selector: 'cx-user-group',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/user-groups/',
      inputType: 'text',
      createValue: 'Test Entity',
      updateValue: 'Edited Test Entity',
    },
    {
      label: 'Code',
      sortByUrl: '?sort=byUnitName',
      variableName: 'uid',
      inputType: 'text',
      createValue: 'test-entity',
      updateValue: 'edited-user-group',
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
        },
        { label: 'Limit', variableName: 'orderApprovalPermissionType.name' },
        {
          label: 'Unit',
          variableName: 'orgUnit.name',
          link: `/organization/unit/`,
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
          label: 'Code',
          variableName: 'code',
          // link: '/organization/purchase-limit/',
        },
        {
          variableName: 'name',
          label: 'name',
          link: '/organization/user/',
        },

        {
          label: 'Parent Unit',
          variableName: 'orgUnit.name',
          link: `/organization/unit/`,
        },
      ],
    },
  ],
};

testMyCompanyFeatureFromConfig(config);
