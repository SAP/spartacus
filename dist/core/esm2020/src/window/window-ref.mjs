/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '../util/ssr.tokens';
import * as i0 from "@angular/core";
export class WindowRef {
    constructor(
    // https://github.com/angular/angular/issues/20351
    document, platformId, serverUrl, serverOrigin) {
        this.platformId = platformId;
        this.serverUrl = serverUrl;
        this.serverOrigin = serverOrigin;
        this.document = document;
    }
    /**
     * Returns true when invoked in browser context.
     * Use this method to check if you can access `window` and other browser globals.
     */
    isBrowser() {
        return isPlatformBrowser(this.platformId);
    }
    /**
     * Exposes global `window` object. In SSR when `window` is not available it returns `undefined`.
     * To detect if you can safely use `nativeWindow` use `isBrowser` to check execution platform.
     */
    get nativeWindow() {
        // TODO(#11133): Consider throwing in SSR
        return this.isBrowser() ? window : undefined;
    }
    /**
     * Exposes global `sessionStorage` object. In SSR when `sessionStorage` is not available it returns `undefined`.
     * To detect if you can safely use `sessionStorage` use `isBrowser` to check execution platform.
     */
    get sessionStorage() {
        return this.nativeWindow ? this.nativeWindow.sessionStorage : undefined;
    }
    /**
     * Exposes global `localStorage` object. In SSR when `localStorage` is not available it returns `undefined`.
     * To detect if you can safely use `localStorage` use `isBrowser` to check execution platform.
     */
    get localStorage() {
        return this.nativeWindow ? this.nativeWindow.localStorage : undefined;
    }
    /**
     * Returns the window/document location, unless it's not available (i.e. SSR).
     *
     * When there's no access to the location object, we mimic the location partially, by resolving
     * the request url (`SERVER_REQUEST_URL`) and origin (`SERVER_REQUEST_ORIGIN`) from the injector.
     * These values are injected in the server implementation so that we can resolve some of the location
     * values when we do server side rendering.
     */
    get location() {
        if (this.isBrowser()) {
            return this.document.location;
        }
        else {
            if (!this.serverUrl) {
                throw new Error('Cannot resolve the href as the SERVER_REQUEST_URL is undefined');
            }
            if (!this.serverOrigin) {
                throw new Error('Cannot resolve the origin as the SERVER_REQUEST_ORIGIN is undefined');
            }
            return {
                href: this.serverUrl,
                origin: this.serverOrigin,
            };
        }
    }
    /**
     * Returns an observable for the window resize event and emits an event
     * every 300ms in case of resizing. An event is simulated initially.
     *
     * If there's no window object available (i.e. in SSR), a null value is emitted.
     */
    get resize$() {
        if (!this.nativeWindow) {
            return of(null);
        }
        else {
            return fromEvent(this.nativeWindow, 'resize').pipe(debounceTime(300), startWith({ target: this.nativeWindow }), distinctUntilChanged());
        }
    }
}
WindowRef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WindowRef, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: SERVER_REQUEST_URL, optional: true }, { token: SERVER_REQUEST_ORIGIN, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
WindowRef.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WindowRef, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WindowRef, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [SERVER_REQUEST_URL]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [SERVER_REQUEST_ORIGIN]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LXJlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3dpbmRvdy93aW5kb3ctcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsU0FBUyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUsvRSxNQUFNLE9BQU8sU0FBUztJQUdwQjtJQUNFLGtEQUFrRDtJQUNoQyxRQUFhLEVBQ0EsVUFBa0IsRUFDQyxTQUFrQixFQUNmLFlBQXFCO1FBRjNDLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDQyxjQUFTLEdBQVQsU0FBUyxDQUFTO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQVM7UUFFMUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFvQixDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksWUFBWTtRQUNkLHlDQUF5QztRQUN6QyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILElBQUksUUFBUTtRQUNWLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7U0FDL0I7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNuQixNQUFNLElBQUksS0FBSyxDQUNiLGdFQUFnRSxDQUNqRSxDQUFDO2FBQ0g7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FDYixxRUFBcUUsQ0FDdEUsQ0FBQzthQUNIO1lBQ0QsT0FBTztnQkFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWTthQUMxQixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLE9BQU87UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjthQUFNO1lBQ0wsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQ2hELFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUN4QyxvQkFBb0IsRUFBRSxDQUN2QixDQUFDO1NBQ0g7SUFDSCxDQUFDOztzR0EzRlUsU0FBUyxrQkFLVixRQUFRLGFBQ1IsV0FBVyxhQUNDLGtCQUFrQiw2QkFDbEIscUJBQXFCOzBHQVJoQyxTQUFTLGNBRlIsTUFBTTsyRkFFUCxTQUFTO2tCQUhyQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBTUksTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGtCQUFrQjs7MEJBQ3JDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTRVJWRVJfUkVRVUVTVF9PUklHSU4sIFNFUlZFUl9SRVFVRVNUX1VSTCB9IGZyb20gJy4uL3V0aWwvc3NyLnRva2Vucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBXaW5kb3dSZWYge1xuICByZWFkb25seSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjAzNTFcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChTRVJWRVJfUkVRVUVTVF9VUkwpIHByb3RlY3RlZCBzZXJ2ZXJVcmw/OiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChTRVJWRVJfUkVRVUVTVF9PUklHSU4pIHByb3RlY3RlZCBzZXJ2ZXJPcmlnaW4/OiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50IGFzIERvY3VtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSB3aGVuIGludm9rZWQgaW4gYnJvd3NlciBjb250ZXh0LlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gY2hlY2sgaWYgeW91IGNhbiBhY2Nlc3MgYHdpbmRvd2AgYW5kIG90aGVyIGJyb3dzZXIgZ2xvYmFscy5cbiAgICovXG4gIGlzQnJvd3NlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvc2VzIGdsb2JhbCBgd2luZG93YCBvYmplY3QuIEluIFNTUiB3aGVuIGB3aW5kb3dgIGlzIG5vdCBhdmFpbGFibGUgaXQgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAgICogVG8gZGV0ZWN0IGlmIHlvdSBjYW4gc2FmZWx5IHVzZSBgbmF0aXZlV2luZG93YCB1c2UgYGlzQnJvd3NlcmAgdG8gY2hlY2sgZXhlY3V0aW9uIHBsYXRmb3JtLlxuICAgKi9cbiAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBXaW5kb3cgfCB1bmRlZmluZWQge1xuICAgIC8vIFRPRE8oIzExMTMzKTogQ29uc2lkZXIgdGhyb3dpbmcgaW4gU1NSXG4gICAgcmV0dXJuIHRoaXMuaXNCcm93c2VyKCkgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3NlcyBnbG9iYWwgYHNlc3Npb25TdG9yYWdlYCBvYmplY3QuIEluIFNTUiB3aGVuIGBzZXNzaW9uU3RvcmFnZWAgaXMgbm90IGF2YWlsYWJsZSBpdCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICAgKiBUbyBkZXRlY3QgaWYgeW91IGNhbiBzYWZlbHkgdXNlIGBzZXNzaW9uU3RvcmFnZWAgdXNlIGBpc0Jyb3dzZXJgIHRvIGNoZWNrIGV4ZWN1dGlvbiBwbGF0Zm9ybS5cbiAgICovXG4gIGdldCBzZXNzaW9uU3RvcmFnZSgpOiBTdG9yYWdlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5uYXRpdmVXaW5kb3cgPyB0aGlzLm5hdGl2ZVdpbmRvdy5zZXNzaW9uU3RvcmFnZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvc2VzIGdsb2JhbCBgbG9jYWxTdG9yYWdlYCBvYmplY3QuIEluIFNTUiB3aGVuIGBsb2NhbFN0b3JhZ2VgIGlzIG5vdCBhdmFpbGFibGUgaXQgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAgICogVG8gZGV0ZWN0IGlmIHlvdSBjYW4gc2FmZWx5IHVzZSBgbG9jYWxTdG9yYWdlYCB1c2UgYGlzQnJvd3NlcmAgdG8gY2hlY2sgZXhlY3V0aW9uIHBsYXRmb3JtLlxuICAgKi9cbiAgZ2V0IGxvY2FsU3RvcmFnZSgpOiBTdG9yYWdlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5uYXRpdmVXaW5kb3cgPyB0aGlzLm5hdGl2ZVdpbmRvdy5sb2NhbFN0b3JhZ2UgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2luZG93L2RvY3VtZW50IGxvY2F0aW9uLCB1bmxlc3MgaXQncyBub3QgYXZhaWxhYmxlIChpLmUuIFNTUikuXG4gICAqXG4gICAqIFdoZW4gdGhlcmUncyBubyBhY2Nlc3MgdG8gdGhlIGxvY2F0aW9uIG9iamVjdCwgd2UgbWltaWMgdGhlIGxvY2F0aW9uIHBhcnRpYWxseSwgYnkgcmVzb2x2aW5nXG4gICAqIHRoZSByZXF1ZXN0IHVybCAoYFNFUlZFUl9SRVFVRVNUX1VSTGApIGFuZCBvcmlnaW4gKGBTRVJWRVJfUkVRVUVTVF9PUklHSU5gKSBmcm9tIHRoZSBpbmplY3Rvci5cbiAgICogVGhlc2UgdmFsdWVzIGFyZSBpbmplY3RlZCBpbiB0aGUgc2VydmVyIGltcGxlbWVudGF0aW9uIHNvIHRoYXQgd2UgY2FuIHJlc29sdmUgc29tZSBvZiB0aGUgbG9jYXRpb25cbiAgICogdmFsdWVzIHdoZW4gd2UgZG8gc2VydmVyIHNpZGUgcmVuZGVyaW5nLlxuICAgKi9cbiAgZ2V0IGxvY2F0aW9uKCk6IFBhcnRpYWw8TG9jYXRpb24+IHtcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQubG9jYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5zZXJ2ZXJVcmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdDYW5ub3QgcmVzb2x2ZSB0aGUgaHJlZiBhcyB0aGUgU0VSVkVSX1JFUVVFU1RfVVJMIGlzIHVuZGVmaW5lZCdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5zZXJ2ZXJPcmlnaW4pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdDYW5ub3QgcmVzb2x2ZSB0aGUgb3JpZ2luIGFzIHRoZSBTRVJWRVJfUkVRVUVTVF9PUklHSU4gaXMgdW5kZWZpbmVkJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdGhpcy5zZXJ2ZXJVcmwsXG4gICAgICAgIG9yaWdpbjogdGhpcy5zZXJ2ZXJPcmlnaW4sXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgZm9yIHRoZSB3aW5kb3cgcmVzaXplIGV2ZW50IGFuZCBlbWl0cyBhbiBldmVudFxuICAgKiBldmVyeSAzMDBtcyBpbiBjYXNlIG9mIHJlc2l6aW5nLiBBbiBldmVudCBpcyBzaW11bGF0ZWQgaW5pdGlhbGx5LlxuICAgKlxuICAgKiBJZiB0aGVyZSdzIG5vIHdpbmRvdyBvYmplY3QgYXZhaWxhYmxlIChpLmUuIGluIFNTUiksIGEgbnVsbCB2YWx1ZSBpcyBlbWl0dGVkLlxuICAgKi9cbiAgZ2V0IHJlc2l6ZSQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoIXRoaXMubmF0aXZlV2luZG93KSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmcm9tRXZlbnQodGhpcy5uYXRpdmVXaW5kb3csICdyZXNpemUnKS5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgICAgc3RhcnRXaXRoKHsgdGFyZ2V0OiB0aGlzLm5hdGl2ZVdpbmRvdyB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==