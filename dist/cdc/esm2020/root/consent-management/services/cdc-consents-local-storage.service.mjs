/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { of, Subscription } from 'rxjs';
import { StatePersistenceService } from '@spartacus/core';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
const KEY = 'cdc-consents-list';
export class CdcConsentsLocalStorageService {
    constructor(statePersistenceService) {
        this.statePersistenceService = statePersistenceService;
        this.subscription = new Subscription();
    }
    /**
     * saves active cdc consents to storage
     * @param siteConsent - cdc site consent details
     */
    persistCdcConsentsToStorage(siteConsent) {
        const consents = [];
        const siteDetails = siteConsent.siteConsentDetails;
        for (const key in siteDetails) {
            //key will be a string with dot separated IDs
            if (Object.hasOwn(siteDetails, key) &&
                siteDetails[key]?.isActive === true) {
                const consent = {};
                consent.id = key;
                consent.required = siteDetails[key]?.isMandatory;
                consents.push(consent);
            }
        }
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: KEY,
            state$: of(consents),
        }));
    }
    /**
     * Returns cdc consents from storage
     * @returns cdc consents
     */
    readCdcConsentsFromStorage() {
        return this.statePersistenceService.readStateFromStorage({
            key: KEY,
        });
    }
    /**
     * Returns true if input consent is present in storage, else returns false
     * @param consentId - cdc consent id
     * @returns - returns true/false
     */
    checkIfConsentExists(consentId) {
        const consents = this.readCdcConsentsFromStorage();
        let result = false;
        consents.forEach((consent) => {
            if (consent.id === consentId) {
                result = true;
            }
        });
        return result;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CdcConsentsLocalStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentsLocalStorageService, deps: [{ token: i1.StatePersistenceService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcConsentsLocalStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentsLocalStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcConsentsLocalStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWNvbnNlbnRzLWxvY2FsLXN0b3JhZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3Jvb3QvY29uc2VudC1tYW5hZ2VtZW50L3NlcnZpY2VzL2NkYy1jb25zZW50cy1sb2NhbC1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7OztBQU10RCxNQUFNLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztBQUtoQyxNQUFNLE9BQU8sOEJBQThCO0lBQ3pDLFlBQXNCLHVCQUFnRDtRQUFoRCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQzVELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUQ2QixDQUFDO0lBRzFFOzs7T0FHRztJQUNILDJCQUEyQixDQUFDLFdBQW1DO1FBQzdELE1BQU0sUUFBUSxHQUE4QixFQUFFLENBQUM7UUFDL0MsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLGtCQUFrQixDQUFDO1FBQ25ELEtBQUssTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFO1lBQzdCLDZDQUE2QztZQUM3QyxJQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQztnQkFDL0IsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsS0FBSyxJQUFJLEVBQ25DO2dCQUNBLE1BQU0sT0FBTyxHQUFRLEVBQUUsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQ2pCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFdBQVcsQ0FBQztnQkFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QjtTQUNGO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBRTFDO1lBQ0EsR0FBRyxFQUFFLEdBQUc7WUFDUixNQUFNLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUNyQixDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCwwQkFBMEI7UUFDeEIsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUM7WUFDdkQsR0FBRyxFQUFFLEdBQUc7U0FDVCxDQUE4QixDQUFDO0lBQ2xDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsb0JBQW9CLENBQUMsU0FBaUI7UUFDcEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbkQsSUFBSSxNQUFNLEdBQVksS0FBSyxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFO2dCQUM1QixNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzsySEE3RFUsOEJBQThCOytIQUE5Qiw4QkFBOEIsY0FGN0IsTUFBTTsyRkFFUCw4QkFBOEI7a0JBSDFDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDZGNMb2NhbFN0b3JhZ2VUZW1wbGF0ZSxcbiAgQ2RjU2l0ZUNvbnNlbnRUZW1wbGF0ZSxcbn0gZnJvbSAnLi4vbW9kZWwvaW5kZXgnO1xuXG5jb25zdCBLRVkgPSAnY2RjLWNvbnNlbnRzLWxpc3QnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2RjQ29uc2VudHNMb2NhbFN0b3JhZ2VTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlOiBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSkge31cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvKipcbiAgICogc2F2ZXMgYWN0aXZlIGNkYyBjb25zZW50cyB0byBzdG9yYWdlXG4gICAqIEBwYXJhbSBzaXRlQ29uc2VudCAtIGNkYyBzaXRlIGNvbnNlbnQgZGV0YWlsc1xuICAgKi9cbiAgcGVyc2lzdENkY0NvbnNlbnRzVG9TdG9yYWdlKHNpdGVDb25zZW50OiBDZGNTaXRlQ29uc2VudFRlbXBsYXRlKSB7XG4gICAgY29uc3QgY29uc2VudHM6IENkY0xvY2FsU3RvcmFnZVRlbXBsYXRlW10gPSBbXTtcbiAgICBjb25zdCBzaXRlRGV0YWlscyA9IHNpdGVDb25zZW50LnNpdGVDb25zZW50RGV0YWlscztcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzaXRlRGV0YWlscykge1xuICAgICAgLy9rZXkgd2lsbCBiZSBhIHN0cmluZyB3aXRoIGRvdCBzZXBhcmF0ZWQgSURzXG4gICAgICBpZiAoXG4gICAgICAgIE9iamVjdC5oYXNPd24oc2l0ZURldGFpbHMsIGtleSkgJiZcbiAgICAgICAgc2l0ZURldGFpbHNba2V5XT8uaXNBY3RpdmUgPT09IHRydWVcbiAgICAgICkge1xuICAgICAgICBjb25zdCBjb25zZW50OiBhbnkgPSB7fTtcbiAgICAgICAgY29uc2VudC5pZCA9IGtleTtcbiAgICAgICAgY29uc2VudC5yZXF1aXJlZCA9IHNpdGVEZXRhaWxzW2tleV0/LmlzTWFuZGF0b3J5O1xuICAgICAgICBjb25zZW50cy5wdXNoKGNvbnNlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLnN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLnN5bmNXaXRoU3RvcmFnZTxcbiAgICAgICAgQ2RjTG9jYWxTdG9yYWdlVGVtcGxhdGVbXSB8IHVuZGVmaW5lZFxuICAgICAgPih7XG4gICAgICAgIGtleTogS0VZLFxuICAgICAgICBzdGF0ZSQ6IG9mKGNvbnNlbnRzKSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGNkYyBjb25zZW50cyBmcm9tIHN0b3JhZ2VcbiAgICogQHJldHVybnMgY2RjIGNvbnNlbnRzXG4gICAqL1xuICByZWFkQ2RjQ29uc2VudHNGcm9tU3RvcmFnZSgpOiBDZGNMb2NhbFN0b3JhZ2VUZW1wbGF0ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVBlcnNpc3RlbmNlU2VydmljZS5yZWFkU3RhdGVGcm9tU3RvcmFnZSh7XG4gICAgICBrZXk6IEtFWSxcbiAgICB9KSBhcyBDZGNMb2NhbFN0b3JhZ2VUZW1wbGF0ZVtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBpbnB1dCBjb25zZW50IGlzIHByZXNlbnQgaW4gc3RvcmFnZSwgZWxzZSByZXR1cm5zIGZhbHNlXG4gICAqIEBwYXJhbSBjb25zZW50SWQgLSBjZGMgY29uc2VudCBpZFxuICAgKiBAcmV0dXJucyAtIHJldHVybnMgdHJ1ZS9mYWxzZVxuICAgKi9cbiAgY2hlY2tJZkNvbnNlbnRFeGlzdHMoY29uc2VudElkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBjb25zZW50cyA9IHRoaXMucmVhZENkY0NvbnNlbnRzRnJvbVN0b3JhZ2UoKTtcbiAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XG4gICAgY29uc2VudHMuZm9yRWFjaCgoY29uc2VudCkgPT4ge1xuICAgICAgaWYgKGNvbnNlbnQuaWQgPT09IGNvbnNlbnRJZCkge1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=