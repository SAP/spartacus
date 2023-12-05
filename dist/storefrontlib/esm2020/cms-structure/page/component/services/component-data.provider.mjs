/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { defer, EMPTY, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/cms-components.service";
import * as i2 from "@spartacus/core";
/**
 * Provides data for `CmsComponentData`. This is used while component is injected
 * dynamically, so that the component implementation can access the data.
 *
 * The data is resolved from dynamic data (CMS api) as well as static configured data.
 */
export class ComponentDataProvider {
    constructor(componentsService, cmsService) {
        this.componentsService = componentsService;
        this.cmsService = cmsService;
    }
    /**
     * Return the component data for a component given by the `uid`.
     *
     * If the `type` is provided, static component data (if available) is
     * merged into the component data. The static data is complemented and
     * overridden with data retrieved from the cms service.
     */
    get(uid, type) {
        return defer(() => {
            let staticComponentData;
            if (type) {
                staticComponentData = this.componentsService.getStaticData(type);
            }
            if (uid) {
                if (staticComponentData) {
                    return this.cmsService.getComponentData(uid).pipe(map((data) => ({
                        ...staticComponentData,
                        ...data,
                    })), startWith(staticComponentData));
                }
                else {
                    return this.cmsService.getComponentData(uid);
                }
            }
            else {
                return staticComponentData ? of(staticComponentData) : EMPTY;
            }
        });
    }
}
ComponentDataProvider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ComponentDataProvider, deps: [{ token: i1.CmsComponentsService }, { token: i2.CmsService }], target: i0.ɵɵFactoryTarget.Injectable });
ComponentDataProvider.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ComponentDataProvider, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ComponentDataProvider, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentsService }, { type: i2.CmsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWRhdGEucHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9jb21wb25lbnQvc2VydmljZXMvY29tcG9uZW50LWRhdGEucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHaEQ7Ozs7O0dBS0c7QUFJSCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQ1ksaUJBQXVDLEVBQ3ZDLFVBQXNCO1FBRHRCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBc0I7UUFDdkMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUMvQixDQUFDO0lBRUo7Ozs7OztPQU1HO0lBQ0gsR0FBRyxDQUF5QixHQUFXLEVBQUUsSUFBYTtRQUNwRCxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDaEIsSUFBSSxtQkFBa0MsQ0FBQztZQUV2QyxJQUFJLElBQUksRUFBRTtnQkFDUixtQkFBbUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFJLElBQUksQ0FBQyxDQUFDO2FBQ3JFO1lBRUQsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxtQkFBbUIsRUFBRTtvQkFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDbEQsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNiLEdBQUcsbUJBQW1CO3dCQUN0QixHQUFHLElBQUk7cUJBQ1IsQ0FBQyxDQUFDLEVBQ0gsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQy9CLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNqRDthQUNGO2lCQUFNO2dCQUNMLE9BQU8sbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDOUQ7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2tIQXJDVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnQsIENtc1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZGVmZXIsIEVNUFRZLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2Ntcy1jb21wb25lbnRzLnNlcnZpY2UnO1xuXG4vKipcbiAqIFByb3ZpZGVzIGRhdGEgZm9yIGBDbXNDb21wb25lbnREYXRhYC4gVGhpcyBpcyB1c2VkIHdoaWxlIGNvbXBvbmVudCBpcyBpbmplY3RlZFxuICogZHluYW1pY2FsbHksIHNvIHRoYXQgdGhlIGNvbXBvbmVudCBpbXBsZW1lbnRhdGlvbiBjYW4gYWNjZXNzIHRoZSBkYXRhLlxuICpcbiAqIFRoZSBkYXRhIGlzIHJlc29sdmVkIGZyb20gZHluYW1pYyBkYXRhIChDTVMgYXBpKSBhcyB3ZWxsIGFzIHN0YXRpYyBjb25maWd1cmVkIGRhdGEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb21wb25lbnREYXRhUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29tcG9uZW50c1NlcnZpY2U6IENtc0NvbXBvbmVudHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjbXNTZXJ2aWNlOiBDbXNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjb21wb25lbnQgZGF0YSBmb3IgYSBjb21wb25lbnQgZ2l2ZW4gYnkgdGhlIGB1aWRgLlxuICAgKlxuICAgKiBJZiB0aGUgYHR5cGVgIGlzIHByb3ZpZGVkLCBzdGF0aWMgY29tcG9uZW50IGRhdGEgKGlmIGF2YWlsYWJsZSkgaXNcbiAgICogbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCBkYXRhLiBUaGUgc3RhdGljIGRhdGEgaXMgY29tcGxlbWVudGVkIGFuZFxuICAgKiBvdmVycmlkZGVuIHdpdGggZGF0YSByZXRyaWV2ZWQgZnJvbSB0aGUgY21zIHNlcnZpY2UuXG4gICAqL1xuICBnZXQ8VCBleHRlbmRzIENtc0NvbXBvbmVudD4odWlkOiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gZGVmZXIoKCkgPT4ge1xuICAgICAgbGV0IHN0YXRpY0NvbXBvbmVudERhdGE6IFQgfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgIHN0YXRpY0NvbXBvbmVudERhdGEgPSB0aGlzLmNvbXBvbmVudHNTZXJ2aWNlLmdldFN0YXRpY0RhdGE8VD4odHlwZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1aWQpIHtcbiAgICAgICAgaWYgKHN0YXRpY0NvbXBvbmVudERhdGEpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jbXNTZXJ2aWNlLmdldENvbXBvbmVudERhdGE8VD4odWlkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChkYXRhKSA9PiAoe1xuICAgICAgICAgICAgICAuLi5zdGF0aWNDb21wb25lbnREYXRhLFxuICAgICAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhcnRXaXRoKHN0YXRpY0NvbXBvbmVudERhdGEpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jbXNTZXJ2aWNlLmdldENvbXBvbmVudERhdGE8VD4odWlkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHN0YXRpY0NvbXBvbmVudERhdGEgPyBvZihzdGF0aWNDb21wb25lbnREYXRhKSA6IEVNUFRZO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=