import { AutoFocusService } from '../autofocus/auto-focus.service';
import { MOVE_FOCUS, TabFocusConfig } from '../keyboard-focus.model';
import * as i0 from "@angular/core";
export declare class TabFocusService extends AutoFocusService {
    /**
     * Moves to the next (or previous) tab.
     */
    moveTab(host: HTMLElement, config: TabFocusConfig, increment: MOVE_FOCUS, event: KeyboardEvent): void;
    /**
     * builds out virtual slides out of the full scrollable area, to allow
     * for maximum flexibility for the underlying layout without using hardcoded
     * slide sizes.
     */
    protected findNextScrollable(host: HTMLElement, config: TabFocusConfig, increment: MOVE_FOCUS): HTMLElement | undefined;
    protected findNext(host: HTMLElement, config: TabFocusConfig, increment: MOVE_FOCUS): HTMLElement | undefined;
    /**
     * Returns the active focusable child element. If there's no active
     * focusable child element, the first focusable child is returned.
     */
    protected getActiveChild(host: HTMLElement, config: TabFocusConfig): HTMLElement;
    protected getChildren(host: HTMLElement, config: TabFocusConfig): HTMLElement[];
    /**
     * Returns all focusable child elements of the host element.
     *
     * @param host The host element is used to query child focusable elements.
     * @param locked Indicates if locked elements (tabindex=-1) should be returned, defaults to false.
     * @param invisible Indicates if invisible child elements should be returned, defaults to false.
     */
    findFocusable(host: HTMLElement, locked?: boolean, invisible?: boolean): HTMLElement[];
    protected isActive(el: HTMLElement): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabFocusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TabFocusService>;
}
