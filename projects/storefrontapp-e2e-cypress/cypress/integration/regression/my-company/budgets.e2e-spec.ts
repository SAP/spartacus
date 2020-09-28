import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';
import { randomString } from '../../../helpers/user';

const config: MyCompanyConfig = {
  name: 'Budget',
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
      sortLabel: 'name',
      showInTable: true,
      formControlName: 'name',
      showInDetails: true,
    },
    {
      label: 'Status',
      variableName: 'uid',
      inputType: 'text',
      createValue: 'test-entity',
      updateValue: 'edited-user-group',
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
      label: 'Amount',
      variableName: 'budget',
      sortLabel: 'value',
      showInTable: true,
      inputType: 'text',
      createValue: '10000',
      formControlName: 'budget',
      showInDetails: true,
    },
    {
      label: 'Start - End',
      variableName: ['startDate', 'endDate'],
      useDatePipe: true,
      showInTable: true,
    },
    {
      label: 'Start',
      variableName: 'startDate',
      inputType: 'datetime',
      formControlName: 'startDate',
      createValue: '3020-10-10T10:48',
    },
    {
      label: 'End',
      variableName: 'endDate',
      inputType: 'datetime',
      formControlName: 'endDate',
      createValue: '3020-11-10T10:48',
    },
    {
      label: 'Currency',
      variableName: 'currency',
      inputType: 'ngSelect',
      formControlName: 'isocode',
      createValue: 'US Dollar',
      showInDetails: true,
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
    // TODO: Cost center assignment is only one way from cost centers
  ],
};

testMyCompanyFeatureFromConfig(config);
