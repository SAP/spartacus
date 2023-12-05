/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, isDevMode, PLATFORM_ID, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../config";
export class JsonLdScriptFactory {
    constructor(platformId, winRef, rendererFactory, config) {
        this.platformId = platformId;
        this.winRef = winRef;
        this.rendererFactory = rendererFactory;
        this.config = config;
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }
    build(schema) {
        if (schema && this.isJsonLdRequired()) {
            this.getJsonLdScriptElement().textContent = this.escapeHtml(schema);
        }
    }
    /**
     * Indicates whether json ld data should be generated.
     *
     * This is only required on the server, but can be enabled in dev mode.
     */
    isJsonLdRequired() {
        return (!isPlatformBrowser(this.platformId) ||
            (isDevMode() && !this.config.seo?.structuredData?.disableInDevMode));
    }
    /**
     * Creates a json-ld script element. The element is created one, and appended
     * to the html body element.
     *
     * ```html
     * <script id="json-ld" type="application/ld+json">
     * </script>
     * ```
     */
    getJsonLdScriptElement() {
        const id = 'json-ld';
        let scriptElement = (this.winRef.document.getElementById(id));
        if (!scriptElement) {
            const script = this.renderer.createElement('script');
            script.id = id;
            script.type = 'application/ld+json';
            this.renderer.appendChild(this.winRef.document.body, script);
            scriptElement = script;
        }
        return scriptElement;
    }
    /**
     * Secure the given json-ld schema by encoding html characters (aka escaping), eg: <script> becomes &lt;script&gt;
     *
     * The given schema is not trusted, as malicious code could be injected (XSS)
     * into the json-ld script.
     */
    escapeHtml(schema) {
        const div = this.renderer.createElement('div');
        div.textContent = JSON.stringify(schema);
        return div.innerHTML;
    }
}
JsonLdScriptFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdScriptFactory, deps: [{ token: PLATFORM_ID }, { token: i1.WindowRef }, { token: i0.RendererFactory2 }, { token: i2.SeoConfig }], target: i0.ɵɵFactoryTarget.Injectable });
JsonLdScriptFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdScriptFactory, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdScriptFactory, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i1.WindowRef }, { type: i0.RendererFactory2 }, { type: i2.SeoConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1sZC1zY3JpcHQuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9zZW8vc3RydWN0dXJlZC1kYXRhL2pzb24tbGQtc2NyaXB0LmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsRUFDVCxXQUFXLEdBR1osTUFBTSxlQUFlLENBQUM7Ozs7QUFPdkIsTUFBTSxPQUFPLG1CQUFtQjtJQU05QixZQUNpQyxVQUFrQixFQUN2QyxNQUFpQixFQUNqQixlQUFpQyxFQUNqQyxNQUFpQjtRQUhJLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQVRuQixhQUFRLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQ2pFLElBQUksRUFDSixJQUFJLENBQ0wsQ0FBQztJQU9DLENBQUM7SUFFSixLQUFLLENBQUMsTUFBWTtRQUNoQixJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyRTtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0JBQWdCO1FBQ2QsT0FBTyxDQUNMLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLENBQ3BFLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDTyxzQkFBc0I7UUFDOUIsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLElBQUksYUFBYSxHQUF5QyxDQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQ3hDLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE1BQU0sTUFBTSxHQUFzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RSxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUM7WUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdELGFBQWEsR0FBRyxNQUFNLENBQUM7U0FDeEI7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxVQUFVLENBQUMsTUFBVTtRQUNuQixNQUFNLEdBQUcsR0FBc0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEUsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDOztnSEFsRVUsbUJBQW1CLGtCQU9wQixXQUFXO29IQVBWLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQVFJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgaXNEZXZNb2RlLFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxuICBSZW5kZXJlckZhY3RvcnkyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTZW9Db25maWcgfSBmcm9tICcuLi9jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSnNvbkxkU2NyaXB0RmFjdG9yeSB7XG4gIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyID0gdGhpcy5yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIoXG4gICAgbnVsbCxcbiAgICBudWxsXG4gICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJvdGVjdGVkIHBsYXRmb3JtSWQ6IHN0cmluZyxcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBTZW9Db25maWdcbiAgKSB7fVxuXG4gIGJ1aWxkKHNjaGVtYToge31bXSk6IHZvaWQge1xuICAgIGlmIChzY2hlbWEgJiYgdGhpcy5pc0pzb25MZFJlcXVpcmVkKCkpIHtcbiAgICAgIHRoaXMuZ2V0SnNvbkxkU2NyaXB0RWxlbWVudCgpLnRleHRDb250ZW50ID0gdGhpcy5lc2NhcGVIdG1sKHNjaGVtYSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIGpzb24gbGQgZGF0YSBzaG91bGQgYmUgZ2VuZXJhdGVkLlxuICAgKlxuICAgKiBUaGlzIGlzIG9ubHkgcmVxdWlyZWQgb24gdGhlIHNlcnZlciwgYnV0IGNhbiBiZSBlbmFibGVkIGluIGRldiBtb2RlLlxuICAgKi9cbiAgaXNKc29uTGRSZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgfHxcbiAgICAgIChpc0Rldk1vZGUoKSAmJiAhdGhpcy5jb25maWcuc2VvPy5zdHJ1Y3R1cmVkRGF0YT8uZGlzYWJsZUluRGV2TW9kZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBqc29uLWxkIHNjcmlwdCBlbGVtZW50LiBUaGUgZWxlbWVudCBpcyBjcmVhdGVkIG9uZSwgYW5kIGFwcGVuZGVkXG4gICAqIHRvIHRoZSBodG1sIGJvZHkgZWxlbWVudC5cbiAgICpcbiAgICogYGBgaHRtbFxuICAgKiA8c2NyaXB0IGlkPVwianNvbi1sZFwiIHR5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCI+XG4gICAqIDwvc2NyaXB0PlxuICAgKiBgYGBcbiAgICovXG4gIHByb3RlY3RlZCBnZXRKc29uTGRTY3JpcHRFbGVtZW50KCk6IEhUTUxTY3JpcHRFbGVtZW50IHtcbiAgICBjb25zdCBpZCA9ICdqc29uLWxkJztcbiAgICBsZXQgc2NyaXB0RWxlbWVudDogSFRNTFNjcmlwdEVsZW1lbnQgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+KFxuICAgICAgdGhpcy53aW5SZWYuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG4gICAgKTtcblxuICAgIGlmICghc2NyaXB0RWxlbWVudCkge1xuICAgICAgY29uc3Qgc2NyaXB0OiBIVE1MU2NyaXB0RWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQuaWQgPSBpZDtcbiAgICAgIHNjcmlwdC50eXBlID0gJ2FwcGxpY2F0aW9uL2xkK2pzb24nO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLndpblJlZi5kb2N1bWVudC5ib2R5LCBzY3JpcHQpO1xuICAgICAgc2NyaXB0RWxlbWVudCA9IHNjcmlwdDtcbiAgICB9XG4gICAgcmV0dXJuIHNjcmlwdEVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogU2VjdXJlIHRoZSBnaXZlbiBqc29uLWxkIHNjaGVtYSBieSBlbmNvZGluZyBodG1sIGNoYXJhY3RlcnMgKGFrYSBlc2NhcGluZyksIGVnOiA8c2NyaXB0PiBiZWNvbWVzICZsdDtzY3JpcHQmZ3Q7XG4gICAqXG4gICAqIFRoZSBnaXZlbiBzY2hlbWEgaXMgbm90IHRydXN0ZWQsIGFzIG1hbGljaW91cyBjb2RlIGNvdWxkIGJlIGluamVjdGVkIChYU1MpXG4gICAqIGludG8gdGhlIGpzb24tbGQgc2NyaXB0LlxuICAgKi9cbiAgZXNjYXBlSHRtbChzY2hlbWE6IHt9KTogc3RyaW5nIHtcbiAgICBjb25zdCBkaXY6IEhUTUxTY3JpcHRFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYudGV4dENvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShzY2hlbWEpO1xuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xuICB9XG59XG4iXX0=