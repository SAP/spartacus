import { FULL_BASE_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company.utils';
import { MyCompanyConfig } from '../../../helpers/my-company/models/my-company.config';
import { randomString } from '../../../helpers/user';

const config: MyCompanyConfig = {
  name: 'Cost Center',
  baseUrl: `${FULL_BASE_URL_EN_USD}/organization/cost-centers`,
  apiEndpoint: '/costcenters',
  objectType: 'costCenters',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/cost-centers/',
      inputType: 'text',
      createValue: `Test Entity ${randomString()}`,
      updateValue: `Edited Test Entity ${randomString()}`,
      sortLabel: 'name',
      showInTable: true,
      formLabel: 'Name',
      showInDetails: true,
    },
    {
      label: 'Status',
      variableName: 'uid',
      inputType: 'text',
      createValue: 'Active',
      updateValue: 'Active',
      showInTable: true,
      showInDetails: true,
    },
    {
      label: 'Code',
      sortLabel: 'code',
      variableName: 'uid',
      inputType: 'text',
      createValue: `test-entity-${randomString()}`,
      updateValue: `edited-entity-${randomString()}`,
      formLabel: 'Code',
      showInDetails: true,
      useInUrl: true,
    },
    {
      label: 'Currency',
      variableName: 'currency',
      inputType: 'ngSelect',
      formLabel: 'Currency',
      createValue: 'US Dollar',
      updateValue: 'US Dollar',
    },
    {
      label: 'Unit',
      variableName: 'orgUnit.name',
      link: `/organization/units/`,
      sortLabel: 'unit',
      inputType: 'ngSelect',
      createValue: 'Custom Retail',
      updateValue: 'Rustic',
      showInTable: true,
      formLabel: 'Parent Unit',
      showInDetails: true,
    },
  ],
  subCategories: [
    {
      name: 'Budgets',
      baseUrl: `/budgets`,
      apiEndpoint: '**/budgets**',
      selector: 'budget',
      objectType: 'budgets',
      rows: [
        {
          label: 'Name',
          variableName: 'name',
          // link: '/organization/purchase-limit/',
          sortByUrl: '',
        },
        {
          label: 'Code',
          variableName: 'uid',
          sortByUrl: '',
        },
        {
          label: 'Amount',
          variableName: 'budget',
          sortByUrl: '?sort=budget',
        },
        {
          label: 'Start - End',
          variableName: 'startDate',
          sortByUrl: '',
        },
      ],
    },
  ],
};

testMyCompanyFeatureFromConfig(config);
