import { DirectionMode } from '../config/direction.model';
import { LayoutConfig } from '../config/layout-config';

export const defaultDirectionConfig: LayoutConfig = {
  direction: {
    detect: true,
    default: DirectionMode.LTR,
    // we're not polluting the system with all defaults for rtl or ltr.
    // rtlLanguages: [ 'ar', 'arc','dv','fa','ha','he','khw','ks','ku','ps','ur', 'yi',],
    // see https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
    rtlLanguages: ['ar', 'he'],
  },
};
