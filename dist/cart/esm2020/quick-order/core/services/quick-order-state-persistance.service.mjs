/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BASE_SITE_CONTEXT_ID, StorageSyncType, } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/quick-order/root";
import * as i2 from "@spartacus/core";
export class QuickOrderStatePersistenceService {
    constructor(quickOrderService, siteContextParamsService, statePersistenceService) {
        this.quickOrderService = quickOrderService;
        this.siteContextParamsService = siteContextParamsService;
        this.statePersistenceService = statePersistenceService;
        this.subscription = new Subscription();
        /**
         * Identifier used for storage key.
         */
        this.key = 'quick-order';
    }
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: this.key,
            state$: this.quickOrderService.getEntries(),
            context$: this.siteContextParamsService.getValues([
                BASE_SITE_CONTEXT_ID,
            ]),
            storageType: StorageSyncType.SESSION_STORAGE,
            onRead: (state) => this.onRead(state),
        }));
    }
    onRead(state) {
        if (state) {
            this.quickOrderService.loadEntries(state);
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
QuickOrderStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderStatePersistenceService, deps: [{ token: i1.QuickOrderFacade }, { token: i2.SiteContextParamsService }, { token: i2.StatePersistenceService }], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.QuickOrderFacade }, { type: i2.SiteContextParamsService }, { type: i2.StatePersistenceService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItc3RhdGUtcGVyc2lzdGFuY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3F1aWNrLW9yZGVyL2NvcmUvc2VydmljZXMvcXVpY2stb3JkZXItc3RhdGUtcGVyc2lzdGFuY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUd0RCxPQUFPLEVBQ0wsb0JBQW9CLEVBR3BCLGVBQWUsR0FDaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBS3BDLE1BQU0sT0FBTyxpQ0FBaUM7SUFHNUMsWUFDWSxpQkFBbUMsRUFDbkMsd0JBQWtELEVBQ2xELHVCQUFnRDtRQUZoRCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUxsRCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFRNUM7O1dBRUc7UUFDTyxRQUFHLEdBQUcsYUFBYSxDQUFDO0lBTDNCLENBQUM7SUFPSjs7T0FFRztJQUNILFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztZQUMzQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRTtZQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQztnQkFDaEQsb0JBQW9CO2FBQ3JCLENBQUM7WUFDRixXQUFXLEVBQUUsZUFBZSxDQUFDLGVBQWU7WUFDNUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN0QyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxNQUFNLENBQUMsS0FBK0I7UUFDOUMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7OzhIQXZDVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQyxjQUZoQyxNQUFNOzJGQUVQLGlDQUFpQztrQkFIN0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9yZGVyRW50cnkgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IFF1aWNrT3JkZXJGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvcXVpY2stb3JkZXIvcm9vdCc7XG5pbXBvcnQge1xuICBCQVNFX1NJVEVfQ09OVEVYVF9JRCxcbiAgU2l0ZUNvbnRleHRQYXJhbXNTZXJ2aWNlLFxuICBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSxcbiAgU3RvcmFnZVN5bmNUeXBlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBRdWlja09yZGVyU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBxdWlja09yZGVyU2VydmljZTogUXVpY2tPcmRlckZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgc2l0ZUNvbnRleHRQYXJhbXNTZXJ2aWNlOiBTaXRlQ29udGV4dFBhcmFtc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlOiBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIElkZW50aWZpZXIgdXNlZCBmb3Igc3RvcmFnZSBrZXkuXG4gICAqL1xuICBwcm90ZWN0ZWQga2V5ID0gJ3F1aWNrLW9yZGVyJztcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHN5bmNocm9uaXphdGlvbiBiZXR3ZWVuIHN0YXRlIGFuZCBicm93c2VyIHN0b3JhZ2UuXG4gICAqL1xuICBpbml0U3luYygpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLnN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLnN5bmNXaXRoU3RvcmFnZSh7XG4gICAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICAgIHN0YXRlJDogdGhpcy5xdWlja09yZGVyU2VydmljZS5nZXRFbnRyaWVzKCksXG4gICAgICAgIGNvbnRleHQkOiB0aGlzLnNpdGVDb250ZXh0UGFyYW1zU2VydmljZS5nZXRWYWx1ZXMoW1xuICAgICAgICAgIEJBU0VfU0lURV9DT05URVhUX0lELFxuICAgICAgICBdKSxcbiAgICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VTeW5jVHlwZS5TRVNTSU9OX1NUT1JBR0UsXG4gICAgICAgIG9uUmVhZDogKHN0YXRlKSA9PiB0aGlzLm9uUmVhZChzdGF0ZSksXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25SZWFkKHN0YXRlOiBPcmRlckVudHJ5W10gfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIHRoaXMucXVpY2tPcmRlclNlcnZpY2UubG9hZEVudHJpZXMoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==