import { ContentSlot } from '../../occ/occ-models/occ.models';
import { CmsConfig } from './cms-config';

export abstract class CmsContentConfig extends CmsConfig {
  cmsData: {
    slots: ContentSlot[];
  };
}
