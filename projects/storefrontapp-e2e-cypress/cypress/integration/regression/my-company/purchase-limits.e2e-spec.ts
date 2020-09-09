import { CONTEXT_URL_EN_USD } from '../../../helpers/site-context-selector';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/my-company/my-company';
import { MyCompanyConfig } from '../../../helpers/my-company/models/MyCompanyConfig';

const config: MyCompanyConfig = {
  name: 'Purchase Limits',
  baseUrl: `${CONTEXT_URL_EN_USD}/organization/purchase-limit`,
  apiEndpoint: '/orderApprovalPermissions',
  objectType: 'orderApprovalPermissions',
  selector: 'cx-permission',
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/purchase-limits/',
      inputType: 'text',
      createValue: 'Test Entity',
      updateValue: 'Edited Test Entity',
    },
    {
      label: 'Limit',
      variableName: 'uid',
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
};

testMyCompanyFeatureFromConfig(config);
