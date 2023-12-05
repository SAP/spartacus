/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../config/config-initializer/config-initializer.service";
export class I18nConfigInitializer {
    constructor(configInit) {
        this.configInit = configInit;
        this.scopes = ['i18n.fallbackLang'];
        this.configFactory = () => this.resolveConfig().toPromise();
    }
    /**
     * Resolves the `fallbackLang` based on the default language from config `context.language` .
     */
    resolveConfig() {
        return this.configInit.getStable('context.language').pipe(map((config) => ({
            i18n: {
                // the first language in the array is the default one
                fallbackLang: config?.context?.language?.[0],
            },
        })));
    }
}
I18nConfigInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nConfigInitializer, deps: [{ token: i1.ConfigInitializerService }], target: i0.ɵɵFactoryTarget.Injectable });
I18nConfigInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nConfigInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nConfigInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ConfigInitializerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi1jb25maWctaW5pdGlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9pMThuL2NvbmZpZy9pMThuLWNvbmZpZy1pbml0aWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU1yQyxNQUFNLE9BQU8scUJBQXFCO0lBSWhDLFlBQXNCLFVBQW9DO1FBQXBDLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBSGpELFdBQU0sR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDL0Isa0JBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFSCxDQUFDO0lBRTlEOztPQUVHO0lBQ08sYUFBYTtRQUNyQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUN2RCxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZixJQUFJLEVBQUU7Z0JBQ0oscURBQXFEO2dCQUNyRCxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0M7U0FDRixDQUFDLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQzs7a0hBbEJVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRFIsTUFBTTsyRkFDbkIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ0luaXRpYWxpemVyIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXInO1xuaW1wb3J0IHsgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJMThuQ29uZmlnIH0gZnJvbSAnLi9pMThuLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgSTE4bkNvbmZpZ0luaXRpYWxpemVyIGltcGxlbWVudHMgQ29uZmlnSW5pdGlhbGl6ZXIge1xuICByZWFkb25seSBzY29wZXMgPSBbJ2kxOG4uZmFsbGJhY2tMYW5nJ107XG4gIHJlYWRvbmx5IGNvbmZpZ0ZhY3RvcnkgPSAoKSA9PiB0aGlzLnJlc29sdmVDb25maWcoKS50b1Byb21pc2UoKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29uZmlnSW5pdDogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgYGZhbGxiYWNrTGFuZ2AgYmFzZWQgb24gdGhlIGRlZmF1bHQgbGFuZ3VhZ2UgZnJvbSBjb25maWcgYGNvbnRleHQubGFuZ3VhZ2VgIC5cbiAgICovXG4gIHByb3RlY3RlZCByZXNvbHZlQ29uZmlnKCk6IE9ic2VydmFibGU8STE4bkNvbmZpZz4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ0luaXQuZ2V0U3RhYmxlKCdjb250ZXh0Lmxhbmd1YWdlJykucGlwZShcbiAgICAgIG1hcCgoY29uZmlnKSA9PiAoe1xuICAgICAgICBpMThuOiB7XG4gICAgICAgICAgLy8gdGhlIGZpcnN0IGxhbmd1YWdlIGluIHRoZSBhcnJheSBpcyB0aGUgZGVmYXVsdCBvbmVcbiAgICAgICAgICBmYWxsYmFja0xhbmc6IGNvbmZpZz8uY29udGV4dD8ubGFuZ3VhZ2U/LlswXSxcbiAgICAgICAgfSxcbiAgICAgIH0pKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==