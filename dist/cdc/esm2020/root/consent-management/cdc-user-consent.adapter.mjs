/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService, OccUserConsentAdapter, } from '@spartacus/core';
import { EMPTY, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CdcConsentsLocalStorageService } from './services/cdc-consents-local-storage.service';
import { CdcUserConsentService } from './services/cdc-user-consent.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
import * as i3 from "./services/cdc-user-consent.service";
import * as i4 from "./services/cdc-consents-local-storage.service";
export class CdcUserConsentAdapter extends OccUserConsentAdapter {
    constructor(http, occEndpoints, converter, cdcUserConsentService, cdcConsentsStorage) {
        super(http, occEndpoints, converter);
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.cdcUserConsentService = cdcUserConsentService;
        this.cdcConsentsStorage = cdcConsentsStorage;
    }
    loadConsents(userId) {
        return super.loadConsents(userId);
    }
    giveConsent(userId, consentTemplateId, consentTemplateVersion) {
        if (!this.cdcConsentsStorage.checkIfConsentExists(consentTemplateId)) {
            return super.giveConsent(userId, consentTemplateId, consentTemplateVersion);
        }
        else {
            return this.cdcUserConsentService
                .updateCdcConsent(true, [consentTemplateId])
                .pipe(catchError((error) => throwError(error)), switchMap((result) => {
                if (result?.errorCode === 0) {
                    return super.giveConsent(userId, consentTemplateId, consentTemplateVersion);
                }
                return EMPTY;
            }));
        }
    }
    withdrawConsent(userId, consentCode, consentId) {
        if (!this.cdcConsentsStorage.checkIfConsentExists(consentId ?? '')) {
            return super.withdrawConsent(userId, consentCode);
        }
        else {
            return this.cdcUserConsentService
                .updateCdcConsent(false, consentId ? [consentId] : [])
                .pipe(catchError((error) => throwError(error)), switchMap((result) => {
                if (result?.errorCode === 0) {
                    return super.withdrawConsent(userId, consentCode);
                }
                return EMPTY;
            }));
        }
    }
}
CdcUserConsentAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }, { token: i3.CdcUserConsentService }, { token: i4.CdcConsentsLocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserConsentAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentAdapter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserConsentAdapter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }, { type: i3.CdcUserConsentService }, { type: i4.CdcConsentsLocalStorageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItY29uc2VudC5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvcm9vdC9jb25zZW50LW1hbmFnZW1lbnQvY2RjLXVzZXItY29uc2VudC5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQixxQkFBcUIsR0FDdEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsS0FBSyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7Ozs7QUFHNUUsTUFBTSxPQUFPLHFCQUFzQixTQUFRLHFCQUFxQjtJQUM5RCxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCLEVBQzNCLHFCQUE0QyxFQUM1QyxrQkFBa0Q7UUFFNUQsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFOM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0IsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWdDO0lBRzlELENBQUM7SUFFRCxZQUFZLENBQUMsTUFBYztRQUN6QixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELFdBQVcsQ0FDVCxNQUFjLEVBQ2QsaUJBQXlCLEVBQ3pCLHNCQUE4QjtRQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDcEUsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUN0QixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLHNCQUFzQixDQUN2QixDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLHFCQUFxQjtpQkFDOUIsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDM0MsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQzdDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNuQixJQUFJLE1BQU0sRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFO29CQUMzQixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQ3RCLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsc0JBQXNCLENBQ3ZCLENBQUM7aUJBQ0g7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUMsQ0FDSCxDQUFDO1NBQ0w7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUNiLE1BQWMsRUFDZCxXQUFtQixFQUNuQixTQUFrQjtRQUVsQixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsRUFBRTtZQUNsRSxPQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxxQkFBcUI7aUJBQzlCLGdCQUFnQixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztpQkFDckQsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQzdDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNuQixJQUFJLE1BQU0sRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFO29CQUMzQixPQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNuRDtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUNILENBQUM7U0FDTDtJQUNILENBQUM7O2tIQWhFVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQURSLE1BQU07MkZBQ25CLHFCQUFxQjtrQkFEakMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29uc2VudFRlbXBsYXRlLFxuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICBPY2NVc2VyQ29uc2VudEFkYXB0ZXIsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2RjQ29uc2VudHNMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jZGMtY29uc2VudHMtbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IENkY1VzZXJDb25zZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY2RjLXVzZXItY29uc2VudC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDZGNVc2VyQ29uc2VudEFkYXB0ZXIgZXh0ZW5kcyBPY2NVc2VyQ29uc2VudEFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNkY1VzZXJDb25zZW50U2VydmljZTogQ2RjVXNlckNvbnNlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZGNDb25zZW50c1N0b3JhZ2U6IENkY0NvbnNlbnRzTG9jYWxTdG9yYWdlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihodHRwLCBvY2NFbmRwb2ludHMsIGNvbnZlcnRlcik7XG4gIH1cblxuICBsb2FkQ29uc2VudHModXNlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvbnNlbnRUZW1wbGF0ZVtdPiB7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWRDb25zZW50cyh1c2VySWQpO1xuICB9XG4gIGdpdmVDb25zZW50KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNvbnNlbnRUZW1wbGF0ZUlkOiBzdHJpbmcsXG4gICAgY29uc2VudFRlbXBsYXRlVmVyc2lvbjogbnVtYmVyXG4gICk6IE9ic2VydmFibGU8Q29uc2VudFRlbXBsYXRlPiB7XG4gICAgaWYgKCF0aGlzLmNkY0NvbnNlbnRzU3RvcmFnZS5jaGVja0lmQ29uc2VudEV4aXN0cyhjb25zZW50VGVtcGxhdGVJZCkpIHtcbiAgICAgIHJldHVybiBzdXBlci5naXZlQ29uc2VudChcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjb25zZW50VGVtcGxhdGVJZCxcbiAgICAgICAgY29uc2VudFRlbXBsYXRlVmVyc2lvblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2RjVXNlckNvbnNlbnRTZXJ2aWNlXG4gICAgICAgIC51cGRhdGVDZGNDb25zZW50KHRydWUsIFtjb25zZW50VGVtcGxhdGVJZF0pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBhbnkpID0+IHRocm93RXJyb3IoZXJyb3IpKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdD8uZXJyb3JDb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzdXBlci5naXZlQ29uc2VudChcbiAgICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgICAgY29uc2VudFRlbXBsYXRlSWQsXG4gICAgICAgICAgICAgICAgY29uc2VudFRlbXBsYXRlVmVyc2lvblxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgd2l0aGRyYXdDb25zZW50KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNvbnNlbnRDb2RlOiBzdHJpbmcsXG4gICAgY29uc2VudElkPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8e30+IHtcbiAgICBpZiAoIXRoaXMuY2RjQ29uc2VudHNTdG9yYWdlLmNoZWNrSWZDb25zZW50RXhpc3RzKGNvbnNlbnRJZCA/PyAnJykpIHtcbiAgICAgIHJldHVybiBzdXBlci53aXRoZHJhd0NvbnNlbnQodXNlcklkLCBjb25zZW50Q29kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNkY1VzZXJDb25zZW50U2VydmljZVxuICAgICAgICAudXBkYXRlQ2RjQ29uc2VudChmYWxzZSwgY29uc2VudElkID8gW2NvbnNlbnRJZF0gOiBbXSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IGFueSkgPT4gdGhyb3dFcnJvcihlcnJvcikpLFxuICAgICAgICAgIHN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0Py5lcnJvckNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLndpdGhkcmF3Q29uc2VudCh1c2VySWQsIGNvbnNlbnRDb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19