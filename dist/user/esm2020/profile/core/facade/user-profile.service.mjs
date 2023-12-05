/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CommandStrategy, LanguageSetEvent, } from '@spartacus/core';
import { UserAccountChangedEvent, } from '@spartacus/user/account/root';
import { map, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/account/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/user-profile.connector";
export class UserProfileService {
    constructor(userAccountService, authService, userProfileConnector, eventService, userIdService, query, command) {
        this.userAccountService = userAccountService;
        this.authService = authService;
        this.userProfileConnector = userProfileConnector;
        this.eventService = eventService;
        this.userIdService = userIdService;
        this.query = query;
        this.command = command;
        this.updateCommand = this.command.create((payload) => this.userIdService.takeUserId(true).pipe(switchMap((uid) => this.userProfileConnector.update(uid, payload.details).pipe(tap(() => {
            this.eventService.dispatch({ user: payload.details }, UserAccountChangedEvent);
        })))), {
            strategy: CommandStrategy.Queue,
        });
        this.closeCommand = this.command.create(() => this.userIdService
            .takeUserId(true)
            .pipe(switchMap((uid) => this.userProfileConnector
            .remove(uid)
            .pipe(tap(() => this.authService.logout())))));
        this.titleQuery = this.query.create(() => this.userProfileConnector.getTitles(), {
            reloadOn: [LanguageSetEvent],
        });
    }
    get() {
        return this.userAccountService.get();
    }
    /**
     * Updates the user's details.
     *
     * @param details User details to be updated.
     */
    update(details) {
        return this.updateCommand.execute({ details });
    }
    /**
     * Closes the user account.
     */
    close() {
        return this.closeCommand.execute(undefined);
    }
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles() {
        return this.titleQuery.get().pipe(map((titles) => titles ?? []));
    }
}
UserProfileService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileService, deps: [{ token: i1.UserAccountFacade }, { token: i2.AuthService }, { token: i3.UserProfileConnector }, { token: i2.EventService }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i2.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
UserProfileService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserAccountFacade }, { type: i2.AuthService }, { type: i3.UserProfileConnector }, { type: i2.EventService }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i2.CommandService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL2NvcmUvZmFjYWRlL3VzZXItcHJvZmlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFJTCxlQUFlLEVBRWYsZ0JBQWdCLEdBSWpCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUVMLHVCQUF1QixHQUV4QixNQUFNLDhCQUE4QixDQUFDO0FBSXRDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUdyRCxNQUFNLE9BQU8sa0JBQWtCO0lBdUM3QixZQUNZLGtCQUFxQyxFQUNyQyxXQUF3QixFQUN4QixvQkFBMEMsRUFDMUMsWUFBMEIsRUFDMUIsYUFBNEIsRUFDNUIsS0FBbUIsRUFDbkIsT0FBdUI7UUFOdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUE3Q3pCLGtCQUFhLEdBQStCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUN2RSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUN0QyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNoQixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN6RCxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQ3hCLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFDekIsdUJBQXVCLENBQ3hCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUNGLENBQ0YsRUFDSDtZQUNFLFFBQVEsRUFBRSxlQUFlLENBQUMsS0FBSztTQUNoQyxDQUNGLENBQUM7UUFFUSxpQkFBWSxHQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUN6RCxJQUFJLENBQUMsYUFBYTthQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDaEIsSUFBSSxDQUNILFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2hCLElBQUksQ0FBQyxvQkFBb0I7YUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQzlDLENBQ0YsQ0FDSixDQUFDO1FBRVEsZUFBVSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDdEQsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxFQUMzQztZQUNFLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1NBQzdCLENBQ0YsQ0FBQztJQVVDLENBQUM7SUFFSixHQUFHO1FBQ0QsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsT0FBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7OytHQTFFVSxrQkFBa0I7bUhBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXV0aFNlcnZpY2UsXG4gIENvbW1hbmQsXG4gIENvbW1hbmRTZXJ2aWNlLFxuICBDb21tYW5kU3RyYXRlZ3ksXG4gIEV2ZW50U2VydmljZSxcbiAgTGFuZ3VhZ2VTZXRFdmVudCxcbiAgUXVlcnksXG4gIFF1ZXJ5U2VydmljZSxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFVzZXIsXG4gIFVzZXJBY2NvdW50Q2hhbmdlZEV2ZW50LFxuICBVc2VyQWNjb3VudEZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUaXRsZSwgVXNlclByb2ZpbGVGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IFVzZXJQcm9maWxlQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy91c2VyLXByb2ZpbGUuY29ubmVjdG9yJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyUHJvZmlsZVNlcnZpY2UgaW1wbGVtZW50cyBVc2VyUHJvZmlsZUZhY2FkZSB7XG4gIHByb3RlY3RlZCB1cGRhdGVDb21tYW5kOiBDb21tYW5kPHsgZGV0YWlsczogVXNlciB9PiA9IHRoaXMuY29tbWFuZC5jcmVhdGUoXG4gICAgKHBheWxvYWQpID0+XG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCh0cnVlKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHVpZCkgPT5cbiAgICAgICAgICB0aGlzLnVzZXJQcm9maWxlQ29ubmVjdG9yLnVwZGF0ZSh1aWQsIHBheWxvYWQuZGV0YWlscykucGlwZShcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgIHsgdXNlcjogcGF5bG9hZC5kZXRhaWxzIH0sXG4gICAgICAgICAgICAgICAgVXNlckFjY291bnRDaGFuZ2VkRXZlbnRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApLFxuICAgIHtcbiAgICAgIHN0cmF0ZWd5OiBDb21tYW5kU3RyYXRlZ3kuUXVldWUsXG4gICAgfVxuICApO1xuXG4gIHByb3RlY3RlZCBjbG9zZUNvbW1hbmQ6IENvbW1hbmQgPSB0aGlzLmNvbW1hbmQuY3JlYXRlKCgpID0+XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAudGFrZVVzZXJJZCh0cnVlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgodWlkKSA9PlxuICAgICAgICAgIHRoaXMudXNlclByb2ZpbGVDb25uZWN0b3JcbiAgICAgICAgICAgIC5yZW1vdmUodWlkKVxuICAgICAgICAgICAgLnBpcGUodGFwKCgpID0+IHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCkpKVxuICAgICAgICApXG4gICAgICApXG4gICk7XG5cbiAgcHJvdGVjdGVkIHRpdGxlUXVlcnk6IFF1ZXJ5PFRpdGxlW10+ID0gdGhpcy5xdWVyeS5jcmVhdGUoXG4gICAgKCkgPT4gdGhpcy51c2VyUHJvZmlsZUNvbm5lY3Rvci5nZXRUaXRsZXMoKSxcbiAgICB7XG4gICAgICByZWxvYWRPbjogW0xhbmd1YWdlU2V0RXZlbnRdLFxuICAgIH1cbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlckFjY291bnRTZXJ2aWNlOiBVc2VyQWNjb3VudEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VyUHJvZmlsZUNvbm5lY3RvcjogVXNlclByb2ZpbGVDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBxdWVyeTogUXVlcnlTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb21tYW5kOiBDb21tYW5kU2VydmljZVxuICApIHt9XG5cbiAgZ2V0KCk6IE9ic2VydmFibGU8VXNlciB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJBY2NvdW50U2VydmljZS5nZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB1c2VyJ3MgZGV0YWlscy5cbiAgICpcbiAgICogQHBhcmFtIGRldGFpbHMgVXNlciBkZXRhaWxzIHRvIGJlIHVwZGF0ZWQuXG4gICAqL1xuICB1cGRhdGUoZGV0YWlsczogVXNlcik6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLnVwZGF0ZUNvbW1hbmQuZXhlY3V0ZSh7IGRldGFpbHMgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSB1c2VyIGFjY291bnQuXG4gICAqL1xuICBjbG9zZSgpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5jbG9zZUNvbW1hbmQuZXhlY3V0ZSh1bmRlZmluZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGl0bGVzIHRoYXQgY2FuIGJlIHVzZWQgZm9yIHRoZSB1c2VyIHByb2ZpbGVzLlxuICAgKi9cbiAgZ2V0VGl0bGVzKCk6IE9ic2VydmFibGU8VGl0bGVbXT4ge1xuICAgIHJldHVybiB0aGlzLnRpdGxlUXVlcnkuZ2V0KCkucGlwZShtYXAoKHRpdGxlcykgPT4gdGl0bGVzID8/IFtdKSk7XG4gIH1cbn1cbiJdfQ==