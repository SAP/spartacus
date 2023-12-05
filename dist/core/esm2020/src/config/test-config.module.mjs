/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { InjectionToken, NgModule, PLATFORM_ID, } from '@angular/core';
import { getCookie } from './utils/get-cookie';
import { provideConfigFactory } from './config-providers';
import * as i0 from "@angular/core";
export const TEST_CONFIG_COOKIE_NAME = new InjectionToken('TEST_CONFIG_COOKIE_NAME');
export function parseConfigJSON(config) {
    try {
        return JSON.parse(decodeURIComponent(config));
    }
    catch (_) {
        return {};
    }
}
export function configFromCookieFactory(cookieName, platform, document) {
    if (isPlatformBrowser(platform) && cookieName) {
        const config = getCookie(document.cookie, cookieName);
        return parseConfigJSON(config);
    }
    return {};
}
/**
 * Designed/intended to provide dynamic configuration for testing scenarios ONLY (e.g. e2e tests).
 *
 * CAUTION: DON'T USE IT IN PRODUCTION! IT HASN'T BEEN REVIEWED FOR SECURITY ISSUES.
 */
export class TestConfigModule {
    /**
     * Injects JSON config from the cookie of the given name.
     *
     * Be aware of the cookie limitations (4096 bytes).
     *
     * CAUTION: DON'T USE IT IN PRODUCTION! IT HASN'T BEEN REVIEWED FOR SECURITY ISSUES.
     */
    static forRoot(options) {
        return {
            ngModule: TestConfigModule,
            providers: [
                {
                    provide: TEST_CONFIG_COOKIE_NAME,
                    useValue: options && options.cookie,
                },
                provideConfigFactory(configFromCookieFactory, [
                    TEST_CONFIG_COOKIE_NAME,
                    PLATFORM_ID,
                    DOCUMENT,
                ]),
            ],
        };
    }
}
TestConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TestConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TestConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TestConfigModule });
TestConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TestConfigModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TestConfigModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1jb25maWcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvY29uZmlnL3Rlc3QtY29uZmlnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFDTCxjQUFjLEVBRWQsUUFBUSxFQUNSLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRTFELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUN2RCx5QkFBeUIsQ0FDMUIsQ0FBQztBQUVGLE1BQU0sVUFBVSxlQUFlLENBQUMsTUFBYztJQUM1QyxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDL0M7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sRUFBRSxDQUFDO0tBQ1g7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLHVCQUF1QixDQUNyQyxVQUFrQixFQUNsQixRQUFhLEVBQ2IsUUFBa0I7SUFFbEIsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLEVBQUU7UUFDN0MsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdEQsT0FBTyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDaEM7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFNRDs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQjs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUNaLE9BQWdDO1FBRWhDLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxRQUFRLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNO2lCQUNwQztnQkFDRCxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRTtvQkFDNUMsdUJBQXVCO29CQUN2QixXQUFXO29CQUNYLFFBQVE7aUJBQ1QsQ0FBQzthQUNIO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzZHQXpCVSxnQkFBZ0I7OEdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBRDVCLFFBQVE7bUJBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBJbmplY3Rpb25Ub2tlbixcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGUsXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdldENvb2tpZSB9IGZyb20gJy4vdXRpbHMvZ2V0LWNvb2tpZSc7XG5pbXBvcnQgeyBwcm92aWRlQ29uZmlnRmFjdG9yeSB9IGZyb20gJy4vY29uZmlnLXByb3ZpZGVycyc7XG5cbmV4cG9ydCBjb25zdCBURVNUX0NPTkZJR19DT09LSUVfTkFNRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KFxuICAnVEVTVF9DT05GSUdfQ09PS0lFX05BTUUnXG4pO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb25maWdKU09OKGNvbmZpZzogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KGNvbmZpZykpO1xuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdGcm9tQ29va2llRmFjdG9yeShcbiAgY29va2llTmFtZTogc3RyaW5nLFxuICBwbGF0Zm9ybTogYW55LFxuICBkb2N1bWVudDogRG9jdW1lbnRcbikge1xuICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm0pICYmIGNvb2tpZU5hbWUpIHtcbiAgICBjb25zdCBjb25maWcgPSBnZXRDb29raWUoZG9jdW1lbnQuY29va2llLCBjb29raWVOYW1lKTtcbiAgICByZXR1cm4gcGFyc2VDb25maWdKU09OKGNvbmZpZyk7XG4gIH1cbiAgcmV0dXJuIHt9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlc3RDb25maWdNb2R1bGVPcHRpb25zIHtcbiAgY29va2llOiBzdHJpbmc7XG59XG5cbi8qKlxuICogRGVzaWduZWQvaW50ZW5kZWQgdG8gcHJvdmlkZSBkeW5hbWljIGNvbmZpZ3VyYXRpb24gZm9yIHRlc3Rpbmcgc2NlbmFyaW9zIE9OTFkgKGUuZy4gZTJlIHRlc3RzKS5cbiAqXG4gKiBDQVVUSU9OOiBET04nVCBVU0UgSVQgSU4gUFJPRFVDVElPTiEgSVQgSEFTTidUIEJFRU4gUkVWSUVXRUQgRk9SIFNFQ1VSSVRZIElTU1VFUy5cbiAqL1xuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFRlc3RDb25maWdNb2R1bGUge1xuICAvKipcbiAgICogSW5qZWN0cyBKU09OIGNvbmZpZyBmcm9tIHRoZSBjb29raWUgb2YgdGhlIGdpdmVuIG5hbWUuXG4gICAqXG4gICAqIEJlIGF3YXJlIG9mIHRoZSBjb29raWUgbGltaXRhdGlvbnMgKDQwOTYgYnl0ZXMpLlxuICAgKlxuICAgKiBDQVVUSU9OOiBET04nVCBVU0UgSVQgSU4gUFJPRFVDVElPTiEgSVQgSEFTTidUIEJFRU4gUkVWSUVXRUQgRk9SIFNFQ1VSSVRZIElTU1VFUy5cbiAgICovXG4gIHN0YXRpYyBmb3JSb290KFxuICAgIG9wdGlvbnM6IFRlc3RDb25maWdNb2R1bGVPcHRpb25zXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VGVzdENvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVGVzdENvbmZpZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVEVTVF9DT05GSUdfQ09PS0lFX05BTUUsXG4gICAgICAgICAgdXNlVmFsdWU6IG9wdGlvbnMgJiYgb3B0aW9ucy5jb29raWUsXG4gICAgICAgIH0sXG4gICAgICAgIHByb3ZpZGVDb25maWdGYWN0b3J5KGNvbmZpZ0Zyb21Db29raWVGYWN0b3J5LCBbXG4gICAgICAgICAgVEVTVF9DT05GSUdfQ09PS0lFX05BTUUsXG4gICAgICAgICAgUExBVEZPUk1fSUQsXG4gICAgICAgICAgRE9DVU1FTlQsXG4gICAgICAgIF0pLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=