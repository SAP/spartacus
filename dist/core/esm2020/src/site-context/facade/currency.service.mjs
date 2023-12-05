/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { filter, take, tap } from 'rxjs/operators';
import { isNotNullable } from '../../util/type-guards';
import { getContextParameterValues } from '../config/context-config-utils';
import { CURRENCY_CONTEXT_ID } from '../providers/context-ids';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../config/site-context-config";
/**
 * Facade that provides easy access to currency state, actions and selectors.
 */
export class CurrencyService {
    constructor(store, config) {
        this.store = store;
        this.config = config;
    }
    /**
     * Represents all the currencies supported by the current store.
     */
    getAll() {
        return this.store.pipe(select(SiteContextSelectors.getAllCurrencies), tap((currencies) => {
            if (!currencies) {
                this.store.dispatch(new SiteContextActions.LoadCurrencies());
            }
        }), filter(isNotNullable));
    }
    /**
     * Represents the isocode of the active currency.
     */
    getActive() {
        return this.store.pipe(select(SiteContextSelectors.getActiveCurrency), filter(isNotNullable));
    }
    /**
     * Sets the active language.
     */
    setActive(isocode) {
        this.store
            .pipe(select(SiteContextSelectors.getActiveCurrency), take(1))
            .subscribe((activeCurrency) => {
            if (activeCurrency !== isocode && this.isValid(isocode)) {
                this.store.dispatch(new SiteContextActions.SetActiveCurrency(isocode));
            }
        });
    }
    /**
     * Tells whether the value of the active currency has been already initialized
     */
    isInitialized() {
        let valueInitialized = false;
        this.getActive()
            .subscribe(() => (valueInitialized = true))
            .unsubscribe();
        return valueInitialized;
    }
    /**
     * Tells whether the given iso code is allowed.
     *
     * The list of allowed iso codes can be configured in the `context` config of Spartacus.
     */
    isValid(value) {
        return (!!value &&
            getContextParameterValues(this.config, CURRENCY_CONTEXT_ID).includes(value));
    }
}
CurrencyService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrencyService, deps: [{ token: i1.Store }, { token: i2.SiteContextConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CurrencyService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrencyService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrencyService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.SiteContextConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3NpdGUtY29udGV4dC9mYWNhZGUvY3VycmVuY3kuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUzRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUloRTs7R0FFRztBQUVILE1BQU0sT0FBTyxlQUFlO0lBQzFCLFlBQ1ksS0FBa0MsRUFDbEMsTUFBeUI7UUFEekIsVUFBSyxHQUFMLEtBQUssQ0FBNkI7UUFDbEMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7SUFDbEMsQ0FBQztJQUVKOztPQUVHO0lBQ0gsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ3BCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUM3QyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzthQUM5RDtRQUNILENBQUMsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FDdEIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNwQixNQUFNLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsRUFDOUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxDQUFDLE9BQWU7UUFDdkIsSUFBSSxDQUFDLEtBQUs7YUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdELFNBQVMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQzVCLElBQUksY0FBYyxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDakIsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FDbEQsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1gsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRTthQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzFDLFdBQVcsRUFBRSxDQUFDO1FBRWpCLE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxPQUFPLENBQUMsS0FBYTtRQUM3QixPQUFPLENBQ0wsQ0FBQyxDQUFDLEtBQUs7WUFDUCx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUMsUUFBUSxDQUNsRSxLQUFLLENBQ04sQ0FDRixDQUFDO0lBQ0osQ0FBQzs7NEdBdEVVLGVBQWU7Z0hBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ3VycmVuY3kgfSBmcm9tICcuLi8uLi9tb2RlbC9taXNjLm1vZGVsJztcbmltcG9ydCB7IGlzTm90TnVsbGFibGUgfSBmcm9tICcuLi8uLi91dGlsL3R5cGUtZ3VhcmRzJztcbmltcG9ydCB7IGdldENvbnRleHRQYXJhbWV0ZXJWYWx1ZXMgfSBmcm9tICcuLi9jb25maWcvY29udGV4dC1jb25maWctdXRpbHMnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcgfSBmcm9tICcuLi9jb25maWcvc2l0ZS1jb250ZXh0LWNvbmZpZyc7XG5pbXBvcnQgeyBDVVJSRU5DWV9DT05URVhUX0lEIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbnRleHQtaWRzJztcbmltcG9ydCB7IFNpdGVDb250ZXh0QWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRTZWxlY3RvcnMgfSBmcm9tICcuLi9zdG9yZS9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IHsgU3RhdGVXaXRoU2l0ZUNvbnRleHQgfSBmcm9tICcuLi9zdG9yZS9zdGF0ZSc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dCB9IGZyb20gJy4vc2l0ZS1jb250ZXh0LmludGVyZmFjZSc7XG5cbi8qKlxuICogRmFjYWRlIHRoYXQgcHJvdmlkZXMgZWFzeSBhY2Nlc3MgdG8gY3VycmVuY3kgc3RhdGUsIGFjdGlvbnMgYW5kIHNlbGVjdG9ycy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5U2VydmljZSBpbXBsZW1lbnRzIFNpdGVDb250ZXh0PEN1cnJlbmN5PiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoU2l0ZUNvbnRleHQ+LFxuICAgIHByb3RlY3RlZCBjb25maWc6IFNpdGVDb250ZXh0Q29uZmlnXG4gICkge31cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhbGwgdGhlIGN1cnJlbmNpZXMgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50IHN0b3JlLlxuICAgKi9cbiAgZ2V0QWxsKCk6IE9ic2VydmFibGU8Q3VycmVuY3lbXT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoU2l0ZUNvbnRleHRTZWxlY3RvcnMuZ2V0QWxsQ3VycmVuY2llcyksXG4gICAgICB0YXAoKGN1cnJlbmNpZXMpID0+IHtcbiAgICAgICAgaWYgKCFjdXJyZW5jaWVzKSB7XG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgU2l0ZUNvbnRleHRBY3Rpb25zLkxvYWRDdXJyZW5jaWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcihpc05vdE51bGxhYmxlKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyB0aGUgaXNvY29kZSBvZiB0aGUgYWN0aXZlIGN1cnJlbmN5LlxuICAgKi9cbiAgZ2V0QWN0aXZlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChTaXRlQ29udGV4dFNlbGVjdG9ycy5nZXRBY3RpdmVDdXJyZW5jeSksXG4gICAgICBmaWx0ZXIoaXNOb3ROdWxsYWJsZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFjdGl2ZSBsYW5ndWFnZS5cbiAgICovXG4gIHNldEFjdGl2ZShpc29jb2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlXG4gICAgICAucGlwZShzZWxlY3QoU2l0ZUNvbnRleHRTZWxlY3RvcnMuZ2V0QWN0aXZlQ3VycmVuY3kpLCB0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoYWN0aXZlQ3VycmVuY3kpID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZUN1cnJlbmN5ICE9PSBpc29jb2RlICYmIHRoaXMuaXNWYWxpZChpc29jb2RlKSkge1xuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICBuZXcgU2l0ZUNvbnRleHRBY3Rpb25zLlNldEFjdGl2ZUN1cnJlbmN5KGlzb2NvZGUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGVsbHMgd2hldGhlciB0aGUgdmFsdWUgb2YgdGhlIGFjdGl2ZSBjdXJyZW5jeSBoYXMgYmVlbiBhbHJlYWR5IGluaXRpYWxpemVkXG4gICAqL1xuICBpc0luaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xuICAgIGxldCB2YWx1ZUluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgdGhpcy5nZXRBY3RpdmUoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiAodmFsdWVJbml0aWFsaXplZCA9IHRydWUpKVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG5cbiAgICByZXR1cm4gdmFsdWVJbml0aWFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxscyB3aGV0aGVyIHRoZSBnaXZlbiBpc28gY29kZSBpcyBhbGxvd2VkLlxuICAgKlxuICAgKiBUaGUgbGlzdCBvZiBhbGxvd2VkIGlzbyBjb2RlcyBjYW4gYmUgY29uZmlndXJlZCBpbiB0aGUgYGNvbnRleHRgIGNvbmZpZyBvZiBTcGFydGFjdXMuXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNWYWxpZCh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICEhdmFsdWUgJiZcbiAgICAgIGdldENvbnRleHRQYXJhbWV0ZXJWYWx1ZXModGhpcy5jb25maWcsIENVUlJFTkNZX0NPTlRFWFRfSUQpLmluY2x1ZGVzKFxuICAgICAgICB2YWx1ZVxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==