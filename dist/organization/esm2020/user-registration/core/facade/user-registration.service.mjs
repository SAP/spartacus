/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../connectors/user-registration.connector";
import * as i2 from "@spartacus/core";
export class UserRegistrationService {
    constructor(userRegistrationConnector, command) {
        this.userRegistrationConnector = userRegistrationConnector;
        this.command = command;
        this.registerOrganizationUserCommand = this.command.create((payload) => this.userRegistrationConnector.registerUser(payload.userData));
    }
    /**
     * Register a new org user.
     *
     * @param userData
     */
    registerUser(userData) {
        return this.registerOrganizationUserCommand.execute({ userData });
    }
}
UserRegistrationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationService, deps: [{ token: i1.UserRegistrationConnector }, { token: i2.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
UserRegistrationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserRegistrationConnector }, { type: i2.CommandService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdXNlci1yZWdpc3RyYXRpb24vY29yZS9mYWNhZGUvdXNlci1yZWdpc3RyYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVUzQyxNQUFNLE9BQU8sdUJBQXVCO0lBVWxDLFlBQ1kseUJBQW9ELEVBQ3BELE9BQXVCO1FBRHZCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFYekIsb0NBQStCLEdBS3JDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDbEMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQzlELENBQUM7SUFLQyxDQUFDO0lBRUo7Ozs7T0FJRztJQUNILFlBQVksQ0FDVixRQUFzQztRQUV0QyxPQUFPLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O29IQXhCVSx1QkFBdUI7d0hBQXZCLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbWFuZCwgQ29tbWFuZFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgVXNlclJlZ2lzdHJhdGlvbkZhY2FkZSxcbiAgT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vdXNlci1yZWdpc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBVc2VyUmVnaXN0cmF0aW9uQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy91c2VyLXJlZ2lzdHJhdGlvbi5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlclJlZ2lzdHJhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBVc2VyUmVnaXN0cmF0aW9uRmFjYWRlIHtcbiAgcHJvdGVjdGVkIHJlZ2lzdGVyT3JnYW5pemF0aW9uVXNlckNvbW1hbmQ6IENvbW1hbmQ8XG4gICAge1xuICAgICAgdXNlckRhdGE6IE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb247XG4gICAgfSxcbiAgICBPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uXG4gID4gPSB0aGlzLmNvbW1hbmQuY3JlYXRlKChwYXlsb2FkKSA9PlxuICAgIHRoaXMudXNlclJlZ2lzdHJhdGlvbkNvbm5lY3Rvci5yZWdpc3RlclVzZXIocGF5bG9hZC51c2VyRGF0YSlcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlclJlZ2lzdHJhdGlvbkNvbm5lY3RvcjogVXNlclJlZ2lzdHJhdGlvbkNvbm5lY3RvcixcbiAgICBwcm90ZWN0ZWQgY29tbWFuZDogQ29tbWFuZFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIG5ldyBvcmcgdXNlci5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJEYXRhXG4gICAqL1xuICByZWdpc3RlclVzZXIoXG4gICAgdXNlckRhdGE6IE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25cbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJPcmdhbml6YXRpb25Vc2VyQ29tbWFuZC5leGVjdXRlKHsgdXNlckRhdGEgfSk7XG4gIH1cbn1cbiJdfQ==