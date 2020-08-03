import { LayoutConfig } from '../config/layout-config';

export const defaultDirectionConfig: LayoutConfig = {
  direction: {
    detect: true,

    // we hold back with default direction during minor release
    // default: DirectionMode.LTR,

    // we're not polluting the system with all defaults for rtl or ltr.
    // see https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
    // rtlLanguages: [ 'ar','arc','dv','fa','ha','he','khw','ks','ku','ps','ur','yi',],
  },
};
