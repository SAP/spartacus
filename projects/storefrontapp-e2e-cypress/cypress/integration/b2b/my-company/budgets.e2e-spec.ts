import { MyCompanyConfig } from '../../../helpers/b2b/my-company/models/my-company.config';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/b2b/my-company/my-company.utils';
import { FULL_BASE_URL_EN_USD } from '../../../helpers/site-context-selector';
import { randomString } from '../../../helpers/user';
import { INPUT_TYPE } from '../../../helpers/b2b/my-company/models';

const config: MyCompanyConfig = {
  name: 'Budget',
  baseUrl: `${FULL_BASE_URL_EN_USD}/organization/budgets`,
  apiEndpoint: '/users/current/budgets',
  objectType: 'budgets',
  entityIdField: 'code',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/budgets/',
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
      label: 'Amount',
      variableName: 'budget',
      sortLabel: 'value',
      showInTable: true,
      inputType: INPUT_TYPE.TEXT,
      createValue: '10000',
      updateValue: '35000',
      formLabel: 'Amount',
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
      inputType: INPUT_TYPE.DATE_TIME,
      formLabel: 'Start',
      createValue: '3020-10-10T10:48',
      updateValue: '3025-01-10T03:22',
    },
    {
      label: 'End',
      variableName: 'endDate',
      inputType: INPUT_TYPE.DATE_TIME,
      formLabel: 'End',
      createValue: '3020-11-10T10:48',
      updateValue: '3026-05-15T09:53',
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
      formLabel: 'Unit',
      showInDetails: true,
    },
  ],
  subCategories: [
    {
      name: 'Cost Centers',
      baseUrl: '/cost-centers',
      objectType: 'costCenters',
      apiEndpoint: '**/constcenters**',
    },
  ],
};

testMyCompanyFeatureFromConfig(config);
