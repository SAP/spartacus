/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { LaunchDialogService } from '@spartacus/storefront';
import { CdcJsService, CdcUserConsentService } from '@spartacus/cdc/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cdc/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
export class CdcReconsentComponentService {
    constructor(cdcUserConsentService, cdcJsService, globalMessageService, launchDialogService) {
        this.cdcUserConsentService = cdcUserConsentService;
        this.cdcJsService = cdcJsService;
        this.globalMessageService = globalMessageService;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
    }
    /**
     * saves the consent given from reconsent pop-up and triggers a re-login
     * @param consentId - array of consent IDs
     * @param userParams - data from login session
     */
    saveConsentAndLogin(consentId, userParams) {
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                this.cdcUserConsentService
                    .updateCdcConsent(true, consentId, userParams?.user, userParams?.regToken)
                    .subscribe({
                    next: (result) => {
                        if (result?.errorCode === 0) {
                            //do a automatic re-login
                            this.cdcJsService
                                .loginUserWithoutScreenSet(userParams.user, userParams.password)
                                .subscribe(() => {
                                this.launchDialogService.closeDialog('relogin triggered');
                            });
                        }
                    },
                    error: (error) => {
                        this.handleReconsentUpdateError('Reconsent Error', error?.message);
                    },
                });
            }
            else {
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
            }
        }));
    }
    /**
     * Displays error message after closing reconsent dialog
     */
    handleReconsentUpdateError(reason, errorMessage) {
        this.launchDialogService.closeDialog(reason);
        if (errorMessage) {
            this.globalMessageService.add({
                key: 'httpHandlers.badRequestPleaseLoginAgain',
                params: {
                    errorMessage: errorMessage,
                },
            }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CdcReconsentComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentComponentService, deps: [{ token: i1.CdcUserConsentService }, { token: i1.CdcJsService }, { token: i2.GlobalMessageService }, { token: i3.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcReconsentComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentComponentService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.CdcUserConsentService }, { type: i1.CdcJsService }, { type: i2.GlobalMessageService }, { type: i3.LaunchDialogService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXJlY29uc2VudC1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3VzZXItYWNjb3VudC9sb2dpbi1mb3JtL3JlY29uc2VudC9jZGMtcmVjb25zZW50LWNvbXBvbmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7OztBQUcxRSxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDLFlBQ1kscUJBQTRDLEVBQzVDLFlBQTBCLEVBQzFCLG9CQUEwQyxFQUMxQyxtQkFBd0M7UUFIeEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFFMUMsaUJBQVksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUR2RCxDQUFDO0lBR0o7Ozs7T0FJRztJQUNILG1CQUFtQixDQUFDLFNBQW1CLEVBQUUsVUFBZTtRQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsRCxJQUFJLFNBQVMsRUFBRTtnQkFDYixJQUFJLENBQUMscUJBQXFCO3FCQUN2QixnQkFBZ0IsQ0FDZixJQUFJLEVBQ0osU0FBUyxFQUNULFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFVBQVUsRUFBRSxRQUFRLENBQ3JCO3FCQUNBLFNBQVMsQ0FBQztvQkFDVCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTt3QkFDZixJQUFJLE1BQU0sRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFOzRCQUMzQix5QkFBeUI7NEJBQ3pCLElBQUksQ0FBQyxZQUFZO2lDQUNkLHlCQUF5QixDQUN4QixVQUFVLENBQUMsSUFBSSxFQUNmLFVBQVUsQ0FBQyxRQUFRLENBQ3BCO2lDQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0NBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzRCQUM1RCxDQUFDLENBQUMsQ0FBQzt5QkFDTjtvQkFDSCxDQUFDO29CQUNELEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNmLElBQUksQ0FBQywwQkFBMEIsQ0FDN0IsaUJBQWlCLEVBQ2pCLEtBQUssRUFBRSxPQUFPLENBQ2YsQ0FBQztvQkFDSixDQUFDO2lCQUNGLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNMLG1EQUFtRDtnQkFDbkQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0I7b0JBQ0UsR0FBRyxFQUFFLGtDQUFrQztpQkFDeEMsRUFDRCxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBMEIsQ0FBQyxNQUFlLEVBQUUsWUFBcUI7UUFDL0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQjtnQkFDRSxHQUFHLEVBQUUseUNBQXlDO2dCQUM5QyxNQUFNLEVBQUU7b0JBQ04sWUFBWSxFQUFFLFlBQVk7aUJBQzNCO2FBQ0YsRUFDRCxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt5SEEvRVUsNEJBQTRCOzZIQUE1Qiw0QkFBNEIsY0FEZixNQUFNOzJGQUNuQiw0QkFBNEI7a0JBRHhDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlU2VydmljZSwgR2xvYmFsTWVzc2FnZVR5cGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMYXVuY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENkY0pzU2VydmljZSwgQ2RjVXNlckNvbnNlbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jZGMvcm9vdCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ2RjUmVjb25zZW50Q29tcG9uZW50U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjZGNVc2VyQ29uc2VudFNlcnZpY2U6IENkY1VzZXJDb25zZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2RjSnNTZXJ2aWNlOiBDZGNKc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZVxuICApIHt9XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvKipcbiAgICogc2F2ZXMgdGhlIGNvbnNlbnQgZ2l2ZW4gZnJvbSByZWNvbnNlbnQgcG9wLXVwIGFuZCB0cmlnZ2VycyBhIHJlLWxvZ2luXG4gICAqIEBwYXJhbSBjb25zZW50SWQgLSBhcnJheSBvZiBjb25zZW50IElEc1xuICAgKiBAcGFyYW0gdXNlclBhcmFtcyAtIGRhdGEgZnJvbSBsb2dpbiBzZXNzaW9uXG4gICAqL1xuICBzYXZlQ29uc2VudEFuZExvZ2luKGNvbnNlbnRJZDogc3RyaW5nW10sIHVzZXJQYXJhbXM6IGFueSkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuY2RjSnNTZXJ2aWNlLmRpZExvYWQoKS5zdWJzY3JpYmUoKGNkY0xvYWRlZCkgPT4ge1xuICAgICAgICBpZiAoY2RjTG9hZGVkKSB7XG4gICAgICAgICAgdGhpcy5jZGNVc2VyQ29uc2VudFNlcnZpY2VcbiAgICAgICAgICAgIC51cGRhdGVDZGNDb25zZW50KFxuICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICBjb25zZW50SWQsXG4gICAgICAgICAgICAgIHVzZXJQYXJhbXM/LnVzZXIsXG4gICAgICAgICAgICAgIHVzZXJQYXJhbXM/LnJlZ1Rva2VuXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgbmV4dDogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQ/LmVycm9yQ29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgLy9kbyBhIGF1dG9tYXRpYyByZS1sb2dpblxuICAgICAgICAgICAgICAgICAgdGhpcy5jZGNKc1NlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgLmxvZ2luVXNlcldpdGhvdXRTY3JlZW5TZXQoXG4gICAgICAgICAgICAgICAgICAgICAgdXNlclBhcmFtcy51c2VyLFxuICAgICAgICAgICAgICAgICAgICAgIHVzZXJQYXJhbXMucGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2UuY2xvc2VEaWFsb2coJ3JlbG9naW4gdHJpZ2dlcmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVjb25zZW50VXBkYXRlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAnUmVjb25zZW50IEVycm9yJyxcbiAgICAgICAgICAgICAgICAgIGVycm9yPy5tZXNzYWdlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIENEQyBHaWd5YSBTREsgbm90IGxvYWRlZCwgc2hvdyBlcnJvciB0byB0aGUgdXNlclxuICAgICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6ICdlcnJvckhhbmRsZXJzLnNjcmlwdEZhaWxlZFRvTG9hZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGxheXMgZXJyb3IgbWVzc2FnZSBhZnRlciBjbG9zaW5nIHJlY29uc2VudCBkaWFsb2dcbiAgICovXG4gIGhhbmRsZVJlY29uc2VudFVwZGF0ZUVycm9yKHJlYXNvbj86IHN0cmluZywgZXJyb3JNZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsb3NlRGlhbG9nKHJlYXNvbik7XG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6ICdodHRwSGFuZGxlcnMuYmFkUmVxdWVzdFBsZWFzZUxvZ2luQWdhaW4nLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19