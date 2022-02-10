export interface TabElement {
  value?: string | any[];
  type: TabbingOrderTypes;
}

export interface TabbingOrderConfig {
  [name: string]: TabElement[];
}

export enum TabbingOrderTypes {
  FORM_FIELD = 'formField',
  LINK = 'link',
  BUTTON = 'button',
  NG_SELECT = 'ngSelect',
  GENERIC_CHECKBOX = 'genericCheckbox',
  CHECKBOX_WITH_LABEL = 'checkboxWithLabel',
  IMG_LINK = 'imgLink',
  GENERIC_INPUT = 'genericInput',
  GENERIC_BUTTON = 'genericButton',
  GENERIC_NG_SELECT = 'genericNgSelect',
  GENERIC_ELEMENT = 'genericElement',
  GENERIC_ELEMENT_WITH_VALUE = 'genericElementWithValue',
  RADIO = 'radio',
  SELECT = 'select',
  NAV_CATEGORY_DROPDOWN = 'navCategoryDropdown',
  CAROUSEL = 'carousel',
  CX_MEDIA = 'cxMedia',
  CX_ICON = 'cxIcon',
  H3 = 'h3',
  CX_PRODUCT_VIEW = 'cxProductView',
  INDEX_OF_ELEMENT = 'indexOfElement',
  TEXT_AREA = 'textarea',
  CX_PROGRESS_BUTTON = 'cx-progress-button',
}
