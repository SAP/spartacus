/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CURRENCY_CONTEXT_ID } from '../providers/context-ids';
import * as i0 from "@angular/core";
import * as i1 from "../../state/services/state-persistence.service";
import * as i2 from "../facade/currency.service";
import * as i3 from "../config/site-context-config";
export class CurrencyStatePersistenceService {
    constructor(statePersistenceService, currencyService, config) {
        this.statePersistenceService = statePersistenceService;
        this.currencyService = currencyService;
        this.config = config;
        this.initialized$ = new ReplaySubject(1);
    }
    initSync() {
        this.statePersistenceService.syncWithStorage({
            key: CURRENCY_CONTEXT_ID,
            state$: this.currencyService.getActive(),
            onRead: (state) => this.onRead(state),
        });
        return this.initialized$;
    }
    onRead(valueFromStorage) {
        if (!this.currencyService.isInitialized() && valueFromStorage) {
            this.currencyService.setActive(valueFromStorage);
        }
        if (!this.initialized$.closed) {
            this.initialized$.next(undefined);
            this.initialized$.complete();
        }
    }
}
CurrencyStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrencyStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i2.CurrencyService }, { token: i3.SiteContextConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CurrencyStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrencyStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrencyStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i2.CurrencyService }, { type: i3.SiteContextConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktc3RhdGUtcGVyc2lzdGVuY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3NpdGUtY29udGV4dC9zZXJ2aWNlcy9jdXJyZW5jeS1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBRy9ELE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFDWSx1QkFBZ0QsRUFDaEQsZUFBZ0MsRUFDaEMsTUFBeUI7UUFGekIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFHM0IsaUJBQVksR0FBRyxJQUFJLGFBQWEsQ0FBVSxDQUFDLENBQUMsQ0FBQztJQUZwRCxDQUFDO0lBSUcsUUFBUTtRQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7WUFDM0MsR0FBRyxFQUFFLG1CQUFtQjtZQUN4QixNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUU7WUFDeEMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN0QyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVTLE1BQU0sQ0FBQyxnQkFBb0M7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLElBQUksZ0JBQWdCLEVBQUU7WUFDN0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNsRDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7NEhBM0JVLCtCQUErQjtnSUFBL0IsK0JBQStCLGNBRGxCLE1BQU07MkZBQ25CLCtCQUErQjtrQkFEM0MsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJy4uLy4uL3N0YXRlL3NlcnZpY2VzL3N0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcgfSBmcm9tICcuLi9jb25maWcvc2l0ZS1jb250ZXh0LWNvbmZpZyc7XG5pbXBvcnQgeyBDdXJyZW5jeVNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUvY3VycmVuY3kuc2VydmljZSc7XG5pbXBvcnQgeyBDVVJSRU5DWV9DT05URVhUX0lEIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbnRleHQtaWRzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeVN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlOiBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY3VycmVuY3lTZXJ2aWNlOiBDdXJyZW5jeVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogU2l0ZUNvbnRleHRDb25maWdcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBpbml0aWFsaXplZCQgPSBuZXcgUmVwbGF5U3ViamVjdDx1bmtub3duPigxKTtcblxuICBwdWJsaWMgaW5pdFN5bmMoKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgdGhpcy5zdGF0ZVBlcnNpc3RlbmNlU2VydmljZS5zeW5jV2l0aFN0b3JhZ2Uoe1xuICAgICAga2V5OiBDVVJSRU5DWV9DT05URVhUX0lELFxuICAgICAgc3RhdGUkOiB0aGlzLmN1cnJlbmN5U2VydmljZS5nZXRBY3RpdmUoKSxcbiAgICAgIG9uUmVhZDogKHN0YXRlKSA9PiB0aGlzLm9uUmVhZChzdGF0ZSksXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaW5pdGlhbGl6ZWQkO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uUmVhZCh2YWx1ZUZyb21TdG9yYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY3VycmVuY3lTZXJ2aWNlLmlzSW5pdGlhbGl6ZWQoKSAmJiB2YWx1ZUZyb21TdG9yYWdlKSB7XG4gICAgICB0aGlzLmN1cnJlbmN5U2VydmljZS5zZXRBY3RpdmUodmFsdWVGcm9tU3RvcmFnZSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkJC5jbG9zZWQpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQkLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=