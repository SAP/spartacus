/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../facade/global-message.service";
export class HttpErrorHandler {
    constructor(globalMessageService, platformId) {
        this.globalMessageService = globalMessageService;
        this.platformId = platformId;
    }
    /**
     * Error handlers are matched by the error `responseStatus` (i.e. 404). On top of the matching status
     * a priority can be added to distinguish multiple handles for the same response status.
     */
    hasMatch(errorResponse) {
        return errorResponse.status === this.responseStatus;
    }
    /**
     * Converts error description to translation key format.
     *
     * Example: 'User is disabled' will be transformed to 'user_is_disabled'.
     */
    getErrorTranslationKey(reason) {
        const translationPrefix = `httpHandlers.badRequest`;
        if (!reason) {
            return `${translationPrefix}PleaseLoginAgain`;
        }
        return `${translationPrefix}.${reason.toLowerCase().replace(/ /g, '_')}`;
    }
    /**
     * Returns true when invoked on the server (SSR).
     *
     * Added in 3.2, depends on the injected `platformId`.
     */
    isSsr() {
        if (this.platformId) {
            return !isPlatformBrowser(this.platformId);
        }
        return false;
    }
}
HttpErrorHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HttpErrorHandler, deps: [{ token: i1.GlobalMessageService }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
HttpErrorHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HttpErrorHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: HttpErrorHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvZ2xvYmFsLW1lc3NhZ2UvaHR0cC1pbnRlcmNlcHRvcnMvaGFuZGxlcnMvaHR0cC1lcnJvci5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU1oRSxNQUFNLE9BQWdCLGdCQUFnQjtJQUNwQyxZQUNZLG9CQUEwQyxFQUNyQixVQUFtQjtRQUR4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQ3JCLGVBQVUsR0FBVixVQUFVLENBQVM7SUFDakQsQ0FBQztJQW1CSjs7O09BR0c7SUFDSCxRQUFRLENBQUMsYUFBZ0M7UUFDdkMsT0FBTyxhQUFhLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxzQkFBc0IsQ0FBQyxNQUFjO1FBQ25DLE1BQU0saUJBQWlCLEdBQUcseUJBQXlCLENBQUM7UUFFcEQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sR0FBRyxpQkFBaUIsa0JBQWtCLENBQUM7U0FDL0M7UUFFRCxPQUFPLEdBQUcsaUJBQWlCLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUMzRSxDQUFDO0lBSUQ7Ozs7T0FJRztJQUNPLEtBQUs7UUFDYixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7NkdBMURtQixnQkFBZ0Isc0RBRzFCLFdBQVc7aUhBSEQsZ0JBQWdCLGNBRnhCLE1BQU07MkZBRUUsZ0JBQWdCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBSUksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBwbGljYWJsZSwgUHJpb3JpdHkgfSBmcm9tICcuLi8uLi8uLi91dGlsL2FwcGxpY2FibGUnO1xuaW1wb3J0IHsgR2xvYmFsTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9mYWNhZGUvZ2xvYmFsLW1lc3NhZ2Uuc2VydmljZSc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHR0cEVycm9ySGFuZGxlciBpbXBsZW1lbnRzIEFwcGxpY2FibGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkPzogT2JqZWN0XG4gICkge31cblxuICAvKipcbiAgICogVGhlIGh0dHAgcmVzcG9uc2Ugc3RhdHVzIG51bWJlciB3aGljaCBpcyBoYW5kbGVkIGJ5IHRoaXMgaGFuZGxlci5cbiAgICogSW1wbGVtZW50YXRpb25zIGNhbiBzZXQgdGhlIHJlc3BvbnNlIHN0YXR1cyBudW1iZXIsIGkuZS4gNDA0LCBzbyB0aGF0XG4gICAqIHRoZSBoYW5kbGVyIGNhbiBiZSBmb3VuZCBieSB0aGUgZXJyb3IgaW50ZXJjZXB0b3IuXG4gICAqL1xuICByZXNwb25zZVN0YXR1cz86IG51bWJlcjtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZXJyb3IgcmVzcG9uc2UgZm9yIHRoZSByZXNwb25zZSBzdGF0dXMgdGhhdCBpcyByZWdpc3RlciBmb3IgdGhlIGhhbmRsZXJcbiAgICogQHBhcmFtIHsgSHR0cFJlcXVlc3Q8YW55PiB9IHJlcXVlc3QgOiBodHRwIHJlcXVlc3RcbiAgICogQHBhcmFtIHsgSHR0cEVycm9yUmVzcG9uc2UgfSBlcnJvclJlc3BvbnNlIDogSHR0cCBlcnJvciByZXNwb25zZVxuICAgKi9cbiAgYWJzdHJhY3QgaGFuZGxlRXJyb3IoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBlcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZVxuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBFcnJvciBoYW5kbGVycyBhcmUgbWF0Y2hlZCBieSB0aGUgZXJyb3IgYHJlc3BvbnNlU3RhdHVzYCAoaS5lLiA0MDQpLiBPbiB0b3Agb2YgdGhlIG1hdGNoaW5nIHN0YXR1c1xuICAgKiBhIHByaW9yaXR5IGNhbiBiZSBhZGRlZCB0byBkaXN0aW5ndWlzaCBtdWx0aXBsZSBoYW5kbGVzIGZvciB0aGUgc2FtZSByZXNwb25zZSBzdGF0dXMuXG4gICAqL1xuICBoYXNNYXRjaChlcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlcnJvclJlc3BvbnNlLnN0YXR1cyA9PT0gdGhpcy5yZXNwb25zZVN0YXR1cztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBlcnJvciBkZXNjcmlwdGlvbiB0byB0cmFuc2xhdGlvbiBrZXkgZm9ybWF0LlxuICAgKlxuICAgKiBFeGFtcGxlOiAnVXNlciBpcyBkaXNhYmxlZCcgd2lsbCBiZSB0cmFuc2Zvcm1lZCB0byAndXNlcl9pc19kaXNhYmxlZCcuXG4gICAqL1xuICBnZXRFcnJvclRyYW5zbGF0aW9uS2V5KHJlYXNvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB0cmFuc2xhdGlvblByZWZpeCA9IGBodHRwSGFuZGxlcnMuYmFkUmVxdWVzdGA7XG5cbiAgICBpZiAoIXJlYXNvbikge1xuICAgICAgcmV0dXJuIGAke3RyYW5zbGF0aW9uUHJlZml4fVBsZWFzZUxvZ2luQWdhaW5gO1xuICAgIH1cblxuICAgIHJldHVybiBgJHt0cmFuc2xhdGlvblByZWZpeH0uJHtyZWFzb24udG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICdfJyl9YDtcbiAgfVxuXG4gIGFic3RyYWN0IGdldFByaW9yaXR5PygpOiBQcmlvcml0eTtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gaW52b2tlZCBvbiB0aGUgc2VydmVyIChTU1IpLlxuICAgKlxuICAgKiBBZGRlZCBpbiAzLjIsIGRlcGVuZHMgb24gdGhlIGluamVjdGVkIGBwbGF0Zm9ybUlkYC5cbiAgICovXG4gIHByb3RlY3RlZCBpc1NzcigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wbGF0Zm9ybUlkKSB7XG4gICAgICByZXR1cm4gIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19