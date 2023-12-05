/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { LoginEvent, LogoutEvent, } from '@spartacus/core';
import { UserAccountChangedEvent, } from '@spartacus/user/account/root';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../connectors/user-account.connector";
import * as i2 from "@spartacus/core";
export class UserAccountService {
    constructor(userAccountConnector, userIdService, query) {
        this.userAccountConnector = userAccountConnector;
        this.userIdService = userIdService;
        this.query = query;
        this.userQuery = this.query.create(() => this.userIdService
            .takeUserId(true)
            .pipe(switchMap((userId) => this.userAccountConnector.get(userId))), {
            reloadOn: [UserAccountChangedEvent],
            resetOn: [LoginEvent, LogoutEvent],
        });
    }
    /**
     * Returns the user according the userId
     * no use query for userId can change every time
     */
    getById(userId) {
        return this.userAccountConnector.get(userId);
    }
    /**
     * Returns the current user.
     */
    get() {
        return this.userQuery.get();
    }
}
UserAccountService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountService, deps: [{ token: i1.UserAccountConnector }, { token: i2.UserIdService }, { token: i2.QueryService }], target: i0.ɵɵFactoryTarget.Injectable });
UserAccountService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserAccountConnector }, { type: i2.UserIdService }, { type: i2.QueryService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hY2NvdW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9hY2NvdW50L2NvcmUvZmFjYWRlL3VzZXItYWNjb3VudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsV0FBVyxHQUlaLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUVMLHVCQUF1QixHQUV4QixNQUFNLDhCQUE4QixDQUFDO0FBRXRDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUkzQyxNQUFNLE9BQU8sa0JBQWtCO0lBWTdCLFlBQ1ksb0JBQTBDLEVBQzFDLGFBQTRCLEVBQzVCLEtBQW1CO1FBRm5CLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQWRyQixjQUFTLEdBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNsRCxHQUFHLEVBQUUsQ0FDSCxJQUFJLENBQUMsYUFBYTthQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ3ZFO1lBQ0UsUUFBUSxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQztTQUNuQyxDQUNGLENBQUM7SUFNQyxDQUFDO0lBRUo7OztPQUdHO0lBQ0gsT0FBTyxDQUFDLE1BQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNILEdBQUc7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7K0dBL0JVLGtCQUFrQjttSEFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBMb2dpbkV2ZW50LFxuICBMb2dvdXRFdmVudCxcbiAgUXVlcnksXG4gIFF1ZXJ5U2VydmljZSxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFVzZXIsXG4gIFVzZXJBY2NvdW50Q2hhbmdlZEV2ZW50LFxuICBVc2VyQWNjb3VudEZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVc2VyQWNjb3VudENvbm5lY3RvciB9IGZyb20gJy4uL2Nvbm5lY3RvcnMvdXNlci1hY2NvdW50LmNvbm5lY3Rvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyQWNjb3VudFNlcnZpY2UgaW1wbGVtZW50cyBVc2VyQWNjb3VudEZhY2FkZSB7XG4gIHByb3RlY3RlZCB1c2VyUXVlcnk6IFF1ZXJ5PFVzZXI+ID0gdGhpcy5xdWVyeS5jcmVhdGUoXG4gICAgKCkgPT5cbiAgICAgIHRoaXMudXNlcklkU2VydmljZVxuICAgICAgICAudGFrZVVzZXJJZCh0cnVlKVxuICAgICAgICAucGlwZShzd2l0Y2hNYXAoKHVzZXJJZCkgPT4gdGhpcy51c2VyQWNjb3VudENvbm5lY3Rvci5nZXQodXNlcklkKSkpLFxuICAgIHtcbiAgICAgIHJlbG9hZE9uOiBbVXNlckFjY291bnRDaGFuZ2VkRXZlbnRdLFxuICAgICAgcmVzZXRPbjogW0xvZ2luRXZlbnQsIExvZ291dEV2ZW50XSxcbiAgICB9XG4gICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJBY2NvdW50Q29ubmVjdG9yOiBVc2VyQWNjb3VudENvbm5lY3RvcixcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcXVlcnk6IFF1ZXJ5U2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHVzZXIgYWNjb3JkaW5nIHRoZSB1c2VySWRcbiAgICogbm8gdXNlIHF1ZXJ5IGZvciB1c2VySWQgY2FuIGNoYW5nZSBldmVyeSB0aW1lXG4gICAqL1xuICBnZXRCeUlkKHVzZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckFjY291bnRDb25uZWN0b3IuZ2V0KHVzZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCB1c2VyLlxuICAgKi9cbiAgZ2V0KCk6IE9ic2VydmFibGU8VXNlciB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJRdWVyeS5nZXQoKTtcbiAgfVxufVxuIl19