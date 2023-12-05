/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GlobalMessageService, GlobalMessageType, LoggerService, normalizeHttpError, } from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CdcAuthService } from '../../auth/facade/cdc-auth.service';
import { CdcUserAuthenticationTokenService } from '../../auth/services/user-authentication/cdc-user-authentication-token.service';
import { CdcAuthActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../auth/services/user-authentication/cdc-user-authentication-token.service";
import * as i3 from "@spartacus/core";
import * as i4 from "../../auth/facade/cdc-auth.service";
export class CdcUserTokenEffects {
    constructor(actions$, userTokenService, globalMessageService, cdcAuthService) {
        this.actions$ = actions$;
        this.userTokenService = userTokenService;
        this.globalMessageService = globalMessageService;
        this.cdcAuthService = cdcAuthService;
        this.logger = inject(LoggerService);
        this.loadCdcUserToken$ = createEffect(() => this.actions$.pipe(ofType(CdcAuthActions.LOAD_CDC_USER_TOKEN), map((action) => action.payload), mergeMap((payload) => this.userTokenService
            .loadTokenUsingCustomFlow(payload.UID, payload.UIDSignature, payload.signatureTimestamp, payload.idToken, payload.baseSite)
            .pipe(switchMap((token) => {
            this.cdcAuthService.loginWithToken(token);
            return EMPTY;
        }), catchError((error) => {
            this.globalMessageService.add({ key: 'httpHandlers.badGateway' }, GlobalMessageType.MSG_TYPE_ERROR);
            return of(new CdcAuthActions.LoadCdcUserTokenFail({
                error: normalizeHttpError(error, this.logger),
                initialActionPayload: payload,
            }));
        })))));
    }
}
CdcUserTokenEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserTokenEffects, deps: [{ token: i1.Actions }, { token: i2.CdcUserAuthenticationTokenService }, { token: i3.GlobalMessageService }, { token: i4.CdcAuthService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserTokenEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserTokenEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserTokenEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.CdcUserAuthenticationTokenService }, { type: i3.GlobalMessageService }, { type: i4.CdcAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItdG9rZW4uZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvY29yZS9zdG9yZS9lZmZlY3RzL2NkYy11c2VyLXRva2VuLmVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixrQkFBa0IsR0FDbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLCtFQUErRSxDQUFDO0FBQ2xJLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBR2xELE1BQU0sT0FBTyxtQkFBbUI7SUF1QzlCLFlBQ1UsUUFBaUIsRUFDakIsZ0JBQW1ELEVBQ25ELG9CQUEwQyxFQUMxQyxjQUE4QjtRQUg5QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUM7UUFDbkQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUExQzlCLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFekMsc0JBQWlCLEdBQ2YsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUMxQyxHQUFHLENBQUMsQ0FBQyxNQUF1QyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ2hFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ25CLElBQUksQ0FBQyxnQkFBZ0I7YUFDbEIsd0JBQXdCLENBQ3ZCLE9BQU8sQ0FBQyxHQUFHLEVBQ1gsT0FBTyxDQUFDLFlBQVksRUFDcEIsT0FBTyxDQUFDLGtCQUFrQixFQUMxQixPQUFPLENBQUMsT0FBTyxFQUNmLE9BQU8sQ0FBQyxRQUFRLENBQ2pCO2FBQ0EsSUFBSSxDQUNILFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsRUFBRSxHQUFHLEVBQUUseUJBQXlCLEVBQUUsRUFDbEMsaUJBQWlCLENBQUMsY0FBYyxDQUNqQyxDQUFDO1lBQ0YsT0FBTyxFQUFFLENBQ1AsSUFBSSxjQUFjLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3RDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDN0Msb0JBQW9CLEVBQUUsT0FBTzthQUM5QixDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQ0osQ0FDRixDQUNGLENBQUM7SUFPRCxDQUFDOztnSEE1Q08sbUJBQW1CO29IQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7XG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgTG9nZ2VyU2VydmljZSxcbiAgbm9ybWFsaXplSHR0cEVycm9yLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDZGNBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL2F1dGgvZmFjYWRlL2NkYy1hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2RjVXNlckF1dGhlbnRpY2F0aW9uVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYXV0aC9zZXJ2aWNlcy91c2VyLWF1dGhlbnRpY2F0aW9uL2NkYy11c2VyLWF1dGhlbnRpY2F0aW9uLXRva2VuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2RjQXV0aEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENkY1VzZXJUb2tlbkVmZmVjdHMge1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGxvYWRDZGNVc2VyVG9rZW4kOiBPYnNlcnZhYmxlPENkY0F1dGhBY3Rpb25zLkNkY1VzZXJUb2tlbkFjdGlvbj4gPVxuICAgIGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgICBvZlR5cGUoQ2RjQXV0aEFjdGlvbnMuTE9BRF9DRENfVVNFUl9UT0tFTiksXG4gICAgICAgIG1hcCgoYWN0aW9uOiBDZGNBdXRoQWN0aW9ucy5Mb2FkQ2RjVXNlclRva2VuKSA9PiBhY3Rpb24ucGF5bG9hZCksXG4gICAgICAgIG1lcmdlTWFwKChwYXlsb2FkKSA9PlxuICAgICAgICAgIHRoaXMudXNlclRva2VuU2VydmljZVxuICAgICAgICAgICAgLmxvYWRUb2tlblVzaW5nQ3VzdG9tRmxvdyhcbiAgICAgICAgICAgICAgcGF5bG9hZC5VSUQsXG4gICAgICAgICAgICAgIHBheWxvYWQuVUlEU2lnbmF0dXJlLFxuICAgICAgICAgICAgICBwYXlsb2FkLnNpZ25hdHVyZVRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgcGF5bG9hZC5pZFRva2VuLFxuICAgICAgICAgICAgICBwYXlsb2FkLmJhc2VTaXRlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgc3dpdGNoTWFwKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2RjQXV0aFNlcnZpY2UubG9naW5XaXRoVG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICAgICAgICB7IGtleTogJ2h0dHBIYW5kbGVycy5iYWRHYXRld2F5JyB9LFxuICAgICAgICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihcbiAgICAgICAgICAgICAgICAgIG5ldyBDZGNBdXRoQWN0aW9ucy5Mb2FkQ2RjVXNlclRva2VuRmFpbCh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IsIHRoaXMubG9nZ2VyKSxcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbEFjdGlvblBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9ucyQ6IEFjdGlvbnMsXG4gICAgcHJpdmF0ZSB1c2VyVG9rZW5TZXJ2aWNlOiBDZGNVc2VyQXV0aGVudGljYXRpb25Ub2tlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZGNBdXRoU2VydmljZTogQ2RjQXV0aFNlcnZpY2VcbiAgKSB7fVxufVxuIl19