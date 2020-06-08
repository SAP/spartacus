import * as myCompany from '../../../helpers/my-company';
import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';

const config = {
  navLink: 'User Groups',
  url: `${CONTEXT_URL_EN_USD}/organization/user-group`,
  pageTitle: 'User Group Management',
  createBtn: {
    text: 'Create new user group',
    link: '/create',
  },
  listSelector: 'cx-user-group-list',
  rowHeaders: ['ID', 'Name', 'Parent Unit'],
  rows: [
    {
      text: ['limitedPermissions', 'Limited Permissions', 'Rustic'],
      links: [
        '/organization/user-group/limitedPermissions',
        null,
        '/organization/unit/Rustic',
      ],
    },
    {
      text: ['premiumPermissions', 'Premium Permissions', 'Rustic'],
      links: [
        '/organization/user-group/premiumPermissions',
        null,
        '/organization/unit/Rustic',
      ],
    },
    {
      text: ['standardPermissions', 'Standard Permissions', 'Rustic'],
      links: [
        '/organization/user-group/standardPermissions',
        null,
        '/organization/unit/Rustic',
      ],
    },
    {
      text: ['testXXXXZZZ', 'testXXXXZZZ', 'DisabledUnit'],
      links: [
        '/organization/user-group/testXXXXZZZ',
        null,
        '/organization/unit/DisabledUnit',
      ],
    },
  ],
  sorts: [
    {
      urlParams: '?sort=byUnitName',
      value: 'Unit Name',
      rowOrder: [3, 1, 2, 0],
    },
    {
      urlParams: '?sort=byGroupID',
      value: 'Group ID',
      rowOrder: [0, 1, 2, 3],
    },
    {
      urlParams: '',
      value: 'Name',
      rowOrder: [0, 1, 2, 3],
      default: true,
    },
  ],
  details: {
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
        label: 'Details',
        link: `/limitedPermissions`,
        selector: 'cx-user-group-details',
      },
      {
        label: 'Purchase limits',
        link: `/purchase-limits/limitedPermissions`,
        selector: 'cx-user-group-permissions',
        rowHeaders: [
          'Code',
          'Type',
          'Threshold Value',
          'Time Period',
          'Parent Unit',
        ],
        rows: [
          {
            text: [
              'Rustic_0K_USD_ORDER',
              'Allowed Order Threshold (per order)',
              '0 $',
              null,
              'Rustic',
            ],
            links: [
              '/organization/purchase-limit/Rustic_0K_USD_ORDER',
              null,
              null,
              null,
              '/organization/unit/Rustic',
            ],
          },
          {
            text: [
              'Rustic_10K_USD_MONTH',
              'Allowed Order Threshold (per timespan)',
              '10000 $',
              'MONTH',
              'Rustic',
            ],
            links: [
              '/organization/purchase-limit/Rustic_10K_USD_MONTH',
              null,
              null,
              null,
              '/organization/unit/Rustic',
            ],
          },
          {
            text: [
              'Rustic_15K_USD_ORDER',
              'Allowed Order Threshold (per order)',
              '15000 $',
              null,
              'Rustic',
            ],
            links: [
              '/organization/purchase-limit/Rustic_15K_USD_ORDER',
              null,
              null,
              null,
              '/organization/unit/Rustic',
            ],
          },
          {
            text: [
              'Rustic_25K_USD_MONTH',
              'Allowed Order Threshold (per timespan)',
              '25000 $',
              'MONTH',
              'Rustic',
            ],
            links: [
              '/organization/purchase-limit/Rustic_25K_USD_MONTH',
              null,
              null,
              null,
              '/organization/unit/Rustic',
            ],
          },
        ],
        sorts: [
          {
            urlParams: '?sort=byUnitName',
            value: 'Unit Name',
            rowOrder: [3, 0, 1, 2],
          },
          {
            urlParams: '',
            value: 'Name',
            rowOrder: [0, 1, 2, 3],
            default: true,
          },
        ],
      },
      {
        label: 'Users',
        link: `/users/limitedPermissions`,
        selector: 'cx-user-group-users',
        rowHeaders: ['Email', 'Name', 'Unit'],
        rows: [
          {
            text: ['akiro.nakamura@rustic-hw.com', 'Akiro Nakamura', 'Rustic'],
            links: [
              '/organization/user/08ecc0b1-16ef-4a74-a1dd-4a244300c974',
              null,
              '/organization/unit/Rustic',
            ],
          },
          {
            text: [
              'alejandro.navarro@rustic-hw.com',
              'Alejandro Navarro',
              'Services East',
            ],
            links: [
              '/organization/user/0db38452-5b78-45af-ba26-6cfa20090d8d',
              null,
              '/organization/unit/Services%20East',
            ],
          },
          {
            text: [
              'anthony.lombardi@rustic-hw.com',
              'Anthony Lombardi',
              'Custom Retail',
            ],
            links: [
              '/organization/user/f455605a-0a14-48aa-a48d-a7842337aba9',
              null,
              '/organization/unit/Custom%20Retail',
            ],
          },
          {
            text: [
              'william.hunter@rustic-hw.com',
              'William Hunter',
              'Custom Retail',
            ],
            links: [
              '/organization/user/2b1d2812-e5e5-47f4-accf-96e67b76d4e7',
              null,
              '/organization/unit/Custom%20Retail',
            ],
          },
        ],
        sorts: [
          {
            urlParams: '?sort=byUnit',
            value: 'Unit Name',
            rowOrder: [3, 2, 0, 1],
          },
          {
            urlParams: '',
            value: 'Name',
            rowOrder: [0, 1, 2, 3],
            default: true,
          },
        ],
      },
    ],
  },
  detailsSelector: 'cx-user-group-details',
  create: {
    selector: 'cx-user-group-create',
    header: 'Create User Group',
    entity: {
      id: 'test-user-group',
    },
  },
  form: {
    selector: 'cx-user-group-form',
    inputs: [
      {
        label: 'User Group ID',
        type: 'text',
        value: 'test-user-group',
      },
      { label: 'User Group name', type: 'text', value: 'Test User Group' },
      {
        label: 'Parent business unit',
        type: 'ngSelect',
        value: 'Custom Retail',
        link: 'Custom%20Retail',
      },
    ],
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
};

describe(`My Company - ${config.navLink}`, () => {
  beforeEach(() => {
    cy.requireLoggedIn({
      user: 'linda.wolf@rustic-hw.com',
      registrationData: {
        firstName: 'Linda',
        lastName: 'Wolf',
        titleCode: '',
        password: '12341234',
        email: 'linda.wolf@rustic-hw.com',
      },
    });
    cy.visit(`${config.url}s`);
  });

  // myCompany.testListFromConfig(config);
  // myCompany.testDetailsFromConfig(config);
  // myCompany.testCreateUpdateFromConfig(config);
  myCompany.testAssignmentFromConfig(config);
});
