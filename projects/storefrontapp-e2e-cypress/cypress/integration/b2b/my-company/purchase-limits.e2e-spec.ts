import { FULL_BASE_URL_EN_USD } from '../../../helpers/site-context-selector';
import {
  INPUT_TYPE,
  MyCompanyConfig,
} from '../../../helpers/b2b/my-company/models';
import { testMyCompanyFeatureFromConfig } from '../../../helpers/b2b/my-company/my-company.utils';
import { randomString } from '../../../helpers/user';

const configs: MyCompanyConfig[] = [
  {
    name: 'Purchase Limit',
    baseUrl: `${FULL_BASE_URL_EN_USD}/organization/purchase-limits`,
    apiEndpoint: '/users/current/orderApprovalPermissions',
    objectType: 'orderApprovalPermissions',
    rows: [
      {
        label: 'Code',
        sortLabel: 'name',
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
        label: 'Status',
        variableName: 'uid',
        inputType: INPUT_TYPE.TEXT,
        createValue: 'Active',
        updateValue: 'Active',
        showInTable: true,
        showInDetails: true,
      },
      {
        label: 'Limit',
        variableName: 'threshold',
        link: '/organization/budgets/',
        inputType: INPUT_TYPE.NG_SELECT,
        createValue: `Budget Exceeded Permission`,
        showInTable: true,
        formLabel: 'Type',
        showInDetails: true,
        detailsLabel: 'Type',
      },
      {
        label: 'Parent Unit',
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
  },
  {
    name: 'Purchase Limit',
    nameSuffix: ' - Allowed Order Threshold (per order)',
    baseUrl: `${FULL_BASE_URL_EN_USD}/organization/purchase-limits`,
    apiEndpoint: '/users/current/orderApprovalPermissions',
    objectType: 'orderApprovalPermissions',
    disableListChecking: true,
    rows: [
      {
        label: 'Code',
        sortLabel: 'name',
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
        label: 'Status',
        variableName: 'uid',
        inputType: INPUT_TYPE.TEXT,
        createValue: 'Active',
        updateValue: 'Active',
        showInTable: true,
        showInDetails: true,
      },
      {
        label: 'Limit',
        variableName: 'threshold',
        link: '/organization/budgets/',
        inputType: INPUT_TYPE.NG_SELECT,
        createValue: `Allowed Order Threshold (per order)`,
        showInTable: false,
        formLabel: 'Type',
        showInDetails: true,
        detailsLabel: 'Type',
      },
      {
        label: 'Limit',
        variableName: 'currency',
        link: '/organization/budgets/',
        inputType: INPUT_TYPE.NG_SELECT,
        createValue: `US Dollar`,
        showInTable: false,
        formLabel: 'Currency',
        showInDetails: false,
      },
      {
        label: 'Threshold',
        variableName: 'threshold',
        inputType: INPUT_TYPE.TEXT,
        createValue: '10000',
        updateValue: '20000',
        showInTable: false,
        formLabel: 'Threshold',
        showInDetails: true,
        selector: '[formcontrolname=threshold]',
      },
      {
        label: 'Parent Unit',
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
  },
  {
    name: 'Purchase Limit',
    nameSuffix: ' - Allowed Order Threshold (per timespan)',
    baseUrl: `${FULL_BASE_URL_EN_USD}/organization/purchase-limits`,
    apiEndpoint: '/users/current/orderApprovalPermissions',
    objectType: 'orderApprovalPermissions',
    disableListChecking: true,
    rows: [
      {
        label: 'Code',
        sortLabel: 'name',
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
        label: 'Status',
        variableName: 'uid',
        inputType: INPUT_TYPE.TEXT,
        createValue: 'Active',
        updateValue: 'Active',
        showInTable: true,
        showInDetails: true,
      },
      {
        label: 'Limit',
        variableName: 'threshold',
        link: '/organization/budgets/',
        inputType: INPUT_TYPE.NG_SELECT,
        createValue: `Allowed Order Threshold (per timespan)`,
        showInTable: false,
        formLabel: 'Type',
        showInDetails: true,
        detailsLabel: 'Type',
      },
      {
        label: 'Period',
        variableName: 'period',
        link: '/organization/budgets/',
        inputType: INPUT_TYPE.NG_SELECT,
        createValue: `MONTH`,
        updateValue: 'YEAR',
        showInTable: false,
        formLabel: 'Period',
        showInDetails: true,
      },
      {
        label: 'Limit',
        variableName: 'currency',
        link: '/organization/budgets/',
        inputType: INPUT_TYPE.NG_SELECT,
        createValue: `US Dollar`,
        showInTable: false,
        formLabel: 'Currency',
        showInDetails: false,
      },
      {
        label: 'Threshold',
        variableName: 'threshold',
        inputType: INPUT_TYPE.TEXT,
        createValue: '10000',
        updateValue: '20000',
        showInTable: false,
        formLabel: 'Threshold',
        showInDetails: true,
        selector: '[formcontrolname=threshold]',
      },
      {
        label: 'Parent Unit',
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
  },
];

configs.forEach((config) => {
  testMyCompanyFeatureFromConfig(config);
});
