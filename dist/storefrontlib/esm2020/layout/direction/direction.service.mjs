/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DirectionMode } from './config/direction.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * The `DirectionService` can be used to add the direction to the overall storefront or individual elements.
 * By default, the direction is added to the `html` element (i.e. `<html dir="ltr">`). The API of this service
 * does however provide methods to add direction to individual elements if needed.
 *
 * The direction is configurable and allows for language driven direction configuration.
 *
 * To react to the active language, the service subscribes to the active language in the initialize method. This
 * is called from an APP_INITIALIZER method and should only happen once.
 */
export class DirectionService {
    constructor(configInit, languageService, winRef) {
        this.configInit = configInit;
        this.languageService = languageService;
        this.winRef = winRef;
        this.startsDetecting = false;
        this.subscription = new Subscription();
    }
    /**
     * Initializes the layout direction for the storefront.
     */
    initialize() {
        return this.configInit
            .getStable('direction')
            .pipe(tap((config) => {
            this.config = config?.direction;
            if (this.config?.detect) {
                this.detect();
            }
            else {
                this.setDirection(this.winRef.document.documentElement, this.config?.default);
            }
        }))
            .toPromise();
    }
    /**
     * Observes the _active_ language and set the required direction for the given language.
     * The method is guarded to ensure that the active language is observed only once.
     */
    detect() {
        if (this.startsDetecting) {
            return;
        }
        this.subscription.add(this.languageService
            .getActive()
            .subscribe((isoCode) => this.setDirection(this.winRef.document.documentElement, this.getDirection(isoCode))));
        this.startsDetecting = true;
    }
    /**
     * Sets the direction attribute for the given element. If the direction is undefined, the `dir`
     * attribute is removed.
     */
    setDirection(el, direction) {
        if (direction) {
            el.setAttribute('dir', direction);
        }
        else {
            el.removeAttribute('dir');
        }
    }
    /**
     * Gets the `DirectionMode` for the given language isoCode. The language isoCode is compared
     * to the configured list of languages(`direction.rtlLanguages` vs `direction.ltrLanguages`).
     *
     * If no language is given, or no language mapping could be found, we fallback to the default
     * `direction.mode`.
     */
    getDirection(language) {
        if (language && this.config?.rtlLanguages?.includes(language)) {
            return DirectionMode.RTL;
        }
        if (language && this.config?.ltrLanguages?.includes(language)) {
            return DirectionMode.LTR;
        }
        return this.config?.default;
    }
    ngOnDestroy() {
        // Cleans up the subscription, to avoid memory leaks in SSR.
        this.subscription.unsubscribe();
    }
}
DirectionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DirectionService, deps: [{ token: i1.ConfigInitializerService }, { token: i1.LanguageService }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
DirectionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DirectionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DirectionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfigInitializerService }, { type: i1.LanguageService }, { type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9kaXJlY3Rpb24vZGlyZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFNdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFhLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7QUFFcEU7Ozs7Ozs7OztHQVNHO0FBSUgsTUFBTSxPQUFPLGdCQUFnQjtJQU0zQixZQUNZLFVBQW9DLEVBQ3BDLGVBQWdDLEVBQ2hDLE1BQWlCO1FBRmpCLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBUG5CLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU16QyxDQUFDO0lBRUo7O09BRUc7SUFDSCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsVUFBVTthQUNuQixTQUFTLENBQUMsV0FBVyxDQUFDO2FBQ3RCLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxNQUF1QixFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLENBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUNwQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FDckIsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sTUFBTTtRQUNkLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLGVBQWU7YUFDakIsU0FBUyxFQUFFO2FBQ1gsU0FBUyxDQUFDLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FDN0IsSUFBSSxDQUFDLFlBQVksQ0FDZixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQzNCLENBQ0YsQ0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQVksQ0FBQyxFQUFlLEVBQUUsU0FBb0M7UUFDaEUsSUFBSSxTQUFTLEVBQUU7WUFDYixFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxZQUFZLENBQUMsUUFBaUI7UUFDNUIsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdELE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQztTQUMxQjtRQUNELElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3RCxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO0lBQzlCLENBQUM7SUFFRCxXQUFXO1FBQ1QsNERBQTREO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7NkdBdkZVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCLGNBRmYsTUFBTTsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb25maWdJbml0aWFsaXplclNlcnZpY2UsXG4gIExhbmd1YWdlU2VydmljZSxcbiAgV2luZG93UmVmLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3Rpb25Db25maWcgfSBmcm9tICcuL2NvbmZpZy9kaXJlY3Rpb24uY29uZmlnJztcbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uTW9kZSB9IGZyb20gJy4vY29uZmlnL2RpcmVjdGlvbi5tb2RlbCc7XG5cbi8qKlxuICogVGhlIGBEaXJlY3Rpb25TZXJ2aWNlYCBjYW4gYmUgdXNlZCB0byBhZGQgdGhlIGRpcmVjdGlvbiB0byB0aGUgb3ZlcmFsbCBzdG9yZWZyb250IG9yIGluZGl2aWR1YWwgZWxlbWVudHMuXG4gKiBCeSBkZWZhdWx0LCB0aGUgZGlyZWN0aW9uIGlzIGFkZGVkIHRvIHRoZSBgaHRtbGAgZWxlbWVudCAoaS5lLiBgPGh0bWwgZGlyPVwibHRyXCI+YCkuIFRoZSBBUEkgb2YgdGhpcyBzZXJ2aWNlXG4gKiBkb2VzIGhvd2V2ZXIgcHJvdmlkZSBtZXRob2RzIHRvIGFkZCBkaXJlY3Rpb24gdG8gaW5kaXZpZHVhbCBlbGVtZW50cyBpZiBuZWVkZWQuXG4gKlxuICogVGhlIGRpcmVjdGlvbiBpcyBjb25maWd1cmFibGUgYW5kIGFsbG93cyBmb3IgbGFuZ3VhZ2UgZHJpdmVuIGRpcmVjdGlvbiBjb25maWd1cmF0aW9uLlxuICpcbiAqIFRvIHJlYWN0IHRvIHRoZSBhY3RpdmUgbGFuZ3VhZ2UsIHRoZSBzZXJ2aWNlIHN1YnNjcmliZXMgdG8gdGhlIGFjdGl2ZSBsYW5ndWFnZSBpbiB0aGUgaW5pdGlhbGl6ZSBtZXRob2QuIFRoaXNcbiAqIGlzIGNhbGxlZCBmcm9tIGFuIEFQUF9JTklUSUFMSVpFUiBtZXRob2QgYW5kIHNob3VsZCBvbmx5IGhhcHBlbiBvbmNlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRGlyZWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBjb25maWc6IERpcmVjdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJvdGVjdGVkIHN0YXJ0c0RldGVjdGluZyA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZ0luaXQ6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmXG4gICkge31cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGxheW91dCBkaXJlY3Rpb24gZm9yIHRoZSBzdG9yZWZyb250LlxuICAgKi9cbiAgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ0luaXRcbiAgICAgIC5nZXRTdGFibGUoJ2RpcmVjdGlvbicpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChjb25maWc6IERpcmVjdGlvbkNvbmZpZykgPT4ge1xuICAgICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnPy5kaXJlY3Rpb247XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnPy5kZXRlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0ZWN0KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKFxuICAgICAgICAgICAgICB0aGlzLndpblJlZi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgICAgIHRoaXMuY29uZmlnPy5kZWZhdWx0XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC50b1Byb21pc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGUgX2FjdGl2ZV8gbGFuZ3VhZ2UgYW5kIHNldCB0aGUgcmVxdWlyZWQgZGlyZWN0aW9uIGZvciB0aGUgZ2l2ZW4gbGFuZ3VhZ2UuXG4gICAqIFRoZSBtZXRob2QgaXMgZ3VhcmRlZCB0byBlbnN1cmUgdGhhdCB0aGUgYWN0aXZlIGxhbmd1YWdlIGlzIG9ic2VydmVkIG9ubHkgb25jZS5cbiAgICovXG4gIHByb3RlY3RlZCBkZXRlY3QoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRzRGV0ZWN0aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlXG4gICAgICAgIC5nZXRBY3RpdmUoKVxuICAgICAgICAuc3Vic2NyaWJlKChpc29Db2RlOiBzdHJpbmcpID0+XG4gICAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24oXG4gICAgICAgICAgICB0aGlzLndpblJlZi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmdldERpcmVjdGlvbihpc29Db2RlKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICk7XG4gICAgdGhpcy5zdGFydHNEZXRlY3RpbmcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRpcmVjdGlvbiBhdHRyaWJ1dGUgZm9yIHRoZSBnaXZlbiBlbGVtZW50LiBJZiB0aGUgZGlyZWN0aW9uIGlzIHVuZGVmaW5lZCwgdGhlIGBkaXJgXG4gICAqIGF0dHJpYnV0ZSBpcyByZW1vdmVkLlxuICAgKi9cbiAgc2V0RGlyZWN0aW9uKGVsOiBIVE1MRWxlbWVudCwgZGlyZWN0aW9uOiBEaXJlY3Rpb25Nb2RlIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdkaXInLCBkaXJlY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2RpcicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBgRGlyZWN0aW9uTW9kZWAgZm9yIHRoZSBnaXZlbiBsYW5ndWFnZSBpc29Db2RlLiBUaGUgbGFuZ3VhZ2UgaXNvQ29kZSBpcyBjb21wYXJlZFxuICAgKiB0byB0aGUgY29uZmlndXJlZCBsaXN0IG9mIGxhbmd1YWdlcyhgZGlyZWN0aW9uLnJ0bExhbmd1YWdlc2AgdnMgYGRpcmVjdGlvbi5sdHJMYW5ndWFnZXNgKS5cbiAgICpcbiAgICogSWYgbm8gbGFuZ3VhZ2UgaXMgZ2l2ZW4sIG9yIG5vIGxhbmd1YWdlIG1hcHBpbmcgY291bGQgYmUgZm91bmQsIHdlIGZhbGxiYWNrIHRvIHRoZSBkZWZhdWx0XG4gICAqIGBkaXJlY3Rpb24ubW9kZWAuXG4gICAqL1xuICBnZXREaXJlY3Rpb24obGFuZ3VhZ2U/OiBzdHJpbmcpOiBEaXJlY3Rpb25Nb2RlIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAobGFuZ3VhZ2UgJiYgdGhpcy5jb25maWc/LnJ0bExhbmd1YWdlcz8uaW5jbHVkZXMobGFuZ3VhZ2UpKSB7XG4gICAgICByZXR1cm4gRGlyZWN0aW9uTW9kZS5SVEw7XG4gICAgfVxuICAgIGlmIChsYW5ndWFnZSAmJiB0aGlzLmNvbmZpZz8ubHRyTGFuZ3VhZ2VzPy5pbmNsdWRlcyhsYW5ndWFnZSkpIHtcbiAgICAgIHJldHVybiBEaXJlY3Rpb25Nb2RlLkxUUjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnPy5kZWZhdWx0O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgLy8gQ2xlYW5zIHVwIHRoZSBzdWJzY3JpcHRpb24sIHRvIGF2b2lkIG1lbW9yeSBsZWFrcyBpbiBTU1IuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19