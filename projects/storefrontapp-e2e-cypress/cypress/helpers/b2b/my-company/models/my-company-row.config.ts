import { INPUT_TYPE } from './my-company.model';

// TODO: move configs into table: { ... }, details: { ... }, form: { ... }  format
export interface MyCompanyRowConfig {
  /**
   * Label given to the table header.
   */
  label?: string;
  /**
   * Variable name given in api response
   */
  variableName?: string | string[];
  /**
   * Label given to sort by category
   */
  sortLabel?: string;
  /**
   * Url property should link to in details
   */
  link?: string;
  /**
   * Url property should link to in details (after updating item)
   */
  updatedLink?: string;
  /**
   * Input type in form
   */
  inputType?: INPUT_TYPE;
  /**
   * Value provided to form in create process
   */
  createValue?: string;
  /**
   * Value provided to form in update process
   */
  updateValue?: string;
  /**
   * Whether to use date pipe to display in table
   */
  useDatePipe?: boolean;
  /**
   * Whether to show this property in table
   */
  showInTable?: boolean;
  /**
   * Whether to show this property in details
   */
  showInDetails?: boolean;
  /**
   * Whether to use the property value in url
   * eg. For ids
   */
  useInUrl?: boolean;
  /**
   * Name of shared cookie key
   */
  useCookie?: string;
  /**
   * Label to identify property in form
   */
  formLabel?: string;
  /**
   * Whether to show this header in details
   */
  useInHeader?: boolean;
  /**
   * Label to identify property in details
   */
  detailsLabel?: string;
  /**
   * Custom selector for form element
   */
  selector?: string;
}
