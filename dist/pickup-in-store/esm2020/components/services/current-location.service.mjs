/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * A service to wrap the browser's current position API.
 */
export class CurrentLocationService {
    constructor(windowRef) {
        this.windowRef = windowRef;
        // Intentional empty constructor
    }
    /**
     * Obtains the user's current position for the browser and calls the provided callback with it.
     *
     * @param successCallback - A callback to be called with the current location.
     * @param errorCallback - A callback to be called with the error.
     * @param options - Options for the current position API.
     */
    getCurrentLocation(successCallback, errorCallback, options) {
        this.windowRef.nativeWindow?.navigator?.geolocation?.getCurrentPosition(successCallback, errorCallback, options);
    }
}
CurrentLocationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentLocationService, deps: [{ token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentLocationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentLocationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentLocationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1sb2NhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb21wb25lbnRzL3NlcnZpY2VzL2N1cnJlbnQtbG9jYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRzNDOztHQUVHO0FBSUgsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFzQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3hDLGdDQUFnQztJQUNsQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsa0JBQWtCLENBQ2hCLGVBQWlDLEVBQ2pDLGFBQTRDLEVBQzVDLE9BQXlCO1FBRXpCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLENBQ3JFLGVBQWUsRUFDZixhQUFhLEVBQ2IsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDOzttSEF0QlUsc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FGckIsTUFBTTsyRkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuLyoqXG4gKiBBIHNlcnZpY2UgdG8gd3JhcCB0aGUgYnJvd3NlcidzIGN1cnJlbnQgcG9zaXRpb24gQVBJLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVudExvY2F0aW9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB3aW5kb3dSZWY6IFdpbmRvd1JlZikge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICAvKipcbiAgICogT2J0YWlucyB0aGUgdXNlcidzIGN1cnJlbnQgcG9zaXRpb24gZm9yIHRoZSBicm93c2VyIGFuZCBjYWxscyB0aGUgcHJvdmlkZWQgY2FsbGJhY2sgd2l0aCBpdC5cbiAgICpcbiAgICogQHBhcmFtIHN1Y2Nlc3NDYWxsYmFjayAtIEEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgbG9jYXRpb24uXG4gICAqIEBwYXJhbSBlcnJvckNhbGxiYWNrIC0gQSBjYWxsYmFjayB0byBiZSBjYWxsZWQgd2l0aCB0aGUgZXJyb3IuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGN1cnJlbnQgcG9zaXRpb24gQVBJLlxuICAgKi9cbiAgZ2V0Q3VycmVudExvY2F0aW9uKFxuICAgIHN1Y2Nlc3NDYWxsYmFjazogUG9zaXRpb25DYWxsYmFjayxcbiAgICBlcnJvckNhbGxiYWNrPzogUG9zaXRpb25FcnJvckNhbGxiYWNrIHwgbnVsbCxcbiAgICBvcHRpb25zPzogUG9zaXRpb25PcHRpb25zXG4gICk6IHZvaWQge1xuICAgIHRoaXMud2luZG93UmVmLm5hdGl2ZVdpbmRvdz8ubmF2aWdhdG9yPy5nZW9sb2NhdGlvbj8uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgc3VjY2Vzc0NhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFjayxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuICB9XG59XG4iXX0=