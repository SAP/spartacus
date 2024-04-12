/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '../feature-toggles-tokens';

declare module '../feature-toggles-tokens' {
  interface FeatureToggles {
    /**
     * Displays the promotions info in the ProductSummaryComponent
     */
    showPromotionsInPDP?: boolean;

    /**
     * Displays recent searches in the main search box.
     */
    recentSearches?: boolean;

    /**
     * Previously sorting was done by the date of creating invoice entry.
     * This feature toggle allows to sort invoices by the date of the invoice itself.
     */
    pdfInvoicesSortByInvoiceDate?: boolean;

    /**
     * Truncates a paragraph text in the `CardComponent` of the `@spartacus/storefront`
     * (like truncating a label in the `CartComponent`).
     */
    storeFrontLibCardParagraphTruncated?: boolean;

    a11yRequiredAsterisks?: boolean;
    a11yQuantityOrderTabbing?: boolean;
    a11yNavigationUiKeyboardControls?: boolean;
    a11yOrderConfirmationHeadingOrder?: boolean;
    a11yStarRating?: boolean;
    a11yPopoverFocus?: boolean;
    a11yScheduleReplenishment?: boolean;
    a11yScrollToTop?: boolean;
    a11ySavedCartsZoom?: boolean;
    a11ySortingOptionsTruncation?: boolean;
    a11yExpandedFocusIndicator?: boolean;
    a11yCheckoutDeliveryFocus?: boolean;
    a11yOrganizationsBanner?: boolean;
    a11yOrganizationListHeadingOrder?: boolean;
    a11yReplenishmentOrderFieldset?: boolean;
    a11yListOversizedFocus?: boolean;
    a11yStoreFinderOverflow?: boolean;
    a11yCartSummaryHeadingOrder?: boolean;
  }
}
