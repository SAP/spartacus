/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcReConsentEvent } from '@spartacus/cdc/root';
import { EventService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/storefront";
export class CdcReconsentDialogEventListener {
    constructor(eventService, launchDialogService) {
        this.eventService = eventService;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.onReconsent();
    }
    onReconsent() {
        this.subscription.add(this.eventService.get(CdcReConsentEvent).subscribe((event) => {
            this.openDialog(event);
        }));
    }
    openDialog(event) {
        const reconsentData = {
            user: event.user,
            password: event.password,
            consentIds: event.consentIds,
            errorMessage: event.errorMessage,
            regToken: event.regToken,
        };
        const dialog = this.launchDialogService.openDialog("CDC_RECONSENT" /* LAUNCH_CALLER.CDC_RECONSENT */, undefined, undefined, reconsentData);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CdcReconsentDialogEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentDialogEventListener, deps: [{ token: i1.EventService }, { token: i2.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcReconsentDialogEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentDialogEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcReconsentDialogEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.LaunchDialogService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXJlY29uc2VudC1kaWFsb2d1ZS1ldmVudC5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3VzZXItYWNjb3VudC9sb2dpbi1mb3JtL3JlY29uc2VudC9jZGMtcmVjb25zZW50LWRpYWxvZ3VlLWV2ZW50Lmxpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQWlCLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJdEMsTUFBTSxPQUFPLCtCQUErQjtJQUcxQyxZQUNZLFlBQTBCLEVBQzFCLG1CQUF3QztRQUR4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSjFDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU0xQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNTLFdBQVc7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLFVBQVUsQ0FBQyxLQUF3QjtRQUMzQyxNQUFNLGFBQWEsR0FBRztZQUNwQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDaEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtZQUM1QixZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVk7WUFDaEMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1NBQ3pCLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxvREFFaEQsU0FBUyxFQUNULFNBQVMsRUFDVCxhQUFhLENBQ2QsQ0FBQztRQUNGLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs0SEF0Q1UsK0JBQStCO2dJQUEvQiwrQkFBK0IsY0FGOUIsTUFBTTsyRkFFUCwrQkFBK0I7a0JBSDNDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGNSZUNvbnNlbnRFdmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY2RjL3Jvb3QnO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExhdW5jaERpYWxvZ1NlcnZpY2UsIExBVU5DSF9DQUxMRVIgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENkY1JlY29uc2VudERpYWxvZ0V2ZW50TGlzdGVuZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZVxuICApIHtcbiAgICB0aGlzLm9uUmVjb25zZW50KCk7XG4gIH1cbiAgcHJvdGVjdGVkIG9uUmVjb25zZW50KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDZGNSZUNvbnNlbnRFdmVudCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLm9wZW5EaWFsb2coZXZlbnQpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9wZW5EaWFsb2coZXZlbnQ6IENkY1JlQ29uc2VudEV2ZW50KSB7XG4gICAgY29uc3QgcmVjb25zZW50RGF0YSA9IHtcbiAgICAgIHVzZXI6IGV2ZW50LnVzZXIsXG4gICAgICBwYXNzd29yZDogZXZlbnQucGFzc3dvcmQsXG4gICAgICBjb25zZW50SWRzOiBldmVudC5jb25zZW50SWRzLFxuICAgICAgZXJyb3JNZXNzYWdlOiBldmVudC5lcnJvck1lc3NhZ2UsXG4gICAgICByZWdUb2tlbjogZXZlbnQucmVnVG9rZW4sXG4gICAgfTtcbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2Uub3BlbkRpYWxvZyhcbiAgICAgIExBVU5DSF9DQUxMRVIuQ0RDX1JFQ09OU0VOVCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHJlY29uc2VudERhdGFcbiAgICApO1xuICAgIGlmIChkaWFsb2cpIHtcbiAgICAgIGRpYWxvZy5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=