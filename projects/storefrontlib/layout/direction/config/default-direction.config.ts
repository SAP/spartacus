import { DirectionConfig } from './direction.config';
import { DirectionMode } from './direction.model';

export const defaultDirectionConfig: DirectionConfig = {
  direction: {
    detect: true,
    default: DirectionMode.LTR,
    // we're not polluting the system with all defaults for ltr, but add 2 common used
    // languages (hebrew and arabic) to easily demo directionality
    // see https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
    rtlLanguages: ['he', 'ar'],
  },
};
