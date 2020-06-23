import * as myCompany from '../../../helpers/my-company';
import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';

const config = {
  navLink: 'User Groups',
  url: `${CONTEXT_URL_EN_USD}/organization/user-group`,
  apiEndpoint: '/orgUnitUserGroup',
  list: {
    pageTitle: 'User Group Management',
    createBtn: {
      text: 'Create new user group',
      link: '/create',
    },
    selector: 'cx-user-group-list',
    rowHeaders: ['ID', 'Name', 'Parent Unit'],
    sorts: [
      {
        urlParams: '?sort=byUnitName',
        value: 'Unit Name',
      },
      {
        urlParams: '?sort=byGroupID',
        value: 'Group ID',
      },
      {
        urlParams: '',
        value: 'Name',
        default: true,
      },
    ],
    dataConfig: {
      type: 'orgUnitUserGroups',
      rowConfig: [
        {
          text: 'uid',
          link: '/organization/user-group/',
        },
        { text: 'name' },
        {
          text: 'orgUnit.name',
          link: `/organization/unit/`,
        },
      ],
    },
  },
  details: {
    selector: 'cx-user-group-details',
    entity: {
      id: 'limitedPermissions',
      parentUnit: 'Rustic',
      name: 'Limited Permissions',
    },
    editBtn: {
      text: 'Edit',
      link: '/edit/limitedPermissions',
    },
    tabs: [
      {
        label: 'Purchase limits',
        link: `/purchase-limits/limitedPermissions`,
        manageLink: '/assign-purchase-limits/limitedPermissions',
        manageSelector: 'cx-user-group-assign-permissions',
        availableEndpoint: '**/availableOrderApprovalPermissions**',
        availableParam: 'orderApprovalPermissions',
        selector: 'cx-user-group-permissions',
        dataConfig: {
          type: 'orderApprovalPermissions',
          rowConfig: [
            {
              text: 'code',
              link: '/organization/purchase-limit/',
            },
            { text: 'orderApprovalPermissionType.name' },
            { text: 'threshold' },
            { text: 'periodRange' },
            {
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
        label: 'User Group ID',
        type: 'text',
        value: 'test-entity',
      },
      { label: 'User Group name', type: 'text', value: 'Test Entity' },
      {
        label: 'Parent business unit',
        type: 'ngSelect',
        value: 'Custom Retail',
        link: 'Custom%20Retail',
      },
    ],
    create: {
      selector: 'cx-user-group-create',
      header: 'Create User Group',
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
          label: 'User Group ID',
          type: 'text',
          value: 'edited-user-group',
        },
        { label: 'User Group name', type: 'text', value: 'Edited User Group' },
        {
          label: 'Parent business unit',
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
