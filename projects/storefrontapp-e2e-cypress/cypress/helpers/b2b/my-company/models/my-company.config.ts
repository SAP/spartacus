import { MyCompanyRowConfig } from './my-company-row.config';
import { MY_COMPANY_FEATURE } from './my-company.model';

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
   * API Endpoint corresponding to requests/responses of the category.
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
   *   inputType: 'text',
   *   createValue: `Test Entity ${randomString()}`,
   *   updateValue: `Edited Test Entity ${randomString()}`,
   *   sortLabel: 'Name',
   *   showInTable: true,
   *   formLabel: 'Name',
   *   showInDetails: true,
   * },
   * {
   *   label: 'Code',
   *   sortLabel: 'Code',
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
   *   link: `/organization/units/Custom%20Retail`,
   *   updatedLink: `/organization/units/Rustic%20Retail`,
   *   sortLabel: 'Unit',
   *   inputType: 'ngSelect',
   *   createValue: 'Custom Retail',
   *   updateValue: 'Rustic Retail',
   *   showInTable: true,
   *   formLabel: 'Parent Unit',
   *   showInDetails: true,
   * }]
   */
  rows?: MyCompanyRowConfig[]; // First object is default sort

  /**
   * Set to true to test assignment management of a given subCategory.
   */
  manageAssignments?: boolean;

  /**
   * Set to true to test the "unassign all" function of a category (if available).
   */
  canUnassignAll?: boolean;

  /**
   * Determine entity ID for possible route checks and usage between tests.
   */
  entityIdField?: string;

  /**
   * Configuration of preserve cookies value.
   */
  preserveCookies?: boolean;

  /**
   * SUBCATEGORY: Config for creating entities from submenu.
   */
  createConfig?: MyCompanyConfig;

  /**
   * Indicates which features should be tested in the current suite.
   * @example features: [MY_COMPANY_FEATURE.USER_PASSWORD]
   */
  features?: MY_COMPANY_FEATURE[];

  /**
   * Indicates which core features should be tested in the current suite.
   * @example features: [MY_COMPANY_FEATURE.CREATE]
   */
  coreFeatures?: MY_COMPANY_FEATURE[];

  /**
   * SUBCATEGORY: Config for updating entities from submenu.
   */
  editConfig?: MyCompanyConfig;

  /**
   * SUBCATEGORY: Name of the entity to be updated.
   */
  updateEntity?: string;

  /**
   * SUBCATEGORY: Name of the entity to deleted.
   */
  deleteEntity?: string;

  /**
   * SUBCATEGORY: Config for modifying user roles.
   */
  rolesConfig?: MyCompanyConfig;

  /**
   * Set to true to check status in details pane.
   */
  verifyStatusInDetails?: boolean;

  /**
   * Define request required to be complete before create/update form filling.
   */
  selectOptionsEndpoint?: string[];

  /**
   * Skip waiting for requests in assignment tests (used when GET requests aren't fired).
   */
  skipAssignmentWaits?: boolean;
}
