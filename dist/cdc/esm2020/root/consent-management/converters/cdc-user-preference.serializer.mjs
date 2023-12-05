/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CdcUserPreferenceSerializer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (source) {
            const preference = source.id?.concat('.isConsentGranted');
            let giveConsent = false;
            if (preference) {
                if (source.currentConsent?.consentGivenDate) {
                    giveConsent = true;
                }
                target = this.convertToCdcPreference(preference, giveConsent);
            }
        }
        return target;
    }
    /**
     * converts a dot separated string to deeply nested object
     * @param path : dot separated string
     * @param value : true if consent is given, false if consent is withdrawn
     * @returns preference object compatible for cdc
     * example:
     * input path x.y.z.isConsentGranted
     * input value: true
     * output=  x:{y:{z:{isConsentGranted: true}}}
     */
    convertToCdcPreference(path, value) {
        const target = {};
        let consentCode = target;
        const list = path.split('.');
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
            const elem = list[i];
            if (!consentCode[elem]) {
                consentCode[elem] = {};
            }
            consentCode = consentCode[elem];
        }
        consentCode[list[len - 1]] = value;
        return target;
    }
}
CdcUserPreferenceSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserPreferenceSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserPreferenceSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserPreferenceSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcUserPreferenceSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItcHJlZmVyZW5jZS5zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvcm9vdC9jb25zZW50LW1hbmFnZW1lbnQvY29udmVydGVycy9jZGMtdXNlci1wcmVmZXJlbmNlLnNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sT0FBTywyQkFBMkI7SUFHdEM7UUFDRSxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUF1QixFQUFFLE1BQVk7UUFDM0MsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFELElBQUksV0FBVyxHQUFZLEtBQUssQ0FBQztZQUNqQyxJQUFJLFVBQVUsRUFBRTtnQkFDZCxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUU7b0JBQzNDLFdBQVcsR0FBRyxJQUFJLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQy9EO1NBQ0Y7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0ssc0JBQXNCLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDckQsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUN6QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RCLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDeEI7WUFDRCxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDbkMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7d0hBN0NVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRGQsTUFBTTsyRkFDbkIsMkJBQTJCO2tCQUR2QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnNlbnRUZW1wbGF0ZSwgQ29udmVydGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDZGNVc2VyUHJlZmVyZW5jZVNlcmlhbGl6ZXJcbiAgaW1wbGVtZW50cyBDb252ZXJ0ZXI8Q29uc2VudFRlbXBsYXRlLCBhbnk+XG57XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICBjb252ZXJ0KHNvdXJjZTogQ29uc2VudFRlbXBsYXRlLCB0YXJnZXQ/OiBhbnkpOiBhbnkge1xuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIGNvbnN0IHByZWZlcmVuY2UgPSBzb3VyY2UuaWQ/LmNvbmNhdCgnLmlzQ29uc2VudEdyYW50ZWQnKTtcbiAgICAgIGxldCBnaXZlQ29uc2VudDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgaWYgKHByZWZlcmVuY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZS5jdXJyZW50Q29uc2VudD8uY29uc2VudEdpdmVuRGF0ZSkge1xuICAgICAgICAgIGdpdmVDb25zZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQgPSB0aGlzLmNvbnZlcnRUb0NkY1ByZWZlcmVuY2UocHJlZmVyZW5jZSwgZ2l2ZUNvbnNlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGEgZG90IHNlcGFyYXRlZCBzdHJpbmcgdG8gZGVlcGx5IG5lc3RlZCBvYmplY3RcbiAgICogQHBhcmFtIHBhdGggOiBkb3Qgc2VwYXJhdGVkIHN0cmluZ1xuICAgKiBAcGFyYW0gdmFsdWUgOiB0cnVlIGlmIGNvbnNlbnQgaXMgZ2l2ZW4sIGZhbHNlIGlmIGNvbnNlbnQgaXMgd2l0aGRyYXduXG4gICAqIEByZXR1cm5zIHByZWZlcmVuY2Ugb2JqZWN0IGNvbXBhdGlibGUgZm9yIGNkY1xuICAgKiBleGFtcGxlOlxuICAgKiBpbnB1dCBwYXRoIHgueS56LmlzQ29uc2VudEdyYW50ZWRcbiAgICogaW5wdXQgdmFsdWU6IHRydWVcbiAgICogb3V0cHV0PSAgeDp7eTp7ejp7aXNDb25zZW50R3JhbnRlZDogdHJ1ZX19fVxuICAgKi9cbiAgcHJpdmF0ZSBjb252ZXJ0VG9DZGNQcmVmZXJlbmNlKHBhdGg6IHN0cmluZywgdmFsdWU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgdGFyZ2V0OiBhbnkgPSB7fTtcbiAgICBsZXQgY29uc2VudENvZGUgPSB0YXJnZXQ7XG4gICAgY29uc3QgbGlzdCA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICBjb25zdCBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbiAtIDE7IGkrKykge1xuICAgICAgY29uc3QgZWxlbSA9IGxpc3RbaV07XG4gICAgICBpZiAoIWNvbnNlbnRDb2RlW2VsZW1dKSB7XG4gICAgICAgIGNvbnNlbnRDb2RlW2VsZW1dID0ge307XG4gICAgICB9XG4gICAgICBjb25zZW50Q29kZSA9IGNvbnNlbnRDb2RlW2VsZW1dO1xuICAgIH1cbiAgICBjb25zZW50Q29kZVtsaXN0W2xlbiAtIDFdXSA9IHZhbHVlO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiJdfQ==