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

  /**
   * Adds asterisks to required form fields.
   */
  a11yRequiredAsterisks?: boolean;

  /**
   * Restores default tab flow for quantity counter.
   */
  a11yQuantityOrderTabbing?: boolean;

  /**
   * Improves keyboard navigation of 'NavigationUIComponent'.
   */
  a11yNavigationUiKeyboardControls?: boolean;

  /**
   * Fixes Order confirmation heading gap.
   */
  a11yOrderConfirmationHeadingOrder?: boolean;

  /**
   * Improves accessibility of star rating component.
   */
  a11yStarRating?: boolean;

  /**
   * Trigger an assistive message after 'split-view' active view change.
   */
  a11yViewChangeAssistiveMessage?: boolean;

  /**
   * Refocuses reorder modal after content change.
   */
  a11yReorderDialog?: boolean;

  /**
   * Refocus on popover trigger button after the popover is closed.
   */
  a11yPopoverFocus?: boolean;

  /**
   * Datepicker label and heading order fix for Schedule Replenishment.
   */
  a11yScheduleReplenishment?: boolean;

  /**
   * Improves Scroll to top button focus behavior.
   */
  a11yScrollToTop?: boolean;

  /**
   * Fixes Saved Carts missing header on 200% zoom.
   */
  a11ySavedCartsZoom?: boolean;

  /**
   * Stops sorting options from truncating.
   */
  a11ySortingOptionsTruncation?: boolean;

  /**
   * Fixes unnecessarily expanded focus indicator.
   */
  a11yExpandedFocusIndicator?: boolean;

  /**
   * Restore focus after delivery methods update.
   */
  a11yCheckoutDeliveryFocus?: boolean;

  /**
   * Improves visible focus on mobile/while zoomed.
   */
  a11yMobileVisibleFocus?: boolean;

  /**
   * Improves screen reader readout for banners on organization page.
   */
  a11yOrganizationsBanner?: boolean;

  /**
   * Corrects heading order for organizations list.
   */
  a11yOrganizationListHeadingOrder?: boolean;

  /**
   * Changes order days check list into a fieldset.
   */
  a11yReplenishmentOrderFieldset?: boolean;

  /**
   * Removes oversized focus from organization list.
   */
  a11yListOversizedFocus?: boolean;

  /**
   * Stops store finder map from overflowing on zoomed/mobile screens.
   */
  a11yStoreFinderOverflow?: boolean;

  /**
   * Corrects cart summary heading order.
   */
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
