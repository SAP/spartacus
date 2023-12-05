import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CmsService, ContentSlotComponentData, ContentSlotData, DynamicAttributeService } from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IntersectionOptions } from '../../../layout/loading/intersection.model';
import { PageSlotService } from './page-slot.service';
import * as i0 from "@angular/core";
/**
 * The `PageSlotComponent` is used to render the CMS page slot and it's components.
 *
 * The Page slot host element will be supplemented with css classes so that the layout
 * can be fully controlled by customers:
 * - The page slot _position_ is added as a css class by default.
 * - The `cx-pending` is added for as long as the slot hasn't start loading.
 * - The `page-fold` style class is added for the page slot which is configured as the page fold.
 */
export declare class PageSlotComponent implements OnInit, OnDestroy {
    protected cmsService: CmsService;
    protected dynamicAttributeService: DynamicAttributeService;
    protected renderer: Renderer2;
    protected elementRef: ElementRef;
    protected cd: ChangeDetectorRef;
    protected pageSlotService: PageSlotService;
    /**
     * The position represents the unique key for a page slot on a single page, but can
     * be reused cross pages.
     *
     * The position is used to find the CMS components for the page slot. It is also
     * added as an additional CSS class so that layout can be applied.
     */
    set position(value: string | undefined);
    get position(): string | undefined;
    /**
     * Maintains css classes introduced by the host and adds additional classes.
     */
    class: string;
    /**
     * Indicates that the page slot is the last page slot above the fold.
     */
    isPageFold: boolean;
    /**
     * Indicates that the components of the page slot haven't been loaded as long
     * as the isPending state is true.
     */
    isPending: boolean;
    /**
     * Indicates that the page slot doesn't contain any components. This is no
     * longer used in spartacus, but kept for backwards compatibility.
     */
    hasComponents: boolean;
    protected position$: BehaviorSubject<string | undefined>;
    components: ContentSlotComponentData[];
    protected slot$: Observable<ContentSlotData>;
    /** Observes the components for the given page slot. */
    components$: Observable<ContentSlotComponentData[]>;
    protected subscription: Subscription;
    /** Keeps track of the pending components that must be loaded for the page slot */
    private pendingComponentCount;
    /** Tracks the last used position, in case the page slot is used dynamically */
    private lastPosition;
    constructor(cmsService: CmsService, dynamicAttributeService: DynamicAttributeService, renderer: Renderer2, elementRef: ElementRef, cd: ChangeDetectorRef, pageSlotService: PageSlotService);
    ngOnInit(): void;
    protected decorate(slot: ContentSlotData): void;
    /**
     * Sets the pending count for the page slot components. Once all pending components are
     * loaded, the `isPending` flag is updated, so that the associated class can be updated
     */
    protected set pending(count: number);
    protected get pending(): number;
    isLoaded(loadState: boolean): void;
    /**
     * The `DeferLoadingStrategy` indicates whether the component should be
     * rendered instantly or whether it should be deferred.
     */
    getComponentDeferOptions(componentType: string): IntersectionOptions;
    protected isDistinct(old: ContentSlotData, current: ContentSlotData): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PageSlotComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PageSlotComponent, "cx-page-slot,[cx-page-slot]", never, { "position": "position"; "class": "class"; "isPageFold": "isPageFold"; "hasComponents": "hasComponents"; }, {}, never, never, false, never>;
}
