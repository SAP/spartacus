/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/*
 * Supplements the anchor links that contain only the hash fragment in the `href` attribute,
 * (e.g. `<a href="#someId">`), by prepending the current location (path and query params),
 * so it becomes a link to a full url
 * e.g. `<a href="https://domain.com/current/path?and=query-params#someId">`.
 *
 * This helps to avoid the undesirable navigation to the homepage URL (`/#someId`)
 * when clicking the original link.
 *
 * It's useful for example for cms-provided content passed to the [innerHTML] directive.
 */
export class SupplementHashAnchorsPipe {
    constructor(renderer, winRef) {
        this.renderer = renderer;
        this.winRef = winRef;
    }
    getPath(anchorId) {
        const currentUrlWithoutFragment = this.winRef.location.href?.replace(/#.*$/, '');
        return `${currentUrlWithoutFragment}${anchorId}`;
    }
    transform(html = '') {
        const template = this.renderer.createElement('template');
        template.innerHTML = html.trim();
        const linkNodes = template.content.querySelectorAll('a');
        Array.from(linkNodes).forEach((link) => {
            const href = link.getAttribute('href');
            if (href?.indexOf('#') === 0) {
                this.renderer.setProperty(link, 'href', this.getPath(href));
            }
        });
        return template.innerHTML;
    }
}
SupplementHashAnchorsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SupplementHashAnchorsPipe, deps: [{ token: i0.Renderer2 }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Pipe });
SupplementHashAnchorsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SupplementHashAnchorsPipe, name: "cxSupplementHashAnchors" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SupplementHashAnchorsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cxSupplementHashAnchors' }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcGxlbWVudC1oYXNoLWFuY2hvcnMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL3BpcGVzL3N1cGxlbWVudC1oYXNoLWFuY2hvcnMvc3VwcGxlbWVudC1oYXNoLWFuY2hvcnMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLElBQUksRUFBNEIsTUFBTSxlQUFlLENBQUM7OztBQUcvRDs7Ozs7Ozs7OztHQVVHO0FBRUgsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxZQUFzQixRQUFtQixFQUFZLE1BQWlCO1FBQWhELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUcsQ0FBQztJQUVoRSxPQUFPLENBQUMsUUFBZ0I7UUFDaEMsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUNsRSxNQUFNLEVBQ04sRUFBRSxDQUNILENBQUM7UUFDRixPQUFPLEdBQUcseUJBQXlCLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVNLFNBQVMsQ0FBQyxPQUFlLEVBQUU7UUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsTUFBTSxTQUFTLEdBQ2IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQXVCLEVBQUUsRUFBRTtZQUN4RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzdEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDNUIsQ0FBQzs7c0hBeEJVLHlCQUF5QjtvSEFBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBRHJDLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbi8qXG4gKiBTdXBwbGVtZW50cyB0aGUgYW5jaG9yIGxpbmtzIHRoYXQgY29udGFpbiBvbmx5IHRoZSBoYXNoIGZyYWdtZW50IGluIHRoZSBgaHJlZmAgYXR0cmlidXRlLFxuICogKGUuZy4gYDxhIGhyZWY9XCIjc29tZUlkXCI+YCksIGJ5IHByZXBlbmRpbmcgdGhlIGN1cnJlbnQgbG9jYXRpb24gKHBhdGggYW5kIHF1ZXJ5IHBhcmFtcyksXG4gKiBzbyBpdCBiZWNvbWVzIGEgbGluayB0byBhIGZ1bGwgdXJsXG4gKiBlLmcuIGA8YSBocmVmPVwiaHR0cHM6Ly9kb21haW4uY29tL2N1cnJlbnQvcGF0aD9hbmQ9cXVlcnktcGFyYW1zI3NvbWVJZFwiPmAuXG4gKlxuICogVGhpcyBoZWxwcyB0byBhdm9pZCB0aGUgdW5kZXNpcmFibGUgbmF2aWdhdGlvbiB0byB0aGUgaG9tZXBhZ2UgVVJMIChgLyNzb21lSWRgKVxuICogd2hlbiBjbGlja2luZyB0aGUgb3JpZ2luYWwgbGluay5cbiAqXG4gKiBJdCdzIHVzZWZ1bCBmb3IgZXhhbXBsZSBmb3IgY21zLXByb3ZpZGVkIGNvbnRlbnQgcGFzc2VkIHRvIHRoZSBbaW5uZXJIVE1MXSBkaXJlY3RpdmUuXG4gKi9cbkBQaXBlKHsgbmFtZTogJ2N4U3VwcGxlbWVudEhhc2hBbmNob3JzJyB9KVxuZXhwb3J0IGNsYXNzIFN1cHBsZW1lbnRIYXNoQW5jaG9yc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZikge31cblxuICBwcm90ZWN0ZWQgZ2V0UGF0aChhbmNob3JJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBjdXJyZW50VXJsV2l0aG91dEZyYWdtZW50ID0gdGhpcy53aW5SZWYubG9jYXRpb24uaHJlZj8ucmVwbGFjZShcbiAgICAgIC8jLiokLyxcbiAgICAgICcnXG4gICAgKTtcbiAgICByZXR1cm4gYCR7Y3VycmVudFVybFdpdGhvdXRGcmFnbWVudH0ke2FuY2hvcklkfWA7XG4gIH1cblxuICBwdWJsaWMgdHJhbnNmb3JtKGh0bWw6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sLnRyaW0oKTtcbiAgICBjb25zdCBsaW5rTm9kZXM6IE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+ID1cbiAgICAgIHRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXG4gICAgQXJyYXkuZnJvbShsaW5rTm9kZXMpLmZvckVhY2goKGxpbms6IEhUTUxBbmNob3JFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgIGlmIChocmVmPy5pbmRleE9mKCcjJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShsaW5rLCAnaHJlZicsIHRoaXMuZ2V0UGF0aChocmVmKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmlubmVySFRNTDtcbiAgfVxufVxuIl19