/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CarouselService {
    constructor(winRef) {
        this.winRef = winRef;
    }
    /**
     * The number of items per slide is calculated by the help of
     * the item width and the available width of the host element.
     * This appoach makes it possible to place the carousel in different
     * layouts. Instead of using the page breakpoints, the host size is
     * taken into account.
     *
     * Since there's no element resize API available, we use the
     * window `resize` event, so that we can adjust the number of items
     * whenever the window got resized.
     */
    getItemsPerSlide(nativeElement, itemWidth) {
        return this.winRef.resize$.pipe(map(() => nativeElement.clientWidth), map((totalWidth) => this.calculateItems(totalWidth, itemWidth)));
    }
    /**
     * Calculates the number of items per given hostSize.  calculated based on the given
     * intended size in pixels or percentages. The
     *
     * @param availableWidth The available width in pixels for the carousel items.
     * @param itemWidth The width per carousel item, in px or percentage.
     */
    calculateItems(availableWidth, itemWidth) {
        let calculatedItems = 0;
        if (itemWidth.endsWith('px')) {
            const num = itemWidth.substring(0, itemWidth.length - 2);
            calculatedItems = availableWidth / num;
        }
        if (itemWidth.endsWith('%')) {
            const perc = itemWidth.substring(0, itemWidth.length - 1);
            calculatedItems =
                availableWidth / (availableWidth * (perc / 100));
        }
        return Math.floor(calculatedItems) || 1;
    }
}
CarouselService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CarouselService, deps: [{ token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
CarouselService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CarouselService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CarouselService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUtyQyxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUcsQ0FBQztJQUV6Qzs7Ozs7Ozs7OztPQVVHO0lBQ0gsZ0JBQWdCLENBQ2QsYUFBMEIsRUFDMUIsU0FBaUI7UUFFakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBRSxhQUE2QixDQUFDLFdBQVcsQ0FBQyxFQUNyRCxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQ2hFLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssY0FBYyxDQUFDLGNBQXNCLEVBQUUsU0FBaUI7UUFDOUQsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pELGVBQWUsR0FBRyxjQUFjLEdBQWlCLEdBQUksQ0FBQztTQUN2RDtRQUVELElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFELGVBQWU7Z0JBQ2IsY0FBYyxHQUFHLENBQUMsY0FBYyxHQUFHLENBQWUsSUFBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkU7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7OzRHQTdDVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2luUmVmOiBXaW5kb3dSZWYpIHt9XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgaXRlbXMgcGVyIHNsaWRlIGlzIGNhbGN1bGF0ZWQgYnkgdGhlIGhlbHAgb2ZcbiAgICogdGhlIGl0ZW0gd2lkdGggYW5kIHRoZSBhdmFpbGFibGUgd2lkdGggb2YgdGhlIGhvc3QgZWxlbWVudC5cbiAgICogVGhpcyBhcHBvYWNoIG1ha2VzIGl0IHBvc3NpYmxlIHRvIHBsYWNlIHRoZSBjYXJvdXNlbCBpbiBkaWZmZXJlbnRcbiAgICogbGF5b3V0cy4gSW5zdGVhZCBvZiB1c2luZyB0aGUgcGFnZSBicmVha3BvaW50cywgdGhlIGhvc3Qgc2l6ZSBpc1xuICAgKiB0YWtlbiBpbnRvIGFjY291bnQuXG4gICAqXG4gICAqIFNpbmNlIHRoZXJlJ3Mgbm8gZWxlbWVudCByZXNpemUgQVBJIGF2YWlsYWJsZSwgd2UgdXNlIHRoZVxuICAgKiB3aW5kb3cgYHJlc2l6ZWAgZXZlbnQsIHNvIHRoYXQgd2UgY2FuIGFkanVzdCB0aGUgbnVtYmVyIG9mIGl0ZW1zXG4gICAqIHdoZW5ldmVyIHRoZSB3aW5kb3cgZ290IHJlc2l6ZWQuXG4gICAqL1xuICBnZXRJdGVtc1BlclNsaWRlKFxuICAgIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIGl0ZW1XaWR0aDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMud2luUmVmLnJlc2l6ZSQucGlwZShcbiAgICAgIG1hcCgoKSA9PiAobmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xpZW50V2lkdGgpLFxuICAgICAgbWFwKCh0b3RhbFdpZHRoKSA9PiB0aGlzLmNhbGN1bGF0ZUl0ZW1zKHRvdGFsV2lkdGgsIGl0ZW1XaWR0aCkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgaXRlbXMgcGVyIGdpdmVuIGhvc3RTaXplLiAgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZ2l2ZW5cbiAgICogaW50ZW5kZWQgc2l6ZSBpbiBwaXhlbHMgb3IgcGVyY2VudGFnZXMuIFRoZVxuICAgKlxuICAgKiBAcGFyYW0gYXZhaWxhYmxlV2lkdGggVGhlIGF2YWlsYWJsZSB3aWR0aCBpbiBwaXhlbHMgZm9yIHRoZSBjYXJvdXNlbCBpdGVtcy5cbiAgICogQHBhcmFtIGl0ZW1XaWR0aCBUaGUgd2lkdGggcGVyIGNhcm91c2VsIGl0ZW0sIGluIHB4IG9yIHBlcmNlbnRhZ2UuXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUl0ZW1zKGF2YWlsYWJsZVdpZHRoOiBudW1iZXIsIGl0ZW1XaWR0aDogc3RyaW5nKSB7XG4gICAgbGV0IGNhbGN1bGF0ZWRJdGVtcyA9IDA7XG4gICAgaWYgKGl0ZW1XaWR0aC5lbmRzV2l0aCgncHgnKSkge1xuICAgICAgY29uc3QgbnVtID0gaXRlbVdpZHRoLnN1YnN0cmluZygwLCBpdGVtV2lkdGgubGVuZ3RoIC0gMik7XG4gICAgICBjYWxjdWxhdGVkSXRlbXMgPSBhdmFpbGFibGVXaWR0aCAvIDxudW1iZXI+KDxhbnk+bnVtKTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbVdpZHRoLmVuZHNXaXRoKCclJykpIHtcbiAgICAgIGNvbnN0IHBlcmMgPSBpdGVtV2lkdGguc3Vic3RyaW5nKDAsIGl0ZW1XaWR0aC5sZW5ndGggLSAxKTtcbiAgICAgIGNhbGN1bGF0ZWRJdGVtcyA9XG4gICAgICAgIGF2YWlsYWJsZVdpZHRoIC8gKGF2YWlsYWJsZVdpZHRoICogKDxudW1iZXI+KDxhbnk+cGVyYykgLyAxMDApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihjYWxjdWxhdGVkSXRlbXMpIHx8IDE7XG4gIH1cbn1cbiJdfQ==