/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Let's NOT add here any wildcard property like
//  `[key: string]: boolean | undefined;`
// We want this interface to be STRICT and cause a compilation error when a removed property is used.
// Thanks to that, customers using a property that was recently removed, will know they have to adapt their code.
export interface FeatureTogglesInterface {
  /**
   * In `ProductSummaryComponent` it shows the promotions info.
   */
  showPromotionsInPDP?: boolean;

  /**
   * In `SearchBoxComponent` it shows the recent searches.
   */
  recentSearches?: boolean;

  /**
   * In `InvoicesListComponent` it sorts invoices by the date of the invoice itself.
   * Previously the sorting was done by the date of creating an invoice entry.
   */
  pdfInvoicesSortByInvoiceDate?: boolean;

  /**
   * In `CardComponent` it truncates the paragraph text
   * (analogically to the existing truncating of the label).
   */
  storeFrontLibCardParagraphTruncated?: boolean;

  productConfiguratorAttributeTypesV2?: boolean;

  a11yRequiredAsterisks?: boolean;
  a11yQuantityOrderTabbing?: boolean;
  a11yNavigationUiKeyboardControls?: boolean;
  a11yOrderConfirmationHeadingOrder?: boolean;
  a11yStarRating?: boolean;
  a11yViewChangeAssistiveMessage?: boolean;
  a11yReorderDialog?: boolean;
  a11yPopoverFocus?: boolean;
  a11yScheduleReplenishment?: boolean;
  a11yScrollToTop?: boolean;
  a11ySavedCartsZoom?: boolean;
  a11ySortingOptionsTruncation?: boolean;
  a11yExpandedFocusIndicator?: boolean;
  a11yCheckoutDeliveryFocus?: boolean;
  a11yMobileVisibleFocus?: boolean;
  a11yOrganizationsBanner?: boolean;
  a11yOrganizationListHeadingOrder?: boolean;
  a11yReplenishmentOrderFieldset?: boolean;
  a11yListOversizedFocus?: boolean;
  a11yStoreFinderOverflow?: boolean;
  a11yCartSummaryHeadingOrder?: boolean;
}

export const defaultFeatureToggles: Required<FeatureTogglesInterface> = {
  showPromotionsInPDP: false,
  recentSearches: false,
  pdfInvoicesSortByInvoiceDate: false,
  storeFrontLibCardParagraphTruncated: false,
  productConfiguratorAttributeTypesV2: false,
  a11yRequiredAsterisks: false,
  a11yQuantityOrderTabbing: false,
  a11yNavigationUiKeyboardControls: false,
  a11yOrderConfirmationHeadingOrder: false,
  a11yStarRating: false,
  a11yViewChangeAssistiveMessage: false,
  a11yReorderDialog: false,
  a11yPopoverFocus: false,
  a11yScheduleReplenishment: false,
  a11yScrollToTop: false,
  a11ySavedCartsZoom: false,
  a11ySortingOptionsTruncation: false,
  a11yExpandedFocusIndicator: false,
  a11yCheckoutDeliveryFocus: false,
  a11yMobileVisibleFocus: false,
  a11yOrganizationsBanner: false,
  a11yOrganizationListHeadingOrder: false,
  a11yReplenishmentOrderFieldset: false,
  a11yListOversizedFocus: false,
  a11yStoreFinderOverflow: false,
  a11yCartSummaryHeadingOrder: false,
};
