import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';
import { randomString } from '../../../helpers/user';

const config: MyCompanyConfig = {
  name: 'Cost Center',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/cost-centers`,
  apiEndpoint: '/users/current/costcenters',
  objectType: 'costCenters',
  selector: 'cx-cost-center',
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
      formControlName: 'name',
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
      formControlName: 'code',
      showInDetails: true,
    },
    {
      label: 'Currency',
      variableName: 'currency',
      inputType: 'ngSelect',
      formControlName: 'isocode',
      createValue: 'US Dollar',
      updateValue: 'US Dollar',
    },
    {
      label: 'Unit',
      variableName: 'orgUnit.name',
      link: `/organization/units/`,
      inputType: 'ngSelect',
      createValue: 'Custom Retail',
      updateValue: 'Rustic',
      showInTable: true,
      formControlName: 'uid',
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
