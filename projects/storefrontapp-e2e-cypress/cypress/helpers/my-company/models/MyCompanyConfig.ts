import { MyCompanyRowConfig } from './MyCompanyRowConfig';
import { MyCompanyFormInputConfig } from './MyCompanyFormInputConfig';

export interface MyCompanyConfig {
  /**
   * Name of the My Company category.
   * @example name: 'User Group'
   */
  name: string;

  /**
   * Base URL of the category.
   * @example baseUrl: `${CONTEXT_URL_EN_USD}/organization/user-group`
   *
   * When used for a sub-category, only the baseUrl of the parent category is automatically appended.
   * Therefore, only the sub-category part of the baseUrl is required.
   * @example baseUrl: `/purchase-limits`
   */
  baseUrl: string;

  /**
   * API Endpoint corresponding to requests/responses of the category
   * @example apiEndpoint: '/orgUnitUserGroup'
   */
  apiEndpoint: string;

  /**
   * Variable name used to identify objects corresponding to the category returned by API.
   * @example objectType: 'orgUnitUserGroups'
   */
  objectType: string;

  /**
   * Name of the selector used for the category.
   * @example selector: 'cx-user-group',
   */
  selector: string;

  /**
   * Configurations of sub-categories generally used for assignments to corresponding parent categories.
   */
  // TODO: Subcategory examples
  subCategories?: MyCompanyConfig[];

  /**
   * Configurations used to check if a table is displaying the correct information returned by the API.
   */
  // TODO: Examples
  rows: MyCompanyRowConfig[]; // First object is default sort

  /**
   * Configuration used to fill out the form to create a test entity for the category.
   */
  // TODO: Examples
  formCreate?: MyCompanyFormInputConfig[];

  /**
   * Configuration used to fill out the form to update a created test entity for the category.
   */
  // TODO: Examples
  formUpdate?: MyCompanyFormInputConfig[];

  /**
   * Set to true to test the "unassign all" function of a category (if available).
   */
  canUnassignAll?: boolean;
}

export enum MyCompanySelectorSuffixes {
  LIST = 'list',
  DETAILS = 'details',
  CREATE = 'create',
  EDIT = 'edit',
  FORM = 'form',
  ASSIGN = 'assign',
}
