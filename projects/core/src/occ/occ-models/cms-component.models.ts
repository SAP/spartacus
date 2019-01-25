import { Component } from './occ.models';

export type CmsComponent = Component;

export interface CmsComponentList {
  component: CmsComponent[];
  pagination: any;
}

export interface CmsLinkComponent extends CmsComponent {
  url?: string;
  container?: boolean;
  external?: boolean;
  contentPage?: string;
  contentPageLabelOrId?: string;
  linkName?: string;
  target?: boolean;
}

export interface CmsSiteContextSelectorComponent extends CmsComponent {
  context?: string;
}

export interface CmsSearchBoxComponent extends CmsComponent {
  container?: boolean;
  maxSuggestions?: number;
  maxProducts?: number;
  displaySuggestions?: boolean;
  displayProducts?: boolean;
  displayProductImages?: boolean;
  waitTimeBeforeRequest?: number;
  minCharactersBeforeRequest?: number;
}

export interface CmsParagraphComponent extends CmsComponent {
  content?: string;
  container?: string;
  title?: string;
}

export interface CmsBannerComponentMedia {
  altText?: string;
  code?: string;
  mime?: string;
  url?: string;
}

export interface CmsResponsiveBannerComponentMedia {
  desktop?: CmsBannerComponentMedia;
  mobile?: CmsBannerComponentMedia;
  tablet?: CmsBannerComponentMedia;
  widescreen?: CmsBannerComponentMedia;
}

export interface CmsBannerComponent extends CmsComponent {
  container?: string;
  media?: CmsBannerComponentMedia | CmsResponsiveBannerComponentMedia;
  urlLink?: string;
  external?: string;
}

export interface CmsProductCarouselComponent extends CmsComponent {
  title?: string;
  productCodes?: string;
  container?: string;
  popup?: string;
  scroll?: string;
}

export interface CmsMiniCartComponent extends CmsComponent {
  container?: string;
  shownProductCount?: string;
  title?: string;
  totalDisplay?: string;
  lightboxBannerComponent?: CmsBannerComponent;
}

// TODO: Upgrade model when Breadcrumbs will be finally used in project
export interface CmsBreadcrumbsComponent extends CmsComponent {
  container?: string;
}

export interface CmsNavigationNode {
  title?: string;
  children?: Array<CmsNavigationNode>;
  entries?: Array<CmsNavigationEntry>;
}

export interface CmsNavigationEntry {
  itemId?: string;
  itemSuperType?: string;
  itemType?: string;
}

export interface CmsNavigationComponent extends CmsComponent {
  container?: string;
  styleClass?: string;
  wrapAfter?: string;
  notice?: string;
  showLanguageCurrency?: string;
  navigationNode?: CmsNavigationNode;
}
