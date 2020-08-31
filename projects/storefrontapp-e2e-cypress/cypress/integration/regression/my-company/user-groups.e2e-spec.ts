import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import {
  testMyCompanyFeatureFromConfig,
  MyCompanyConfig,
} from '../../../helpers/my-company';

const config: MyCompanyConfig = {
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
  tabs: [
    {
      label: 'Purchase limits',
      link: `/purchase-limits`,
      manageSelector: 'cx-user-group-assign-permission',
      listSelector: 'cx-user-group-permission-list',
      availableEndpoint: '**/availableOrderApprovalPermissions**',
      availableParam: 'orderApprovalPermissions',
      selector: 'cx-user-group-permission',
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
      label: 'Users',
      link: `/users`,
      manageSelector: 'cx-user-group-assign-user',
      listSelector: 'cx-user-group-user-list',
      availableEndpoint: '**/availableOrgCustomers**',
      availableParam: 'members',
      selector: 'cx-user-group-user',
      objectType: 'members',
      unassignAll: true,
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
