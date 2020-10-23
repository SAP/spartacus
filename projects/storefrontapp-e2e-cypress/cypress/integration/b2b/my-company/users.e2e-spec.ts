import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/b2b/my-company/my-company.utils';
import {
  INPUT_TYPE,
  MyCompanyConfig,
} from '../../../helpers/b2b/my-company/models/index';
import { randomString } from '../../../helpers/user';

const config: MyCompanyConfig = {
  name: 'User',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/users`,
  apiEndpoint: '/users/current/orgCustomers',
  objectType: 'users',
  entityIdField: 'customerId',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/users/',
      inputType: INPUT_TYPE.TEXT,
      createValue: `Test Entity ${randomString()}`,
      updateValue: `Edited Test Entity ${randomString()}`,
      sortLabel: 'name',
      showInTable: true,
      showInDetails: false,
    },
    {
      label: 'Status',
      variableName: 'nic',
      inputType: INPUT_TYPE.TEXT,
      createValue: 'Active',
      updateValue: 'Active',
      showInTable: true,
      showInDetails: false,
    },
    {
      label: 'Email',
      variableName: 'email',
      inputType: INPUT_TYPE.TEXT,
      createValue: `${randomString()}@testing.com`,
      updateValue: `edited-${randomString()}@testing.com`,
      showInTable: true,
      showInDetails: true,
      formLabel: 'Email',
    },
    {
      label: 'Roles',
      variableName: 'roles',
      formLabel: 'Roles',
      createValue: 'Customer',
      updateValue: 'Approver',
      showInTable: true,
      showInDetails: true,
    },
    {
      label: 'Roles',
      variableName: 'roles',
      formLabel: 'Roles',
      inputType: INPUT_TYPE.CHECKBOX,
      createValue: 'b2bcustomergroup',
      updateValue: 'b2bapprovergroup',
      showInTable: false,
      showInDetails: false,
    },
    {
      label: 'Unit',
      variableName: 'orgUnit.name',
      sortLabel: 'unit',
      inputType: INPUT_TYPE.NG_SELECT,
      createValue: 'Services West',
      updateValue: 'Rustic',
      showInTable: true,
      showInDetails: true,
      formLabel: 'Unit',
    },
    {
      label: 'Title',
      variableName: 'titleCode',
      formLabel: 'Title',
      inputType: INPUT_TYPE.NG_SELECT,
      createValue: 'Mr.',
      updateValue: 'Mrs.',
      showInTable: false,
    },

    {
      label: 'First name',
      variableName: 'firstName',
      formLabel: 'First name',
      inputType: INPUT_TYPE.TEXT,
      createValue: `Test Entity Name ${randomString()}`,
      updateValue: `Edited Entity Name ${randomString()}`,
      showInDetails: false,
      showInTable: false,
      useInHeader: true,
    },
    {
      label: 'Last name',
      variableName: 'lastName',
      formLabel: 'Last name',
      inputType: INPUT_TYPE.TEXT,
      createValue: `Test Entity Last Name ${randomString()}`,
      updateValue: `Edited Entity Last Name ${randomString()}`,
      showInDetails: false,
      showInTable: false,
      useInHeader: true,
    },
  ],
  subCategories: [
    {
      name: 'Approvers',
      baseUrl: `/approvers`,
      apiEndpoint: '**/approvers**',
      // selector: 'approver',
      entityIdField: 'customerId',
      objectType: 'users',
      rows: [
        {
          label: 'Name',
          variableName: 'name',
          link: '/organization/user/',
        },
        {
          label: 'Email',
          variableName: 'uid',
        },
        {
          label: 'Roles',
          variableName: 'roles',
        },
        {
          label: 'Parent Unit',
          variableName: 'orgUnit.name',
          link: `/organization/units/`,
        },
      ],
    },
    {
      name: 'User groups',
      baseUrl: `/user-groups`,
      apiEndpoint: '**/orgUserGroups**',
      // selector: 'user-group',
      entityIdField: 'customerId',
      objectType: 'orgUnitUserGroups',
      rows: [
        {
          label: 'Name',
          variableName: 'name',
          link: '/organization/user-groups/',
        },
        {
          label: 'Code',
          variableName: 'uid',
        },
        {
          label: 'Parent Unit',
          variableName: 'orgUnit.name',
          link: `/organization/units/`,
        },
      ],
    },
    {
      name: 'Purchase limits',
      baseUrl: `/purchase-limits`,
      apiEndpoint: '**/availableOrderApprovalPermissions**',
      // selector: 'permission',
      entityIdField: 'customerId',
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
  ],
};

testMyCompanyFeatureFromConfig(config);
