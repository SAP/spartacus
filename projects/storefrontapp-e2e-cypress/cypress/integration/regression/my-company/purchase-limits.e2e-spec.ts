import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';
import { randomString } from '../../../helpers/user';

const config: MyCompanyConfig = {
  name: 'Purchase Limit',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/purchase-limits`,
  apiEndpoint: '/users/current/orderApprovalPermissions',
  objectType: 'orderApprovalPermissions',
  rows: [
    {
      label: 'Code',
      sortLabel: 'name',
      variableName: 'uid',
      inputType: 'text',
      createValue: `test-entity-${randomString()}`,
      updateValue: `edited-entity-${randomString()}`,
      formLabel: 'Code',
      showInTable: true,
      showInDetails: true,
      useInUrl: true
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
      label: 'Limit',
      variableName: 'threshold',
      link: '/organization/budgets/',
      inputType: 'ngSelect',
      createValue: `Budget Exceeded Permission`,
      updateValue: `Allowed Order Threshold (per timespan)`,
      showInTable: true,
      formLabel: 'Type',
      showInDetails: true,
    },
    {
      label: 'Parent Unit',
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
};

testMyCompanyFeatureFromConfig(config);
