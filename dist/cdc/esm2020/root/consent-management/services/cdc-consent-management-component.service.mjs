/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConsentManagementComponentService } from '@spartacus/storefront';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "./cdc-consents-local-storage.service";
export class CdcConsentManagementComponentService extends ConsentManagementComponentService {
    constructor(store) {
        super();
        this.store = store;
    }
    getRequiredConsents(templateList) {
        const requiredConsents = [];
        const cdcConsents = this.getCdcConsentIDs(true);
        requiredConsents.push(...super.getRequiredConsents(templateList));
        requiredConsents.push(...cdcConsents);
        return requiredConsents;
    }
    /**
     * Returns cdc consents from store
     * @param mandatoryConsents - if passed true, only mandatory consents will be returned.
     * if passed false, all active consents (irrespective of whether they are mandatory or not)
     * @returns array of consents
     */
    getCdcConsentIDs(mandatoryConsents = false) {
        const consentIDs = [];
        const consents = this.store.readCdcConsentsFromStorage() || [];
        consents.forEach((consent) => {
            if (mandatoryConsents === true) {
                if (consent.required === true) {
                    consentIDs.push(consent.id);
                }
            }
            else {
                consentIDs.push(consent.id);
            }
        });
        return consentIDs;
    }
}
CdcConsentManagementComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementComponentService, deps: [{ token: i1.CdcConsentsLocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcConsentManagementComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentManagementComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CdcConsentsLocalStorageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWNvbnNlbnQtbWFuYWdlbWVudC1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3Jvb3QvY29uc2VudC1tYW5hZ2VtZW50L3NlcnZpY2VzL2NkYy1jb25zZW50LW1hbmFnZW1lbnQtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7OztBQUt0RixNQUFNLE9BQU8sb0NBQXFDLFNBQVEsaUNBQWlDO0lBQ3pGLFlBQXNCLEtBQXFDO1FBQ3pELEtBQUssRUFBRSxDQUFDO1FBRFksVUFBSyxHQUFMLEtBQUssQ0FBZ0M7SUFFM0QsQ0FBQztJQUNELG1CQUFtQixDQUFDLFlBQStCO1FBQ2pELE1BQU0sZ0JBQWdCLEdBQWEsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNsRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQztRQUN0QyxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGdCQUFnQixDQUFDLG9CQUE2QixLQUFLO1FBQ2pELE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztRQUNoQyxNQUFNLFFBQVEsR0FDWixJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixJQUFJLGlCQUFpQixLQUFLLElBQUksRUFBRTtnQkFDOUIsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDN0IsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzdCO2FBQ0Y7aUJBQU07Z0JBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDN0I7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7O2lJQWhDVSxvQ0FBb0M7cUlBQXBDLG9DQUFvQyxjQUZuQyxNQUFNOzJGQUVQLG9DQUFvQztrQkFIaEQsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25zZW50VGVtcGxhdGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uc2VudE1hbmFnZW1lbnRDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENkY0xvY2FsU3RvcmFnZVRlbXBsYXRlIH0gZnJvbSAnLi4vbW9kZWwvaW5kZXgnO1xuaW1wb3J0IHsgQ2RjQ29uc2VudHNMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9jZGMtY29uc2VudHMtbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENkY0NvbnNlbnRNYW5hZ2VtZW50Q29tcG9uZW50U2VydmljZSBleHRlbmRzIENvbnNlbnRNYW5hZ2VtZW50Q29tcG9uZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdG9yZTogQ2RjQ29uc2VudHNMb2NhbFN0b3JhZ2VTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBnZXRSZXF1aXJlZENvbnNlbnRzKHRlbXBsYXRlTGlzdDogQ29uc2VudFRlbXBsYXRlW10pOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVxdWlyZWRDb25zZW50czogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBjZGNDb25zZW50cyA9IHRoaXMuZ2V0Q2RjQ29uc2VudElEcyh0cnVlKTtcbiAgICByZXF1aXJlZENvbnNlbnRzLnB1c2goLi4uc3VwZXIuZ2V0UmVxdWlyZWRDb25zZW50cyh0ZW1wbGF0ZUxpc3QpKTtcbiAgICByZXF1aXJlZENvbnNlbnRzLnB1c2goLi4uY2RjQ29uc2VudHMpO1xuICAgIHJldHVybiByZXF1aXJlZENvbnNlbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2RjIGNvbnNlbnRzIGZyb20gc3RvcmVcbiAgICogQHBhcmFtIG1hbmRhdG9yeUNvbnNlbnRzIC0gaWYgcGFzc2VkIHRydWUsIG9ubHkgbWFuZGF0b3J5IGNvbnNlbnRzIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAqIGlmIHBhc3NlZCBmYWxzZSwgYWxsIGFjdGl2ZSBjb25zZW50cyAoaXJyZXNwZWN0aXZlIG9mIHdoZXRoZXIgdGhleSBhcmUgbWFuZGF0b3J5IG9yIG5vdClcbiAgICogQHJldHVybnMgYXJyYXkgb2YgY29uc2VudHNcbiAgICovXG4gIGdldENkY0NvbnNlbnRJRHMobWFuZGF0b3J5Q29uc2VudHM6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBjb25zZW50SURzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGNvbnNlbnRzOiBDZGNMb2NhbFN0b3JhZ2VUZW1wbGF0ZVtdID1cbiAgICAgIHRoaXMuc3RvcmUucmVhZENkY0NvbnNlbnRzRnJvbVN0b3JhZ2UoKSB8fCBbXTtcbiAgICBjb25zZW50cy5mb3JFYWNoKChjb25zZW50KSA9PiB7XG4gICAgICBpZiAobWFuZGF0b3J5Q29uc2VudHMgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGNvbnNlbnQucmVxdWlyZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zZW50SURzLnB1c2goY29uc2VudC5pZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNlbnRJRHMucHVzaChjb25zZW50LmlkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29uc2VudElEcztcbiAgfVxufVxuIl19