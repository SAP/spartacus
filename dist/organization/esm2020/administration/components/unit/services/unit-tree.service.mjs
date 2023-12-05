/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TREE_TOGGLE } from './unit-tree.model';
import * as i0 from "@angular/core";
/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
export class UnitTreeService {
    constructor() {
        /**
         * Indicates the minimum number of (initial) expanded units.
         */
        this.minimalExpanded = 1;
        this.globalToggle$ = new BehaviorSubject(undefined);
        this.treeToggle$ = new BehaviorSubject(new Map());
    }
    /**
     * Initializes the unit tree with an active unit.
     *
     * The active unit will be collapsed.
     */
    initialize(root, activeUnitId) {
        if (activeUnitId) {
            this.expandUntilActiveNode(root, activeUnitId);
        }
    }
    /**
     * Sets the global toggle state to _collapsed_ and clears the toggle state
     * for individual units.
     */
    collapseAll() {
        this.globalToggle$.next(TREE_TOGGLE.COLLAPSED);
        this.treeToggle$.next(new Map());
    }
    /**
     * Sets the global toggle state to _expanded_ and clears the toggle state
     * for individual units.
     */
    expandAll() {
        this.globalToggle$.next(TREE_TOGGLE.EXPANDED);
        this.treeToggle$.next(new Map());
    }
    /**
     * Indicates whether the give unit is expanded.
     *
     * The returned (boolean) expand state is driven by the global toggle
     * state (expand / collapse all) and the toggle state for individual units.
     * There's also the `minimalExpanded` taken into consideration.
     */
    isExpanded(unitId, level) {
        const toggleState = this.treeToggle$.value?.get(unitId);
        if (this.globalToggle$.value === TREE_TOGGLE.COLLAPSED &&
            toggleState !== TREE_TOGGLE.EXPANDED) {
            return false;
        }
        return (
        // the current node is expanded
        toggleState === TREE_TOGGLE.EXPANDED ||
            // the node is not collapsed, but globally expanded ("expand all") or above
            // the minimum visible nodes
            ((this.globalToggle$.value === TREE_TOGGLE.EXPANDED ||
                level < this.minimalExpanded) &&
                toggleState !== TREE_TOGGLE.COLLAPSED));
    }
    toggle(unit) {
        const currentState = this.treeToggle$.value;
        currentState.set(unit.id ?? '', this.isExpanded(unit.id ?? '', unit.depthLevel)
            ? TREE_TOGGLE.COLLAPSED
            : TREE_TOGGLE.EXPANDED);
        this.treeToggle$.next(currentState);
    }
    /**
     * Expands all tree nodes till the active unit, to ensure that the
     * full tree is collapsed till the active item.
     *
     * This is useful while navigating the tree by the router.
     */
    expandUntilActiveNode(node, activeUnitId) {
        const hasActiveChild = (n, id) => !!n.children?.find((child) => child.id === id || hasActiveChild(child, id));
        const findInvolvedTreeNodes = (n, activeItems = []) => {
            if (hasActiveChild(n, activeUnitId)) {
                activeItems.push(n.id ?? '');
            }
            n.children?.forEach((child) => {
                findInvolvedTreeNodes(child, activeItems);
            });
            return activeItems;
        };
        const m = this.treeToggle$.value;
        findInvolvedTreeNodes(node).forEach((activeId) => {
            if (m.get(activeId) !== TREE_TOGGLE.EXPANDED) {
                m.set(activeId, TREE_TOGGLE.EXPANDED);
            }
        });
        if (m !== this.treeToggle$.value) {
            this.treeToggle$.next(m);
        }
    }
}
UnitTreeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UnitTreeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitTreeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitTreeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC10cmVlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9zZXJ2aWNlcy91bml0LXRyZWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFaEQ7OztHQUdHO0FBSUgsTUFBTSxPQUFPLGVBQWU7SUFINUI7UUFJRTs7V0FFRztRQUNPLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQzNDLFNBQVMsQ0FDVixDQUFDO1FBRUYsZ0JBQVcsR0FBOEMsSUFBSSxlQUFlLENBQzFFLElBQUksR0FBRyxFQUFFLENBQ1YsQ0FBQztLQXlHSDtJQXZHQzs7OztPQUlHO0lBQ0gsVUFBVSxDQUFDLElBQWlCLEVBQUUsWUFBb0I7UUFDaEQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FB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QUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7NEdBcEhVLGVBQWU7Z0hBQWYsZUFBZSxjQUZkLE1BQU07MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCMkJVbml0Tm9kZSxcbiAgQjJCVW5pdFRyZWVOb2RlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVFJFRV9UT0dHTEUgfSBmcm9tICcuL3VuaXQtdHJlZS5tb2RlbCc7XG5cbi8qKlxuICogU2VydmljZSB0byBwb3B1bGF0ZSBVbml0IGRhdGEgdG8gYFRhYmxlYCBkYXRhLiBVbml0XG4gKiBkYXRhIGlzIGRyaXZlbiBieSB0aGUgdGFibGUgY29uZmlndXJhdGlvbiwgdXNpbmcgdGhlIGBPcmdhbml6YXRpb25UYWJsZXMuVU5JVGAuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0VHJlZVNlcnZpY2Uge1xuICAvKipcbiAgICogSW5kaWNhdGVzIHRoZSBtaW5pbXVtIG51bWJlciBvZiAoaW5pdGlhbCkgZXhwYW5kZWQgdW5pdHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgbWluaW1hbEV4cGFuZGVkID0gMTtcblxuICBwcm90ZWN0ZWQgZ2xvYmFsVG9nZ2xlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFJFRV9UT0dHTEUgfCB1bmRlZmluZWQ+KFxuICAgIHVuZGVmaW5lZFxuICApO1xuXG4gIHRyZWVUb2dnbGUkOiBCZWhhdmlvclN1YmplY3Q8TWFwPHN0cmluZywgVFJFRV9UT0dHTEU+PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXG4gICAgbmV3IE1hcCgpXG4gICk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSB1bml0IHRyZWUgd2l0aCBhbiBhY3RpdmUgdW5pdC5cbiAgICpcbiAgICogVGhlIGFjdGl2ZSB1bml0IHdpbGwgYmUgY29sbGFwc2VkLlxuICAgKi9cbiAgaW5pdGlhbGl6ZShyb290OiBCMkJVbml0Tm9kZSwgYWN0aXZlVW5pdElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoYWN0aXZlVW5pdElkKSB7XG4gICAgICB0aGlzLmV4cGFuZFVudGlsQWN0aXZlTm9kZShyb290LCBhY3RpdmVVbml0SWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBnbG9iYWwgdG9nZ2xlIHN0YXRlIHRvIF9jb2xsYXBzZWRfIGFuZCBjbGVhcnMgdGhlIHRvZ2dsZSBzdGF0ZVxuICAgKiBmb3IgaW5kaXZpZHVhbCB1bml0cy5cbiAgICovXG4gIGNvbGxhcHNlQWxsKCkge1xuICAgIHRoaXMuZ2xvYmFsVG9nZ2xlJC5uZXh0KFRSRUVfVE9HR0xFLkNPTExBUFNFRCk7XG4gICAgdGhpcy50cmVlVG9nZ2xlJC5uZXh0KG5ldyBNYXAoKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZ2xvYmFsIHRvZ2dsZSBzdGF0ZSB0byBfZXhwYW5kZWRfIGFuZCBjbGVhcnMgdGhlIHRvZ2dsZSBzdGF0ZVxuICAgKiBmb3IgaW5kaXZpZHVhbCB1bml0cy5cbiAgICovXG4gIGV4cGFuZEFsbCgpIHtcbiAgICB0aGlzLmdsb2JhbFRvZ2dsZSQubmV4dChUUkVFX1RPR0dMRS5FWFBBTkRFRCk7XG4gICAgdGhpcy50cmVlVG9nZ2xlJC5uZXh0KG5ldyBNYXAoKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmUgdW5pdCBpcyBleHBhbmRlZC5cbiAgICpcbiAgICogVGhlIHJldHVybmVkIChib29sZWFuKSBleHBhbmQgc3RhdGUgaXMgZHJpdmVuIGJ5IHRoZSBnbG9iYWwgdG9nZ2xlXG4gICAqIHN0YXRlIChleHBhbmQgLyBjb2xsYXBzZSBhbGwpIGFuZCB0aGUgdG9nZ2xlIHN0YXRlIGZvciBpbmRpdmlkdWFsIHVuaXRzLlxuICAgKiBUaGVyZSdzIGFsc28gdGhlIGBtaW5pbWFsRXhwYW5kZWRgIHRha2VuIGludG8gY29uc2lkZXJhdGlvbi5cbiAgICovXG4gIGlzRXhwYW5kZWQodW5pdElkOiBzdHJpbmcsIGxldmVsOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB0b2dnbGVTdGF0ZSA9IHRoaXMudHJlZVRvZ2dsZSQudmFsdWU/LmdldCh1bml0SWQpO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5nbG9iYWxUb2dnbGUkLnZhbHVlID09PSBUUkVFX1RPR0dMRS5DT0xMQVBTRUQgJiZcbiAgICAgIHRvZ2dsZVN0YXRlICE9PSBUUkVFX1RPR0dMRS5FWFBBTkRFRFxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAvLyB0aGUgY3VycmVudCBub2RlIGlzIGV4cGFuZGVkXG4gICAgICB0b2dnbGVTdGF0ZSA9PT0gVFJFRV9UT0dHTEUuRVhQQU5ERUQgfHxcbiAgICAgIC8vIHRoZSBub2RlIGlzIG5vdCBjb2xsYXBzZWQsIGJ1dCBnbG9iYWxseSBleHBhbmRlZCAoXCJleHBhbmQgYWxsXCIpIG9yIGFib3ZlXG4gICAgICAvLyB0aGUgbWluaW11bSB2aXNpYmxlIG5vZGVzXG4gICAgICAoKHRoaXMuZ2xvYmFsVG9nZ2xlJC52YWx1ZSA9PT0gVFJFRV9UT0dHTEUuRVhQQU5ERUQgfHxcbiAgICAgICAgbGV2ZWwgPCB0aGlzLm1pbmltYWxFeHBhbmRlZCkgJiZcbiAgICAgICAgdG9nZ2xlU3RhdGUgIT09IFRSRUVfVE9HR0xFLkNPTExBUFNFRClcbiAgICApO1xuICB9XG5cbiAgdG9nZ2xlKHVuaXQ6IEIyQlVuaXRUcmVlTm9kZSkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMudHJlZVRvZ2dsZSQudmFsdWU7XG4gICAgY3VycmVudFN0YXRlLnNldChcbiAgICAgIHVuaXQuaWQgPz8gJycsXG4gICAgICB0aGlzLmlzRXhwYW5kZWQodW5pdC5pZCA/PyAnJywgdW5pdC5kZXB0aExldmVsKVxuICAgICAgICA/IFRSRUVfVE9HR0xFLkNPTExBUFNFRFxuICAgICAgICA6IFRSRUVfVE9HR0xFLkVYUEFOREVEXG4gICAgKTtcbiAgICB0aGlzLnRyZWVUb2dnbGUkLm5leHQoY3VycmVudFN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGFsbCB0cmVlIG5vZGVzIHRpbGwgdGhlIGFjdGl2ZSB1bml0LCB0byBlbnN1cmUgdGhhdCB0aGVcbiAgICogZnVsbCB0cmVlIGlzIGNvbGxhcHNlZCB0aWxsIHRoZSBhY3RpdmUgaXRlbS5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWwgd2hpbGUgbmF2aWdhdGluZyB0aGUgdHJlZSBieSB0aGUgcm91dGVyLlxuICAgKi9cbiAgcHJvdGVjdGVkIGV4cGFuZFVudGlsQWN0aXZlTm9kZShub2RlOiBCMkJVbml0Tm9kZSwgYWN0aXZlVW5pdElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBoYXNBY3RpdmVDaGlsZCA9IChuOiBCMkJVbml0Tm9kZSwgaWQ6IHN0cmluZyk6IGJvb2xlYW4gPT5cbiAgICAgICEhbi5jaGlsZHJlbj8uZmluZChcbiAgICAgICAgKGNoaWxkKSA9PiBjaGlsZC5pZCA9PT0gaWQgfHwgaGFzQWN0aXZlQ2hpbGQoY2hpbGQsIGlkKVxuICAgICAgKTtcblxuICAgIGNvbnN0IGZpbmRJbnZvbHZlZFRyZWVOb2RlcyA9IChcbiAgICAgIG46IEIyQlVuaXROb2RlLFxuICAgICAgYWN0aXZlSXRlbXM6IHN0cmluZ1tdID0gW11cbiAgICApOiBzdHJpbmdbXSA9PiB7XG4gICAgICBpZiAoaGFzQWN0aXZlQ2hpbGQobiwgYWN0aXZlVW5pdElkKSkge1xuICAgICAgICBhY3RpdmVJdGVtcy5wdXNoKG4uaWQgPz8gJycpO1xuICAgICAgfVxuICAgICAgbi5jaGlsZHJlbj8uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgZmluZEludm9sdmVkVHJlZU5vZGVzKGNoaWxkLCBhY3RpdmVJdGVtcyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhY3RpdmVJdGVtcztcbiAgICB9O1xuXG4gICAgY29uc3QgbSA9IHRoaXMudHJlZVRvZ2dsZSQudmFsdWU7XG4gICAgZmluZEludm9sdmVkVHJlZU5vZGVzKG5vZGUpLmZvckVhY2goKGFjdGl2ZUlkKSA9PiB7XG4gICAgICBpZiAobS5nZXQoYWN0aXZlSWQpICE9PSBUUkVFX1RPR0dMRS5FWFBBTkRFRCkge1xuICAgICAgICBtLnNldChhY3RpdmVJZCwgVFJFRV9UT0dHTEUuRVhQQU5ERUQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChtICE9PSB0aGlzLnRyZWVUb2dnbGUkLnZhbHVlKSB7XG4gICAgICB0aGlzLnRyZWVUb2dnbGUkLm5leHQobSk7XG4gICAgfVxuICB9XG59XG4iXX0=