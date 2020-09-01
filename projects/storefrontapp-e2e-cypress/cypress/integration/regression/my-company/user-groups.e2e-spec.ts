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
      header: 'Name',
      text: 'name',
      link: '/organization/user-groups/',
    },
    {
      header: 'Code',
      sortByUrl: '?sort=byUnitName',
      text: 'uid',
    },
    {
      header: 'Parent Unit',
      sortByUrl: '?sort=byGroupID',
      text: 'orgUnit.name',
      link: `/organization/units/`,
    },
  ],
  formCreate: [
    {
      label: 'Code',
      type: 'text',
      value: 'test-entity',
    },
    { label: 'Name', type: 'text', value: 'Test Entity' },
    {
      label: 'Parent Unit',
      type: 'ngSelect',
      value: 'Custom Retail',
      link: 'Custom%20Retail',
    },
  ],
  formUpdate: [
    {
      label: 'Code',
      type: 'text',
      value: 'edited-user-group',
    },
    { label: 'Name', type: 'text', value: 'Edited User Group' },
    {
      label: 'Parent Unit',
      type: 'ngSelect',
      value: 'Rustic',
      link: 'Rustic',
    },
  ],
  subCategories: [
    {
      name: 'Purchase limits',
      baseUrl: `/purchase-limits`,
      // manageSelector: 'cx-user-group-assign-permission',
      // listSelector: 'cx-user-group-permission-list',
      apiEndpoint: '**/availableOrderApprovalPermissions**',
      selector: 'permission',
      objectType: 'orderApprovalPermissions',
      rows: [
        {
          header: 'Code',
          text: 'code',
          // link: '/organization/purchase-limit/',
        },
        { header: 'Limit', text: 'orderApprovalPermissionType.name' },
        {
          header: 'Unit',
          text: 'orgUnit.name',
          link: `/organization/unit/`,
        },
      ],
    },
    {
      name: 'Users',
      baseUrl: `/users`,
      // manageSelector: 'cx-user-group-assign-user',
      // listSelector: 'cx-user-group-user-list',
      apiEndpoint: '**/availableOrgCustomers**',
      selector: 'cx-user-group-user',
      objectType: 'members',
      canUnassignAll: true,
      rows: [
        {
          header: 'Code',
          text: 'code',
          // link: '/organization/purchase-limit/',
        },
        {
          text: 'name',
          header: 'name',
          link: '/organization/user/',
        },

        {
          header: 'Parent Unit',
          text: 'orgUnit.name',
          link: `/organization/unit/`,
        },
      ],
    },
  ],
};

testMyCompanyFeatureFromConfig(config);
