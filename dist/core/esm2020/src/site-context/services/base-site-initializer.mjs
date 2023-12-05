/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { getContextParameterDefault } from '../config/context-config-utils';
import { BASE_SITE_CONTEXT_ID } from '../providers/context-ids';
import * as i0 from "@angular/core";
import * as i1 from "../facade/base-site.service";
import * as i2 from "../../config/config-initializer/config-initializer.service";
export class BaseSiteInitializer {
    constructor(baseSiteService, configInit) {
        this.baseSiteService = baseSiteService;
        this.configInit = configInit;
    }
    /**
     * Initializes the value of the base site
     */
    initialize() {
        this.subscription = this.configInit
            .getStable('context')
            .pipe(
        // TODO(#12351): <--- plug here explicitly SiteContextRoutesHandler
        switchMap(() => this.setFallbackValue()))
            .subscribe();
    }
    /**
     * On subscription to the returned observable:
     *
     * Sets the default value taken from config, unless the active base site has been already initialized.
     */
    setFallbackValue() {
        return this.configInit
            .getStable('context')
            .pipe(tap((config) => this.setDefaultFromConfig(config)));
    }
    /**
     * Sets the active base site value based on the default value from the config,
     * unless the active base site has been already initialized.
     */
    setDefaultFromConfig(config) {
        const contextParam = getContextParameterDefault(config, BASE_SITE_CONTEXT_ID);
        if (!this.baseSiteService.isInitialized() && contextParam) {
            this.baseSiteService.setActive(contextParam);
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
BaseSiteInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseSiteInitializer, deps: [{ token: i1.BaseSiteService }, { token: i2.ConfigInitializerService }], target: i0.ɵɵFactoryTarget.Injectable });
BaseSiteInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseSiteInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseSiteInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.BaseSiteService }, { type: i2.ConfigInitializerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zaXRlLWluaXRpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvc2l0ZS1jb250ZXh0L3NlcnZpY2VzL2Jhc2Utc2l0ZS1pbml0aWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBR2hFLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDWSxlQUFnQyxFQUNoQyxVQUFvQztRQURwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7SUFDN0MsQ0FBQztJQUlKOztPQUVHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVU7YUFDaEMsU0FBUyxDQUFDLFNBQVMsQ0FBQzthQUNwQixJQUFJO1FBQ0gsbUVBQW1FO1FBQ25FLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUN6QzthQUNBLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ08sZ0JBQWdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFVBQVU7YUFDbkIsU0FBUyxDQUFDLFNBQVMsQ0FBQzthQUNwQixJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsTUFBeUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ3RFLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sb0JBQW9CLENBQUMsTUFBeUI7UUFDdEQsTUFBTSxZQUFZLEdBQUcsMEJBQTBCLENBQzdDLE1BQU0sRUFDTixvQkFBb0IsQ0FDckIsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLFlBQVksRUFBRTtZQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztnSEFsRFUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FETixNQUFNOzJGQUNuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBnZXRDb250ZXh0UGFyYW1ldGVyRGVmYXVsdCB9IGZyb20gJy4uL2NvbmZpZy9jb250ZXh0LWNvbmZpZy11dGlscyc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9zaXRlLWNvbnRleHQtY29uZmlnJztcbmltcG9ydCB7IEJhc2VTaXRlU2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9iYXNlLXNpdGUuc2VydmljZSc7XG5pbXBvcnQgeyBCQVNFX1NJVEVfQ09OVEVYVF9JRCB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb250ZXh0LWlkcyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQmFzZVNpdGVJbml0aWFsaXplciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBiYXNlU2l0ZVNlcnZpY2U6IEJhc2VTaXRlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnSW5pdDogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSB2YWx1ZSBvZiB0aGUgYmFzZSBzaXRlXG4gICAqL1xuICBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jb25maWdJbml0XG4gICAgICAuZ2V0U3RhYmxlKCdjb250ZXh0JylcbiAgICAgIC5waXBlKFxuICAgICAgICAvLyBUT0RPKCMxMjM1MSk6IDwtLS0gcGx1ZyBoZXJlIGV4cGxpY2l0bHkgU2l0ZUNvbnRleHRSb3V0ZXNIYW5kbGVyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnNldEZhbGxiYWNrVmFsdWUoKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzdWJzY3JpcHRpb24gdG8gdGhlIHJldHVybmVkIG9ic2VydmFibGU6XG4gICAqXG4gICAqIFNldHMgdGhlIGRlZmF1bHQgdmFsdWUgdGFrZW4gZnJvbSBjb25maWcsIHVubGVzcyB0aGUgYWN0aXZlIGJhc2Ugc2l0ZSBoYXMgYmVlbiBhbHJlYWR5IGluaXRpYWxpemVkLlxuICAgKi9cbiAgcHJvdGVjdGVkIHNldEZhbGxiYWNrVmFsdWUoKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnSW5pdFxuICAgICAgLmdldFN0YWJsZSgnY29udGV4dCcpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChjb25maWc6IFNpdGVDb250ZXh0Q29uZmlnKSA9PiB0aGlzLnNldERlZmF1bHRGcm9tQ29uZmlnKGNvbmZpZykpXG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBiYXNlIHNpdGUgdmFsdWUgYmFzZWQgb24gdGhlIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgY29uZmlnLFxuICAgKiB1bmxlc3MgdGhlIGFjdGl2ZSBiYXNlIHNpdGUgaGFzIGJlZW4gYWxyZWFkeSBpbml0aWFsaXplZC5cbiAgICovXG4gIHByb3RlY3RlZCBzZXREZWZhdWx0RnJvbUNvbmZpZyhjb25maWc6IFNpdGVDb250ZXh0Q29uZmlnKTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dFBhcmFtID0gZ2V0Q29udGV4dFBhcmFtZXRlckRlZmF1bHQoXG4gICAgICBjb25maWcsXG4gICAgICBCQVNFX1NJVEVfQ09OVEVYVF9JRFxuICAgICk7XG4gICAgaWYgKCF0aGlzLmJhc2VTaXRlU2VydmljZS5pc0luaXRpYWxpemVkKCkgJiYgY29udGV4dFBhcmFtKSB7XG4gICAgICB0aGlzLmJhc2VTaXRlU2VydmljZS5zZXRBY3RpdmUoY29udGV4dFBhcmFtKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19