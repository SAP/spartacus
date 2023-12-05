/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { getContextParameterDefault } from '../config/context-config-utils';
import { CURRENCY_CONTEXT_ID } from '../providers';
import * as i0 from "@angular/core";
import * as i1 from "../facade";
import * as i2 from "./currency-state-persistence.service";
import * as i3 from "../../config";
export class CurrencyInitializer {
    constructor(currencyService, currencyStatePersistenceService, configInit) {
        this.currencyService = currencyService;
        this.currencyStatePersistenceService = currencyStatePersistenceService;
        this.configInit = configInit;
    }
    /**
     * Initializes the value of the active currency.
     */
    initialize() {
        this.subscription = this.configInit
            .getStable('context')
            .pipe(
        // TODO(#12351): <--- plug here explicitly SiteContextRoutesHandler
        switchMap(() => this.currencyStatePersistenceService.initSync()), switchMap(() => this.setFallbackValue()))
            .subscribe();
    }
    /**
     * On subscription to the returned observable:
     *
     * Sets the default value taken from config, unless the active currency has been already initialized.
     */
    setFallbackValue() {
        return this.configInit
            .getStable('context')
            .pipe(tap((config) => this.setDefaultFromConfig(config)));
    }
    /**
     * Sets the active currency value based on the default value from the config,
     * unless the active currency has been already initialized.
     */
    setDefaultFromConfig(config) {
        const contextParam = getContextParameterDefault(config, CURRENCY_CONTEXT_ID);
        if (!this.currencyService.isInitialized() && contextParam) {
            this.currencyService.setActive(contextParam);
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CurrencyInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrencyInitializer, deps: [{ token: i1.CurrencyService }, { token: i2.CurrencyStatePersistenceService }, { token: i3.ConfigInitializerService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrencyInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrencyInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrencyInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.CurrencyService }, { type: i2.CurrencyStatePersistenceService }, { type: i3.ConfigInitializerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktaW5pdGlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9zaXRlLWNvbnRleHQvc2VydmljZXMvY3VycmVuY3ktaW5pdGlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUc1RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7O0FBSW5ELE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsWUFDWSxlQUFnQyxFQUNoQywrQkFBZ0UsRUFDaEUsVUFBb0M7UUFGcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG9DQUErQixHQUEvQiwrQkFBK0IsQ0FBaUM7UUFDaEUsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7SUFDN0MsQ0FBQztJQUVKOztPQUVHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVU7YUFDaEMsU0FBUyxDQUFDLFNBQVMsQ0FBQzthQUNwQixJQUFJO1FBQ0gsbUVBQW1FO1FBQ25FLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFDaEUsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQ3pDO2FBQ0EsU0FBUyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxnQkFBZ0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsVUFBVTthQUNuQixTQUFTLENBQUMsU0FBUyxDQUFDO2FBQ3BCLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxNQUF5QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDdEUsQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDTyxvQkFBb0IsQ0FBQyxNQUF5QjtRQUN0RCxNQUFNLFlBQVksR0FBRywwQkFBMEIsQ0FDN0MsTUFBTSxFQUNOLG1CQUFtQixDQUNwQixDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLElBQUksWUFBWSxFQUFFO1lBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2dIQXBEVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUROLE1BQU07MkZBQ25CLG1CQUFtQjtrQkFEL0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWdJbml0aWFsaXplclNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgZ2V0Q29udGV4dFBhcmFtZXRlckRlZmF1bHQgfSBmcm9tICcuLi9jb25maWcvY29udGV4dC1jb25maWctdXRpbHMnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcgfSBmcm9tICcuLi9jb25maWcvc2l0ZS1jb250ZXh0LWNvbmZpZyc7XG5pbXBvcnQgeyBDdXJyZW5jeVNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUnO1xuaW1wb3J0IHsgQ1VSUkVOQ1lfQ09OVEVYVF9JRCB9IGZyb20gJy4uL3Byb3ZpZGVycyc7XG5pbXBvcnQgeyBDdXJyZW5jeVN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIH0gZnJvbSAnLi9jdXJyZW5jeS1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeUluaXRpYWxpemVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjdXJyZW5jeVNlcnZpY2U6IEN1cnJlbmN5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY3VycmVuY3lTdGF0ZVBlcnNpc3RlbmNlU2VydmljZTogQ3VycmVuY3lTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnSW5pdDogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHZhbHVlIG9mIHRoZSBhY3RpdmUgY3VycmVuY3kuXG4gICAqL1xuICBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jb25maWdJbml0XG4gICAgICAuZ2V0U3RhYmxlKCdjb250ZXh0JylcbiAgICAgIC5waXBlKFxuICAgICAgICAvLyBUT0RPKCMxMjM1MSk6IDwtLS0gcGx1ZyBoZXJlIGV4cGxpY2l0bHkgU2l0ZUNvbnRleHRSb3V0ZXNIYW5kbGVyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmN1cnJlbmN5U3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UuaW5pdFN5bmMoKSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnNldEZhbGxiYWNrVmFsdWUoKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBzdWJzY3JpcHRpb24gdG8gdGhlIHJldHVybmVkIG9ic2VydmFibGU6XG4gICAqXG4gICAqIFNldHMgdGhlIGRlZmF1bHQgdmFsdWUgdGFrZW4gZnJvbSBjb25maWcsIHVubGVzcyB0aGUgYWN0aXZlIGN1cnJlbmN5IGhhcyBiZWVuIGFscmVhZHkgaW5pdGlhbGl6ZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgc2V0RmFsbGJhY2tWYWx1ZSgpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWdJbml0XG4gICAgICAuZ2V0U3RhYmxlKCdjb250ZXh0JylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKGNvbmZpZzogU2l0ZUNvbnRleHRDb25maWcpID0+IHRoaXMuc2V0RGVmYXVsdEZyb21Db25maWcoY29uZmlnKSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYWN0aXZlIGN1cnJlbmN5IHZhbHVlIGJhc2VkIG9uIHRoZSBkZWZhdWx0IHZhbHVlIGZyb20gdGhlIGNvbmZpZyxcbiAgICogdW5sZXNzIHRoZSBhY3RpdmUgY3VycmVuY3kgaGFzIGJlZW4gYWxyZWFkeSBpbml0aWFsaXplZC5cbiAgICovXG4gIHByb3RlY3RlZCBzZXREZWZhdWx0RnJvbUNvbmZpZyhjb25maWc6IFNpdGVDb250ZXh0Q29uZmlnKTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dFBhcmFtID0gZ2V0Q29udGV4dFBhcmFtZXRlckRlZmF1bHQoXG4gICAgICBjb25maWcsXG4gICAgICBDVVJSRU5DWV9DT05URVhUX0lEXG4gICAgKTtcbiAgICBpZiAoIXRoaXMuY3VycmVuY3lTZXJ2aWNlLmlzSW5pdGlhbGl6ZWQoKSAmJiBjb250ZXh0UGFyYW0pIHtcbiAgICAgIHRoaXMuY3VycmVuY3lTZXJ2aWNlLnNldEFjdGl2ZShjb250ZXh0UGFyYW0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=