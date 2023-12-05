/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Context source for `CartItemComponent`.
 *
 * `CartItemContext` should be injected instead in child components.
 */
export class CartItemContextSource {
    constructor() {
        this.compact$ = new ReplaySubject(1);
        this.readonly$ = new ReplaySubject(1);
        this.item$ = new ReplaySubject(1);
        this.quantityControl$ = new ReplaySubject(1);
        this.location$ = new ReplaySubject(1);
        this.options$ = new ReplaySubject(1);
    }
}
CartItemContextSource.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemContextSource, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CartItemContextSource.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemContextSource });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemContextSource, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1pdGVtLWNvbnRleHQtc291cmNlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtc2hhcmVkL2NhcnQtaXRlbS9tb2RlbC9jYXJ0LWl0ZW0tY29udGV4dC1zb3VyY2UubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFFckM7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFEbEM7UUFFVyxhQUFRLEdBQUcsSUFBSSxhQUFhLENBQVUsQ0FBQyxDQUFDLENBQUM7UUFFekMsY0FBUyxHQUFHLElBQUksYUFBYSxDQUFVLENBQUMsQ0FBQyxDQUFDO1FBRTFDLFVBQUssR0FBRyxJQUFJLGFBQWEsQ0FBYSxDQUFDLENBQUMsQ0FBQztRQUV6QyxxQkFBZ0IsR0FBRyxJQUFJLGFBQWEsQ0FBcUIsQ0FBQyxDQUFDLENBQUM7UUFFNUQsY0FBUyxHQUFHLElBQUksYUFBYSxDQUFvQixDQUFDLENBQUMsQ0FBQztRQUVwRCxhQUFRLEdBQUcsSUFBSSxhQUFhLENBQTJCLENBQUMsQ0FBQyxDQUFDO0tBQ3BFOztrSEFaWSxxQkFBcUI7c0hBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQ2FydEl0ZW1Db21wb25lbnRPcHRpb25zLFxuICBDYXJ0SXRlbUNvbnRleHQsXG4gIE9yZGVyRW50cnksXG4gIFByb21vdGlvbkxvY2F0aW9uLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBDb250ZXh0IHNvdXJjZSBmb3IgYENhcnRJdGVtQ29tcG9uZW50YC5cbiAqXG4gKiBgQ2FydEl0ZW1Db250ZXh0YCBzaG91bGQgYmUgaW5qZWN0ZWQgaW5zdGVhZCBpbiBjaGlsZCBjb21wb25lbnRzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FydEl0ZW1Db250ZXh0U291cmNlIGltcGxlbWVudHMgQ2FydEl0ZW1Db250ZXh0IHtcbiAgcmVhZG9ubHkgY29tcGFjdCQgPSBuZXcgUmVwbGF5U3ViamVjdDxib29sZWFuPigxKTtcblxuICByZWFkb25seSByZWFkb25seSQgPSBuZXcgUmVwbGF5U3ViamVjdDxib29sZWFuPigxKTtcblxuICByZWFkb25seSBpdGVtJCA9IG5ldyBSZXBsYXlTdWJqZWN0PE9yZGVyRW50cnk+KDEpO1xuXG4gIHJlYWRvbmx5IHF1YW50aXR5Q29udHJvbCQgPSBuZXcgUmVwbGF5U3ViamVjdDxVbnR5cGVkRm9ybUNvbnRyb2w+KDEpO1xuXG4gIHJlYWRvbmx5IGxvY2F0aW9uJCA9IG5ldyBSZXBsYXlTdWJqZWN0PFByb21vdGlvbkxvY2F0aW9uPigxKTtcblxuICByZWFkb25seSBvcHRpb25zJCA9IG5ldyBSZXBsYXlTdWJqZWN0PENhcnRJdGVtQ29tcG9uZW50T3B0aW9ucz4oMSk7XG59XG4iXX0=