import { OnInit } from '@angular/core';
import { WindowRef, CmsScrollToTopComponent, ScrollBehavior } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { ICON_TYPE } from '../../misc/icon/icon.model';
import { SelectFocusUtility } from '../../../layout/a11y/index';
import * as i0 from "@angular/core";
export declare class ScrollToTopComponent implements OnInit {
    protected winRef: WindowRef;
    protected componentData: CmsComponentData<CmsScrollToTopComponent>;
    protected selectFocusUtility: SelectFocusUtility;
    iconTypes: typeof ICON_TYPE;
    display: boolean | undefined;
    protected window: Window | undefined;
    protected scrollBehavior: ScrollBehavior;
    protected displayThreshold: number;
    onScroll(): void;
    constructor(winRef: WindowRef, componentData: CmsComponentData<CmsScrollToTopComponent>, selectFocusUtility: SelectFocusUtility);
    ngOnInit(): void;
    protected setConfig(): void;
    /**
     * Scroll back to the top of the page and set focus on top most focusable element.
     */
    scrollToTop(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollToTopComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScrollToTopComponent, "cx-scroll-to-top", never, {}, {}, never, never, false, never>;
}
