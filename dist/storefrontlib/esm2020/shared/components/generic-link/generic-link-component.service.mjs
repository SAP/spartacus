/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GenericLinkComponentService {
    constructor() {
        /**
         * Pattern matching string starting with `http://` or `https://`.
         */
        this.HTTP_PROTOCOL_REGEX = /^https?:\/\//i;
        /**
         * Pattern matching string starting with `mailto:`.
         */
        this.MAILTO_PROTOCOL_REGEX = /^mailto:/i;
        /**
         * Pattern matching string starting with `tel:`.
         */
        this.TEL_PROTOCOL_REGEX = /^tel:/i;
    }
    /**
     * Returns true when the @Input `url` is a string starting with `http://`, `https://`, `mailto:`, `tel:`.
     */
    isExternalUrl(url) {
        return (typeof url === 'string' &&
            (this.HTTP_PROTOCOL_REGEX.test(url) ||
                this.MAILTO_PROTOCOL_REGEX.test(url) ||
                this.TEL_PROTOCOL_REGEX.test(url)));
    }
}
GenericLinkComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GenericLinkComponentService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GenericLinkComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GenericLinkComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GenericLinkComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpYy1saW5rLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9nZW5lcmljLWxpbmsvZ2VuZXJpYy1saW5rLWNvbXBvbmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sMkJBQTJCO0lBSHhDO1FBSUU7O1dBRUc7UUFDTyx3QkFBbUIsR0FBVyxlQUFlLENBQUM7UUFFeEQ7O1dBRUc7UUFDTywwQkFBcUIsR0FBVyxXQUFXLENBQUM7UUFFdEQ7O1dBRUc7UUFDTyx1QkFBa0IsR0FBVyxRQUFRLENBQUM7S0FhakQ7SUFYQzs7T0FFRztJQUNILGFBQWEsQ0FBQyxHQUFtQjtRQUMvQixPQUFPLENBQ0wsT0FBTyxHQUFHLEtBQUssUUFBUTtZQUN2QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNqQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNyQyxDQUFDO0lBQ0osQ0FBQzs7d0hBMUJVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRjFCLE1BQU07MkZBRVAsMkJBQTJCO2tCQUh2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdlbmVyaWNMaW5rQ29tcG9uZW50U2VydmljZSB7XG4gIC8qKlxuICAgKiBQYXR0ZXJuIG1hdGNoaW5nIHN0cmluZyBzdGFydGluZyB3aXRoIGBodHRwOi8vYCBvciBgaHR0cHM6Ly9gLlxuICAgKi9cbiAgcHJvdGVjdGVkIEhUVFBfUFJPVE9DT0xfUkVHRVg6IFJlZ0V4cCA9IC9eaHR0cHM/OlxcL1xcLy9pO1xuXG4gIC8qKlxuICAgKiBQYXR0ZXJuIG1hdGNoaW5nIHN0cmluZyBzdGFydGluZyB3aXRoIGBtYWlsdG86YC5cbiAgICovXG4gIHByb3RlY3RlZCBNQUlMVE9fUFJPVE9DT0xfUkVHRVg6IFJlZ0V4cCA9IC9ebWFpbHRvOi9pO1xuXG4gIC8qKlxuICAgKiBQYXR0ZXJuIG1hdGNoaW5nIHN0cmluZyBzdGFydGluZyB3aXRoIGB0ZWw6YC5cbiAgICovXG4gIHByb3RlY3RlZCBURUxfUFJPVE9DT0xfUkVHRVg6IFJlZ0V4cCA9IC9edGVsOi9pO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgQElucHV0IGB1cmxgIGlzIGEgc3RyaW5nIHN0YXJ0aW5nIHdpdGggYGh0dHA6Ly9gLCBgaHR0cHM6Ly9gLCBgbWFpbHRvOmAsIGB0ZWw6YC5cbiAgICovXG4gIGlzRXh0ZXJuYWxVcmwodXJsOiBzdHJpbmcgfCBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0eXBlb2YgdXJsID09PSAnc3RyaW5nJyAmJlxuICAgICAgKHRoaXMuSFRUUF9QUk9UT0NPTF9SRUdFWC50ZXN0KHVybCkgfHxcbiAgICAgICAgdGhpcy5NQUlMVE9fUFJPVE9DT0xfUkVHRVgudGVzdCh1cmwpIHx8XG4gICAgICAgIHRoaXMuVEVMX1BST1RPQ09MX1JFR0VYLnRlc3QodXJsKSlcbiAgICApO1xuICB9XG59XG4iXX0=