/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
/**
 * Supposed to be injected in the split view component, so that the split view state
 * is maintained for a single split view.
 */
export class SplitViewService {
    constructor() {
        /**
         * Newly added views are hidden by default, unless it is the first view of the split view.
         * The default hide mode can be overridden.
         */
        this.defaultHideMode = true;
        this.splitViewCount = 1;
        this._views$ = new BehaviorSubject([]);
    }
    /**
     * Adds a view to the list of views. The view is initialized with the `SplitViewState`
     * state. If no state is provided, the state is created with the hidden property. The hidden
     * property is provided by the `defaultHideMode`, unless it's the first view (position: 0).
     */
    add(position, initialState) {
        const state = {
            ...{ hidden: position === 0 ? false : this.defaultHideMode },
            ...initialState,
        };
        if (!this.views[position]) {
            this.views[position] = state;
            this.updateState(position, state.hidden);
            this._views$.next(this.views);
        }
    }
    /**
     * The split view is based on a number of views that can be used next to each other.
     * When the number changes (i.e. if the screen goes from wide to small), the visibility state
     * of the views should be updated.
     */
    updateSplitView(splitViewCount) {
        if (splitViewCount !== this.splitViewCount) {
            this.splitViewCount = splitViewCount;
            this.updateState();
        }
    }
    /**
     * Returns an observable with the active view number. The active view number
     * represents the last visible view.
     */
    getActiveView() {
        return this._views$.pipe(map((views) => this.getActive(views)), distinctUntilChanged());
    }
    /**
     * Returns an observable with the SplitViewState for the given view position.
     */
    getViewState(position) {
        return this._views$.pipe(map((views) => views[position]), 
        // we must filter here, since outlet driven views will destroyed the view
        filter((view) => Boolean(view)));
    }
    /**
     * Removes a view from the list of views.
     *
     * Removing a view is different from hiding a view. Removing a view is typically done
     * when a component is destroyed.
     *
     * When the view is removed, the SplitViewState is updated to reflect that new organization
     * of views.
     */
    remove(position) {
        const activePosition = this.getActive(this.views);
        this._views$.next(this.views.splice(0, position));
        if (activePosition >= position) {
            this.updateState(position);
        }
    }
    /**
     * Returns the next view position. This is useful for views that do not want to be bothered
     * with controlling view numbers.
     */
    get nextPosition() {
        return this.views.length || 0;
    }
    /**
     * Toggles the visibility of the views based on the given view position. If the view
     * is already visible, we close the view and active the former view. Unless the hide flag
     * is used, to force the view.
     *
     * The view state of other views in the split view are updated as well.
     *
     * @param position The zero-based position number of the view.
     * @param forceHide The (optional) hide state for the view position.
     */
    toggle(position, forceHide) {
        // add the view if it hasn't been added before.
        if (!this.views[position]) {
            this.add(position, { hidden: forceHide ?? false });
        }
        // If the position is already visible, we move to a previous position. Only if the hide
        // state is forced, we keep the current position.
        if (this.views[position] &&
            forceHide === undefined &&
            !this.views[position].hidden) {
            position--;
        }
        this.updateState(position, forceHide === true);
    }
    /**
     * Updates the hidden state of all the views.
     */
    updateState(position, hide) {
        const views = [...this.views];
        if (hide !== undefined && position && views[position]) {
            views[position].hidden = hide;
        }
        let lastVisible = views.length - [...views].reverse().findIndex((view) => !view.hidden) - 1;
        if (lastVisible === views.length) {
            if (position) {
                // When there's only 1 view (mobile), we might not find any active
                // if the user navigates back.
                lastVisible = position - 1;
            }
            else {
                lastVisible = views.length - 1;
            }
        }
        views.forEach((view, pos) => {
            if (view && pos !== position) {
                // hide other views that are outside the split view
                view.hidden =
                    pos > lastVisible || pos < lastVisible - (this.splitViewCount - 1);
            }
        });
        this._views$.next(views);
    }
    /**
     * Returns the active view count for the list of views.
     */
    getActive(views) {
        // we reverse the list to find the last visible view
        const l = [...views]
            .reverse()
            .findIndex((view) => !view.hidden);
        const last = l === -1 ? 0 : views.length - l - 1;
        return last;
    }
    /**
     * Utility method that resolves all views from the subject.
     */
    get views() {
        return this._views$.value;
    }
}
SplitViewService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SplitViewService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SplitViewService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SplitViewService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SplitViewService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9zcGxpdC12aWV3L3NwbGl0LXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBR25FOzs7R0FHRztBQUVILE1BQU0sT0FBTyxnQkFBZ0I7SUFEN0I7UUFFRTs7O1dBR0c7UUFDSCxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUViLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBbUIsRUFBRSxDQUFDLENBQUM7S0E2Si9EO0lBM0pDOzs7O09BSUc7SUFDSCxHQUFHLENBQUMsUUFBZ0IsRUFBRSxZQUE2QjtRQUNqRCxNQUFNLEtBQUssR0FBbUI7WUFDNUIsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDNUQsR0FBRyxZQUFZO1NBQ2hCLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFB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LGdCQUFnQjtpSEFBaEIsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNwbGl0Vmlld1N0YXRlIH0gZnJvbSAnLi9zcGxpdC9zcGxpdC12aWV3Lm1vZGVsJztcblxuLyoqXG4gKiBTdXBwb3NlZCB0byBiZSBpbmplY3RlZCBpbiB0aGUgc3BsaXQgdmlldyBjb21wb25lbnQsIHNvIHRoYXQgdGhlIHNwbGl0IHZpZXcgc3RhdGVcbiAqIGlzIG1haW50YWluZWQgZm9yIGEgc2luZ2xlIHNwbGl0IHZpZXcuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTcGxpdFZpZXdTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIE5ld2x5IGFkZGVkIHZpZXdzIGFyZSBoaWRkZW4gYnkgZGVmYXVsdCwgdW5sZXNzIGl0IGlzIHRoZSBmaXJzdCB2aWV3IG9mIHRoZSBzcGxpdCB2aWV3LlxuICAgKiBUaGUgZGVmYXVsdCBoaWRlIG1vZGUgY2FuIGJlIG92ZXJyaWRkZW4uXG4gICAqL1xuICBkZWZhdWx0SGlkZU1vZGUgPSB0cnVlO1xuXG4gIHByb3RlY3RlZCBzcGxpdFZpZXdDb3VudCA9IDE7XG5cbiAgcHJvdGVjdGVkIF92aWV3cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNwbGl0Vmlld1N0YXRlW10+KFtdKTtcblxuICAvKipcbiAgICogQWRkcyBhIHZpZXcgdG8gdGhlIGxpc3Qgb2Ygdmlld3MuIFRoZSB2aWV3IGlzIGluaXRpYWxpemVkIHdpdGggdGhlIGBTcGxpdFZpZXdTdGF0ZWBcbiAgICogc3RhdGUuIElmIG5vIHN0YXRlIGlzIHByb3ZpZGVkLCB0aGUgc3RhdGUgaXMgY3JlYXRlZCB3aXRoIHRoZSBoaWRkZW4gcHJvcGVydHkuIFRoZSBoaWRkZW5cbiAgICogcHJvcGVydHkgaXMgcHJvdmlkZWQgYnkgdGhlIGBkZWZhdWx0SGlkZU1vZGVgLCB1bmxlc3MgaXQncyB0aGUgZmlyc3QgdmlldyAocG9zaXRpb246IDApLlxuICAgKi9cbiAgYWRkKHBvc2l0aW9uOiBudW1iZXIsIGluaXRpYWxTdGF0ZT86IFNwbGl0Vmlld1N0YXRlKSB7XG4gICAgY29uc3Qgc3RhdGU6IFNwbGl0Vmlld1N0YXRlID0ge1xuICAgICAgLi4ueyBoaWRkZW46IHBvc2l0aW9uID09PSAwID8gZmFsc2UgOiB0aGlzLmRlZmF1bHRIaWRlTW9kZSB9LFxuICAgICAgLi4uaW5pdGlhbFN0YXRlLFxuICAgIH07XG4gICAgaWYgKCF0aGlzLnZpZXdzW3Bvc2l0aW9uXSkge1xuICAgICAgdGhpcy52aWV3c1twb3NpdGlvbl0gPSBzdGF0ZTtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUocG9zaXRpb24sIHN0YXRlLmhpZGRlbik7XG4gICAgICB0aGlzLl92aWV3cyQubmV4dCh0aGlzLnZpZXdzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNwbGl0IHZpZXcgaXMgYmFzZWQgb24gYSBudW1iZXIgb2Ygdmlld3MgdGhhdCBjYW4gYmUgdXNlZCBuZXh0IHRvIGVhY2ggb3RoZXIuXG4gICAqIFdoZW4gdGhlIG51bWJlciBjaGFuZ2VzIChpLmUuIGlmIHRoZSBzY3JlZW4gZ29lcyBmcm9tIHdpZGUgdG8gc21hbGwpLCB0aGUgdmlzaWJpbGl0eSBzdGF0ZVxuICAgKiBvZiB0aGUgdmlld3Mgc2hvdWxkIGJlIHVwZGF0ZWQuXG4gICAqL1xuICB1cGRhdGVTcGxpdFZpZXcoc3BsaXRWaWV3Q291bnQ6IG51bWJlcikge1xuICAgIGlmIChzcGxpdFZpZXdDb3VudCAhPT0gdGhpcy5zcGxpdFZpZXdDb3VudCkge1xuICAgICAgdGhpcy5zcGxpdFZpZXdDb3VudCA9IHNwbGl0Vmlld0NvdW50O1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgd2l0aCB0aGUgYWN0aXZlIHZpZXcgbnVtYmVyLiBUaGUgYWN0aXZlIHZpZXcgbnVtYmVyXG4gICAqIHJlcHJlc2VudHMgdGhlIGxhc3QgdmlzaWJsZSB2aWV3LlxuICAgKi9cbiAgZ2V0QWN0aXZlVmlldygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl92aWV3cyQucGlwZShcbiAgICAgIG1hcCgodmlld3MpID0+IHRoaXMuZ2V0QWN0aXZlKHZpZXdzKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgd2l0aCB0aGUgU3BsaXRWaWV3U3RhdGUgZm9yIHRoZSBnaXZlbiB2aWV3IHBvc2l0aW9uLlxuICAgKi9cbiAgZ2V0Vmlld1N0YXRlKHBvc2l0aW9uOiBudW1iZXIpOiBPYnNlcnZhYmxlPFNwbGl0Vmlld1N0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdzJC5waXBlKFxuICAgICAgbWFwKCh2aWV3cykgPT4gdmlld3NbcG9zaXRpb25dKSxcbiAgICAgIC8vIHdlIG11c3QgZmlsdGVyIGhlcmUsIHNpbmNlIG91dGxldCBkcml2ZW4gdmlld3Mgd2lsbCBkZXN0cm95ZWQgdGhlIHZpZXdcbiAgICAgIGZpbHRlcigodmlldykgPT4gQm9vbGVhbih2aWV3KSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSB2aWV3IGZyb20gdGhlIGxpc3Qgb2Ygdmlld3MuXG4gICAqXG4gICAqIFJlbW92aW5nIGEgdmlldyBpcyBkaWZmZXJlbnQgZnJvbSBoaWRpbmcgYSB2aWV3LiBSZW1vdmluZyBhIHZpZXcgaXMgdHlwaWNhbGx5IGRvbmVcbiAgICogd2hlbiBhIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gICAqXG4gICAqIFdoZW4gdGhlIHZpZXcgaXMgcmVtb3ZlZCwgdGhlIFNwbGl0Vmlld1N0YXRlIGlzIHVwZGF0ZWQgdG8gcmVmbGVjdCB0aGF0IG5ldyBvcmdhbml6YXRpb25cbiAgICogb2Ygdmlld3MuXG4gICAqL1xuICByZW1vdmUocG9zaXRpb246IG51bWJlcikge1xuICAgIGNvbnN0IGFjdGl2ZVBvc2l0aW9uID0gdGhpcy5nZXRBY3RpdmUodGhpcy52aWV3cyk7XG4gICAgdGhpcy5fdmlld3MkLm5leHQodGhpcy52aWV3cy5zcGxpY2UoMCwgcG9zaXRpb24pKTtcbiAgICBpZiAoYWN0aXZlUG9zaXRpb24gPj0gcG9zaXRpb24pIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUocG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuZXh0IHZpZXcgcG9zaXRpb24uIFRoaXMgaXMgdXNlZnVsIGZvciB2aWV3cyB0aGF0IGRvIG5vdCB3YW50IHRvIGJlIGJvdGhlcmVkXG4gICAqIHdpdGggY29udHJvbGxpbmcgdmlldyBudW1iZXJzLlxuICAgKi9cbiAgZ2V0IG5leHRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnZpZXdzLmxlbmd0aCB8fCAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHZpZXdzIGJhc2VkIG9uIHRoZSBnaXZlbiB2aWV3IHBvc2l0aW9uLiBJZiB0aGUgdmlld1xuICAgKiBpcyBhbHJlYWR5IHZpc2libGUsIHdlIGNsb3NlIHRoZSB2aWV3IGFuZCBhY3RpdmUgdGhlIGZvcm1lciB2aWV3LiBVbmxlc3MgdGhlIGhpZGUgZmxhZ1xuICAgKiBpcyB1c2VkLCB0byBmb3JjZSB0aGUgdmlldy5cbiAgICpcbiAgICogVGhlIHZpZXcgc3RhdGUgb2Ygb3RoZXIgdmlld3MgaW4gdGhlIHNwbGl0IHZpZXcgYXJlIHVwZGF0ZWQgYXMgd2VsbC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2l0aW9uIFRoZSB6ZXJvLWJhc2VkIHBvc2l0aW9uIG51bWJlciBvZiB0aGUgdmlldy5cbiAgICogQHBhcmFtIGZvcmNlSGlkZSBUaGUgKG9wdGlvbmFsKSBoaWRlIHN0YXRlIGZvciB0aGUgdmlldyBwb3NpdGlvbi5cbiAgICovXG4gIHRvZ2dsZShwb3NpdGlvbjogbnVtYmVyLCBmb3JjZUhpZGU/OiBib29sZWFuKSB7XG4gICAgLy8gYWRkIHRoZSB2aWV3IGlmIGl0IGhhc24ndCBiZWVuIGFkZGVkIGJlZm9yZS5cbiAgICBpZiAoIXRoaXMudmlld3NbcG9zaXRpb25dKSB7XG4gICAgICB0aGlzLmFkZChwb3NpdGlvbiwgeyBoaWRkZW46IGZvcmNlSGlkZSA/PyBmYWxzZSB9KTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgcG9zaXRpb24gaXMgYWxyZWFkeSB2aXNpYmxlLCB3ZSBtb3ZlIHRvIGEgcHJldmlvdXMgcG9zaXRpb24uIE9ubHkgaWYgdGhlIGhpZGVcbiAgICAvLyBzdGF0ZSBpcyBmb3JjZWQsIHdlIGtlZXAgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgaWYgKFxuICAgICAgdGhpcy52aWV3c1twb3NpdGlvbl0gJiZcbiAgICAgIGZvcmNlSGlkZSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAhdGhpcy52aWV3c1twb3NpdGlvbl0uaGlkZGVuXG4gICAgKSB7XG4gICAgICBwb3NpdGlvbi0tO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU3RhdGUocG9zaXRpb24sIGZvcmNlSGlkZSA9PT0gdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgaGlkZGVuIHN0YXRlIG9mIGFsbCB0aGUgdmlld3MuXG4gICAqL1xuICBwcm90ZWN0ZWQgdXBkYXRlU3RhdGUocG9zaXRpb24/OiBudW1iZXIsIGhpZGU/OiBib29sZWFuKSB7XG4gICAgY29uc3Qgdmlld3MgPSBbLi4udGhpcy52aWV3c107XG4gICAgaWYgKGhpZGUgIT09IHVuZGVmaW5lZCAmJiBwb3NpdGlvbiAmJiB2aWV3c1twb3NpdGlvbl0pIHtcbiAgICAgIHZpZXdzW3Bvc2l0aW9uXS5oaWRkZW4gPSBoaWRlO1xuICAgIH1cbiAgICBsZXQgbGFzdFZpc2libGUgPVxuICAgICAgdmlld3MubGVuZ3RoIC0gWy4uLnZpZXdzXS5yZXZlcnNlKCkuZmluZEluZGV4KCh2aWV3KSA9PiAhdmlldy5oaWRkZW4pIC0gMTtcblxuICAgIGlmIChsYXN0VmlzaWJsZSA9PT0gdmlld3MubGVuZ3RoKSB7XG4gICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgLy8gV2hlbiB0aGVyZSdzIG9ubHkgMSB2aWV3IChtb2JpbGUpLCB3ZSBtaWdodCBub3QgZmluZCBhbnkgYWN0aXZlXG4gICAgICAgIC8vIGlmIHRoZSB1c2VyIG5hdmlnYXRlcyBiYWNrLlxuICAgICAgICBsYXN0VmlzaWJsZSA9IHBvc2l0aW9uIC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3RWaXNpYmxlID0gdmlld3MubGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2aWV3cy5mb3JFYWNoKCh2aWV3LCBwb3MpID0+IHtcbiAgICAgIGlmICh2aWV3ICYmIHBvcyAhPT0gcG9zaXRpb24pIHtcbiAgICAgICAgLy8gaGlkZSBvdGhlciB2aWV3cyB0aGF0IGFyZSBvdXRzaWRlIHRoZSBzcGxpdCB2aWV3XG4gICAgICAgIHZpZXcuaGlkZGVuID1cbiAgICAgICAgICBwb3MgPiBsYXN0VmlzaWJsZSB8fCBwb3MgPCBsYXN0VmlzaWJsZSAtICh0aGlzLnNwbGl0Vmlld0NvdW50IC0gMSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl92aWV3cyQubmV4dCh2aWV3cyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYWN0aXZlIHZpZXcgY291bnQgZm9yIHRoZSBsaXN0IG9mIHZpZXdzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEFjdGl2ZSh2aWV3czogU3BsaXRWaWV3U3RhdGVbXSk6IG51bWJlciB7XG4gICAgLy8gd2UgcmV2ZXJzZSB0aGUgbGlzdCB0byBmaW5kIHRoZSBsYXN0IHZpc2libGUgdmlld1xuICAgIGNvbnN0IGwgPSBbLi4udmlld3NdXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAuZmluZEluZGV4KCh2aWV3OiBTcGxpdFZpZXdTdGF0ZSkgPT4gIXZpZXcuaGlkZGVuKTtcbiAgICBjb25zdCBsYXN0ID0gbCA9PT0gLTEgPyAwIDogdmlld3MubGVuZ3RoIC0gbCAtIDE7XG4gICAgcmV0dXJuIGxhc3Q7XG4gIH1cblxuICAvKipcbiAgICogVXRpbGl0eSBtZXRob2QgdGhhdCByZXNvbHZlcyBhbGwgdmlld3MgZnJvbSB0aGUgc3ViamVjdC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXQgdmlld3MoKTogU3BsaXRWaWV3U3RhdGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdzJC52YWx1ZTtcbiAgfVxufVxuIl19