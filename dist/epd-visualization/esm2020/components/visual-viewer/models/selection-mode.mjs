/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Defines the selection behaviour.
 */
export var SelectionMode;
(function (SelectionMode) {
    /**
     * Clicking/tapping in the viewport can select at most one item.
     * Selecting a new item in this way will deselect any pre
     */
    SelectionMode["Exclusive"] = "exclusive";
    /**
     * Clicking/tapping in the viewport will not affect selection.
     */
    SelectionMode["None"] = "none";
    /**
     * A multiple selection mode in which clicking/tapping an item toggles its selection state.
     */
    SelectionMode["Sticky"] = "sticky";
})(SelectionMode || (SelectionMode = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLW1vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXZpZXdlci9tb2RlbHMvc2VsZWN0aW9uLW1vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVIOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksYUFjWDtBQWRELFdBQVksYUFBYTtJQUN2Qjs7O09BR0c7SUFDSCx3Q0FBdUIsQ0FBQTtJQUN2Qjs7T0FFRztJQUNILDhCQUFhLENBQUE7SUFDYjs7T0FFRztJQUNILGtDQUFpQixDQUFBO0FBQ25CLENBQUMsRUFkVyxhQUFhLEtBQWIsYUFBYSxRQWN4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbi8qKlxuICogRGVmaW5lcyB0aGUgc2VsZWN0aW9uIGJlaGF2aW91ci5cbiAqL1xuZXhwb3J0IGVudW0gU2VsZWN0aW9uTW9kZSB7XG4gIC8qKlxuICAgKiBDbGlja2luZy90YXBwaW5nIGluIHRoZSB2aWV3cG9ydCBjYW4gc2VsZWN0IGF0IG1vc3Qgb25lIGl0ZW0uXG4gICAqIFNlbGVjdGluZyBhIG5ldyBpdGVtIGluIHRoaXMgd2F5IHdpbGwgZGVzZWxlY3QgYW55IHByZVxuICAgKi9cbiAgRXhjbHVzaXZlID0gJ2V4Y2x1c2l2ZScsXG4gIC8qKlxuICAgKiBDbGlja2luZy90YXBwaW5nIGluIHRoZSB2aWV3cG9ydCB3aWxsIG5vdCBhZmZlY3Qgc2VsZWN0aW9uLlxuICAgKi9cbiAgTm9uZSA9ICdub25lJyxcbiAgLyoqXG4gICAqIEEgbXVsdGlwbGUgc2VsZWN0aW9uIG1vZGUgaW4gd2hpY2ggY2xpY2tpbmcvdGFwcGluZyBhbiBpdGVtIHRvZ2dsZXMgaXRzIHNlbGVjdGlvbiBzdGF0ZS5cbiAgICovXG4gIFN0aWNreSA9ICdzdGlja3knLFxufVxuIl19