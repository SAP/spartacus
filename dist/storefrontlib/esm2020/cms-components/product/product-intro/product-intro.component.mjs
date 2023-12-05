/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defer, merge, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ComponentCreateEvent, ComponentDestroyEvent, } from '../../../cms-structure';
import * as i0 from "@angular/core";
import * as i1 from "../current-product.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@angular/common";
import * as i4 from "../../../shared/components/star-rating/star-rating.component";
export class ProductIntroComponent {
    constructor(currentProductService, translationService, winRef, eventService) {
        this.currentProductService = currentProductService;
        this.translationService = translationService;
        this.winRef = winRef;
        this.eventService = eventService;
        this.product$ = this.currentProductService.getProduct();
        /**
         * Observable that checks the reviews component availability on the page.
         */
        this.areReviewsAvailable$ = merge(
        // Check if reviews component is already defined:
        defer(() => of(!!this.getReviewsComponent())), 
        // Observe EventService for reviews availability:
        this.eventService.get(ComponentCreateEvent).pipe(filter((event) => event.id === this.reviewsComponentId), map(() => true)), this.eventService.get(ComponentDestroyEvent).pipe(filter((event) => event.id === this.reviewsComponentId), map(() => false)));
        this.reviewsComponentId = 'ProductReviewsTabComponent';
        this.reviewsTranslationKey = `TabPanelContainer.tabs.${this.reviewsComponentId}`;
    }
    /**
     * Scroll to views component on page and click "Reviews" tab
     */
    showReviews() {
        // Use translated label for Reviews tab reference
        this.translationService
            .translate(this.reviewsTranslationKey)
            .subscribe((reviewsTabLabel) => {
            const tabsComponent = this.getTabsComponent();
            const reviewsTab = tabsComponent && this.getTabByLabel(reviewsTabLabel, tabsComponent);
            if (reviewsTab) {
                this.clickTabIfInactive(reviewsTab);
                setTimeout(() => {
                    reviewsTab.scrollIntoView({ behavior: 'smooth' });
                    reviewsTab.focus({ preventScroll: true });
                });
            }
        })
            .unsubscribe();
    }
    // NOTE: Does not currently exists as its own component
    // but part of tabs component. This is likely to change in refactor.
    /**
     * Get Reviews Component if exists on page
     */
    getReviewsComponent() {
        return this.winRef.document.querySelector('cx-product-reviews');
    }
    /**
     * Get Tabs Component if exists on page
     */
    getTabsComponent() {
        return this.winRef.document.querySelector('cx-tab-paragraph-container');
    }
    /**
     * Click to activate tab if not already active
     *
     * @param tab tab to click if needed
     */
    clickTabIfInactive(tab) {
        if (!tab.classList.contains('active') ||
            tab.classList.contains('toggled')) {
            tab.click();
        }
    }
    /**
     * Get Tab by label if exists on page
     *
     * @param label label of searched tab
     * @param tabsComponent component containing tabs
     */
    getTabByLabel(label, tabsComponent) {
        // NOTE: Reads through button tags to click on correct tab
        // There may be a better way of doing this now/after refactor
        const tabElements = tabsComponent.getElementsByTagName('button');
        // Look through button tab elements until finding tab with label
        return Array.from(tabElements).find((buttonElement) => buttonElement.innerHTML.includes(label));
    }
}
ProductIntroComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductIntroComponent, deps: [{ token: i1.CurrentProductService }, { token: i2.TranslationService }, { token: i2.WindowRef }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Component });
ProductIntroComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductIntroComponent, selector: "cx-product-intro", ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"rating\" *ngIf=\"product?.averageRating\">\n    <cx-star-rating [rating]=\"product?.averageRating ?? 0\"></cx-star-rating>\n\n    <div class=\"count\">({{ product?.numberOfReviews }})</div>\n\n    <button\n      *ngIf=\"areReviewsAvailable$ | async\"\n      class=\"btn btn-link cx-action-link\"\n      (click)=\"showReviews()\"\n      [attr.aria-label]=\"\n        'productSummary.showReviewsDetailed'\n          | cxTranslate\n            : {\n                rating: product?.averageRating | number: '1.0-1',\n                count: product?.numberOfReviews\n              }\n      \"\n    >\n      {{ 'productSummary.showReviews' | cxTranslate }}\n    </button>\n  </div>\n  <div class=\"rating\" *ngIf=\"!product?.averageRating\">\n    {{ 'productDetails.noReviews' | cxTranslate }}\n  </div>\n  <div class=\"code\">\n    {{ 'productSummary.id' | cxTranslate }} {{ product?.code }}\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.StarRatingComponent, selector: "cx-star-rating", inputs: ["disabled", "rating"], outputs: ["change"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.DecimalPipe, name: "number" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductIntroComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-intro', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"rating\" *ngIf=\"product?.averageRating\">\n    <cx-star-rating [rating]=\"product?.averageRating ?? 0\"></cx-star-rating>\n\n    <div class=\"count\">({{ product?.numberOfReviews }})</div>\n\n    <button\n      *ngIf=\"areReviewsAvailable$ | async\"\n      class=\"btn btn-link cx-action-link\"\n      (click)=\"showReviews()\"\n      [attr.aria-label]=\"\n        'productSummary.showReviewsDetailed'\n          | cxTranslate\n            : {\n                rating: product?.averageRating | number: '1.0-1',\n                count: product?.numberOfReviews\n              }\n      \"\n    >\n      {{ 'productSummary.showReviews' | cxTranslate }}\n    </button>\n  </div>\n  <div class=\"rating\" *ngIf=\"!product?.averageRating\">\n    {{ 'productDetails.noReviews' | cxTranslate }}\n  </div>\n  <div class=\"code\">\n    {{ 'productSummary.id' | cxTranslate }} {{ product?.code }}\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i2.TranslationService }, { type: i2.WindowRef }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbnRyby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC1pbnRyby9wcm9kdWN0LWludHJvLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9wcm9kdWN0LWludHJvL3Byb2R1Y3QtaW50cm8uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPbkUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixxQkFBcUIsR0FDdEIsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBUWhDLE1BQU0sT0FBTyxxQkFBcUI7SUEwQmhDLFlBQ1kscUJBQTRDLEVBQzVDLGtCQUFzQyxFQUN0QyxNQUFpQixFQUNqQixZQUEwQjtRQUgxQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQTdCdEMsYUFBUSxHQUNOLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUUxQzs7V0FFRztRQUNILHlCQUFvQixHQUF3QixLQUFLO1FBQy9DLGlEQUFpRDtRQUNqRCxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENB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QUFxQix3REMxQmxDLDA5QkE2QkE7MkZESGEscUJBQXFCO2tCQUxqQyxTQUFTOytCQUNFLGtCQUFrQixtQkFFWCx1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRXZlbnRTZXJ2aWNlLFxuICBQcm9kdWN0LFxuICBUcmFuc2xhdGlvblNlcnZpY2UsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmVyLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50Q3JlYXRlRXZlbnQsXG4gIENvbXBvbmVudERlc3Ryb3lFdmVudCxcbn0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZSc7XG5pbXBvcnQgeyBDdXJyZW50UHJvZHVjdFNlcnZpY2UgfSBmcm9tICcuLi9jdXJyZW50LXByb2R1Y3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXByb2R1Y3QtaW50cm8nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC1pbnRyby5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0SW50cm9Db21wb25lbnQge1xuICBwcm9kdWN0JDogT2JzZXJ2YWJsZTxQcm9kdWN0IHwgbnVsbD4gPVxuICAgIHRoaXMuY3VycmVudFByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3QoKTtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSB0aGF0IGNoZWNrcyB0aGUgcmV2aWV3cyBjb21wb25lbnQgYXZhaWxhYmlsaXR5IG9uIHRoZSBwYWdlLlxuICAgKi9cbiAgYXJlUmV2aWV3c0F2YWlsYWJsZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBtZXJnZShcbiAgICAvLyBDaGVjayBpZiByZXZpZXdzIGNvbXBvbmVudCBpcyBhbHJlYWR5IGRlZmluZWQ6XG4gICAgZGVmZXIoKCkgPT4gb2YoISF0aGlzLmdldFJldmlld3NDb21wb25lbnQoKSkpLFxuXG4gICAgLy8gT2JzZXJ2ZSBFdmVudFNlcnZpY2UgZm9yIHJldmlld3MgYXZhaWxhYmlsaXR5OlxuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDb21wb25lbnRDcmVhdGVFdmVudCkucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LmlkID09PSB0aGlzLnJldmlld3NDb21wb25lbnRJZCksXG4gICAgICBtYXAoKCkgPT4gdHJ1ZSlcbiAgICApLFxuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDb21wb25lbnREZXN0cm95RXZlbnQpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGV2ZW50KSA9PiBldmVudC5pZCA9PT0gdGhpcy5yZXZpZXdzQ29tcG9uZW50SWQpLFxuICAgICAgbWFwKCgpID0+IGZhbHNlKVxuICAgIClcbiAgKTtcblxuICBwcm90ZWN0ZWQgcmV2aWV3c0NvbXBvbmVudElkID0gJ1Byb2R1Y3RSZXZpZXdzVGFiQ29tcG9uZW50JztcblxuICBwcm90ZWN0ZWQgcmV2aWV3c1RyYW5zbGF0aW9uS2V5ID0gYFRhYlBhbmVsQ29udGFpbmVyLnRhYnMuJHt0aGlzLnJldmlld3NDb21wb25lbnRJZH1gO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjdXJyZW50UHJvZHVjdFNlcnZpY2U6IEN1cnJlbnRQcm9kdWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb25TZXJ2aWNlOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFNjcm9sbCB0byB2aWV3cyBjb21wb25lbnQgb24gcGFnZSBhbmQgY2xpY2sgXCJSZXZpZXdzXCIgdGFiXG4gICAqL1xuICBzaG93UmV2aWV3cygpIHtcbiAgICAvLyBVc2UgdHJhbnNsYXRlZCBsYWJlbCBmb3IgUmV2aWV3cyB0YWIgcmVmZXJlbmNlXG4gICAgdGhpcy50cmFuc2xhdGlvblNlcnZpY2VcbiAgICAgIC50cmFuc2xhdGUodGhpcy5yZXZpZXdzVHJhbnNsYXRpb25LZXkpXG4gICAgICAuc3Vic2NyaWJlKChyZXZpZXdzVGFiTGFiZWwpID0+IHtcbiAgICAgICAgY29uc3QgdGFic0NvbXBvbmVudCA9IHRoaXMuZ2V0VGFic0NvbXBvbmVudCgpO1xuICAgICAgICBjb25zdCByZXZpZXdzVGFiID1cbiAgICAgICAgICB0YWJzQ29tcG9uZW50ICYmIHRoaXMuZ2V0VGFiQnlMYWJlbChyZXZpZXdzVGFiTGFiZWwsIHRhYnNDb21wb25lbnQpO1xuXG4gICAgICAgIGlmIChyZXZpZXdzVGFiKSB7XG4gICAgICAgICAgdGhpcy5jbGlja1RhYklmSW5hY3RpdmUocmV2aWV3c1RhYik7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZXZpZXdzVGFiLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xuICAgICAgICAgICAgcmV2aWV3c1RhYi5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8vIE5PVEU6IERvZXMgbm90IGN1cnJlbnRseSBleGlzdHMgYXMgaXRzIG93biBjb21wb25lbnRcbiAgLy8gYnV0IHBhcnQgb2YgdGFicyBjb21wb25lbnQuIFRoaXMgaXMgbGlrZWx5IHRvIGNoYW5nZSBpbiByZWZhY3Rvci5cbiAgLyoqXG4gICAqIEdldCBSZXZpZXdzIENvbXBvbmVudCBpZiBleGlzdHMgb24gcGFnZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFJldmlld3NDb21wb25lbnQoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy53aW5SZWYuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY3gtcHJvZHVjdC1yZXZpZXdzJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFRhYnMgQ29tcG9uZW50IGlmIGV4aXN0cyBvbiBwYWdlXG4gICAqL1xuICBwcml2YXRlIGdldFRhYnNDb21wb25lbnQoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy53aW5SZWYuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY3gtdGFiLXBhcmFncmFwaC1jb250YWluZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGljayB0byBhY3RpdmF0ZSB0YWIgaWYgbm90IGFscmVhZHkgYWN0aXZlXG4gICAqXG4gICAqIEBwYXJhbSB0YWIgdGFiIHRvIGNsaWNrIGlmIG5lZWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBjbGlja1RhYklmSW5hY3RpdmUodGFiOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgICF0YWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSB8fFxuICAgICAgdGFiLmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlZCcpXG4gICAgKSB7XG4gICAgICB0YWIuY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFRhYiBieSBsYWJlbCBpZiBleGlzdHMgb24gcGFnZVxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWwgbGFiZWwgb2Ygc2VhcmNoZWQgdGFiXG4gICAqIEBwYXJhbSB0YWJzQ29tcG9uZW50IGNvbXBvbmVudCBjb250YWluaW5nIHRhYnNcbiAgICovXG4gIHByaXZhdGUgZ2V0VGFiQnlMYWJlbChcbiAgICBsYWJlbDogc3RyaW5nLFxuICAgIHRhYnNDb21wb25lbnQ6IEhUTUxFbGVtZW50XG4gICk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICAvLyBOT1RFOiBSZWFkcyB0aHJvdWdoIGJ1dHRvbiB0YWdzIHRvIGNsaWNrIG9uIGNvcnJlY3QgdGFiXG4gICAgLy8gVGhlcmUgbWF5IGJlIGEgYmV0dGVyIHdheSBvZiBkb2luZyB0aGlzIG5vdy9hZnRlciByZWZhY3RvclxuICAgIGNvbnN0IHRhYkVsZW1lbnRzOiBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PiA9XG4gICAgICB0YWJzQ29tcG9uZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdidXR0b24nKTtcblxuICAgIC8vIExvb2sgdGhyb3VnaCBidXR0b24gdGFiIGVsZW1lbnRzIHVudGlsIGZpbmRpbmcgdGFiIHdpdGggbGFiZWxcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0YWJFbGVtZW50cykuZmluZCgoYnV0dG9uRWxlbWVudCkgPT5cbiAgICAgIGJ1dHRvbkVsZW1lbnQuaW5uZXJIVE1MLmluY2x1ZGVzKGxhYmVsKVxuICAgICk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJwcm9kdWN0JCB8IGFzeW5jIGFzIHByb2R1Y3RcIj5cbiAgPGRpdiBjbGFzcz1cInJhdGluZ1wiICpuZ0lmPVwicHJvZHVjdD8uYXZlcmFnZVJhdGluZ1wiPlxuICAgIDxjeC1zdGFyLXJhdGluZyBbcmF0aW5nXT1cInByb2R1Y3Q/LmF2ZXJhZ2VSYXRpbmcgPz8gMFwiPjwvY3gtc3Rhci1yYXRpbmc+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY291bnRcIj4oe3sgcHJvZHVjdD8ubnVtYmVyT2ZSZXZpZXdzIH19KTwvZGl2PlxuXG4gICAgPGJ1dHRvblxuICAgICAgKm5nSWY9XCJhcmVSZXZpZXdzQXZhaWxhYmxlJCB8IGFzeW5jXCJcbiAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rIGN4LWFjdGlvbi1saW5rXCJcbiAgICAgIChjbGljayk9XCJzaG93UmV2aWV3cygpXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICdwcm9kdWN0U3VtbWFyeS5zaG93UmV2aWV3c0RldGFpbGVkJ1xuICAgICAgICAgIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgIHJhdGluZzogcHJvZHVjdD8uYXZlcmFnZVJhdGluZyB8IG51bWJlcjogJzEuMC0xJyxcbiAgICAgICAgICAgICAgICBjb3VudDogcHJvZHVjdD8ubnVtYmVyT2ZSZXZpZXdzXG4gICAgICAgICAgICAgIH1cbiAgICAgIFwiXG4gICAgPlxuICAgICAge3sgJ3Byb2R1Y3RTdW1tYXJ5LnNob3dSZXZpZXdzJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwicmF0aW5nXCIgKm5nSWY9XCIhcHJvZHVjdD8uYXZlcmFnZVJhdGluZ1wiPlxuICAgIHt7ICdwcm9kdWN0RGV0YWlscy5ub1Jldmlld3MnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2RlXCI+XG4gICAge3sgJ3Byb2R1Y3RTdW1tYXJ5LmlkJyB8IGN4VHJhbnNsYXRlIH19IHt7IHByb2R1Y3Q/LmNvZGUgfX1cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==