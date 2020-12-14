import { CmsComponent } from '@spartacus/core';

export interface CmsMerchandisingCarouselComponent extends CmsComponent {
  title?: string;
  strategy?: string;
  numberToDisplay?: number;
  scroll?: string;
  container?: string;
  textColour?: string;
  backgroundColour?: string;
  viewportPercentage?: number;
}
