import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { SplitViewService } from '../split-view.service';
import * as i0 from "@angular/core";
/**
 * The split-view component supports an unlimited number of nested views. The component
 * is a host to those view components and doesn't add any restrictions to it's content;
 * content is projected as-is.
 *
 * ```html
 * <cx-split-view>
 *   <cx-view></cx-view>
 *   <cx-view></cx-view>
 *   <any-wrapper>
 *     <cx-view></cx-view>
 *   </any-wrapper>
 * </cx-split-view>
 * ```
 *
 * The split view component is only concerned with tracking the underlying _visible_
 * view components, so that the `lastVisibleView` can be updated accordingly. The actual
 * visibility of views is controlled by CSS. To allow for maximum flexibility, the CSS
 * implementation is using CSS variables. The `lastVisibleView` is bind to the
 * `--cx-active-view` on the host, so that all descendants views will inherit the
 * property conveniently.
 */
export declare class SplitViewComponent implements OnInit, OnDestroy {
    protected splitService: SplitViewService;
    protected breakpointService: BreakpointService;
    protected elementRef: ElementRef;
    private subscription;
    /**
     * Sets the default hide mode for views. This mode is useful in case views are dynamically being created,
     * for example when they are created by router components.
     *
     * The mode defaults to true, unless this is the first view; the first view is never hidden.
     */
    set hideMode(mode: boolean);
    /**
     * Indicates the last visible view in the range of views that is visible. This
     * is bind to a css variable `--cx-active-view` so that the experience
     * can be fully controlled by css.
     */
    lastVisibleView: number;
    constructor(splitService: SplitViewService, breakpointService: BreakpointService, elementRef: ElementRef);
    ngOnInit(): void;
    /**
     * Returns the maximum number of views per split-view. The number is based on the
     * CSS custom property `--cx-max-views`.
     */
    protected get splitViewCount(): number;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SplitViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SplitViewComponent, "cx-split-view", never, { "hideMode": "hideMode"; }, {}, never, ["*"], false, never>;
}
