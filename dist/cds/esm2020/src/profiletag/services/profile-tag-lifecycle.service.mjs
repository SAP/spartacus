/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { AuthActions, isNotUndefined } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { ConsentChangedPushEvent } from '../model/profile-tag.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../config/cds-config";
import * as i3 from "@ngrx/store";
export class ProfileTagLifecycleService {
    constructor(consentService, config, actionsSubject) {
        this.consentService = consentService;
        this.config = config;
        this.actionsSubject = actionsSubject;
    }
    consentChanged() {
        return this.consentService
            .getConsent(this.config.cds?.consentTemplateId ?? '')
            .pipe(filter(isNotUndefined), map((profileConsent) => {
            return this.consentService.isConsentGiven(profileConsent);
        }), map((granted) => {
            return new ConsentChangedPushEvent(granted);
        }));
    }
    loginSuccessful() {
        return this.actionsSubject.pipe(filter((action) => action.type === AuthActions.LOGIN), map(() => true));
    }
}
ProfileTagLifecycleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagLifecycleService, deps: [{ token: i1.ConsentService }, { token: i2.CdsConfig }, { token: i3.ActionsSubject }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagLifecycleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagLifecycleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagLifecycleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConsentService }, { type: i2.CdsConfig }, { type: i3.ActionsSubject }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS10YWctbGlmZWN5Y2xlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvcHJvZmlsZXRhZy9zZXJ2aWNlcy9wcm9maWxlLXRhZy1saWZlY3ljbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFrQixjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7OztBQUtyRSxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFlBQ1ksY0FBOEIsRUFDOUIsTUFBaUIsRUFDakIsY0FBOEI7UUFGOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3ZDLENBQUM7SUFFSixjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsY0FBYzthQUN2QixVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLElBQUksRUFBRSxDQUFDO2FBQ3BELElBQUksQ0FDSCxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQ3RCLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDZCxPQUFPLElBQUksdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDN0IsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFDckQsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUNoQixDQUFDO0lBQ0osQ0FBQzs7dUhBMUJVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRnpCLE1BQU07MkZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQXV0aEFjdGlvbnMsIENvbnNlbnRTZXJ2aWNlLCBpc05vdFVuZGVmaW5lZCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENkc0NvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZy9jZHMtY29uZmlnJztcbmltcG9ydCB7IENvbnNlbnRDaGFuZ2VkUHVzaEV2ZW50IH0gZnJvbSAnLi4vbW9kZWwvcHJvZmlsZS10YWcubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZVRhZ0xpZmVjeWNsZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uc2VudFNlcnZpY2U6IENvbnNlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWc6IENkc0NvbmZpZyxcbiAgICBwcm90ZWN0ZWQgYWN0aW9uc1N1YmplY3Q6IEFjdGlvbnNTdWJqZWN0XG4gICkge31cblxuICBjb25zZW50Q2hhbmdlZCgpOiBPYnNlcnZhYmxlPENvbnNlbnRDaGFuZ2VkUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuY29uc2VudFNlcnZpY2VcbiAgICAgIC5nZXRDb25zZW50KHRoaXMuY29uZmlnLmNkcz8uY29uc2VudFRlbXBsYXRlSWQgPz8gJycpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGlzTm90VW5kZWZpbmVkKSxcbiAgICAgICAgbWFwKChwcm9maWxlQ29uc2VudCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNvbnNlbnRTZXJ2aWNlLmlzQ29uc2VudEdpdmVuKHByb2ZpbGVDb25zZW50KTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgoZ3JhbnRlZCkgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgQ29uc2VudENoYW5nZWRQdXNoRXZlbnQoZ3JhbnRlZCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgbG9naW5TdWNjZXNzZnVsKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmFjdGlvbnNTdWJqZWN0LnBpcGUoXG4gICAgICBmaWx0ZXIoKGFjdGlvbikgPT4gYWN0aW9uLnR5cGUgPT09IEF1dGhBY3Rpb25zLkxPR0lOKSxcbiAgICAgIG1hcCgoKSA9PiB0cnVlKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==