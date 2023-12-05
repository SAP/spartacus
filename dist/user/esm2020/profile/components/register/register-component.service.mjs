/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@angular/forms";
export class RegisterComponentService {
    constructor(userRegisterFacade, globalMessageService, fb) {
        this.userRegisterFacade = userRegisterFacade;
        this.globalMessageService = globalMessageService;
        this.fb = fb;
    }
    /**
     * Register a new user.
     *
     * @param user as UserSignUp
     */
    register(user) {
        return this.userRegisterFacade.register(user);
    }
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles() {
        return this.userRegisterFacade.getTitles();
    }
    /**
     * Show the message after successful registration.
     */
    postRegisterMessage() {
        this.globalMessageService.add({ key: 'register.postRegisterMessage' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
    /**
     * Get if any additional consents needs to be provided during registration
     * In core feature, no additional consents are necessary during registration.
     * In integration scenarios, eg: cdc, this method will be overridden to return
     * necessary cdc consents
     */
    getAdditionalConsents() {
        return [];
    }
    /**
     * Generate form control if any additional consents that needs to be provided during registration
     * In core feature, no additional consents are necessary during registration.
     * In integration scenarios, eg: cdc, this method will be overridden to return
     * form controls for necessary cdc consents
     */
    generateAdditionalConsentsFormControl() {
        return this.fb?.array([]) ?? undefined;
    }
}
RegisterComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentService, deps: [{ token: i1.UserRegisterFacade }, { token: i2.GlobalMessageService }, { token: i3.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Injectable });
RegisterComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RegisterComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserRegisterFacade }, { type: i2.GlobalMessageService }, { type: i3.UntypedFormBuilder }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMvcmVnaXN0ZXIvcmVnaXN0ZXItY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUdMLGlCQUFpQixHQUdsQixNQUFNLGlCQUFpQixDQUFDOzs7OztBQUt6QixNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQ1ksa0JBQXNDLEVBQ3RDLG9CQUEwQyxFQUMxQyxFQUF1QjtRQUZ2Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsT0FBRSxHQUFGLEVBQUUsQ0FBcUI7SUFDaEMsQ0FBQztJQUVKOzs7O09BSUc7SUFDSCxRQUFRLENBQUMsSUFBZ0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsRUFBRSxHQUFHLEVBQUUsOEJBQThCLEVBQUUsRUFDdkMsaUJBQWlCLENBQUMscUJBQXFCLENBQ3hDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxxQkFBcUI7UUFJbkIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxxQ0FBcUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxTQUFTLENBQUM7SUFDekMsQ0FBQzs7cUhBdERVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUJ1aWxkZXIsIFVudHlwZWRGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBDb25zZW50VGVtcGxhdGUsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgVGl0bGUsXG4gIFVzZXIsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyUmVnaXN0ZXJGYWNhZGUsIFVzZXJTaWduVXAgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyQ29tcG9uZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1c2VyUmVnaXN0ZXJGYWNhZGU6IFVzZXJSZWdpc3RlckZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBmYj86IFVudHlwZWRGb3JtQnVpbGRlclxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbmV3IHVzZXIuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VyIGFzIFVzZXJTaWduVXBcbiAgICovXG4gIHJlZ2lzdGVyKHVzZXI6IFVzZXJTaWduVXApOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyUmVnaXN0ZXJGYWNhZGUucmVnaXN0ZXIodXNlcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aXRsZXMgdGhhdCBjYW4gYmUgdXNlZCBmb3IgdGhlIHVzZXIgcHJvZmlsZXMuXG4gICAqL1xuICBnZXRUaXRsZXMoKTogT2JzZXJ2YWJsZTxUaXRsZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclJlZ2lzdGVyRmFjYWRlLmdldFRpdGxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhlIG1lc3NhZ2UgYWZ0ZXIgc3VjY2Vzc2Z1bCByZWdpc3RyYXRpb24uXG4gICAqL1xuICBwb3N0UmVnaXN0ZXJNZXNzYWdlKCk6IHZvaWQge1xuICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgeyBrZXk6ICdyZWdpc3Rlci5wb3N0UmVnaXN0ZXJNZXNzYWdlJyB9LFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaWYgYW55IGFkZGl0aW9uYWwgY29uc2VudHMgbmVlZHMgdG8gYmUgcHJvdmlkZWQgZHVyaW5nIHJlZ2lzdHJhdGlvblxuICAgKiBJbiBjb3JlIGZlYXR1cmUsIG5vIGFkZGl0aW9uYWwgY29uc2VudHMgYXJlIG5lY2Vzc2FyeSBkdXJpbmcgcmVnaXN0cmF0aW9uLlxuICAgKiBJbiBpbnRlZ3JhdGlvbiBzY2VuYXJpb3MsIGVnOiBjZGMsIHRoaXMgbWV0aG9kIHdpbGwgYmUgb3ZlcnJpZGRlbiB0byByZXR1cm5cbiAgICogbmVjZXNzYXJ5IGNkYyBjb25zZW50c1xuICAgKi9cbiAgZ2V0QWRkaXRpb25hbENvbnNlbnRzKCk6IHtcbiAgICB0ZW1wbGF0ZTogQ29uc2VudFRlbXBsYXRlO1xuICAgIHJlcXVpcmVkOiBib29sZWFuO1xuICB9W10ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBmb3JtIGNvbnRyb2wgaWYgYW55IGFkZGl0aW9uYWwgY29uc2VudHMgdGhhdCBuZWVkcyB0byBiZSBwcm92aWRlZCBkdXJpbmcgcmVnaXN0cmF0aW9uXG4gICAqIEluIGNvcmUgZmVhdHVyZSwgbm8gYWRkaXRpb25hbCBjb25zZW50cyBhcmUgbmVjZXNzYXJ5IGR1cmluZyByZWdpc3RyYXRpb24uXG4gICAqIEluIGludGVncmF0aW9uIHNjZW5hcmlvcywgZWc6IGNkYywgdGhpcyBtZXRob2Qgd2lsbCBiZSBvdmVycmlkZGVuIHRvIHJldHVyblxuICAgKiBmb3JtIGNvbnRyb2xzIGZvciBuZWNlc3NhcnkgY2RjIGNvbnNlbnRzXG4gICAqL1xuICBnZW5lcmF0ZUFkZGl0aW9uYWxDb25zZW50c0Zvcm1Db250cm9sKCk6IFVudHlwZWRGb3JtQXJyYXkgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmZiPy5hcnJheShbXSkgPz8gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=