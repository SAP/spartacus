import { ElementRef, QueryList } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ConfiguratorGroupMenuService {
    protected windowRef: WindowRef;
    constructor(windowRef: WindowRef);
    /**
     * Retrieves the focused group index.
     *
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @returns {number | undefined} - focused group index
     * @protected
     */
    protected getFocusedGroupIndex(groups: QueryList<ElementRef<HTMLElement>>): number | undefined;
    /**
     * Updates the current group index, if the current group index is not equal focused group index.
     * Otherwise the current group index stays unchanged.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {number} focusedGroupIndex - Focused group index
     * @returns {number} - updated group index
     * @protected
     */
    protected updateCurrentGroupIndex(currentGroupIndex: number, focusedGroupIndex?: number): number;
    /**
     * Focuses the next group.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @protected
     */
    protected focusNextGroup(currentGroupIndex: number, groups: QueryList<ElementRef<HTMLElement>>): void;
    /**
     * Focuses the previous group.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @protected
     */
    protected focusPreviousGroup(currentGroupIndex: number, groups: QueryList<ElementRef<HTMLElement>>): void;
    /**
     * Switches the group on pressing an arrow key.
     *
     * @param {KeyboardEvent} event - keyboard event
     * @param {number} groupIndex - Group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     */
    switchGroupOnArrowPress(event: KeyboardEvent, groupIndex: number, groups: QueryList<ElementRef<HTMLElement>>): void;
    /**
     * Verifies whether the first group in the group list is `Back` button.
     *
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @returns {boolean} - returns `true` if the first group in the group list is `Back` button, otherwise `false`
     */
    isBackBtnFocused(groups: QueryList<ElementRef<HTMLElement>>): boolean | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorGroupMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorGroupMenuService>;
}
