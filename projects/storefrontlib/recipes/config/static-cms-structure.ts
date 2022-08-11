import { ValueProvider } from '@angular/core';
import { provideCmsStructure } from '../../cms-structure/utils/cms-structure.util';

export const defaultCmsContentProviders: ValueProvider[] = [
  provideCmsStructure({
    componentId: 'HamburgerMenuComponent',
    pageSlotPosition: 'PreHeader',
  }),
  provideCmsStructure({
    componentId: 'LoginComponent',
    pageSlotPosition: 'SiteLogin',
  }),
];
