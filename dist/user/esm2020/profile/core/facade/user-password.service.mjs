/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../connectors/user-profile.connector";
import * as i2 from "@spartacus/core";
export class UserPasswordService {
    constructor(userProfileConnector, userIdService, command) {
        this.userProfileConnector = userProfileConnector;
        this.userIdService = userIdService;
        this.command = command;
        this.updateCommand = this.command.create((payload) => this.userIdService.takeUserId(true).pipe(take(1), switchMap((uid) => this.userProfileConnector.updatePassword(uid, payload.oldPassword, payload.newPassword))));
        this.resetCommand = this.command.create((payload) => this.userProfileConnector.resetPassword(payload.token, payload.password));
        this.requestForgotPasswordEmailCommand = this.command.create((payload) => this.userProfileConnector.requestForgotPasswordEmail(payload.email));
    }
    /**
     * Updates the password for the user
     *
     * The method returns an observable with `LoaderState` information, including the
     * actual user data.
     *
     * @param oldPassword the current password that will be changed
     * @param newPassword the new password
     */
    update(oldPassword, newPassword) {
        return this.updateCommand.execute({ oldPassword, newPassword });
    }
    /**
     * Reset new password. Part of the forgot password flow.
     *
     * @param token
     * @param password
     */
    reset(token, password) {
        return this.resetCommand.execute({ token, password });
    }
    /*
     * Request an email to reset a forgotten password.
     */
    requestForgotPasswordEmail(email) {
        return this.requestForgotPasswordEmailCommand.execute({ email });
    }
}
UserPasswordService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordService, deps: [{ token: i1.UserProfileConnector }, { token: i2.UserIdService }, { token: i2.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
UserPasswordService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserProfileConnector }, { type: i2.UserIdService }, { type: i2.CommandService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wYXNzd29yZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb3JlL2ZhY2FkZS91c2VyLXBhc3N3b3JkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUtqRCxNQUFNLE9BQU8sbUJBQW1CO0lBOEI5QixZQUNZLG9CQUEwQyxFQUMxQyxhQUE0QixFQUM1QixPQUF1QjtRQUZ2Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBaEN6QixrQkFBYSxHQUdsQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDdEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQ3RDLEdBQUcsRUFDSCxPQUFPLENBQUMsV0FBVyxFQUNuQixPQUFPLENBQUMsV0FBVyxDQUNwQixDQUNGLENBQ0YsQ0FDRixDQUFDO1FBRVEsaUJBQVksR0FHakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNuQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUN6RSxDQUFDO1FBRVEsc0NBQWlDLEdBRXRDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDbkMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDcEUsQ0FBQztJQU1DLENBQUM7SUFFSjs7Ozs7Ozs7T0FRRztJQUNILE1BQU0sQ0FBQyxXQUFtQixFQUFFLFdBQW1CO1FBQzdDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBMEIsQ0FBQyxLQUFhO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGlDQUFpQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Z0hBaEVVLG1CQUFtQjtvSEFBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tYW5kLCBDb21tYW5kU2VydmljZSwgVXNlcklkU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVc2VyUGFzc3dvcmRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IFVzZXJQcm9maWxlQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy91c2VyLXByb2ZpbGUuY29ubmVjdG9yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJQYXNzd29yZFNlcnZpY2UgaW1wbGVtZW50cyBVc2VyUGFzc3dvcmRGYWNhZGUge1xuICBwcm90ZWN0ZWQgdXBkYXRlQ29tbWFuZDogQ29tbWFuZDx7XG4gICAgb2xkUGFzc3dvcmQ6IHN0cmluZztcbiAgICBuZXdQYXNzd29yZDogc3RyaW5nO1xuICB9PiA9IHRoaXMuY29tbWFuZC5jcmVhdGUoKHBheWxvYWQpID0+XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBzd2l0Y2hNYXAoKHVpZCkgPT5cbiAgICAgICAgdGhpcy51c2VyUHJvZmlsZUNvbm5lY3Rvci51cGRhdGVQYXNzd29yZChcbiAgICAgICAgICB1aWQsXG4gICAgICAgICAgcGF5bG9hZC5vbGRQYXNzd29yZCxcbiAgICAgICAgICBwYXlsb2FkLm5ld1Bhc3N3b3JkXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gICk7XG5cbiAgcHJvdGVjdGVkIHJlc2V0Q29tbWFuZDogQ29tbWFuZDx7XG4gICAgdG9rZW46IHN0cmluZztcbiAgICBwYXNzd29yZDogc3RyaW5nO1xuICB9PiA9IHRoaXMuY29tbWFuZC5jcmVhdGUoKHBheWxvYWQpID0+XG4gICAgdGhpcy51c2VyUHJvZmlsZUNvbm5lY3Rvci5yZXNldFBhc3N3b3JkKHBheWxvYWQudG9rZW4sIHBheWxvYWQucGFzc3dvcmQpXG4gICk7XG5cbiAgcHJvdGVjdGVkIHJlcXVlc3RGb3Jnb3RQYXNzd29yZEVtYWlsQ29tbWFuZDogQ29tbWFuZDx7XG4gICAgZW1haWw6IHN0cmluZztcbiAgfT4gPSB0aGlzLmNvbW1hbmQuY3JlYXRlKChwYXlsb2FkKSA9PlxuICAgIHRoaXMudXNlclByb2ZpbGVDb25uZWN0b3IucmVxdWVzdEZvcmdvdFBhc3N3b3JkRW1haWwocGF5bG9hZC5lbWFpbClcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlclByb2ZpbGVDb25uZWN0b3I6IFVzZXJQcm9maWxlQ29ubmVjdG9yLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb21tYW5kOiBDb21tYW5kU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHBhc3N3b3JkIGZvciB0aGUgdXNlclxuICAgKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgYW4gb2JzZXJ2YWJsZSB3aXRoIGBMb2FkZXJTdGF0ZWAgaW5mb3JtYXRpb24sIGluY2x1ZGluZyB0aGVcbiAgICogYWN0dWFsIHVzZXIgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIG9sZFBhc3N3b3JkIHRoZSBjdXJyZW50IHBhc3N3b3JkIHRoYXQgd2lsbCBiZSBjaGFuZ2VkXG4gICAqIEBwYXJhbSBuZXdQYXNzd29yZCB0aGUgbmV3IHBhc3N3b3JkXG4gICAqL1xuICB1cGRhdGUob2xkUGFzc3dvcmQ6IHN0cmluZywgbmV3UGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLnVwZGF0ZUNvbW1hbmQuZXhlY3V0ZSh7IG9sZFBhc3N3b3JkLCBuZXdQYXNzd29yZCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBuZXcgcGFzc3dvcmQuIFBhcnQgb2YgdGhlIGZvcmdvdCBwYXNzd29yZCBmbG93LlxuICAgKlxuICAgKiBAcGFyYW0gdG9rZW5cbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICByZXNldCh0b2tlbjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMucmVzZXRDb21tYW5kLmV4ZWN1dGUoeyB0b2tlbiwgcGFzc3dvcmQgfSk7XG4gIH1cblxuICAvKlxuICAgKiBSZXF1ZXN0IGFuIGVtYWlsIHRvIHJlc2V0IGEgZm9yZ290dGVuIHBhc3N3b3JkLlxuICAgKi9cbiAgcmVxdWVzdEZvcmdvdFBhc3N3b3JkRW1haWwoZW1haWw6IHN0cmluZyk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RGb3Jnb3RQYXNzd29yZEVtYWlsQ29tbWFuZC5leGVjdXRlKHsgZW1haWwgfSk7XG4gIH1cbn1cbiJdfQ==