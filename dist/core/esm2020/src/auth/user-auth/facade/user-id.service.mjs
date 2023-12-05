/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT, } from '../../../occ/utils/occ-constants';
import * as i0 from "@angular/core";
/**
 * This implementation is OCC specific.
 * Different backend might have completely different need regarding user id.
 * It might not need user id at all and work based on access_token.
 * To implement custom solution provide your own implementation and customize services that use UserIdService
 */
export class UserIdService {
    constructor() {
        this._userId = new ReplaySubject(1);
    }
    /**
     * Sets current user id.
     *
     * @param userId
     */
    setUserId(userId) {
        this._userId.next(userId);
    }
    /**
     * This function provides the userId the OCC calls should use, depending
     * on whether there is an active storefront session or not.
     *
     * It returns the userId of the current storefront user or 'anonymous'
     * in the case there are no signed in user in the storefront.
     *
     * The user id of a regular customer session is 'current'. In the case of an
     * asm customer emulation session, the userId will be the customerId.
     */
    getUserId() {
        return this._userId;
    }
    /**
     * Utility method if you need userId to perform single action (eg. dispatch call to API).
     *
     * @param loggedIn Set to true if you want the observable to emit id only for logged in user. Throws in case of anonymous user.
     *
     * @returns Observable that emits once and completes with the last userId value.
     */
    takeUserId(loggedIn = false) {
        return this.getUserId().pipe(take(1), map((userId) => {
            if (loggedIn && userId === OCC_USER_ID_ANONYMOUS) {
                throw new Error('Requested user id for logged user while user is not logged in.');
            }
            return userId;
        }));
    }
    /**
     * Sets user id to the default value for logged out user.
     */
    clearUserId() {
        this.setUserId(OCC_USER_ID_ANONYMOUS);
    }
    /**
     * Checks if the userId is of emulated user type.
     */
    isEmulated() {
        return this.getUserId().pipe(map((userId) => userId !== OCC_USER_ID_ANONYMOUS && userId !== OCC_USER_ID_CURRENT));
    }
}
UserIdService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserIdService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserIdService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserIdService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserIdService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC91c2VyLWF1dGgvZmFjYWRlL3VzZXItaWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUNMLHFCQUFxQixFQUNyQixtQkFBbUIsR0FDcEIsTUFBTSxrQ0FBa0MsQ0FBQzs7QUFFMUM7Ozs7O0dBS0c7QUFJSCxNQUFNLE9BQU8sYUFBYTtJQUgxQjtRQUlVLFlBQU8sR0FBdUIsSUFBSSxhQUFhLENBQVMsQ0FBQyxDQUFDLENBQUM7S0FnRXBFO0lBOURDOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsTUFBYztRQUM1QixJQUFJLENBQUMsT0FBaUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNJLFNBQVM7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSztRQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNiLElBQUksUUFBUSxJQUFJLE1BQU0sS0FBSyxxQkFBcUIsRUFBRTtnQkFDaEQsTUFBTSxJQUFJLEtBQUssQ0FDYixnRUFBZ0UsQ0FDakUsQ0FBQzthQUNIO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLFdBQVc7UUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQzFCLEdBQUcsQ0FDRCxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ1QsTUFBTSxLQUFLLHFCQUFxQixJQUFJLE1BQU0sS0FBSyxtQkFBbUIsQ0FDckUsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7MEdBaEVVLGFBQWE7OEdBQWIsYUFBYSxjQUZaLE1BQU07MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMsXG4gIE9DQ19VU0VSX0lEX0NVUlJFTlQsXG59IGZyb20gJy4uLy4uLy4uL29jYy91dGlscy9vY2MtY29uc3RhbnRzJztcblxuLyoqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIGlzIE9DQyBzcGVjaWZpYy5cbiAqIERpZmZlcmVudCBiYWNrZW5kIG1pZ2h0IGhhdmUgY29tcGxldGVseSBkaWZmZXJlbnQgbmVlZCByZWdhcmRpbmcgdXNlciBpZC5cbiAqIEl0IG1pZ2h0IG5vdCBuZWVkIHVzZXIgaWQgYXQgYWxsIGFuZCB3b3JrIGJhc2VkIG9uIGFjY2Vzc190b2tlbi5cbiAqIFRvIGltcGxlbWVudCBjdXN0b20gc29sdXRpb24gcHJvdmlkZSB5b3VyIG93biBpbXBsZW1lbnRhdGlvbiBhbmQgY3VzdG9taXplIHNlcnZpY2VzIHRoYXQgdXNlIFVzZXJJZFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJJZFNlcnZpY2Uge1xuICBwcml2YXRlIF91c2VySWQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IG5ldyBSZXBsYXlTdWJqZWN0PHN0cmluZz4oMSk7XG5cbiAgLyoqXG4gICAqIFNldHMgY3VycmVudCB1c2VyIGlkLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkXG4gICAqL1xuICBwdWJsaWMgc2V0VXNlcklkKHVzZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgKHRoaXMuX3VzZXJJZCBhcyBSZXBsYXlTdWJqZWN0PHN0cmluZz4pLm5leHQodXNlcklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHByb3ZpZGVzIHRoZSB1c2VySWQgdGhlIE9DQyBjYWxscyBzaG91bGQgdXNlLCBkZXBlbmRpbmdcbiAgICogb24gd2hldGhlciB0aGVyZSBpcyBhbiBhY3RpdmUgc3RvcmVmcm9udCBzZXNzaW9uIG9yIG5vdC5cbiAgICpcbiAgICogSXQgcmV0dXJucyB0aGUgdXNlcklkIG9mIHRoZSBjdXJyZW50IHN0b3JlZnJvbnQgdXNlciBvciAnYW5vbnltb3VzJ1xuICAgKiBpbiB0aGUgY2FzZSB0aGVyZSBhcmUgbm8gc2lnbmVkIGluIHVzZXIgaW4gdGhlIHN0b3JlZnJvbnQuXG4gICAqXG4gICAqIFRoZSB1c2VyIGlkIG9mIGEgcmVndWxhciBjdXN0b21lciBzZXNzaW9uIGlzICdjdXJyZW50Jy4gSW4gdGhlIGNhc2Ugb2YgYW5cbiAgICogYXNtIGN1c3RvbWVyIGVtdWxhdGlvbiBzZXNzaW9uLCB0aGUgdXNlcklkIHdpbGwgYmUgdGhlIGN1c3RvbWVySWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0VXNlcklkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3VzZXJJZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IG1ldGhvZCBpZiB5b3UgbmVlZCB1c2VySWQgdG8gcGVyZm9ybSBzaW5nbGUgYWN0aW9uIChlZy4gZGlzcGF0Y2ggY2FsbCB0byBBUEkpLlxuICAgKlxuICAgKiBAcGFyYW0gbG9nZ2VkSW4gU2V0IHRvIHRydWUgaWYgeW91IHdhbnQgdGhlIG9ic2VydmFibGUgdG8gZW1pdCBpZCBvbmx5IGZvciBsb2dnZWQgaW4gdXNlci4gVGhyb3dzIGluIGNhc2Ugb2YgYW5vbnltb3VzIHVzZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgdGhhdCBlbWl0cyBvbmNlIGFuZCBjb21wbGV0ZXMgd2l0aCB0aGUgbGFzdCB1c2VySWQgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgdGFrZVVzZXJJZChsb2dnZWRJbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRVc2VySWQoKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIG1hcCgodXNlcklkKSA9PiB7XG4gICAgICAgIGlmIChsb2dnZWRJbiAmJiB1c2VySWQgPT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdSZXF1ZXN0ZWQgdXNlciBpZCBmb3IgbG9nZ2VkIHVzZXIgd2hpbGUgdXNlciBpcyBub3QgbG9nZ2VkIGluLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1c2VySWQ7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1c2VyIGlkIHRvIHRoZSBkZWZhdWx0IHZhbHVlIGZvciBsb2dnZWQgb3V0IHVzZXIuXG4gICAqL1xuICBwdWJsaWMgY2xlYXJVc2VySWQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRVc2VySWQoT0NDX1VTRVJfSURfQU5PTllNT1VTKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHVzZXJJZCBpcyBvZiBlbXVsYXRlZCB1c2VyIHR5cGUuXG4gICAqL1xuICBwdWJsaWMgaXNFbXVsYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRVc2VySWQoKS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAodXNlcklkKSA9PlxuICAgICAgICAgIHVzZXJJZCAhPT0gT0NDX1VTRVJfSURfQU5PTllNT1VTICYmIHVzZXJJZCAhPT0gT0NDX1VTRVJfSURfQ1VSUkVOVFxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==