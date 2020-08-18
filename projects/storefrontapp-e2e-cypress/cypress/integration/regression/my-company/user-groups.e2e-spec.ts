import * as myCompany from '../../../helpers/my-company';
import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';

const config: myCompany.MyCompanyConfig = {
  navLink: 'User Groups',
  url: `${CONTEXT_URL_EN_USD}/organization/user-group`,
  apiEndpoint: '/orgUnitUserGroup',
  objectType: 'orgUnitUserGroups',
  cxSelector: 'cx-user-group',
  list: {
    pageTitle: 'User groups',
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
  },
  details: {
    tabs: [
      {
        label: 'Purchase limits',
        link: `/purchase-limits`,
        manageLink: '/assign-purchase-limits/limitedPermissions',
        manageSelector: 'cx-user-group-assign-permissions',
        availableEndpoint: '**/availableOrderApprovalPermissions**',
        availableParam: 'orderApprovalPermissions',
        selector: 'cx-user-group-permissions',
        objectType: 'orderApprovalPermissions',
        rows: [
          {
            header: 'Code',
            text: 'code',
            // link: '/organization/purchase-limit/',
          },
          { header: 'Limit', text: 'orderApprovalPermissionType.name' },
          // { header: 'Threshold Value', text: 'threshold' },
          // { header: 'Time Period', text: 'periodRange' },
          {
            header: 'Unit',
            text: 'orgUnit.name',
            link: `/organization/unit/`,
          },
        ],
      },
      {
        label: 'Users',
        link: `/users`,
        manageLink: '/assign-users/limitedPermissions',
        manageSelector: 'cx-user-group-assign-users',
        availableEndpoint: '**/availableOrgCustomers**',
        availableParam: 'members',
        selector: 'cx-user-group-users',
        objectType: 'users',
        unassignAll: true,
        rows: [
          {
            text: 'uid',
            link: '/organization/user/',
          },
          {
            text: 'name',
          },
          {
            text: 'orgUnit.name',
            link: `/organization/unit/`,
          },
        ],
      },
    ],
  },

  form: {
    inputs: [
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
    edit: {
      header: 'Edit User Group',
      btn: 'Update User Group',
      inputs: [
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
    },
  },
};

describe(`My Company - ${config.navLink}`, () => {
  myCompany.testListFromConfig(config);
  myCompany.testDetailsFromConfig(config);
  myCompany.testCreateUpdateFromConfig(config);
  myCompany.testAssignmentFromConfig(config);
});
