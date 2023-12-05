import { CmsBannerCarouselComponent as model, CmsService, ContentSlotComponentData } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/index';
import * as i0 from "@angular/core";
/**
 * Generic carousel that renders CMS Components.
 */
export declare class BannerCarouselComponent {
    private componentData;
    private cmsService;
    private componentData$;
    private items$;
    /**
     * Adds a specific theme for the carousel. The effect can be
     * used in CSS customisations.
     */
    theme: string;
    constructor(componentData: CmsComponentData<model>, cmsService: CmsService);
    /**
     * Returns an Obervable with an Array of Observables. This is done, so that
     * the component UI could consider to lazy load the UI components when they're
     * in the viewpoint.
     */
    getItems(): Observable<Observable<ContentSlotComponentData>[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BannerCarouselComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BannerCarouselComponent, "cx-banner-carousel", never, {}, {}, never, never, false, never>;
}
