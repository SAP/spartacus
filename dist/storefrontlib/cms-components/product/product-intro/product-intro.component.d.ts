import { EventService, Product, TranslationService, WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import * as i0 from "@angular/core";
export declare class ProductIntroComponent {
    protected currentProductService: CurrentProductService;
    protected translationService: TranslationService;
    protected winRef: WindowRef;
    protected eventService: EventService;
    product$: Observable<Product | null>;
    /**
     * Observable that checks the reviews component availability on the page.
     */
    areReviewsAvailable$: Observable<boolean>;
    protected reviewsComponentId: string;
    protected reviewsTranslationKey: string;
    constructor(currentProductService: CurrentProductService, translationService: TranslationService, winRef: WindowRef, eventService: EventService);
    /**
     * Scroll to views component on page and click "Reviews" tab
     */
    showReviews(): void;
    /**
     * Get Reviews Component if exists on page
     */
    protected getReviewsComponent(): HTMLElement | null;
    /**
     * Get Tabs Component if exists on page
     */
    private getTabsComponent;
    /**
     * Click to activate tab if not already active
     *
     * @param tab tab to click if needed
     */
    private clickTabIfInactive;
    /**
     * Get Tab by label if exists on page
     *
     * @param label label of searched tab
     * @param tabsComponent component containing tabs
     */
    private getTabByLabel;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductIntroComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductIntroComponent, "cx-product-intro", never, {}, {}, never, never, false, never>;
}
