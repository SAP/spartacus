/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { isNotNullable } from '../../util/type-guards';
import { getContextParameterValues } from '../config/context-config-utils';
import { BASE_SITE_CONTEXT_ID } from '../providers/context-ids';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../config/site-context-config";
export class BaseSiteService {
    constructor(store, config) {
        this.store = store;
        this.config = config;
    }
    /**
     * Represents the current baseSite uid.
     */
    getActive() {
        return this.store.pipe(select(SiteContextSelectors.getActiveBaseSite), filter((active) => Boolean(active)));
    }
    /**
     * Get all base sites data
     */
    getAll() {
        return this.store.pipe(select(SiteContextSelectors.getAllBaseSites), tap((sites) => {
            if (!sites) {
                this.store.dispatch(new SiteContextActions.LoadBaseSites());
            }
        }), filter(isNotNullable));
    }
    /**
     * Get base site data based on site uid
     */
    get(siteUid) {
        if (siteUid) {
            return this.getAll().pipe(map((sites) => sites.find((site) => site.uid === siteUid)));
        }
        return this.getActive().pipe(switchMap((activeSiteUid) => this.getAll().pipe(map((sites) => sites.find((site) => site.uid === activeSiteUid)))));
    }
    setActive(baseSite) {
        this.store
            .pipe(select(SiteContextSelectors.getActiveBaseSite), take(1))
            .subscribe((activeBaseSite) => {
            if (baseSite && activeBaseSite !== baseSite) {
                this.store.dispatch(new SiteContextActions.SetActiveBaseSite(baseSite));
            }
        });
    }
    /**
     * Tells whether the value of the base site has been already initialized
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
            getContextParameterValues(this.config, BASE_SITE_CONTEXT_ID).includes(value));
    }
}
BaseSiteService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseSiteService, deps: [{ token: i1.Store }, { token: i2.SiteContextConfig }], target: i0.ɵɵFactoryTarget.Injectable });
BaseSiteService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseSiteService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseSiteService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.SiteContextConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zaXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9zaXRlLWNvbnRleHQvZmFjYWRlL2Jhc2Utc2l0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQVMsTUFBTSxhQUFhLENBQUM7QUFFNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFLaEUsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFDWSxLQUFrQyxFQUNsQyxNQUF5QjtRQUR6QixVQUFLLEdBQUwsS0FBSyxDQUE2QjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtJQUNsQyxDQUFDO0lBRUo7O09BRUc7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDcEIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLEVBQzlDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ3BDLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDcEIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxFQUM1QyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNaLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2FBQzdEO1FBQ0gsQ0FBQyxDQUFDLEVBQ0YsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsR0FBRyxDQUFDLE9BQWdCO1FBQ2xCLElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUN2QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FDM0QsQ0FBQztTQUNIO1FBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUMxQixTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUNoQixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FDakUsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsU0FBUyxDQUFDLFFBQWdCO1FBQ3hCLElBQUksQ0FBQyxLQUFLO2FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3RCxTQUFTLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUM1QixJQUFJLFFBQVEsSUFBSSxjQUFjLEtBQUssUUFBUSxFQUFFO2dCQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDakIsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FDbkQsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1gsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRTthQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzFDLFdBQVcsRUFBRSxDQUFDO1FBRWpCLE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxPQUFPLENBQUMsS0FBYTtRQUM3QixPQUFPLENBQ0wsQ0FBQyxDQUFDLEtBQUs7WUFDUCx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQUMsUUFBUSxDQUNuRSxLQUFLLENBQ04sQ0FDRixDQUFDO0lBQ0osQ0FBQzs7NEdBdEZVLGVBQWU7Z0hBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJhc2VTaXRlIH0gZnJvbSAnLi4vLi4vbW9kZWwvbWlzYy5tb2RlbCc7XG5pbXBvcnQgeyBpc05vdE51bGxhYmxlIH0gZnJvbSAnLi4vLi4vdXRpbC90eXBlLWd1YXJkcyc7XG5pbXBvcnQgeyBnZXRDb250ZXh0UGFyYW1ldGVyVmFsdWVzIH0gZnJvbSAnLi4vY29uZmlnL2NvbnRleHQtY29uZmlnLXV0aWxzJztcbmltcG9ydCB7IFNpdGVDb250ZXh0Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3NpdGUtY29udGV4dC1jb25maWcnO1xuaW1wb3J0IHsgQkFTRV9TSVRFX0NPTlRFWFRfSUQgfSBmcm9tICcuLi9wcm92aWRlcnMvY29udGV4dC1pZHMnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRBY3Rpb25zIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dFNlbGVjdG9ycyB9IGZyb20gJy4uL3N0b3JlL3NlbGVjdG9ycy9pbmRleCc7XG5pbXBvcnQgeyBTdGF0ZVdpdGhTaXRlQ29udGV4dCB9IGZyb20gJy4uL3N0b3JlL3N0YXRlJztcbmltcG9ydCB7IFNpdGVDb250ZXh0IH0gZnJvbSAnLi9zaXRlLWNvbnRleHQuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2VTaXRlU2VydmljZSBpbXBsZW1lbnRzIFNpdGVDb250ZXh0PEJhc2VTaXRlPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoU2l0ZUNvbnRleHQ+LFxuICAgIHByb3RlY3RlZCBjb25maWc6IFNpdGVDb250ZXh0Q29uZmlnXG4gICkge31cblxuICAvKipcbiAgICogUmVwcmVzZW50cyB0aGUgY3VycmVudCBiYXNlU2l0ZSB1aWQuXG4gICAqL1xuICBnZXRBY3RpdmUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFNpdGVDb250ZXh0U2VsZWN0b3JzLmdldEFjdGl2ZUJhc2VTaXRlKSxcbiAgICAgIGZpbHRlcigoYWN0aXZlKSA9PiBCb29sZWFuKGFjdGl2ZSkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIGJhc2Ugc2l0ZXMgZGF0YVxuICAgKi9cbiAgZ2V0QWxsKCk6IE9ic2VydmFibGU8QmFzZVNpdGVbXT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoU2l0ZUNvbnRleHRTZWxlY3RvcnMuZ2V0QWxsQmFzZVNpdGVzKSxcbiAgICAgIHRhcCgoc2l0ZXMpID0+IHtcbiAgICAgICAgaWYgKCFzaXRlcykge1xuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFNpdGVDb250ZXh0QWN0aW9ucy5Mb2FkQmFzZVNpdGVzKCkpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcihpc05vdE51bGxhYmxlKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGJhc2Ugc2l0ZSBkYXRhIGJhc2VkIG9uIHNpdGUgdWlkXG4gICAqL1xuICBnZXQoc2l0ZVVpZD86IHN0cmluZyk6IE9ic2VydmFibGU8QmFzZVNpdGUgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAoc2l0ZVVpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsKCkucGlwZShcbiAgICAgICAgbWFwKChzaXRlcykgPT4gc2l0ZXMuZmluZCgoc2l0ZSkgPT4gc2l0ZS51aWQgPT09IHNpdGVVaWQpKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRBY3RpdmUoKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChhY3RpdmVTaXRlVWlkKSA9PlxuICAgICAgICB0aGlzLmdldEFsbCgpLnBpcGUoXG4gICAgICAgICAgbWFwKChzaXRlcykgPT4gc2l0ZXMuZmluZCgoc2l0ZSkgPT4gc2l0ZS51aWQgPT09IGFjdGl2ZVNpdGVVaWQpKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHNldEFjdGl2ZShiYXNlU2l0ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZVxuICAgICAgLnBpcGUoc2VsZWN0KFNpdGVDb250ZXh0U2VsZWN0b3JzLmdldEFjdGl2ZUJhc2VTaXRlKSwgdGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGFjdGl2ZUJhc2VTaXRlKSA9PiB7XG4gICAgICAgIGlmIChiYXNlU2l0ZSAmJiBhY3RpdmVCYXNlU2l0ZSAhPT0gYmFzZVNpdGUpIHtcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgbmV3IFNpdGVDb250ZXh0QWN0aW9ucy5TZXRBY3RpdmVCYXNlU2l0ZShiYXNlU2l0ZSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxscyB3aGV0aGVyIHRoZSB2YWx1ZSBvZiB0aGUgYmFzZSBzaXRlIGhhcyBiZWVuIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgICovXG4gIGlzSW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7XG4gICAgbGV0IHZhbHVlSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmdldEFjdGl2ZSgpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+ICh2YWx1ZUluaXRpYWxpemVkID0gdHJ1ZSkpXG4gICAgICAudW5zdWJzY3JpYmUoKTtcblxuICAgIHJldHVybiB2YWx1ZUluaXRpYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlbGxzIHdoZXRoZXIgdGhlIGdpdmVuIGlzbyBjb2RlIGlzIGFsbG93ZWQuXG4gICAqXG4gICAqIFRoZSBsaXN0IG9mIGFsbG93ZWQgaXNvIGNvZGVzIGNhbiBiZSBjb25maWd1cmVkIGluIHRoZSBgY29udGV4dGAgY29uZmlnIG9mIFNwYXJ0YWN1cy5cbiAgICovXG4gIHByb3RlY3RlZCBpc1ZhbGlkKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgISF2YWx1ZSAmJlxuICAgICAgZ2V0Q29udGV4dFBhcmFtZXRlclZhbHVlcyh0aGlzLmNvbmZpZywgQkFTRV9TSVRFX0NPTlRFWFRfSUQpLmluY2x1ZGVzKFxuICAgICAgICB2YWx1ZVxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==