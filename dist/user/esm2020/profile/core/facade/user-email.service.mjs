/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CommandStrategy, } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../connectors/user-profile.connector";
export class UserEmailService {
    constructor(userIdService, userProfileConnector, command) {
        this.userIdService = userIdService;
        this.userProfileConnector = userProfileConnector;
        this.command = command;
        this.updateCommand = this.command.create((payload) => this.userIdService
            .takeUserId(true)
            .pipe(switchMap((uid) => this.userProfileConnector.updateEmail(uid, payload.password, payload.newUid))), {
            strategy: CommandStrategy.Queue,
        });
    }
    /**
     * Updates the user's email.
     *
     * @param password to users password to confirm the users
     * @param newUid the new proposed email address.
     */
    update(password, newUid) {
        return this.updateCommand.execute({ password, newUid });
    }
}
UserEmailService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailService, deps: [{ token: i1.UserIdService }, { token: i2.UserProfileConnector }, { token: i1.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
UserEmailService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserIdService }, { type: i2.UserProfileConnector }, { type: i1.CommandService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1lbWFpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb3JlL2ZhY2FkZS91c2VyLWVtYWlsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUdMLGVBQWUsR0FFaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLM0MsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUNZLGFBQTRCLEVBQzVCLG9CQUEwQyxFQUMxQyxPQUF1QjtRQUZ2QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBR3pCLGtCQUFhLEdBR2xCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUN0QixDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ1YsSUFBSSxDQUFDLGFBQWE7YUFDZixVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ2hCLElBQUksQ0FDSCxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNoQixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUNuQyxHQUFHLEVBQ0gsT0FBTyxDQUFDLFFBQVEsRUFDaEIsT0FBTyxDQUFDLE1BQU0sQ0FDZixDQUNGLENBQ0YsRUFDTDtZQUNFLFFBQVEsRUFBRSxlQUFlLENBQUMsS0FBSztTQUNoQyxDQUNGLENBQUM7SUFyQkMsQ0FBQztJQXVCSjs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxRQUFnQixFQUFFLE1BQWM7UUFDckMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7OzZHQXBDVSxnQkFBZ0I7aUhBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29tbWFuZCxcbiAgQ29tbWFuZFNlcnZpY2UsXG4gIENvbW1hbmRTdHJhdGVneSxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVzZXJFbWFpbEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgVXNlclByb2ZpbGVDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL3VzZXItcHJvZmlsZS5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckVtYWlsU2VydmljZSBpbXBsZW1lbnRzIFVzZXJFbWFpbEZhY2FkZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VyUHJvZmlsZUNvbm5lY3RvcjogVXNlclByb2ZpbGVDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGNvbW1hbmQ6IENvbW1hbmRTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgdXBkYXRlQ29tbWFuZDogQ29tbWFuZDx7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbiAgICBuZXdVaWQ6IHN0cmluZztcbiAgfT4gPSB0aGlzLmNvbW1hbmQuY3JlYXRlKFxuICAgIChwYXlsb2FkKSA9PlxuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAgIC50YWtlVXNlcklkKHRydWUpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgodWlkKSA9PlxuICAgICAgICAgICAgdGhpcy51c2VyUHJvZmlsZUNvbm5lY3Rvci51cGRhdGVFbWFpbChcbiAgICAgICAgICAgICAgdWlkLFxuICAgICAgICAgICAgICBwYXlsb2FkLnBhc3N3b3JkLFxuICAgICAgICAgICAgICBwYXlsb2FkLm5ld1VpZFxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICB7XG4gICAgICBzdHJhdGVneTogQ29tbWFuZFN0cmF0ZWd5LlF1ZXVlLFxuICAgIH1cbiAgKTtcblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdXNlcidzIGVtYWlsLlxuICAgKlxuICAgKiBAcGFyYW0gcGFzc3dvcmQgdG8gdXNlcnMgcGFzc3dvcmQgdG8gY29uZmlybSB0aGUgdXNlcnNcbiAgICogQHBhcmFtIG5ld1VpZCB0aGUgbmV3IHByb3Bvc2VkIGVtYWlsIGFkZHJlc3MuXG4gICAqL1xuICB1cGRhdGUocGFzc3dvcmQ6IHN0cmluZywgbmV3VWlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVDb21tYW5kLmV4ZWN1dGUoeyBwYXNzd29yZCwgbmV3VWlkIH0pO1xuICB9XG59XG4iXX0=