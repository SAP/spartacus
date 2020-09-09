import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';

const config: MyCompanyConfig = {
  name: 'Cost Center',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/cost-center`,
  apiEndpoint: '/costcenters',
  objectType: 'costCenters',
  selector: 'cx-cost-center',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/cost-centers/',
      inputType: 'text',
      createValue: 'Test Entity',
      updateValue: 'Edited Test Entity',
    },
    {
      label: 'Code',
      sortByUrl: '?sort=byUnitName',
      variableName: 'uid',
      inputType: 'text',
      createValue: 'test-entity',
      updateValue: 'edited-user-group',
    },
    {
      label: 'Currency',
      variableName: 'currency.isocode',
      inputType: 'text',
      createValue: 'test-entity',
      updateValue: 'edited-user-group',
    },
    {
      label: 'Parent Unit',
      sortByUrl: '?sort=byGroupID',
      variableName: 'orgUnit.name',
      link: `/organization/units/`,
      inputType: 'ngSelect',
      createValue: 'Custom Retail',
      updateValue: 'Rustic',
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
