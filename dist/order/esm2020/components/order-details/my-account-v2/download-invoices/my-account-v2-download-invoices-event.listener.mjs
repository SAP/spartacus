/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable } from '@angular/core';
import { EventService } from '@spartacus/core';
import { DownloadOrderInvoicesEvent } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class MyAccountV2DownloadInvoicesEventListener {
    constructor() {
        this.subscription = new Subscription();
        this.eventService = inject(EventService);
        this.launchDialogService = inject(LaunchDialogService);
        this.onDownloadInvoices();
    }
    onDownloadInvoices() {
        this.subscription.add(this.eventService.get(DownloadOrderInvoicesEvent).subscribe((event) => {
            this.openDialog(event);
        }));
    }
    openDialog(event) {
        const dialog = this.launchDialogService.openDialog("DOWNLOAD_ORDER_INVOICES" /* LAUNCH_CALLER.DOWNLOAD_ORDER_INVOICES */, undefined, undefined, event.order);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
MyAccountV2DownloadInvoicesEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesEventListener, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MyAccountV2DownloadInvoicesEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktYWNjb3VudC12Mi1kb3dubG9hZC1pbnZvaWNlcy1ldmVudC5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL29yZGVyLWRldGFpbHMvbXktYWNjb3VudC12Mi9kb3dubG9hZC1pbnZvaWNlcy9teS1hY2NvdW50LXYyLWRvd25sb2FkLWludm9pY2VzLWV2ZW50Lmxpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFpQixNQUFNLHVCQUF1QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUt0QyxNQUFNLE9BQU8sd0NBQXdDO0lBSW5EO1FBSFUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGlCQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLHdCQUFtQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDUyxrQkFBa0I7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUNTLFVBQVUsQ0FBQyxLQUFpQztRQUNwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSx3RUFFaEQsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLENBQUMsS0FBSyxDQUNaLENBQUM7UUFDRixJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7cUlBM0JVLHdDQUF3Qzt5SUFBeEMsd0NBQXdDLGNBRnZDLE1BQU07MkZBRVAsd0NBQXdDO2tCQUhwRCxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRG93bmxvYWRPcmRlckludm9pY2VzRXZlbnQgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgTGF1bmNoRGlhbG9nU2VydmljZSwgTEFVTkNIX0NBTExFUiB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNeUFjY291bnRWMkRvd25sb2FkSW52b2ljZXNFdmVudExpc3RlbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJvdGVjdGVkIGV2ZW50U2VydmljZSA9IGluamVjdChFdmVudFNlcnZpY2UpO1xuICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZSA9IGluamVjdChMYXVuY2hEaWFsb2dTZXJ2aWNlKTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vbkRvd25sb2FkSW52b2ljZXMoKTtcbiAgfVxuICBwcm90ZWN0ZWQgb25Eb3dubG9hZEludm9pY2VzKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChEb3dubG9hZE9yZGVySW52b2ljZXNFdmVudCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLm9wZW5EaWFsb2coZXZlbnQpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG4gIHByb3RlY3RlZCBvcGVuRGlhbG9nKGV2ZW50OiBEb3dubG9hZE9yZGVySW52b2ljZXNFdmVudCkge1xuICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5vcGVuRGlhbG9nKFxuICAgICAgTEFVTkNIX0NBTExFUi5ET1dOTE9BRF9PUkRFUl9JTlZPSUNFUyxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIGV2ZW50Lm9yZGVyXG4gICAgKTtcbiAgICBpZiAoZGlhbG9nKSB7XG4gICAgICBkaWFsb2cucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==