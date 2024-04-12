/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '../feature-toggles-tokens';

declare module '../feature-toggles-tokens' {
  interface FeatureToggles {
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
}
