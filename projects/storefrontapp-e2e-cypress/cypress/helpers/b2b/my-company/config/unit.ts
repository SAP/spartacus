import { FULL_BASE_URL_EN_USD } from '../../../site-context-selector';
import { randomString } from '../../../user';
import { INPUT_TYPE, MyCompanyConfig } from '../models';
import { costCenterConfig } from './cost-center.config';
import { userConfig } from './user';

export const unitConfig: MyCompanyConfig = {
  name: 'Unit',
  baseUrl: `${FULL_BASE_URL_EN_USD}/organization/units`,
  apiEndpoint: '/orgUnitsRootNodeTree',
  objectType: 'children',
  nestedTableRows: true,
  rows: [
    {
      label: 'Name',
      variableName: 'name',
      link: '/organization/user/',
      inputType: INPUT_TYPE.TEXT,
      createValue: `unit-${randomString()}`,
      updateValue: `edited-unit-${randomString()}`,
      showInTable: true,
      showInDetails: true,
      formLabel: 'Name',
      sortLabel: 'name',
    },
    {
      label: 'Status',
      variableName: 'Active',
      inputType: INPUT_TYPE.TEXT,
      createValue: 'Active',
      updateValue: 'Active',
      showInTable: true,
      showInDetails: true,
    },
    {
      label: 'ID',
      variableName: 'id',
      link: `/organization/units/`,
      inputType: INPUT_TYPE.TEXT,
      createValue: `unit-${randomString()}`,
      updateValue: `edited-unit-${randomString()}`,
      showInTable: true,
      showInDetails: true,
      useInUrl: true,
      formLabel: 'ID',
    },
    {
      label: 'Approval process',
      variableName: 'approval',
      inputType: INPUT_TYPE.NG_SELECT,
      createValue: ``,
      updateValue: `Escalation Approval with Merchant Check`,
      showInTable: false,
      showInDetails: false,
      useInUrl: false,
      formLabel: 'Approval process',
    },
    {
      label: 'Parent Unit',
      variableName: 'orgUnit.name',
      link: `/organization/units/`,
      inputType: INPUT_TYPE.NG_SELECT,
      createValue: 'Rustic Services',
      updateValue: 'Rustic Retail',
      showInTable: false,
      formLabel: 'Parent business unit',
      showInDetails: true,
    },
  ],
  subCategories: [
    {
      name: 'Child Units',
      baseUrl: `/children`,
      apiEndpoint: '**/orgUnitsRootNodeTree**',
      objectType: 'children',
      createConfig: {
        rows: [
          {
            label: 'Name',
            variableName: 'name',
            link: '/organization/user/',
            inputType: INPUT_TYPE.TEXT,
            createValue: `unit-${randomString()}`,
            updateValue: `edited-unit-${randomString()}`,
            showInTable: true,
            showInDetails: true,
            formLabel: 'Name',
            sortLabel: 'name',
          },
          {
            label: 'Status',
            variableName: 'Active',
            inputType: INPUT_TYPE.TEXT,
            createValue: 'Active',
            updateValue: 'Active',
            showInTable: true,
            showInDetails: true,
          },
          {
            label: 'ID',
            variableName: 'id',
            link: `/organization/units/`,
            inputType: INPUT_TYPE.TEXT,
            createValue: `unit-${randomString()}`,
            updateValue: `edited-unit-${randomString()}`,
            showInTable: true,
            showInDetails: true,
            useInUrl: true,
            formLabel: 'ID',
          },
          {
            label: 'Approval process',
            variableName: 'approval',
            inputType: INPUT_TYPE.NG_SELECT,
            createValue: ``,
            updateValue: `Escalation Approval with Merchant Check`,
            showInTable: false,
            showInDetails: false,
            useInUrl: false,
            formLabel: 'Approval process',
          },
        ],
      },
    },
    {
      name: 'Users',
      baseUrl: `/users`,
      apiEndpoint: '**/availableOrgCustomers**',
      objectType: 'members',
      createConfig: userConfig,
      // canManageRoles: true,
    },
    {
      name: 'Approvers',
      baseUrl: `/approvers`,
      apiEndpoint: '**/availableOrgCustomers**',
      objectType: 'members',
      manageAssignments: true,
    },
    {
      name: 'Shipping Addresses',
      baseUrl: `/addresses`,
      apiEndpoint: '**/availableOrgCustomers**',
      objectType: 'members',
      createConfig: {
        rows: [
          {
            inputType: INPUT_TYPE.NG_SELECT,
            createValue: `New Zealand`,
            updateValue: `Australia`,
            formLabel: 'Country',
          },
          {
            inputType: INPUT_TYPE.NG_SELECT,
            createValue: `Mr.`,
            updateValue: `Mrs.`,
            formLabel: 'Title',
          },
          {
            inputType: INPUT_TYPE.TEXT,
            createValue: `Jeff`,
            updateValue: `Fafa`,
            formLabel: 'First name',
          },
          {
            inputType: INPUT_TYPE.TEXT,
            createValue: `Maori`,
            updateValue: `Wapu`,
            formLabel: 'Last name',
          },
          {
            inputType: INPUT_TYPE.TEXT,
            createValue: `123 Uratiti`,
            updateValue: `456 Waiwhakamukau`,
            formLabel: 'Address',
          },
          {
            inputType: INPUT_TYPE.TEXT,
            createValue: `Mangawai`,
            updateValue: `Pukekoe`,
            formLabel: '2nd address',
          },
          {
            inputType: INPUT_TYPE.TEXT,
            createValue: `+54658632456`,
            updateValue: `+15463215496`,
            formLabel: 'Phone number',
          },
          {
            inputType: INPUT_TYPE.TEXT,
            createValue: `Taurunga`,
            updateValue: `Ranui`,
            formLabel: 'City',
          },
          {
            inputType: INPUT_TYPE.TEXT,
            createValue: `45632`,
            updateValue: `87645`,
            formLabel: 'Zip code',
          },
        ],
      },
    },
    {
      name: 'Cost Centers',
      baseUrl: `/cost-centers`,
      apiEndpoint: '**/availableOrgCustomers**',
      objectType: 'members',
      createConfig: costCenterConfig,
    },
  ],
};
