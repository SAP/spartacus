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

  /**
   * In `ConfiguratorAttributeDropDownComponent`, `ConfiguratorAttributeSingleSelectionImageComponent`
   * and in 'ConfiguratorAttributeMultiSelectionImageComponent' some HTML changes were done
   * to render read-only attribute with images and a long description at the value level accordingly.
   *
   * In `cx-configurator-price`, `cx-configurator-show-more`,`cx-configurator-attribute-drop-down`,
   * `cx-configurator-attribute-selection-image`, `cx-configurator-attribute-single-selection-bundle-dropdown`,
   * `cx-configurator-attribute-type` and `cx-configurator-form-group` some styling changes were done
   * to render read-only attribute with images and a long description at the value level accordingly.
   */
  productConfiguratorAttributeTypesV2?: boolean;

  /**
  * Enable strict error handling for errors occurred in HTTP calls and in NgRx failure actions.
  */
  strictHttpAndNgrxErrorHandling?: boolean;

  /**
   * Adds asterisks to required form fields in all components existing before v2211.20
   */
  a11yRequiredAsterisks?: boolean;

  /**
   * In `QuantityCounterComponent` the numeric input is no longer made focused
   * after an increment/decrement button is clicked.
   */
  a11yQuantityOrderTabbing?: boolean;

  /**
   * Improves keyboard navigation inside of 'NavigationUIComponent'.
   */
  a11yNavigationUiKeyboardControls?: boolean;

  /**
   * Fixes heading gap present in 'OrderConfirmationItemsComponent' template.
   */
  a11yOrderConfirmationHeadingOrder?: boolean;

  /**
   * Improves accessibility of 'StarRatingComponent' i.e.
   * Provides a clear rating value to screen readers.
   * Includes information on whether it is interactive.
   */
  a11yStarRating?: boolean;

  /**
   * 'ViewComponent' will trigger an assistive message after active view changes.
   */
  a11yViewChangeAssistiveMessage?: boolean;

  /**
   * Refocuses inside of 'ReorderDialogComponent' after its content updates.
   */
  a11yReorderDialog?: boolean;

  /**
   * Element containing the 'PopoverDirective' will be refocused after the popover is closed.
   */
  a11yPopoverFocus?: boolean;

  /**
   * Adds Datepicker label and corrects heading order for 'CheckoutScheduleReplenishmentOrderComponent'.
   */
  a11yScheduleReplenishment?: boolean;

  /**
   * When 'ScrollToTopComponent' is trigged with a keyboard, focus remains on the
   * button and preserves the user's context.
   */
  a11yScrollToTop?: boolean;

  /**
   * Fixes 'cx-saved-cart-list-label' dissapering on 200% zoom in 'SavedCartListComponent'.
   */
  a11ySavedCartsZoom?: boolean;

  /**
   * Stops dropdown options labels from truncating inside 'ProductListComponent'.
   */
  a11ySortingOptionsTruncation?: boolean;

  /**
   * Fixes unnecessarily expanded focus indicator in 'ProductListItemComponent' and 'AddToSavedCartComponent'.
   */
  a11yExpandedFocusIndicator?: boolean;

  /**
   * Fixes 'CheckoutDeliveryModeComponent' losing focus after delivery methods update.
   */
  a11yCheckoutDeliveryFocus?: boolean;

  /**
   * Prevents the focus indicator of 'VisibleFocusDirective' from overflowing on mobile/while zoomed.
   */
  a11yMobileVisibleFocus?: boolean;

  /**
   * Improves screen reader readout of 'BannerComponent' on organization page.
   * The anchor tag will no longer contain unnecessary text that would otherwise be read out.
   */
  a11yOrganizationsBanner?: boolean;

  /**
   * Corrects heading order inside 'ListComponent' template.
   */
  a11yOrganizationListHeadingOrder?: boolean;

  /**
   * Changes 'order days' check list into a fieldset inside of 'CheckoutScheduleReplenishmentOrderComponent'.
   */
  a11yReplenishmentOrderFieldset?: boolean;

  /**
   * Corrects oversized focus indicator from list items inside 'ListComponent'.
   */
  a11yListOversizedFocus?: boolean;

  /**
   * Adjuststs the styles of 'StoreFinderMapComponent' to stop the Google map from overflowing on zoomed/mobile screens.
   */
  a11yStoreFinderOverflow?: boolean;

  /**
   * Corrects heading order inside 'OrderSummaryComponent' template.
   */
  a11yCartSummaryHeadingOrder?: boolean;
}

export const defaultFeatureToggles: Required<FeatureTogglesInterface> = {
  showPromotionsInPDP: false,
  recentSearches: false,
  pdfInvoicesSortByInvoiceDate: false,
  storeFrontLibCardParagraphTruncated: false,
  productConfiguratorAttributeTypesV2: false,
  strictHttpAndNgrxErrorHandling: false,
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
