/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SplitViewComponent } from './split/split-view.component';
import { ViewComponent } from './view/view.component';
import * as i0 from "@angular/core";
/**
 * The split-view component supports an unlimited number of nested views. Nested views are rendered
 * next to each other. The views can be rendered next to each other, but the max number of visible
 * views can be limisted as well. This is configurable in the CSS layer, so that the max number of views
 * per split-view can be different for each component.
 *
 * The basic structure of the split-view component is shown below:
 *
 *
 * ```
 * <cx-split-view>
 * </cx-split-view>
 * ```
 *
 * The UX pattern used for the split-view is driven by an initial view, which gets splitted into
 * more views as soon as the user starts interacting with the initial and subsequantial views.
 * The views can be driven by routes, which means that you can navigate through the splitted views
 * by using the browser history as well as share or bookmark splitted views.
 *
 * The UI is implemented in the style layer, with only a few generic style rules. Most of the split
 * view style is driven by CSS properties, so that alternative split-view styles can be introduced
 * per page or component.
 *
 * The max number of views per split-view on mobile is limited to 1 by default, where as on tablet
 * (and higher) it is set to 2. Spartacus has a pretty narrow layout, which is why 2 is maximum,
 * but customers could alter the layout to bring in more views in the same split-view at the time.
 *
 */
export class SplitViewModule {
}
SplitViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SplitViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SplitViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SplitViewModule, declarations: [SplitViewComponent, ViewComponent], imports: [CommonModule, RouterModule], exports: [SplitViewComponent, ViewComponent] });
SplitViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SplitViewModule, imports: [CommonModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SplitViewModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SplitViewComponent, ViewComponent],
                    imports: [CommonModule, RouterModule],
                    exports: [SplitViewComponent, ViewComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtdmlldy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3NwbGl0LXZpZXcvc3BsaXQtdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFPSCxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQUpYLGtCQUFrQixFQUFFLGFBQWEsYUFDdEMsWUFBWSxFQUFFLFlBQVksYUFDMUIsa0JBQWtCLEVBQUUsYUFBYTs2R0FFaEMsZUFBZSxZQUhoQixZQUFZLEVBQUUsWUFBWTsyRkFHekIsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUM7b0JBQ2pELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQztpQkFDN0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTcGxpdFZpZXdDb21wb25lbnQgfSBmcm9tICcuL3NwbGl0L3NwbGl0LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvdmlldy5jb21wb25lbnQnO1xuXG4vKipcbiAqIFRoZSBzcGxpdC12aWV3IGNvbXBvbmVudCBzdXBwb3J0cyBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIG5lc3RlZCB2aWV3cy4gTmVzdGVkIHZpZXdzIGFyZSByZW5kZXJlZFxuICogbmV4dCB0byBlYWNoIG90aGVyLiBUaGUgdmlld3MgY2FuIGJlIHJlbmRlcmVkIG5leHQgdG8gZWFjaCBvdGhlciwgYnV0IHRoZSBtYXggbnVtYmVyIG9mIHZpc2libGVcbiAqIHZpZXdzIGNhbiBiZSBsaW1pc3RlZCBhcyB3ZWxsLiBUaGlzIGlzIGNvbmZpZ3VyYWJsZSBpbiB0aGUgQ1NTIGxheWVyLCBzbyB0aGF0IHRoZSBtYXggbnVtYmVyIG9mIHZpZXdzXG4gKiBwZXIgc3BsaXQtdmlldyBjYW4gYmUgZGlmZmVyZW50IGZvciBlYWNoIGNvbXBvbmVudC5cbiAqXG4gKiBUaGUgYmFzaWMgc3RydWN0dXJlIG9mIHRoZSBzcGxpdC12aWV3IGNvbXBvbmVudCBpcyBzaG93biBiZWxvdzpcbiAqXG4gKlxuICogYGBgXG4gKiA8Y3gtc3BsaXQtdmlldz5cbiAqIDwvY3gtc3BsaXQtdmlldz5cbiAqIGBgYFxuICpcbiAqIFRoZSBVWCBwYXR0ZXJuIHVzZWQgZm9yIHRoZSBzcGxpdC12aWV3IGlzIGRyaXZlbiBieSBhbiBpbml0aWFsIHZpZXcsIHdoaWNoIGdldHMgc3BsaXR0ZWQgaW50b1xuICogbW9yZSB2aWV3cyBhcyBzb29uIGFzIHRoZSB1c2VyIHN0YXJ0cyBpbnRlcmFjdGluZyB3aXRoIHRoZSBpbml0aWFsIGFuZCBzdWJzZXF1YW50aWFsIHZpZXdzLlxuICogVGhlIHZpZXdzIGNhbiBiZSBkcml2ZW4gYnkgcm91dGVzLCB3aGljaCBtZWFucyB0aGF0IHlvdSBjYW4gbmF2aWdhdGUgdGhyb3VnaCB0aGUgc3BsaXR0ZWQgdmlld3NcbiAqIGJ5IHVzaW5nIHRoZSBicm93c2VyIGhpc3RvcnkgYXMgd2VsbCBhcyBzaGFyZSBvciBib29rbWFyayBzcGxpdHRlZCB2aWV3cy5cbiAqXG4gKiBUaGUgVUkgaXMgaW1wbGVtZW50ZWQgaW4gdGhlIHN0eWxlIGxheWVyLCB3aXRoIG9ubHkgYSBmZXcgZ2VuZXJpYyBzdHlsZSBydWxlcy4gTW9zdCBvZiB0aGUgc3BsaXRcbiAqIHZpZXcgc3R5bGUgaXMgZHJpdmVuIGJ5IENTUyBwcm9wZXJ0aWVzLCBzbyB0aGF0IGFsdGVybmF0aXZlIHNwbGl0LXZpZXcgc3R5bGVzIGNhbiBiZSBpbnRyb2R1Y2VkXG4gKiBwZXIgcGFnZSBvciBjb21wb25lbnQuXG4gKlxuICogVGhlIG1heCBudW1iZXIgb2Ygdmlld3MgcGVyIHNwbGl0LXZpZXcgb24gbW9iaWxlIGlzIGxpbWl0ZWQgdG8gMSBieSBkZWZhdWx0LCB3aGVyZSBhcyBvbiB0YWJsZXRcbiAqIChhbmQgaGlnaGVyKSBpdCBpcyBzZXQgdG8gMi4gU3BhcnRhY3VzIGhhcyBhIHByZXR0eSBuYXJyb3cgbGF5b3V0LCB3aGljaCBpcyB3aHkgMiBpcyBtYXhpbXVtLFxuICogYnV0IGN1c3RvbWVycyBjb3VsZCBhbHRlciB0aGUgbGF5b3V0IHRvIGJyaW5nIGluIG1vcmUgdmlld3MgaW4gdGhlIHNhbWUgc3BsaXQtdmlldyBhdCB0aGUgdGltZS5cbiAqXG4gKi9cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbU3BsaXRWaWV3Q29tcG9uZW50LCBWaWV3Q29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlXSxcbiAgZXhwb3J0czogW1NwbGl0Vmlld0NvbXBvbmVudCwgVmlld0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0Vmlld01vZHVsZSB7fVxuIl19