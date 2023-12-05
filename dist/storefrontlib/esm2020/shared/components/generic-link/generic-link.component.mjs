/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./generic-link-component.service";
import * as i3 from "@angular/common";
/**
 * This component navigates using [routerLink] attribute when input 'url' is a relative url. Otherwise (when it's absolute), [href] is used.
 */
export class GenericLinkComponent {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        /**
         * Used to split url into 2 parts:
         * 1. the path
         * 2. query params + hash fragment
         */
        this.URL_SPLIT = /(^[^#?]*)(.*)/;
        /**
         * Parsed parts of the @Input `url`, when it's a local URL.
         * It should not be used when the `url` is external.
         * @see `url`
         */
        this.routeParts = {};
    }
    isExternalUrl() {
        return this.service.isExternalUrl(this.url);
    }
    get rel() {
        return this.target === '_blank' ? 'noopener' : null;
    }
    ngOnChanges(changes) {
        if (changes['url']) {
            this.setUrlParts(changes['url'].currentValue);
        }
    }
    /**
     * The part with the path of the local url.
     */
    get routerUrl() {
        return this.routeParts.path;
    }
    /**
     * The part with the query params of the local url.
     */
    get queryParams() {
        return this.routeParts.queryParams;
    }
    /**
     * The part with the hash fragment of the local url.
     */
    get fragment() {
        return this.routeParts.fragment ?? undefined;
    }
    /**
     * Parses the given url and sets the property `urlParts` accordingly.
     */
    setUrlParts(url) {
        if (typeof url === 'string') {
            url = this.getAbsoluteUrl(url); // string links in CMS sometimes don't have the leading slash, so fix it here
            this.routeParts = this.splitUrl(url);
        }
        else {
            this.routeParts = { path: url };
        }
    }
    /**
     * Parses the given string into 3 parts:
     * - string path (wrapped in an array to be compatible with Angular syntax for the `routerLink`)
     * - query params (as an object)
     * - hash fragment (string)
     */
    splitUrl(url = '') {
        const { queryParams, fragment } = this.router.parseUrl(url);
        const [, path] = url.match(this.URL_SPLIT) ?? [, ''];
        // wrap path in an array, to have the Angular-like path format
        return { path: [path ?? ''], queryParams, fragment };
    }
    /**
     * Prepends a leading slash to the given URL string, in case it doesn't have it.
     */
    getAbsoluteUrl(url) {
        return url.startsWith('/') ? url : '/' + url;
    }
}
GenericLinkComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GenericLinkComponent, deps: [{ token: i1.Router }, { token: i2.GenericLinkComponentService }], target: i0.ɵɵFactoryTarget.Component });
GenericLinkComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: GenericLinkComponent, selector: "cx-generic-link", inputs: { url: "url", target: "target", id: "id", class: "class", style: "style", title: "title" }, usesOnChanges: true, ngImport: i0, template: "<!-- https://github.com/angular/angular/issues/24567 -->\n\n<ng-container *ngIf=\"isExternalUrl(); else isLocalUrl\">\n  <a\n    [href]=\"url\"\n    [attr.target]=\"target\"\n    [attr.rel]=\"rel\"\n    [attr.id]=\"id\"\n    [attr.class]=\"class\"\n    [attr.style]=\"style\"\n    [attr.title]=\"title\"\n  >\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </a>\n</ng-container>\n\n<ng-template #isLocalUrl>\n  <a\n    [routerLink]=\"routerUrl\"\n    [queryParams]=\"queryParams\"\n    [fragment]=\"fragment\"\n    [target]=\"target || undefined\"\n    [attr.id]=\"id\"\n    [attr.class]=\"class\"\n    [attr.style]=\"style\"\n    [attr.title]=\"title\"\n  >\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </a>\n</ng-template>\n\n<ng-template #content>\n  <ng-content></ng-content>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GenericLinkComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-generic-link', template: "<!-- https://github.com/angular/angular/issues/24567 -->\n\n<ng-container *ngIf=\"isExternalUrl(); else isLocalUrl\">\n  <a\n    [href]=\"url\"\n    [attr.target]=\"target\"\n    [attr.rel]=\"rel\"\n    [attr.id]=\"id\"\n    [attr.class]=\"class\"\n    [attr.style]=\"style\"\n    [attr.title]=\"title\"\n  >\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </a>\n</ng-container>\n\n<ng-template #isLocalUrl>\n  <a\n    [routerLink]=\"routerUrl\"\n    [queryParams]=\"queryParams\"\n    [fragment]=\"fragment\"\n    [target]=\"target || undefined\"\n    [attr.id]=\"id\"\n    [attr.class]=\"class\"\n    [attr.style]=\"style\"\n    [attr.title]=\"title\"\n  >\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </a>\n</ng-template>\n\n<ng-template #content>\n  <ng-content></ng-content>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.GenericLinkComponentService }]; }, propDecorators: { url: [{
                type: Input
            }], target: [{
                type: Input
            }], id: [{
                type: Input
            }], class: [{
                type: Input
            }], style: [{
                type: Input
            }], title: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpYy1saW5rLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvZ2VuZXJpYy1saW5rL2dlbmVyaWMtbGluay5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL2dlbmVyaWMtbGluay9nZW5lcmljLWxpbmsuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFnQjNFOztHQUVHO0FBS0gsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUNZLE1BQWMsRUFDZCxPQUFvQztRQURwQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBNkI7UUFHaEQ7Ozs7V0FJRztRQUNnQixjQUFTLEdBQUcsZUFBZSxDQUFDO1FBRS9DOzs7O1dBSUc7UUFDTyxlQUFVLEdBQWUsRUFBRSxDQUFDO0lBZG5DLENBQUM7SUF1QkosYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0RCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNPLFdBQVcsQ0FBQyxHQUFtQjtRQUN2QyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQixHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZFQUE2RTtZQUM3RyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBYSxDQUFDLENBQUM7U0FDaEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyxRQUFRLENBQUMsTUFBYyxFQUFFO1FBQ2pDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXJELDhEQUE4RDtRQUM5RCxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxjQUFjLENBQUMsR0FBVztRQUNsQyxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUMvQyxDQUFDOztpSEE3RlUsb0JBQW9CO3FHQUFwQixvQkFBb0IsZ0xDN0JqQywwMEJBa0NBOzJGRExhLG9CQUFvQjtrQkFKaEMsU0FBUzsrQkFDRSxpQkFBaUI7dUlBdUJsQixHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFyYW1zLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgR2VuZXJpY0xpbmtDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9nZW5lcmljLWxpbmstY29tcG9uZW50LnNlcnZpY2UnO1xuXG4vLyBwcml2YXRlXG5pbnRlcmZhY2UgUm91dGVQYXJ0cyB7XG4gIC8qKiBQYXRoIGluIHRoZSBBbmd1bGFyLWxpa2UgYXJyYXkgZm9ybWF0ICovXG4gIHBhdGg/OiBzdHJpbmdbXTtcblxuICAvKiogUXVlcnkgcGFyYW1zICovXG4gIHF1ZXJ5UGFyYW1zPzogUGFyYW1zO1xuXG4gIC8qKiBIYXNoIGZyYWdtZW50ICovXG4gIGZyYWdtZW50Pzogc3RyaW5nIHwgbnVsbDtcbn1cblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCBuYXZpZ2F0ZXMgdXNpbmcgW3JvdXRlckxpbmtdIGF0dHJpYnV0ZSB3aGVuIGlucHV0ICd1cmwnIGlzIGEgcmVsYXRpdmUgdXJsLiBPdGhlcndpc2UgKHdoZW4gaXQncyBhYnNvbHV0ZSksIFtocmVmXSBpcyB1c2VkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1nZW5lcmljLWxpbmsnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ2VuZXJpYy1saW5rLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJpY0xpbmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJvdGVjdGVkIHNlcnZpY2U6IEdlbmVyaWNMaW5rQ29tcG9uZW50U2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gc3BsaXQgdXJsIGludG8gMiBwYXJ0czpcbiAgICogMS4gdGhlIHBhdGhcbiAgICogMi4gcXVlcnkgcGFyYW1zICsgaGFzaCBmcmFnbWVudFxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IFVSTF9TUExJVCA9IC8oXlteIz9dKikoLiopLztcblxuICAvKipcbiAgICogUGFyc2VkIHBhcnRzIG9mIHRoZSBASW5wdXQgYHVybGAsIHdoZW4gaXQncyBhIGxvY2FsIFVSTC5cbiAgICogSXQgc2hvdWxkIG5vdCBiZSB1c2VkIHdoZW4gdGhlIGB1cmxgIGlzIGV4dGVybmFsLlxuICAgKiBAc2VlIGB1cmxgXG4gICAqL1xuICBwcm90ZWN0ZWQgcm91dGVQYXJ0czogUm91dGVQYXJ0cyA9IHt9O1xuXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nIHwgYW55W107XG4gIEBJbnB1dCgpIHRhcmdldDogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgY2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgc3R5bGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICBpc0V4dGVybmFsVXJsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2UuaXNFeHRlcm5hbFVybCh0aGlzLnVybCk7XG4gIH1cblxuICBnZXQgcmVsKCkge1xuICAgIHJldHVybiB0aGlzLnRhcmdldCA9PT0gJ19ibGFuaycgPyAnbm9vcGVuZXInIDogbnVsbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1sndXJsJ10pIHtcbiAgICAgIHRoaXMuc2V0VXJsUGFydHMoY2hhbmdlc1sndXJsJ10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIHBhcnQgd2l0aCB0aGUgcGF0aCBvZiB0aGUgbG9jYWwgdXJsLlxuICAgKi9cbiAgZ2V0IHJvdXRlclVybCgpOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVQYXJ0cy5wYXRoO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJ0IHdpdGggdGhlIHF1ZXJ5IHBhcmFtcyBvZiB0aGUgbG9jYWwgdXJsLlxuICAgKi9cbiAgZ2V0IHF1ZXJ5UGFyYW1zKCk6IFBhcmFtcyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVQYXJ0cy5xdWVyeVBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcGFydCB3aXRoIHRoZSBoYXNoIGZyYWdtZW50IG9mIHRoZSBsb2NhbCB1cmwuXG4gICAqL1xuICBnZXQgZnJhZ21lbnQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZVBhcnRzLmZyYWdtZW50ID8/IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGdpdmVuIHVybCBhbmQgc2V0cyB0aGUgcHJvcGVydHkgYHVybFBhcnRzYCBhY2NvcmRpbmdseS5cbiAgICovXG4gIHByb3RlY3RlZCBzZXRVcmxQYXJ0cyh1cmw6IHN0cmluZyB8IGFueVtdKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB1cmwgPSB0aGlzLmdldEFic29sdXRlVXJsKHVybCk7IC8vIHN0cmluZyBsaW5rcyBpbiBDTVMgc29tZXRpbWVzIGRvbid0IGhhdmUgdGhlIGxlYWRpbmcgc2xhc2gsIHNvIGZpeCBpdCBoZXJlXG4gICAgICB0aGlzLnJvdXRlUGFydHMgPSB0aGlzLnNwbGl0VXJsKHVybCBhcyBzdHJpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvdXRlUGFydHMgPSB7IHBhdGg6IHVybCB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIDMgcGFydHM6XG4gICAqIC0gc3RyaW5nIHBhdGggKHdyYXBwZWQgaW4gYW4gYXJyYXkgdG8gYmUgY29tcGF0aWJsZSB3aXRoIEFuZ3VsYXIgc3ludGF4IGZvciB0aGUgYHJvdXRlckxpbmtgKVxuICAgKiAtIHF1ZXJ5IHBhcmFtcyAoYXMgYW4gb2JqZWN0KVxuICAgKiAtIGhhc2ggZnJhZ21lbnQgKHN0cmluZylcbiAgICovXG4gIHByb3RlY3RlZCBzcGxpdFVybCh1cmw6IHN0cmluZyA9ICcnKTogUm91dGVQYXJ0cyB7XG4gICAgY29uc3QgeyBxdWVyeVBhcmFtcywgZnJhZ21lbnQgfSA9IHRoaXMucm91dGVyLnBhcnNlVXJsKHVybCk7XG4gICAgY29uc3QgWywgcGF0aF0gPSB1cmwubWF0Y2godGhpcy5VUkxfU1BMSVQpID8/IFssICcnXTtcblxuICAgIC8vIHdyYXAgcGF0aCBpbiBhbiBhcnJheSwgdG8gaGF2ZSB0aGUgQW5ndWxhci1saWtlIHBhdGggZm9ybWF0XG4gICAgcmV0dXJuIHsgcGF0aDogW3BhdGggPz8gJyddLCBxdWVyeVBhcmFtcywgZnJhZ21lbnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwZW5kcyBhIGxlYWRpbmcgc2xhc2ggdG8gdGhlIGdpdmVuIFVSTCBzdHJpbmcsIGluIGNhc2UgaXQgZG9lc24ndCBoYXZlIGl0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEFic29sdXRlVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdXJsLnN0YXJ0c1dpdGgoJy8nKSA/IHVybCA6ICcvJyArIHVybDtcbiAgfVxufVxuIiwiPCEtLSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yNDU2NyAtLT5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzRXh0ZXJuYWxVcmwoKTsgZWxzZSBpc0xvY2FsVXJsXCI+XG4gIDxhXG4gICAgW2hyZWZdPVwidXJsXCJcbiAgICBbYXR0ci50YXJnZXRdPVwidGFyZ2V0XCJcbiAgICBbYXR0ci5yZWxdPVwicmVsXCJcbiAgICBbYXR0ci5pZF09XCJpZFwiXG4gICAgW2F0dHIuY2xhc3NdPVwiY2xhc3NcIlxuICAgIFthdHRyLnN0eWxlXT1cInN0eWxlXCJcbiAgICBbYXR0ci50aXRsZV09XCJ0aXRsZVwiXG4gID5cbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICA8L2E+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLXRlbXBsYXRlICNpc0xvY2FsVXJsPlxuICA8YVxuICAgIFtyb3V0ZXJMaW5rXT1cInJvdXRlclVybFwiXG4gICAgW3F1ZXJ5UGFyYW1zXT1cInF1ZXJ5UGFyYW1zXCJcbiAgICBbZnJhZ21lbnRdPVwiZnJhZ21lbnRcIlxuICAgIFt0YXJnZXRdPVwidGFyZ2V0IHx8IHVuZGVmaW5lZFwiXG4gICAgW2F0dHIuaWRdPVwiaWRcIlxuICAgIFthdHRyLmNsYXNzXT1cImNsYXNzXCJcbiAgICBbYXR0ci5zdHlsZV09XCJzdHlsZVwiXG4gICAgW2F0dHIudGl0bGVdPVwidGl0bGVcIlxuICA+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9hPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNjb250ZW50PlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuIl19