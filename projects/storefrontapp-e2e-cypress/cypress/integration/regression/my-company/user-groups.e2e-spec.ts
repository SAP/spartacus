import { testMyCompanyListFromConfig } from '../../../helpers/my-company';
import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';

const config = {
  navLink: 'User Groups',
  url: `${CONTEXT_URL_EN_USD}/organization/user-groups`,
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
};

describe(`My Company - ${config.navLink}`, () => {
  before(() => {
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
    cy.visit(`/`);
  });

  testMyCompanyListFromConfig(config);
});
