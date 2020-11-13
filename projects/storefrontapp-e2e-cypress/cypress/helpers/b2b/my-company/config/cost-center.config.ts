import { FULL_BASE_URL_EN_USD } from '../../../site-context-selector';
import { randomString } from '../../../user';
import { INPUT_TYPE, MyCompanyConfig } from '../models';

export const costCenterConfig: MyCompanyConfig = {
  name: 'Cost Center',
  baseUrl: `${FULL_BASE_URL_EN_USD}/organization/cost-centers`,
  apiEndpoint: '/costcenters',
  objectType: 'costCenters',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/cost-centers/',
      inputType: INPUT_TYPE.TEXT,
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
      inputType: INPUT_TYPE.TEXT,
      createValue: 'Active',
      updateValue: 'Active',
      showInTable: true,
      showInDetails: true,
    },
    {
      label: 'Code',
      sortLabel: 'code',
      variableName: 'uid',
      inputType: INPUT_TYPE.TEXT,
      createValue: `test-entity-${randomString()}`,
      updateValue: `edited-entity-${randomString()}`,
      formLabel: 'Code',
      showInDetails: true,
      useInUrl: true,
    },
    {
      label: 'Currency',
      variableName: 'currency',
      inputType: INPUT_TYPE.NG_SELECT,
      formLabel: 'Currency',
      createValue: 'US Dollar',
      updateValue: 'US Dollar',
    },
    {
      label: 'Unit',
      variableName: 'orgUnit.name',
      link: `/organization/units/`,
      sortLabel: 'unit',
      inputType: INPUT_TYPE.NG_SELECT,
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
      objectType: 'budgets',
      manageAssignments: true,
    },
  ],
};
