import { CmsPageSlotsConfig, ContentSlotComponentData } from '@spartacus/core';

export const headerComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  HamburgerMenuComponent: {
    typeCode: 'HamburgerMenuComponent',
    flexType: 'HamburgerMenuComponent',
  },
  LoginComponent: {
    typeCode: 'LoginComponent',
    flexType: 'LoginComponent',
    uid: 'LoginComponent',
  },
};

export const defaultPageHeaderConfig: CmsPageSlotsConfig = {
  PreHeader: {
    componentIds: ['HamburgerMenuComponent'],
  },
  SiteLogin: {
    componentIds: ['LoginComponent'],
  },
};
