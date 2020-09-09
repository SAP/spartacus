import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';

const config: MyCompanyConfig = {
  name: 'Budgets',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/budgets`,
  apiEndpoint: '/budgets',
  objectType: 'budgets',
  selector: 'cx-budget',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/budgets/',
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
      label: 'Amount',
      variableName: 'budget',
      sortByUrl: '?sort=budget',
    },
    {
      label: 'Start - End',
      variableName: 'startDate',
      sortByUrl: '',
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
    // TODO: Cost center assignment is only one way from cost centers
  ],
};

testMyCompanyFeatureFromConfig(config);
