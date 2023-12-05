/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ConfiguratorGroupMenuService {
    constructor(windowRef) {
        this.windowRef = windowRef;
    }
    /**
     * Retrieves the focused group index.
     *
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @returns {number | undefined} - focused group index
     * @protected
     */
    getFocusedGroupIndex(groups) {
        if (groups) {
            const group = groups.find((groupHTMLEl) => groupHTMLEl.nativeElement?.id ===
                this.windowRef?.document?.activeElement?.id);
            if (group) {
                return groups.toArray().indexOf(group);
            }
        }
        return undefined;
    }
    /**
     * Updates the current group index, if the current group index is not equal focused group index.
     * Otherwise the current group index stays unchanged.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {number} focusedGroupIndex - Focused group index
     * @returns {number} - updated group index
     * @protected
     */
    updateCurrentGroupIndex(currentGroupIndex, focusedGroupIndex) {
        if (focusedGroupIndex) {
            return focusedGroupIndex !== currentGroupIndex
                ? focusedGroupIndex
                : currentGroupIndex;
        }
        return currentGroupIndex;
    }
    /**
     * Focuses the next group.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @protected
     */
    focusNextGroup(currentGroupIndex, groups) {
        const focusedGroupIndex = this.getFocusedGroupIndex(groups);
        currentGroupIndex = this.updateCurrentGroupIndex(currentGroupIndex, focusedGroupIndex);
        if (groups) {
            if (currentGroupIndex === groups.length - 1) {
                groups.first?.nativeElement?.focus();
            }
            else {
                groups.toArray()[currentGroupIndex + 1]?.nativeElement.focus();
            }
        }
    }
    /**
     * Focuses the previous group.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @protected
     */
    focusPreviousGroup(currentGroupIndex, groups) {
        const focusedGroupIndex = this.getFocusedGroupIndex(groups);
        currentGroupIndex = this.updateCurrentGroupIndex(currentGroupIndex, focusedGroupIndex);
        if (groups) {
            if (currentGroupIndex === 0) {
                groups.last?.nativeElement?.focus();
            }
            else {
                groups.toArray()[currentGroupIndex - 1]?.nativeElement?.focus();
            }
        }
    }
    /**
     * Switches the group on pressing an arrow key.
     *
     * @param {KeyboardEvent} event - keyboard event
     * @param {number} groupIndex - Group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     */
    switchGroupOnArrowPress(event, groupIndex, groups) {
        event.preventDefault();
        if (event.code === 'ArrowUp') {
            this.focusPreviousGroup(groupIndex, groups);
        }
        else if (event.code === 'ArrowDown') {
            this.focusNextGroup(groupIndex, groups);
        }
    }
    /**
     * Verifies whether the first group in the group list is `Back` button.
     *
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @returns {boolean} - returns `true` if the first group in the group list is `Back` button, otherwise `false`
     */
    isBackBtnFocused(groups) {
        if (groups) {
            return (groups.first?.nativeElement?.classList?.value?.indexOf('cx-menu-back') !== -1 &&
                this.windowRef?.document?.activeElement === groups.first?.nativeElement);
        }
        return undefined;
    }
}
ConfiguratorGroupMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuService, deps: [{ token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3VwLW1lbnUuY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvZ3JvdXAtbWVudS9jb25maWd1cmF0b3ItZ3JvdXAtbWVudS5jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFjLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQzs7O0FBSWxFLE1BQU0sT0FBTyw0QkFBNEI7SUFDdkMsWUFBc0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztJQUFHLENBQUM7SUFFOUM7Ozs7OztPQU1HO0lBQ08sb0JBQW9CLENBQzVCLE1BQTBDO1FBRTFDLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDdkIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUNkLFdBQVcsQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQUUsQ0FDOUMsQ0FBQztZQUNGLElBQUksS0FBSyxFQUFFO2dCQUNULE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QztTQUNGO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ08sdUJBQXVCLENBQy9CLGlCQUF5QixFQUN6QixpQkFBMEI7UUFFMUIsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixPQUFPLGlCQUFpQixLQUFLLGlCQUFpQjtnQkFDNUMsQ0FBQyxDQUFDLGlCQUFpQjtnQkFDbkIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sY0FBYyxDQUN0QixpQkFBeUIsRUFDekIsTUFBMEM7UUFFMUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUM5QyxpQkFBaUIsRUFDakIsaUJBQWlCLENBQ2xCLENBQUM7UUFFRixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksaUJBQWlCLEtBQUssTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEU7U0FDRjtJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxrQkFBa0IsQ0FDMUIsaUJBQXlCLEVBQ3pCLE1BQTBDO1FBRTFDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELGlCQUFpQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FDOUMsaUJBQWlCLEVBQ2pCLGlCQUFpQixDQUNsQixDQUFDO1FBRUYsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLGlCQUFpQixLQUFLLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDckM7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUNqRTtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILHVCQUF1QixDQUNyQixLQUFvQixFQUNwQixVQUFrQixFQUNsQixNQUEwQztRQUUxQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzdDO2FBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGdCQUFnQixDQUNkLE1BQTBDO1FBRTFDLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxDQUNMLE1BQU0sQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUNwRCxjQUFjLENBQ2YsS0FBSyxDQUFDLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxLQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUN4RSxDQUFDO1NBQ0g7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOzt5SEF6SVUsNEJBQTRCOzZIQUE1Qiw0QkFBNEIsY0FEZixNQUFNOzJGQUNuQiw0QkFBNEI7a0JBRHhDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckdyb3VwTWVudVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgd2luZG93UmVmOiBXaW5kb3dSZWYpIHt9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgZm9jdXNlZCBncm91cCBpbmRleC5cbiAgICpcbiAgICogQHBhcmFtIHtRdWVyeUxpc3Q8RWxlbWVudFJlZjxIVE1MRWxlbWVudD4+fSBncm91cHMgLSBMaXN0IG9mIHRoZSBncm91cHNcbiAgICogQHJldHVybnMge251bWJlciB8IHVuZGVmaW5lZH0gLSBmb2N1c2VkIGdyb3VwIGluZGV4XG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBnZXRGb2N1c2VkR3JvdXBJbmRleChcbiAgICBncm91cHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj5cbiAgKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICBjb25zdCBncm91cCA9IGdyb3Vwcy5maW5kKFxuICAgICAgICAoZ3JvdXBIVE1MRWwpID0+XG4gICAgICAgICAgZ3JvdXBIVE1MRWwubmF0aXZlRWxlbWVudD8uaWQgPT09XG4gICAgICAgICAgdGhpcy53aW5kb3dSZWY/LmRvY3VtZW50Py5hY3RpdmVFbGVtZW50Py5pZFxuICAgICAgKTtcbiAgICAgIGlmIChncm91cCkge1xuICAgICAgICByZXR1cm4gZ3JvdXBzLnRvQXJyYXkoKS5pbmRleE9mKGdyb3VwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjdXJyZW50IGdyb3VwIGluZGV4LCBpZiB0aGUgY3VycmVudCBncm91cCBpbmRleCBpcyBub3QgZXF1YWwgZm9jdXNlZCBncm91cCBpbmRleC5cbiAgICogT3RoZXJ3aXNlIHRoZSBjdXJyZW50IGdyb3VwIGluZGV4IHN0YXlzIHVuY2hhbmdlZC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnJlbnRHcm91cEluZGV4IC0gQ3VycmVudCBncm91cCBpbmRleFxuICAgKiBAcGFyYW0ge251bWJlcn0gZm9jdXNlZEdyb3VwSW5kZXggLSBGb2N1c2VkIGdyb3VwIGluZGV4XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gdXBkYXRlZCBncm91cCBpbmRleFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgdXBkYXRlQ3VycmVudEdyb3VwSW5kZXgoXG4gICAgY3VycmVudEdyb3VwSW5kZXg6IG51bWJlcixcbiAgICBmb2N1c2VkR3JvdXBJbmRleD86IG51bWJlclxuICApOiBudW1iZXIge1xuICAgIGlmIChmb2N1c2VkR3JvdXBJbmRleCkge1xuICAgICAgcmV0dXJuIGZvY3VzZWRHcm91cEluZGV4ICE9PSBjdXJyZW50R3JvdXBJbmRleFxuICAgICAgICA/IGZvY3VzZWRHcm91cEluZGV4XG4gICAgICAgIDogY3VycmVudEdyb3VwSW5kZXg7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50R3JvdXBJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBuZXh0IGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gY3VycmVudEdyb3VwSW5kZXggLSBDdXJyZW50IGdyb3VwIGluZGV4XG4gICAqIEBwYXJhbSB7UXVlcnlMaXN0PEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+Pn0gZ3JvdXBzIC0gTGlzdCBvZiB0aGUgZ3JvdXBzXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBmb2N1c05leHRHcm91cChcbiAgICBjdXJyZW50R3JvdXBJbmRleDogbnVtYmVyLFxuICAgIGdyb3VwczogUXVlcnlMaXN0PEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+PlxuICApOiB2b2lkIHtcbiAgICBjb25zdCBmb2N1c2VkR3JvdXBJbmRleCA9IHRoaXMuZ2V0Rm9jdXNlZEdyb3VwSW5kZXgoZ3JvdXBzKTtcbiAgICBjdXJyZW50R3JvdXBJbmRleCA9IHRoaXMudXBkYXRlQ3VycmVudEdyb3VwSW5kZXgoXG4gICAgICBjdXJyZW50R3JvdXBJbmRleCxcbiAgICAgIGZvY3VzZWRHcm91cEluZGV4XG4gICAgKTtcblxuICAgIGlmIChncm91cHMpIHtcbiAgICAgIGlmIChjdXJyZW50R3JvdXBJbmRleCA9PT0gZ3JvdXBzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgZ3JvdXBzLmZpcnN0Py5uYXRpdmVFbGVtZW50Py5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBzLnRvQXJyYXkoKVtjdXJyZW50R3JvdXBJbmRleCArIDFdPy5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIHByZXZpb3VzIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gY3VycmVudEdyb3VwSW5kZXggLSBDdXJyZW50IGdyb3VwIGluZGV4XG4gICAqIEBwYXJhbSB7UXVlcnlMaXN0PEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+Pn0gZ3JvdXBzIC0gTGlzdCBvZiB0aGUgZ3JvdXBzXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBmb2N1c1ByZXZpb3VzR3JvdXAoXG4gICAgY3VycmVudEdyb3VwSW5kZXg6IG51bWJlcixcbiAgICBncm91cHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj5cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZm9jdXNlZEdyb3VwSW5kZXggPSB0aGlzLmdldEZvY3VzZWRHcm91cEluZGV4KGdyb3Vwcyk7XG4gICAgY3VycmVudEdyb3VwSW5kZXggPSB0aGlzLnVwZGF0ZUN1cnJlbnRHcm91cEluZGV4KFxuICAgICAgY3VycmVudEdyb3VwSW5kZXgsXG4gICAgICBmb2N1c2VkR3JvdXBJbmRleFxuICAgICk7XG5cbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICBpZiAoY3VycmVudEdyb3VwSW5kZXggPT09IDApIHtcbiAgICAgICAgZ3JvdXBzLmxhc3Q/Lm5hdGl2ZUVsZW1lbnQ/LmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncm91cHMudG9BcnJheSgpW2N1cnJlbnRHcm91cEluZGV4IC0gMV0/Lm5hdGl2ZUVsZW1lbnQ/LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaGVzIHRoZSBncm91cCBvbiBwcmVzc2luZyBhbiBhcnJvdyBrZXkuXG4gICAqXG4gICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBrZXlib2FyZCBldmVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3JvdXBJbmRleCAtIEdyb3VwIGluZGV4XG4gICAqIEBwYXJhbSB7UXVlcnlMaXN0PEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+Pn0gZ3JvdXBzIC0gTGlzdCBvZiB0aGUgZ3JvdXBzXG4gICAqL1xuICBzd2l0Y2hHcm91cE9uQXJyb3dQcmVzcyhcbiAgICBldmVudDogS2V5Ym9hcmRFdmVudCxcbiAgICBncm91cEluZGV4OiBudW1iZXIsXG4gICAgZ3JvdXBzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZjxIVE1MRWxlbWVudD4+XG4gICk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGV2ZW50LmNvZGUgPT09ICdBcnJvd1VwJykge1xuICAgICAgdGhpcy5mb2N1c1ByZXZpb3VzR3JvdXAoZ3JvdXBJbmRleCwgZ3JvdXBzKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICB0aGlzLmZvY3VzTmV4dEdyb3VwKGdyb3VwSW5kZXgsIGdyb3Vwcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGZpcnN0IGdyb3VwIGluIHRoZSBncm91cCBsaXN0IGlzIGBCYWNrYCBidXR0b24uXG4gICAqXG4gICAqIEBwYXJhbSB7UXVlcnlMaXN0PEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+Pn0gZ3JvdXBzIC0gTGlzdCBvZiB0aGUgZ3JvdXBzXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIHJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBncm91cCBpbiB0aGUgZ3JvdXAgbGlzdCBpcyBgQmFja2AgYnV0dG9uLCBvdGhlcndpc2UgYGZhbHNlYFxuICAgKi9cbiAgaXNCYWNrQnRuRm9jdXNlZChcbiAgICBncm91cHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj5cbiAgKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgZ3JvdXBzLmZpcnN0Py5uYXRpdmVFbGVtZW50Py5jbGFzc0xpc3Q/LnZhbHVlPy5pbmRleE9mKFxuICAgICAgICAgICdjeC1tZW51LWJhY2snXG4gICAgICAgICkgIT09IC0xICYmXG4gICAgICAgIHRoaXMud2luZG93UmVmPy5kb2N1bWVudD8uYWN0aXZlRWxlbWVudCA9PT0gZ3JvdXBzLmZpcnN0Py5uYXRpdmVFbGVtZW50XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=