import { CmsComponent } from '@spartacus/core';

export interface CmsMerchandisingCarouselComponent extends CmsComponent {
  /** optional heading for the carousel */
  title?: string;

  /**  */
  strategy?: string;

  /** TODO: decide on the usage / support  */
  numberToDisplay?: string;

  /** TODO: decide on the usage / support  */
  scroll?: string;

  /** generic compnoent info, not in use  */
  container?: string;
}
