import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';
import { randomString } from '../../../helpers/user';

const config: MyCompanyConfig = {
  name: 'Purchase Limit',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/purchase-limits`,
  apiEndpoint: '/orderApprovalPermissions',
  objectType: 'orderApprovalPermissions',
  selector: 'cx-permission',
  rows: [
    {
      label: 'Code',
      sortLabel: 'name',
      variableName: 'uid',
      inputType: 'text',
      createValue: `test-entity-${randomString()}`,
      updateValue: `edited-entity-${randomString()}`,
      formControlName: 'code',
      showInTable: true,
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
      label: 'Limit',
      variableName: 'orderApprovalPermissionType.name',
      link: '/organization/budgets/',
      inputType: 'ngSelect',
      createValue: `Budget Exceeded Permission`,
      updateValue: `Allowed Order Threshold (per timespan)`,
      showInTable: true,
      formControlName: 'code',
      showInDetails: true,
    },
    // {
    //   label: 'Limit',
    //   variableName: 'uid',
    //   inputType: 'text',
    //   createValue: 'test-entity',
    //   updateValue: 'edited-user-group',
    // },
    {
      label: 'Parent Unit',
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
};

testMyCompanyFeatureFromConfig(config);
