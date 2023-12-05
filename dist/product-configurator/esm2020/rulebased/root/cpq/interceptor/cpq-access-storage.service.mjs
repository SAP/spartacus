/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { distinctUntilChanged, expand, filter, switchMap, take, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./cpq-access-loader.service";
import * as i2 from "@spartacus/core";
import * as i3 from "./cpq-configurator-auth.config";
export class CpqAccessStorageService {
    constructor(cpqAccessLoaderService, authService, config) {
        this.cpqAccessLoaderService = cpqAccessLoaderService;
        this.authService = authService;
        this.config = config;
        this.EXPIRED_TOKEN = {
            accessToken: 'INVALID DUMMY',
            accessTokenExpirationTime: 0,
            endpoint: '',
        };
    }
    ngOnDestroy() {
        this.currentCpqAccessSubscription?.unsubscribe();
        this.currentAuthServiceSubscription?.unsubscribe();
    }
    getCpqAccessData() {
        if (!this.cpqAccessData$ || this._cpqAccessData$.hasError) {
            this.initCpqAccessData();
        }
        return this.cpqAccessData$;
    }
    /**
     * Renews the current access data. All subscribers of getCachedCpqAccessData()
     * will receive the new data. Will only have an effect, if there are any subscribers
     * and the user is logged in.
     */
    renewCpqAccessData() {
        // only force token refresh if initialized.
        if (this.cpqAccessData$) {
            this.stopAutoFetchingCpqAccessData();
            this._cpqAccessData$.next(this.EXPIRED_TOKEN); // invalidate cache
            this.authService
                .isUserLoggedIn()
                .pipe(take(1)) // get current login state
                .subscribe((loggedIn) => {
                // only fetch new token if user is logged in.
                if (loggedIn) {
                    this.startAutoFetchingCpqAccessData();
                }
            });
        }
    }
    initCpqAccessData() {
        this._cpqAccessData$ = new BehaviorSubject(this.EXPIRED_TOKEN);
        this.cpqAccessData$ = this._cpqAccessData$.pipe(
        // Never expose expired tokens - either cache was invalidated with expired token,
        // or the cached one expired before a new one was fetched.
        filter((data) => !this.isTokenExpired(data)));
        this.currentAuthServiceSubscription?.unsubscribe(); // cancel subscriptions created for old
        this.currentAuthServiceSubscription = this.authService
            .isUserLoggedIn()
            .pipe(distinctUntilChanged()) // only react if user login status changes
            .subscribe((loggedIn) => {
            if (loggedIn) {
                // user logged in - start/stop to ensure token is refreshed
                this.stopAutoFetchingCpqAccessData();
                this.startAutoFetchingCpqAccessData();
            }
            else {
                // user logged out - cancel token fetching
                this.stopAutoFetchingCpqAccessData();
                this._cpqAccessData$.next(this.EXPIRED_TOKEN); // invalidate cache
            }
        });
    }
    stopAutoFetchingCpqAccessData() {
        this.currentCpqAccessSubscription?.unsubscribe();
    }
    startAutoFetchingCpqAccessData() {
        this.currentCpqAccessSubscription = this.cpqAccessLoaderService
            .getCpqAccessData()
            .pipe(expand((data) => timer(this.fetchNextTokenIn(data)).pipe(switchMap(() => this.cpqAccessLoaderService.getCpqAccessData()))))
            .subscribe(this._cpqAccessData$); // also propagate errors
    }
    fetchNextTokenIn(data) {
        const authSettings = this.config.productConfigurator.cpq?.authentication;
        if (authSettings) {
            // we schedule a request to update our cache some time before expiration
            let fetchNextIn = data.accessTokenExpirationTime -
                Date.now() -
                authSettings.tokenExpirationBuffer;
            if (fetchNextIn < authSettings.tokenMinValidity) {
                fetchNextIn = authSettings.tokenMinValidity;
            }
            else if (fetchNextIn > authSettings.tokenMaxValidity) {
                fetchNextIn = authSettings.tokenMaxValidity;
            }
            return fetchNextIn;
        }
        else {
            throw new Error('CPQ authentication configuration not present');
        }
    }
    isTokenExpired(tokenData) {
        const authSettings = this.config.productConfigurator.cpq?.authentication;
        if (authSettings) {
            return (Date.now() >
                tokenData.accessTokenExpirationTime - authSettings.tokenExpirationBuffer);
        }
        else {
            throw new Error('CPQ authentication configuration not present');
        }
    }
}
CpqAccessStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqAccessStorageService, deps: [{ token: i1.CpqAccessLoaderService }, { token: i2.AuthService }, { token: i3.CpqConfiguratorAuthConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CpqAccessStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqAccessStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqAccessStorageService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.CpqAccessLoaderService }, { type: i2.AuthService }, { type: i3.CpqConfiguratorAuthConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWFjY2Vzcy1zdG9yYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL3Jvb3QvY3BxL2ludGVyY2VwdG9yL2NwcS1hY2Nlc3Mtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSxlQUFlLEVBQTRCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksR0FDTCxNQUFNLGdCQUFnQixDQUFDOzs7OztBQU14QixNQUFNLE9BQU8sdUJBQXVCO0lBT2xDLFlBQ1ksc0JBQThDLEVBQzlDLFdBQXdCLEVBQ3hCLE1BQWlDO1FBRmpDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBMkI7UUFUMUIsa0JBQWEsR0FBa0I7WUFDaEQsV0FBVyxFQUFFLGVBQWU7WUFDNUIseUJBQXlCLEVBQUUsQ0FBQztZQUM1QixRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUM7SUFNQyxDQUFDO0lBRUosV0FBVztRQUNULElBQUksQ0FBQyw0QkFBNEIsRUFBRSxXQUFXLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsOEJBQThCLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQU9ELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ3pELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO1FBQ0QsT0FB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LFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDL0MsV0FBVyxHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQzthQUM3QztpQkFBTSxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3RELFdBQVcsR0FBRyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7YUFDN0M7WUFDRCxPQUFPLFdBQVcsQ0FBQztTQUNwQjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQUVTLGNBQWMsQ0FBQyxTQUF3QjtRQUMvQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUM7UUFDekUsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTyxDQUNMLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1YsU0FBUyxDQUFDLHlCQUF5QixHQUFHLFlBQVksQ0FBQyxxQkFBcUIsQ0FDekUsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7U0FDakU7SUFDSCxDQUFDOztvSEEzSFUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FEVixNQUFNOzJGQUNuQix1QkFBdUI7a0JBRG5DLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBleHBhbmQsXG4gIGZpbHRlcixcbiAgc3dpdGNoTWFwLFxuICB0YWtlLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDcHFBY2Nlc3NEYXRhIH0gZnJvbSAnLi9jcHEtYWNjZXNzLWRhdGEubW9kZWxzJztcbmltcG9ydCB7IENwcUFjY2Vzc0xvYWRlclNlcnZpY2UgfSBmcm9tICcuL2NwcS1hY2Nlc3MtbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yQXV0aENvbmZpZyB9IGZyb20gJy4vY3BxLWNvbmZpZ3VyYXRvci1hdXRoLmNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ3BxQWNjZXNzU3RvcmFnZVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgRVhQSVJFRF9UT0tFTjogQ3BxQWNjZXNzRGF0YSA9IHtcbiAgICBhY2Nlc3NUb2tlbjogJ0lOVkFMSUQgRFVNTVknLFxuICAgIGFjY2Vzc1Rva2VuRXhwaXJhdGlvblRpbWU6IDAsXG4gICAgZW5kcG9pbnQ6ICcnLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjcHFBY2Nlc3NMb2FkZXJTZXJ2aWNlOiBDcHFBY2Nlc3NMb2FkZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogQ3BxQ29uZmlndXJhdG9yQXV0aENvbmZpZ1xuICApIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50Q3BxQWNjZXNzU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY3VycmVudEF1dGhTZXJ2aWNlU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNwcUFjY2Vzc0RhdGEkOiBPYnNlcnZhYmxlPENwcUFjY2Vzc0RhdGE+O1xuICBwcm90ZWN0ZWQgY3VycmVudENwcUFjY2Vzc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcm90ZWN0ZWQgY3VycmVudEF1dGhTZXJ2aWNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByb3RlY3RlZCBfY3BxQWNjZXNzRGF0YSQ6IEJlaGF2aW9yU3ViamVjdDxDcHFBY2Nlc3NEYXRhPjtcblxuICBnZXRDcHFBY2Nlc3NEYXRhKCk6IE9ic2VydmFibGU8Q3BxQWNjZXNzRGF0YT4ge1xuICAgIGlmICghdGhpcy5jcHFBY2Nlc3NEYXRhJCB8fCB0aGlzLl9jcHFBY2Nlc3NEYXRhJC5oYXNFcnJvcikge1xuICAgICAgdGhpcy5pbml0Q3BxQWNjZXNzRGF0YSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jcHFBY2Nlc3NEYXRhJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5ld3MgdGhlIGN1cnJlbnQgYWNjZXNzIGRhdGEuIEFsbCBzdWJzY3JpYmVycyBvZiBnZXRDYWNoZWRDcHFBY2Nlc3NEYXRhKClcbiAgICogd2lsbCByZWNlaXZlIHRoZSBuZXcgZGF0YS4gV2lsbCBvbmx5IGhhdmUgYW4gZWZmZWN0LCBpZiB0aGVyZSBhcmUgYW55IHN1YnNjcmliZXJzXG4gICAqIGFuZCB0aGUgdXNlciBpcyBsb2dnZWQgaW4uXG4gICAqL1xuICByZW5ld0NwcUFjY2Vzc0RhdGEoKSB7XG4gICAgLy8gb25seSBmb3JjZSB0b2tlbiByZWZyZXNoIGlmIGluaXRpYWxpemVkLlxuICAgIGlmICh0aGlzLmNwcUFjY2Vzc0RhdGEkKSB7XG4gICAgICB0aGlzLnN0b3BBdXRvRmV0Y2hpbmdDcHFBY2Nlc3NEYXRhKCk7XG4gICAgICB0aGlzLl9jcHFBY2Nlc3NEYXRhJC5uZXh0KHRoaXMuRVhQSVJFRF9UT0tFTik7IC8vIGludmFsaWRhdGUgY2FjaGVcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2VcbiAgICAgICAgLmlzVXNlckxvZ2dlZEluKClcbiAgICAgICAgLnBpcGUodGFrZSgxKSkgLy8gZ2V0IGN1cnJlbnQgbG9naW4gc3RhdGVcbiAgICAgICAgLnN1YnNjcmliZSgobG9nZ2VkSW4pID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGZldGNoIG5ldyB0b2tlbiBpZiB1c2VyIGlzIGxvZ2dlZCBpbi5cbiAgICAgICAgICBpZiAobG9nZ2VkSW4pIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvRmV0Y2hpbmdDcHFBY2Nlc3NEYXRhKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdENwcUFjY2Vzc0RhdGEoKSB7XG4gICAgdGhpcy5fY3BxQWNjZXNzRGF0YSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRoaXMuRVhQSVJFRF9UT0tFTik7XG4gICAgdGhpcy5jcHFBY2Nlc3NEYXRhJCA9IHRoaXMuX2NwcUFjY2Vzc0RhdGEkLnBpcGUoXG4gICAgICAvLyBOZXZlciBleHBvc2UgZXhwaXJlZCB0b2tlbnMgLSBlaXRoZXIgY2FjaGUgd2FzIGludmFsaWRhdGVkIHdpdGggZXhwaXJlZCB0b2tlbixcbiAgICAgIC8vIG9yIHRoZSBjYWNoZWQgb25lIGV4cGlyZWQgYmVmb3JlIGEgbmV3IG9uZSB3YXMgZmV0Y2hlZC5cbiAgICAgIGZpbHRlcigoZGF0YSkgPT4gIXRoaXMuaXNUb2tlbkV4cGlyZWQoZGF0YSkpXG4gICAgKTtcbiAgICB0aGlzLmN1cnJlbnRBdXRoU2VydmljZVN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTsgLy8gY2FuY2VsIHN1YnNjcmlwdGlvbnMgY3JlYXRlZCBmb3Igb2xkXG5cbiAgICB0aGlzLmN1cnJlbnRBdXRoU2VydmljZVN1YnNjcmlwdGlvbiA9IHRoaXMuYXV0aFNlcnZpY2VcbiAgICAgIC5pc1VzZXJMb2dnZWRJbigpXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKSAvLyBvbmx5IHJlYWN0IGlmIHVzZXIgbG9naW4gc3RhdHVzIGNoYW5nZXNcbiAgICAgIC5zdWJzY3JpYmUoKGxvZ2dlZEluKSA9PiB7XG4gICAgICAgIGlmIChsb2dnZWRJbikge1xuICAgICAgICAgIC8vIHVzZXIgbG9nZ2VkIGluIC0gc3RhcnQvc3RvcCB0byBlbnN1cmUgdG9rZW4gaXMgcmVmcmVzaGVkXG4gICAgICAgICAgdGhpcy5zdG9wQXV0b0ZldGNoaW5nQ3BxQWNjZXNzRGF0YSgpO1xuICAgICAgICAgIHRoaXMuc3RhcnRBdXRvRmV0Y2hpbmdDcHFBY2Nlc3NEYXRhKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdXNlciBsb2dnZWQgb3V0IC0gY2FuY2VsIHRva2VuIGZldGNoaW5nXG4gICAgICAgICAgdGhpcy5zdG9wQXV0b0ZldGNoaW5nQ3BxQWNjZXNzRGF0YSgpO1xuICAgICAgICAgIHRoaXMuX2NwcUFjY2Vzc0RhdGEkLm5leHQodGhpcy5FWFBJUkVEX1RPS0VOKTsgLy8gaW52YWxpZGF0ZSBjYWNoZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdG9wQXV0b0ZldGNoaW5nQ3BxQWNjZXNzRGF0YSgpIHtcbiAgICB0aGlzLmN1cnJlbnRDcHFBY2Nlc3NTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3RhcnRBdXRvRmV0Y2hpbmdDcHFBY2Nlc3NEYXRhKCkge1xuICAgIHRoaXMuY3VycmVudENwcUFjY2Vzc1N1YnNjcmlwdGlvbiA9IHRoaXMuY3BxQWNjZXNzTG9hZGVyU2VydmljZVxuICAgICAgLmdldENwcUFjY2Vzc0RhdGEoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGV4cGFuZCgoZGF0YSkgPT5cbiAgICAgICAgICB0aW1lcih0aGlzLmZldGNoTmV4dFRva2VuSW4oZGF0YSkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jcHFBY2Nlc3NMb2FkZXJTZXJ2aWNlLmdldENwcUFjY2Vzc0RhdGEoKSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fY3BxQWNjZXNzRGF0YSQpOyAvLyBhbHNvIHByb3BhZ2F0ZSBlcnJvcnNcbiAgfVxuXG4gIHByb3RlY3RlZCBmZXRjaE5leHRUb2tlbkluKGRhdGE6IENwcUFjY2Vzc0RhdGEpIHtcbiAgICBjb25zdCBhdXRoU2V0dGluZ3MgPSB0aGlzLmNvbmZpZy5wcm9kdWN0Q29uZmlndXJhdG9yLmNwcT8uYXV0aGVudGljYXRpb247XG4gICAgaWYgKGF1dGhTZXR0aW5ncykge1xuICAgICAgLy8gd2Ugc2NoZWR1bGUgYSByZXF1ZXN0IHRvIHVwZGF0ZSBvdXIgY2FjaGUgc29tZSB0aW1lIGJlZm9yZSBleHBpcmF0aW9uXG4gICAgICBsZXQgZmV0Y2hOZXh0SW46IG51bWJlciA9XG4gICAgICAgIGRhdGEuYWNjZXNzVG9rZW5FeHBpcmF0aW9uVGltZSAtXG4gICAgICAgIERhdGUubm93KCkgLVxuICAgICAgICBhdXRoU2V0dGluZ3MudG9rZW5FeHBpcmF0aW9uQnVmZmVyO1xuICAgICAgaWYgKGZldGNoTmV4dEluIDwgYXV0aFNldHRpbmdzLnRva2VuTWluVmFsaWRpdHkpIHtcbiAgICAgICAgZmV0Y2hOZXh0SW4gPSBhdXRoU2V0dGluZ3MudG9rZW5NaW5WYWxpZGl0eTtcbiAgICAgIH0gZWxzZSBpZiAoZmV0Y2hOZXh0SW4gPiBhdXRoU2V0dGluZ3MudG9rZW5NYXhWYWxpZGl0eSkge1xuICAgICAgICBmZXRjaE5leHRJbiA9IGF1dGhTZXR0aW5ncy50b2tlbk1heFZhbGlkaXR5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZldGNoTmV4dEluO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NQUSBhdXRoZW50aWNhdGlvbiBjb25maWd1cmF0aW9uIG5vdCBwcmVzZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGlzVG9rZW5FeHBpcmVkKHRva2VuRGF0YTogQ3BxQWNjZXNzRGF0YSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGF1dGhTZXR0aW5ncyA9IHRoaXMuY29uZmlnLnByb2R1Y3RDb25maWd1cmF0b3IuY3BxPy5hdXRoZW50aWNhdGlvbjtcbiAgICBpZiAoYXV0aFNldHRpbmdzKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBEYXRlLm5vdygpID5cbiAgICAgICAgdG9rZW5EYXRhLmFjY2Vzc1Rva2VuRXhwaXJhdGlvblRpbWUgLSBhdXRoU2V0dGluZ3MudG9rZW5FeHBpcmF0aW9uQnVmZmVyXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NQUSBhdXRoZW50aWNhdGlvbiBjb25maWd1cmF0aW9uIG5vdCBwcmVzZW50Jyk7XG4gICAgfVxuICB9XG59XG4iXX0=