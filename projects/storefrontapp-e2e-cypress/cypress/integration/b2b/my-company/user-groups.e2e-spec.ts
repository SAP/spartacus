import { MyCompanyConfig } from '../../../helpers/b2b/my-company/models/my-company.config';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/b2b/my-company/my-company.utils';
import { FULL_BASE_URL_EN_USD } from '../../../helpers/site-context-selector';
import { randomString } from '../../../helpers/user';
import { INPUT_TYPE } from '../../../helpers/b2b/my-company/models';

const config: MyCompanyConfig = {
  name: 'User Group',
  baseUrl: `${FULL_BASE_URL_EN_USD}/organization/user-groups`,
  apiEndpoint: '/users/current/orgUnitUserGroup',
  objectType: 'orgUnitUserGroups',
  entityIdField: 'uid',
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
      label: 'Code',
      sortLabel: 'group',
      variableName: 'uid',
      inputType: INPUT_TYPE.TEXT,
      createValue: `test-entity-${randomString()}`,
      updateValue: `edited-entity-${randomString()}`,
      formLabel: 'Code',
      showInTable: true,
      showInDetails: true,
      useInUrl: true,
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
};

testMyCompanyFeatureFromConfig(config);
