import { ContentSlot } from '../../occ/occ-models/occ.models';

export abstract class CmsContentConfig {
  global: {
    slots: ContentSlot[];
  };
}
