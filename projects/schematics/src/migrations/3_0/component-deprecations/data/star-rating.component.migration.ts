import {
  SET_RATE,
  SET_RATE_ON_EVENT,
  STAR_RATING_COMPONENT,
} from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/shared/components/star-rating/star-rating.component.ts
export const STAR_RATING_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-star-rating',
  componentClassName: STAR_RATING_COMPONENT,
  removedProperties: [
    {
      name: SET_RATE_ON_EVENT,
      comment: `'${SET_RATE_ON_EVENT}' method was removed. The '${SET_RATE}' method should be used instead`,
    },
  ],
};
