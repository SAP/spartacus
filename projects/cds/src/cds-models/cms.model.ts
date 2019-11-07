import { CmsComponent } from './../../../core/src/model/cms.model';

export interface CmsMerchandisingCarouselComponent extends CmsComponent {
  title?: string;
  strategy?: string;
  numberToDisplay?: string;
  scroll?: string;
  container?: string;
  textColour?: string;
  backgroundColour?: string;
}
