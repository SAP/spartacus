import { ElementRef, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Generic in-memory paged list component that can be used to render arbitrary items in
 * a vertical orientation.
 * Previous/next buttons as well as indicator-buttons can used to navigate the slides (pages).
 *
 * To allow for flexible rendering of items, the rendering is delegated to the
 * given `template` and `headerTemplate`.
 */
export declare class PagedListComponent implements OnInit {
    protected el: ElementRef;
    /**
     * The title is rendered as the carousel heading.
     */
    title: string;
    /**
     * The items$ represent the carousel items.
     */
    items: Observable<any>[];
    /**
     * The headerTemplate is rendered above the item rows.
     */
    headerTemplate: TemplateRef<any>;
    /**
     * The template is rendered for each item, so that the actual
     * view can be given by the component that uses the `PagedListComponent`.
     */
    template: TemplateRef<any>;
    /**
     * The maximum number of items per slide
     */
    itemsPerSlide: number;
    /**
     * Indicates whether the visual indicators are used.
     */
    hideIndicators: boolean;
    indicatorIcon: ICON_TYPE;
    previousIcon: ICON_TYPE;
    nextIcon: ICON_TYPE;
    activeSlideStartIndex: number;
    activeSlideStartIndexChange: EventEmitter<number>;
    setActiveSlideStartIndex(activeSlideStartIndex: number): void;
    protected logger: LoggerService;
    constructor(el: ElementRef);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PagedListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PagedListComponent, "cx-epd-visualization-paged-list", never, { "title": "title"; "items": "items"; "headerTemplate": "headerTemplate"; "template": "template"; "itemsPerSlide": "itemsPerSlide"; "hideIndicators": "hideIndicators"; "indicatorIcon": "indicatorIcon"; "previousIcon": "previousIcon"; "nextIcon": "nextIcon"; "activeSlideStartIndex": "activeSlideStartIndex"; }, { "activeSlideStartIndexChange": "activeSlideStartIndexChange"; }, never, never, false, never>;
}
