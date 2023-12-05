/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UserActions, } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./user-profile.service";
import * as i2 from "../connectors/user-profile.connector";
import * as i3 from "@spartacus/core";
import * as i4 from "@ngrx/store";
export class UserRegisterService {
    constructor(userProfile, userConnector, authService, command, store) {
        this.userProfile = userProfile;
        this.userConnector = userConnector;
        this.authService = authService;
        this.command = command;
        this.store = store;
        this.registerCommand = this.command.create(({ user }) => this.userConnector.register(user).pipe(tap(() => {
            // this is a compatibility mechanism only, to make anonymous consents
            // management work properly in transitional period (when we move logic
            // to separate libraries)
            this.store.dispatch(new UserActions.RegisterUserSuccess());
        })));
        this.registerGuestCommand = this.command.create((payload) => this.userConnector.registerGuest(payload.guid, payload.password).pipe(tap((user) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.authService.loginWithCredentials(user.uid, payload.password);
        })));
    }
    /**
     * Register a new user.
     *
     * @param submitFormData as UserRegisterFormData
     */
    register(user) {
        return this.registerCommand.execute({ user });
    }
    /**
     * Register a new user from guest.
     *
     * @param guid
     * @param password
     */
    registerGuest(guid, password) {
        return this.registerGuestCommand.execute({ guid, password });
    }
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles() {
        return this.userProfile.getTitles();
    }
}
UserRegisterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterService, deps: [{ token: i1.UserProfileService }, { token: i2.UserProfileConnector }, { token: i3.AuthService }, { token: i3.CommandService }, { token: i4.Store }], target: i0.ɵɵFactoryTarget.Injectable });
UserRegisterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserProfileService }, { type: i2.UserProfileConnector }, { type: i3.AuthService }, { type: i3.CommandService }, { type: i4.Store }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb3JlL2ZhY2FkZS91c2VyLXJlZ2lzdGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUlMLFdBQVcsR0FDWixNQUFNLGlCQUFpQixDQUFDO0FBU3pCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBS3JDLE1BQU0sT0FBTyxtQkFBbUI7SUE0QjlCLFlBQ1ksV0FBK0IsRUFDL0IsYUFBbUMsRUFDbkMsV0FBd0IsRUFDeEIsT0FBdUIsRUFDdkIsS0FBWTtRQUpaLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQWhDZCxvQkFBZSxHQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3BDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxxRUFBcUU7WUFDckUsc0VBQXNFO1lBQ3RFLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQ0gsQ0FDRixDQUFDO1FBRU0seUJBQW9CLEdBTTFCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNuRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNYLG9FQUFvRTtZQUNwRSxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FBQztJQVFDLENBQUM7SUFFSjs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLElBQWdCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGFBQWEsQ0FBQyxJQUFZLEVBQUUsUUFBZ0I7UUFDMUMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QyxDQUFDOztnSEE1RFUsbUJBQW1CO29IQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEF1dGhTZXJ2aWNlLFxuICBDb21tYW5kLFxuICBDb21tYW5kU2VydmljZSxcbiAgVXNlckFjdGlvbnMsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBUaXRsZSxcbiAgVXNlclJlZ2lzdGVyRmFjYWRlLFxuICBVc2VyU2lnblVwLFxufSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IFVzZXJQcm9maWxlQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy91c2VyLXByb2ZpbGUuY29ubmVjdG9yJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVzZXJQcm9maWxlU2VydmljZSB9IGZyb20gJy4vdXNlci1wcm9maWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyUmVnaXN0ZXJTZXJ2aWNlIGltcGxlbWVudHMgVXNlclJlZ2lzdGVyRmFjYWRlIHtcbiAgcHJvdGVjdGVkIHJlZ2lzdGVyQ29tbWFuZDogQ29tbWFuZDx7IHVzZXI6IFVzZXJTaWduVXAgfSwgVXNlcj4gPVxuICAgIHRoaXMuY29tbWFuZC5jcmVhdGUoKHsgdXNlciB9KSA9PlxuICAgICAgdGhpcy51c2VyQ29ubmVjdG9yLnJlZ2lzdGVyKHVzZXIpLnBpcGUoXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgLy8gdGhpcyBpcyBhIGNvbXBhdGliaWxpdHkgbWVjaGFuaXNtIG9ubHksIHRvIG1ha2UgYW5vbnltb3VzIGNvbnNlbnRzXG4gICAgICAgICAgLy8gbWFuYWdlbWVudCB3b3JrIHByb3Blcmx5IGluIHRyYW5zaXRpb25hbCBwZXJpb2QgKHdoZW4gd2UgbW92ZSBsb2dpY1xuICAgICAgICAgIC8vIHRvIHNlcGFyYXRlIGxpYnJhcmllcylcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBVc2VyQWN0aW9ucy5SZWdpc3RlclVzZXJTdWNjZXNzKCkpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG5cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyR3Vlc3RDb21tYW5kOiBDb21tYW5kPFxuICAgIHtcbiAgICAgIGd1aWQ6IHN0cmluZztcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgfSxcbiAgICBVc2VyXG4gID4gPSB0aGlzLmNvbW1hbmQuY3JlYXRlKChwYXlsb2FkKSA9PlxuICAgIHRoaXMudXNlckNvbm5lY3Rvci5yZWdpc3Rlckd1ZXN0KHBheWxvYWQuZ3VpZCwgcGF5bG9hZC5wYXNzd29yZCkucGlwZShcbiAgICAgIHRhcCgodXNlcikgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luV2l0aENyZWRlbnRpYWxzKHVzZXIudWlkISwgcGF5bG9hZC5wYXNzd29yZCk7XG4gICAgICB9KVxuICAgIClcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlclByb2ZpbGU6IFVzZXJQcm9maWxlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlckNvbm5lY3RvcjogVXNlclByb2ZpbGVDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29tbWFuZDogQ29tbWFuZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbmV3IHVzZXIuXG4gICAqXG4gICAqIEBwYXJhbSBzdWJtaXRGb3JtRGF0YSBhcyBVc2VyUmVnaXN0ZXJGb3JtRGF0YVxuICAgKi9cbiAgcmVnaXN0ZXIodXNlcjogVXNlclNpZ25VcCk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyQ29tbWFuZC5leGVjdXRlKHsgdXNlciB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIG5ldyB1c2VyIGZyb20gZ3Vlc3QuXG4gICAqXG4gICAqIEBwYXJhbSBndWlkXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgcmVnaXN0ZXJHdWVzdChndWlkOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3Rlckd1ZXN0Q29tbWFuZC5leGVjdXRlKHsgZ3VpZCwgcGFzc3dvcmQgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aXRsZXMgdGhhdCBjYW4gYmUgdXNlZCBmb3IgdGhlIHVzZXIgcHJvZmlsZXMuXG4gICAqL1xuICBnZXRUaXRsZXMoKTogT2JzZXJ2YWJsZTxUaXRsZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclByb2ZpbGUuZ2V0VGl0bGVzKCk7XG4gIH1cbn1cbiJdfQ==