/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { AuthStorageService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Indicates if auth token is for regular user or CS Agent.
 */
export var TokenTarget;
(function (TokenTarget) {
    TokenTarget["CSAgent"] = "CSAgent";
    TokenTarget["User"] = "User";
})(TokenTarget || (TokenTarget = {}));
/**
 * With AsmAuthStorageService apart from storing the token we also need to store
 * information for which user is the token (regular user or CS Agent).
 *
 * Overrides `AuthStorageService`.
 */
export class AsmAuthStorageService extends AuthStorageService {
    constructor() {
        super(...arguments);
        this._tokenTarget$ = new BehaviorSubject(TokenTarget.User);
    }
    /**
     * Get target user for current auth token.
     *
     * @return observable with TokenTarget
     */
    getTokenTarget() {
        return this._tokenTarget$;
    }
    /**
     * Set new token target.
     *
     * @param tokenTarget
     */
    setTokenTarget(tokenTarget) {
        this._tokenTarget$.next(tokenTarget);
    }
    /**
     * Get token for previously user session, when it was interrupted by CS agent login.
     *
     * @return previously logged in user token.
     */
    getEmulatedUserToken() {
        return this.emulatedUserToken;
    }
    /**
     * Save user token on CS agent login.
     *
     * @param token
     */
    setEmulatedUserToken(token) {
        this.emulatedUserToken = token;
    }
    /**
     * Change token target to CS Agent.
     */
    switchTokenTargetToCSAgent() {
        this._tokenTarget$.next(TokenTarget.CSAgent);
    }
    /**
     * Change token target to user.
     */
    switchTokenTargetToUser() {
        this._tokenTarget$.next(TokenTarget.User);
    }
    /**
     * When we start emulation from the UI (not by ASM login) we can't restore user session on cs agent logout.
     * Only available solution is to drop session we could restore, to avoid account hijack.
     */
    clearEmulatedUserToken() {
        this.emulatedUserToken = undefined;
    }
}
AsmAuthStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthStorageService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
AsmAuthStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWF1dGgtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9yb290L3NlcnZpY2VzL2FzbS1hdXRoLXN0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDOztBQUVuRDs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLFdBR1g7QUFIRCxXQUFZLFdBQVc7SUFDckIsa0NBQW1CLENBQUE7SUFDbkIsNEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxXQUFXLEtBQVgsV0FBVyxRQUd0QjtBQUVEOzs7OztHQUtHO0FBSUgsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGtCQUFrQjtJQUg3RDs7UUFJWSxrQkFBYSxHQUNyQixJQUFJLGVBQWUsQ0FBYyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FzRXREO0lBM0RDOzs7O09BSUc7SUFDSCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsY0FBYyxDQUFDLFdBQXdCO1FBQ3BDLElBQUksQ0FBQyxhQUE4QyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG9CQUFvQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG9CQUFvQixDQUFDLEtBQWdCO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMEJBQTBCO1FBQ3ZCLElBQUksQ0FBQyxhQUE4QyxDQUFDLElBQUksQ0FDdkQsV0FBVyxDQUFDLE9BQU8sQ0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILHVCQUF1QjtRQUNwQixJQUFJLENBQUMsYUFBOEMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxzQkFBc0I7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztJQUNyQyxDQUFDOztrSEF2RVUscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aFN0b3JhZ2VTZXJ2aWNlLCBBdXRoVG9rZW4gfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogSW5kaWNhdGVzIGlmIGF1dGggdG9rZW4gaXMgZm9yIHJlZ3VsYXIgdXNlciBvciBDUyBBZ2VudC5cbiAqL1xuZXhwb3J0IGVudW0gVG9rZW5UYXJnZXQge1xuICBDU0FnZW50ID0gJ0NTQWdlbnQnLFxuICBVc2VyID0gJ1VzZXInLFxufVxuXG4vKipcbiAqIFdpdGggQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlIGFwYXJ0IGZyb20gc3RvcmluZyB0aGUgdG9rZW4gd2UgYWxzbyBuZWVkIHRvIHN0b3JlXG4gKiBpbmZvcm1hdGlvbiBmb3Igd2hpY2ggdXNlciBpcyB0aGUgdG9rZW4gKHJlZ3VsYXIgdXNlciBvciBDUyBBZ2VudCkuXG4gKlxuICogT3ZlcnJpZGVzIGBBdXRoU3RvcmFnZVNlcnZpY2VgLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlIGV4dGVuZHMgQXV0aFN0b3JhZ2VTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIF90b2tlblRhcmdldCQ6IE9ic2VydmFibGU8VG9rZW5UYXJnZXQ+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PFRva2VuVGFyZ2V0PihUb2tlblRhcmdldC5Vc2VyKTtcblxuICAvKipcbiAgICogV2hlbiBDUyBBZ2VudCBsb2dzIGluIGR1cmluZyByZWd1bGFyIHVzZXIgc2Vzc2lvbiB3ZSBzdG9yZSB0aGUgcmVndWxhclxuICAgKiB1c2VyIHRva2VuIHRvIHJlc3RvcmUgdGhlIHNlc3Npb24gYWZ0ZXIgQ1MgQWdlbnQgbG9nb3V0LlxuICAgKlxuICAgKiBUaGlzIHN1cHBvcnRzIGluLXN0b3JlIHVzZSBjYXNlIHdoZW4gQ1MgQWdlbnQgd2FudCdzIHRvIHF1aWNrbHkgaGVscFxuICAgKiBjdXN0b21lciBhbmQgdGhlbiBnaXZlIGFuIG9wdGlvbiB0byBjdXN0b21lciB0byBjb250aW51ZSB0aGUgcHJvY2Vzcy5cbiAgICovXG4gIHByb3RlY3RlZCBlbXVsYXRlZFVzZXJUb2tlbj86IEF1dGhUb2tlbjtcblxuICAvKipcbiAgICogR2V0IHRhcmdldCB1c2VyIGZvciBjdXJyZW50IGF1dGggdG9rZW4uXG4gICAqXG4gICAqIEByZXR1cm4gb2JzZXJ2YWJsZSB3aXRoIFRva2VuVGFyZ2V0XG4gICAqL1xuICBnZXRUb2tlblRhcmdldCgpOiBPYnNlcnZhYmxlPFRva2VuVGFyZ2V0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3Rva2VuVGFyZ2V0JDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IHRva2VuIHRhcmdldC5cbiAgICpcbiAgICogQHBhcmFtIHRva2VuVGFyZ2V0XG4gICAqL1xuICBzZXRUb2tlblRhcmdldCh0b2tlblRhcmdldDogVG9rZW5UYXJnZXQpOiB2b2lkIHtcbiAgICAodGhpcy5fdG9rZW5UYXJnZXQkIGFzIEJlaGF2aW9yU3ViamVjdDxUb2tlblRhcmdldD4pLm5leHQodG9rZW5UYXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0b2tlbiBmb3IgcHJldmlvdXNseSB1c2VyIHNlc3Npb24sIHdoZW4gaXQgd2FzIGludGVycnVwdGVkIGJ5IENTIGFnZW50IGxvZ2luLlxuICAgKlxuICAgKiBAcmV0dXJuIHByZXZpb3VzbHkgbG9nZ2VkIGluIHVzZXIgdG9rZW4uXG4gICAqL1xuICBnZXRFbXVsYXRlZFVzZXJUb2tlbigpOiBBdXRoVG9rZW4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmVtdWxhdGVkVXNlclRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdXNlciB0b2tlbiBvbiBDUyBhZ2VudCBsb2dpbi5cbiAgICpcbiAgICogQHBhcmFtIHRva2VuXG4gICAqL1xuICBzZXRFbXVsYXRlZFVzZXJUb2tlbih0b2tlbjogQXV0aFRva2VuKTogdm9pZCB7XG4gICAgdGhpcy5lbXVsYXRlZFVzZXJUb2tlbiA9IHRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0b2tlbiB0YXJnZXQgdG8gQ1MgQWdlbnQuXG4gICAqL1xuICBzd2l0Y2hUb2tlblRhcmdldFRvQ1NBZ2VudCgpOiB2b2lkIHtcbiAgICAodGhpcy5fdG9rZW5UYXJnZXQkIGFzIEJlaGF2aW9yU3ViamVjdDxUb2tlblRhcmdldD4pLm5leHQoXG4gICAgICBUb2tlblRhcmdldC5DU0FnZW50XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdG9rZW4gdGFyZ2V0IHRvIHVzZXIuXG4gICAqL1xuICBzd2l0Y2hUb2tlblRhcmdldFRvVXNlcigpOiB2b2lkIHtcbiAgICAodGhpcy5fdG9rZW5UYXJnZXQkIGFzIEJlaGF2aW9yU3ViamVjdDxUb2tlblRhcmdldD4pLm5leHQoVG9rZW5UYXJnZXQuVXNlcik7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB3ZSBzdGFydCBlbXVsYXRpb24gZnJvbSB0aGUgVUkgKG5vdCBieSBBU00gbG9naW4pIHdlIGNhbid0IHJlc3RvcmUgdXNlciBzZXNzaW9uIG9uIGNzIGFnZW50IGxvZ291dC5cbiAgICogT25seSBhdmFpbGFibGUgc29sdXRpb24gaXMgdG8gZHJvcCBzZXNzaW9uIHdlIGNvdWxkIHJlc3RvcmUsIHRvIGF2b2lkIGFjY291bnQgaGlqYWNrLlxuICAgKi9cbiAgY2xlYXJFbXVsYXRlZFVzZXJUb2tlbigpOiB2b2lkIHtcbiAgICB0aGlzLmVtdWxhdGVkVXNlclRva2VuID0gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=