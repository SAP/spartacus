import { CmsComponent } from '@spartacus/core';

export interface CmsMerchandisingCarouselComponent extends CmsComponent {
  name?: string;
  strategy?: string;
  container?: string;
  numberToDisplay?: string;
  scroll?: string;
}
