import { BREAKPOINT } from '../../layout/config/layout-config';

export enum PageSection {
  HEADER = 'header',
  FOOTER = 'footer',
  NAVIGATION = 'navigation',
}

export interface CmsStructureOptions {
  /**
   * The componentId is used to provide a static configuration of (cms) components.
   */
  componentId?: string;
  /**
   * Page slot position is used to provide the slot configuration.
   */
  pageSlotPosition?: string;
  /**
   * The page template is used to provide the page slot to the given page template.
   */
  pageTemplate?: string;
  /**
   * The section is used to provide the page slot to the given section.
   */
  section?: PageSection | string;
  /**
   * The breakpoint is used to provide the page slot for a specific breakpoint.
   */
  breakpoint?: BREAKPOINT;
}
