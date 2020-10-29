import { MyCompanyRowConfig } from './my-company-row.config';

export interface MyCompanyConfig {
  /**
   * Name of the My Company category.
   * @example name: 'User Group'
   */
  name?: string;

  /**
   * Suffix to recognize specified type of scenario and not affect translations check.
   * @example name: ' - some case'
   */
  nameSuffix?: string;

  /**
   * Base URL of the category.
   * @example baseUrl: `${FULL_BASE_URL_EN_USD}/organization/user-group`
   *
   * When used for a sub-category, only the baseUrl of the parent category is automatically appended.
   * Therefore, only the sub-category part of the baseUrl is required.
   * @example baseUrl: `/purchase-limits`
   */
  baseUrl?: string;

  /**
   * API Endpoint corresponding to requests/responses of the category
   * @example apiEndpoint: '/orgUnitUserGroup'
   */
  apiEndpoint?: string;

  /**
   * Variable name used to identify objects corresponding to the category returned by API.
   * @example objectType: 'orgUnitUserGroups'
   */
  objectType?: string;

  /**
   * Configurations of sub-categories generally used for assignments to corresponding parent categories.
   */
  // TODO: Subcategory examples
  subCategories?: MyCompanyConfig[];

  /**
   * Configurations used to check if a table is displaying the correct information returned by the API.
   * @example rows: [
   * {
   *   label: 'Name',
   *   variableName: 'name',
   *   link: '/organization/cost-centers/',
   *   inputType: 'text',
   *   createValue: `Test Entity ${randomString()}`,
   *   updateValue: `Edited Test Entity ${randomString()}`,
   *   sortLabel: 'name',
   *   showInTable: true,
   *   formLabel: 'Name',
   *   showInDetails: true,
   * },
   * {
   *   label: 'Code',
   *   sortLabel: 'code',
   *   variableName: 'uid',
   *   inputType: 'text',
   *   createValue: `test-entity-${randomString()}`,
   *   updateValue: `edited-entity-${randomString()}`,
   *   formLabel: 'Code',
   *   showInDetails: true,
   *   useInUrl: true,
   * },
   * {
   *   label: 'Currency',
   *   variableName: 'currency',
   *   inputType: 'ngSelect',
   *   formLabel: 'Currency',
   *   createValue: 'US Dollar',
   *   updateValue: 'US Dollar',
   * },
   * {
   *   label: 'Unit',
   *   variableName: 'orgUnit.name',
   *   link: `/organization/units/`,
   *   sortLabel: 'unit',
   *   inputType: 'ngSelect',
   *   createValue: 'Custom Retail',
   *   updateValue: 'Rustic',
   *   showInTable: true,
   *   formLabel: 'Parent Unit',
   *   showInDetails: true,
   * }]
   */
  rows?: MyCompanyRowConfig[]; // First object is default sort

  /**
   * Set to true to test assignment management of a given subCategory
   */
  manageAssignments?: boolean;

  /**
   * Set to true to test the "unassign all" function of a category (if available).
   */
  canUnassignAll?: boolean;

  /**
   * Determine entity ID for possible route checks and usage between tests
   */
  entityIdField?: string;
  
  /**
   * Test list utilizing a nested tree ux.
   */
  nestedTableRows?: boolean;

  /**
   * Set to true if checking list features for such config is not needed.
   */
  disableListChecking?: boolean;
}
