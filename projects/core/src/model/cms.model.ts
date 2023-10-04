/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CmsComponent {
  modifiedTime?: Date;
  name?: string;
  otherProperties?: any;
  typeCode?: string;
  uid?: string;

  /**
   * Defines detailed CMS component composition
   */
  composition?: {
    /**
     * List of inner component mappings
     */
    inner?: string[];
  };

  /**
   * Style classes can be added to the CMS banner component to enhance the UX.
   * The style classes are typically derived from the (CMS) backend and should
   * match an existing CSS selector.
   *
   * The styleClasses can contain a "list" of space separated style classes.
   */
  styleClasses?: string;
}

export interface CmsComponentWithChildren extends CmsComponent {
  children?: string;
}

export enum PageType {
  CONTENT_PAGE = 'ContentPage',
  PRODUCT_PAGE = 'ProductPage',
  CATEGORY_PAGE = 'CategoryPage',
  CATALOG_PAGE = 'CatalogPage',
}

export interface CmsLinkComponent extends CmsComponent {
  url?: string;
  container?: boolean;
  external?: boolean;
  contentPage?: string;
  contentPageLabelOrId?: string;
  linkName?: string;
  target?: string | boolean;

  /**
   * Style rules can be added to the CMS Link component to enhance the UX.
   * The style attributes are typically derived from the (CMS) backend.
   *
   * The styleAttributes can contain a "list" of semicolon separated style rules.
   */
  styleAttributes?: string;
}

export interface CmsSiteContextSelectorComponent extends CmsComponent {
  context?: string;
}

export enum ScrollBehavior {
  AUTO = 'auto',
  SMOOTH = 'smooth',
}

export interface CmsScrollToTopComponent extends CmsComponent {
  scrollBehavior?: ScrollBehavior;
  displayThreshold?: number;
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

export interface CMSTabParagraphContainer extends CmsComponent {
  container?: string;
  components?: string;
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
  headline?: string;
  content?: string;
  container?: string;
  media?: CmsBannerComponentMedia | CmsResponsiveBannerComponentMedia;
  urlLink?: string;
  external?: string | boolean;
  contentPage?: string;
  product?: string;
  category?: string;
}

export enum CmsBannerCarouselEffect {
  FADE = 'FADE',
  ZOOM = 'ZOOM',
  CURTAIN = 'CURTAINX',
  TURNDOWN = 'TURNDOWN',
}

export interface CmsBannerCarouselComponent extends CmsComponent {
  banners?: string;
  effect?: CmsBannerCarouselEffect;
}

export interface CmsProductCarouselComponent extends CmsComponent {
  title?: string;
  productCodes?: string;
  container?: string;
  popup?: string;
  scroll?: string;
}

export interface CmsProductReferencesComponent extends CmsComponent {
  title?: string;
  displayProductTitles?: string;
  displayProductPrices?: string;
  maximumNumberProducts?: number;
  productReferenceTypes?: string;
  container?: string;
}

export interface CmsMiniCartComponent extends CmsComponent {
  container?: string;
  shownProductCount?: string;
  title?: string;
  totalDisplay?: string;
  lightboxBannerComponent?: CmsBannerComponent;
}

export interface CmsPageTitleComponent extends CmsComponent {
  container?: string;
}

// TODO: Upgrade model when Breadcrumbs will be finally used in project
export interface CmsBreadcrumbsComponent extends CmsPageTitleComponent {}

export interface CmsNavigationNode {
  uid?: string;
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
  resetMenuOnClose?: boolean;
}

export interface CmsProductFacetNavigationComponent extends CmsComponent {
  container?: string;
  activeFacetValueCode?: string;
  searchResult?: string;
  minPerFacet?: string;
}

export interface CmsAddToCartComponent extends CmsComponent {
  inventoryDisplay?: boolean;
}

export interface CmsOrderDetailItemsComponent extends CmsComponent {
  enableAddToCart?: boolean;
  groupCartItems?: boolean;
}

export interface CmsOrderDetailOverviewComponent extends CmsComponent {
  simple?: boolean;
}

export interface CmsPDFDocumentComponent extends CmsComponent {
  pdfFile?: CmsBannerComponentMedia;
  title?: string;
  height?: number;
}

export interface CmsVideoComponent extends CmsComponent {
  overlayTitle?: string;
  autoPlay?: string;
  loop?: string;
  mute?: string;
  containerSize?: ContainerSizeOptions;
  containerBackground?: ContainerBackgroundOptions;
  thumbnailSelector?: ContainerBackgroundOptions;
  videoContainerHeight?: number;
  video?: CmsBannerComponentMedia;
  container?: boolean;
  videoMedia?: CmsBannerComponentMedia | CmsResponsiveBannerComponentMedia;
  thumbnail?: CmsBannerComponentMedia | CmsResponsiveBannerComponentMedia;
  url?: string;
  category?: string;
  product?: string;
  contentPage?: string;
}

export enum ContainerBackgroundOptions {
  NO_BACKGROUND = 'NO_BACKGROUND',
  UPLOAD_RESPONSIVE_IMAGE = 'UPLOAD_RESPONSIVE_IMAGE',
  UPLOAD_THUMBNAIL = 'UPLOAD_THUMBNAIL',
}

export enum ContainerSizeOptions {
  FIT_TO_CONTENT_SIZE = 'FIT_TO_CONTENT_SIZE',
  DEFINE_CONTAINER_HEIGHT = 'DEFINE_CONTAINER_HEIGHT',
}

export interface CmsPickupItemDetails extends CmsComponent {
  showEdit: boolean;
  context: string;
}

// TODO: (CXSPA-4886) Remove this flag in the major
export const USER_CMS_ENDPOINTS = 'userCmsEndpoints';
