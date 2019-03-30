import { CmsPageSlotsConfig, ContentSlotComponentData } from '@spartacus/core';

export const headerComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  LanguageComponent: {
    typeCode: 'CMSSiteContextComponent',
    flexType: 'CMSSiteContextComponent',
    context: 'LANGUAGE',
  },
  CurrencyComponent: {
    typeCode: 'CMSSiteContextComponent',
    flexType: 'CMSSiteContextComponent',
    context: 'CURRENCY',
  },
  storeFinder: {
    typeCode: 'CMSLinkComponent',
    flexType: 'CMSLinkComponent',
    linkName: 'Find a Store',
    url: '/store-finder',
  },
  breadcrumbComponent: {
    typeCode: 'BreadcrumbComponent',
    flexType: 'BreadcrumbComponent',
  },
};

export const defaultPageHeaderConfig: CmsPageSlotsConfig = {
  SiteContext: {
    componentIds: ['LanguageComponent', 'CurrencyComponent'],
  },
  SiteLinks: {
    componentIds: ['storeFinder'],
  },
  BottomHeaderSlot: {
    componentIds: ['breadcrumbComponent'],
  },
};
