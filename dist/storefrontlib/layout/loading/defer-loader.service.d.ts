import { DeferLoadingStrategy } from '@spartacus/core';
import { Observable } from 'rxjs';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionOptions } from './intersection.model';
import { IntersectionService } from './intersection.service';
import * as i0 from "@angular/core";
/**
 * The defer loading serivce is used to defer loading of DOM elements
 * until the elements are required for the user experience.
 */
export declare class DeferLoaderService {
    private platformId;
    protected config: LayoutConfig;
    protected intersectionService: IntersectionService;
    globalLoadStrategy: DeferLoadingStrategy;
    constructor(platformId: Object, config: LayoutConfig, intersectionService: IntersectionService);
    /**
     * Defer loading till the element intersects the viewport.
     *
     * We evaluate whether we instantly load the element for different reasons:
     * - we run in SSR mode
     * - there's no global strategy given
     * - the global loading strategy is set to INSTANT loading,
     *   and the loading strategy in the given is not set to DEFER
     * - the loading strategy in the given options is set to INSTANT
     */
    load(element: HTMLElement, options?: IntersectionOptions): Observable<boolean>;
    private shouldLoadInstantly;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeferLoaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DeferLoaderService>;
}
