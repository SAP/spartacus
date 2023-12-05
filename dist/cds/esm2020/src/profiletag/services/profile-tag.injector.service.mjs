/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./profiletag-event.service";
import * as i2 from "../connectors/cds-backend-connector";
import * as i3 from "./profile-tag-lifecycle.service";
export class ProfileTagInjectorService {
    constructor(profileTagEventTracker, cdsBackendConnector, profileTagLifecycleService) {
        this.profileTagEventTracker = profileTagEventTracker;
        this.cdsBackendConnector = cdsBackendConnector;
        this.profileTagLifecycleService = profileTagLifecycleService;
    }
    track() {
        return this.profileTagEventTracker
            .addTracker()
            .pipe(switchMap((_) => merge(this.profileTagEventTracker.getProfileTagEvents(), this.notifyEcOfLoginSuccessful()).pipe(map(() => true))));
    }
    notifyEcOfLoginSuccessful() {
        return this.profileTagLifecycleService.loginSuccessful().pipe(switchMap((_) => {
            return this.cdsBackendConnector
                .notifySuccessfulLogin()
                .pipe(map(() => true));
        }));
    }
}
ProfileTagInjectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagInjectorService, deps: [{ token: i1.ProfileTagEventService }, { token: i2.CdsBackendConnector }, { token: i3.ProfileTagLifecycleService }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagInjectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagInjectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagInjectorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProfileTagEventService }, { type: i2.CdsBackendConnector }, { type: i3.ProfileTagLifecycleService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS10YWcuaW5qZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RzL3NyYy9wcm9maWxldGFnL3NlcnZpY2VzL3Byb2ZpbGUtdGFnLmluamVjdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQVFoRCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQ1Usc0JBQThDLEVBQzlDLG1CQUF3QyxFQUN4QywwQkFBc0Q7UUFGdEQsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7SUFDN0QsQ0FBQztJQUVKLEtBQUs7UUFDSCxPQUFPLElBQUksQ0FBQyxzQkFBc0I7YUFDL0IsVUFBVSxFQUFFO2FBQ1osSUFBSSxDQUNILFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ2QsS0FBSyxDQUNILElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsRUFBRSxFQUNqRCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FDakMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3hCLENBQ0YsQ0FBQztJQUNOLENBQUM7SUFFTyx5QkFBeUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUMzRCxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLG1CQUFtQjtpQkFDNUIscUJBQXFCLEVBQUU7aUJBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7c0hBNUJVLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRnhCLE1BQU07MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENkc0JhY2tlbmRDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL2Nkcy1iYWNrZW5kLWNvbm5lY3Rvcic7XG5pbXBvcnQgeyBQcm9maWxlVGFnTGlmZWN5Y2xlU2VydmljZSB9IGZyb20gJy4vcHJvZmlsZS10YWctbGlmZWN5Y2xlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZmlsZVRhZ0V2ZW50U2VydmljZSB9IGZyb20gJy4vcHJvZmlsZXRhZy1ldmVudC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVUYWdJbmplY3RvclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHByb2ZpbGVUYWdFdmVudFRyYWNrZXI6IFByb2ZpbGVUYWdFdmVudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHNCYWNrZW5kQ29ubmVjdG9yOiBDZHNCYWNrZW5kQ29ubmVjdG9yLFxuICAgIHByaXZhdGUgcHJvZmlsZVRhZ0xpZmVjeWNsZVNlcnZpY2U6IFByb2ZpbGVUYWdMaWZlY3ljbGVTZXJ2aWNlXG4gICkge31cblxuICB0cmFjaygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlVGFnRXZlbnRUcmFja2VyXG4gICAgICAuYWRkVHJhY2tlcigpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChfKSA9PlxuICAgICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5wcm9maWxlVGFnRXZlbnRUcmFja2VyLmdldFByb2ZpbGVUYWdFdmVudHMoKSxcbiAgICAgICAgICAgIHRoaXMubm90aWZ5RWNPZkxvZ2luU3VjY2Vzc2Z1bCgpXG4gICAgICAgICAgKS5waXBlKG1hcCgoKSA9PiB0cnVlKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5RWNPZkxvZ2luU3VjY2Vzc2Z1bCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlVGFnTGlmZWN5Y2xlU2VydmljZS5sb2dpblN1Y2Nlc3NmdWwoKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChfKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNkc0JhY2tlbmRDb25uZWN0b3JcbiAgICAgICAgICAubm90aWZ5U3VjY2Vzc2Z1bExvZ2luKClcbiAgICAgICAgICAucGlwZShtYXAoKCkgPT4gdHJ1ZSkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=