/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class PageMetaLinkService {
    constructor(winRef, rendererFactory) {
        this.winRef = winRef;
        this.rendererFactory = rendererFactory;
    }
    /**
     * Adds a canonical link element to the document head.
     *
     * If an id is provided, the link will be updated.
     * If no url is provided, the link element will be deleted.
     */
    setCanonicalLink(url) {
        let link = this.winRef.document.querySelector('link[rel="canonical"]');
        if (!url) {
            // Removing the link is an edge case, but useful if the canonical url
            // is created in CSR while developing/testing.
            link?.remove();
            return;
        }
        if (!link) {
            link = this.renderer.createElement('link');
            link.rel = 'canonical';
            link.href = url;
            this.renderer.appendChild(this.winRef.document.head, link);
        }
        else {
            link?.setAttribute('href', url);
        }
    }
    get renderer() {
        return this.rendererFactory.createRenderer(null, null);
    }
}
PageMetaLinkService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageMetaLinkService, deps: [{ token: i1.WindowRef }, { token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
PageMetaLinkService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageMetaLinkService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageMetaLinkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: i0.RendererFactory2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1tZXRhLWxpbmsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9zZW8vcGFnZS1tZXRhLWxpbmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBK0IsTUFBTSxlQUFlLENBQUM7OztBQU14RSxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQ1ksTUFBaUIsRUFDakIsZUFBaUM7UUFEakMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7SUFDMUMsQ0FBQztJQUVKOzs7OztPQUtHO0lBQ0gsZ0JBQWdCLENBQUMsR0FBdUI7UUFDdEMsSUFBSSxJQUFJLEdBQW9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDNUQsdUJBQXVCLENBQ0wsQ0FBQztRQUVyQixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IscUVBQXFFO1lBQ3JFLDhDQUE4QztZQUM5QyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDZixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDthQUFNO1lBQ0wsSUFBSSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQsSUFBYyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7O2dIQXBDVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlTWV0YUxpbmtTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTJcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2Fub25pY2FsIGxpbmsgZWxlbWVudCB0byB0aGUgZG9jdW1lbnQgaGVhZC5cbiAgICpcbiAgICogSWYgYW4gaWQgaXMgcHJvdmlkZWQsIHRoZSBsaW5rIHdpbGwgYmUgdXBkYXRlZC5cbiAgICogSWYgbm8gdXJsIGlzIHByb3ZpZGVkLCB0aGUgbGluayBlbGVtZW50IHdpbGwgYmUgZGVsZXRlZC5cbiAgICovXG4gIHNldENhbm9uaWNhbExpbmsodXJsOiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBsZXQgbGluazogSFRNTExpbmtFbGVtZW50ID0gdGhpcy53aW5SZWYuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICdsaW5rW3JlbD1cImNhbm9uaWNhbFwiXSdcbiAgICApIGFzIEhUTUxMaW5rRWxlbWVudDtcblxuICAgIGlmICghdXJsKSB7XG4gICAgICAvLyBSZW1vdmluZyB0aGUgbGluayBpcyBhbiBlZGdlIGNhc2UsIGJ1dCB1c2VmdWwgaWYgdGhlIGNhbm9uaWNhbCB1cmxcbiAgICAgIC8vIGlzIGNyZWF0ZWQgaW4gQ1NSIHdoaWxlIGRldmVsb3BpbmcvdGVzdGluZy5cbiAgICAgIGxpbms/LnJlbW92ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghbGluaykge1xuICAgICAgbGluayA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgbGluay5yZWwgPSAnY2Fub25pY2FsJztcbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy53aW5SZWYuZG9jdW1lbnQuaGVhZCwgbGluayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbms/LnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldCByZW5kZXJlcigpOiBSZW5kZXJlcjIge1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcbiAgfVxufVxuIl19