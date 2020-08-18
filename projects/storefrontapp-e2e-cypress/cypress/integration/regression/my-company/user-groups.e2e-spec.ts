import * as myCompany from '../../../helpers/my-company';
import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';

const config: myCompany.MyCompanyConfig = {
  navLink: 'User Groups',
  url: `${CONTEXT_URL_EN_USD}/organization/user-group`,
  apiEndpoint: '/orgUnitUserGroup',
  objectType: 'orgUnitUserGroups',
  list: {
    pageTitle: 'User groups',
    selector: 'cx-user-group-list',
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
    selector: 'cx-user-group-details',
    tabs: [
      {
        label: 'Purchase limits',
        link: `/purchase-limits`,
        manageLink: '/assign-purchase-limits/limitedPermissions',
        manageSelector: 'cx-user-group-assign-permissions',
        availableEndpoint: '**/availableOrderApprovalPermissions**',
        availableParam: 'orderApprovalPermissions',
        selector: 'cx-user-group-permissions',
        dataConfig: {
          type: 'orderApprovalPermissions',
          rowConfig: [
            {
              header: 'Code',
              text: 'code',
              link: '/organization/purchase-limit/',
            },
            { header: 'Type', text: 'orderApprovalPermissionType.name' },
            { header: 'Threshold Value', text: 'threshold' },
            { header: 'Time Period', text: 'periodRange' },
            {
              header: 'Parent Unit',
              text: 'orgUnit.name',
              link: `/organization/unit/`,
            },
          ],
        },
        rowHeaders: [
          'Code',
          'Type',
          'Threshold Value',
          'Time Period',
          'Parent Unit',
        ],
        sorts: [
          {
            urlParams: '?sort=byUnitName',
            value: 'Unit Name',
            rowOrder: [1, 0],
          },
          {
            urlParams: '',
            value: 'Name',
            rowOrder: [0, 1],
            default: true,
          },
        ],
      },
      {
        label: 'Users',
        link: `/users/limitedPermissions`,
        manageLink: '/assign-users/limitedPermissions',
        manageSelector: 'cx-user-group-assign-users',
        availableEndpoint: '**/availableOrgCustomers**',
        availableParam: 'members',
        selector: 'cx-user-group-users',
        unassignAll: true,
        rowHeaders: ['Email', 'Name', 'Unit'],
        dataConfig: {
          type: 'users',
          rowConfig: [
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
        sorts: [
          {
            urlParams: '?sort=byUnit',
            value: 'Unit Name',
            rowOrder: [0, 1],
          },
          {
            urlParams: '',
            value: 'Name',
            rowOrder: [0, 1],
            default: true,
          },
        ],
      },
    ],
  },

  form: {
    selector: 'cx-user-group-form',
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
    create: {
      selector: 'cx-user-group-create',
      entity: {
        id: 'test-user-group',
      },
    },
    edit: {
      selector: 'cx-user-group-edit',
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
  // myCompany.testListFromConfig(config);
  // myCompany.testDetailsFromConfig(config);
  // myCompany.testCreateUpdateFromConfig(config);
  myCompany.testAssignmentFromConfig(config);
});
