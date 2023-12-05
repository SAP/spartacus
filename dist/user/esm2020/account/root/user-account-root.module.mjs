/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { UserAccountEventModule } from './events/user-account-event.module';
import { USER_ACCOUNT_CORE_FEATURE, USER_ACCOUNT_FEATURE, } from './feature-name';
import * as i0 from "@angular/core";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserAccountComponentsConfig() {
    const config = {
        featureModules: {
            [USER_ACCOUNT_FEATURE]: {
                cmsComponents: [
                    'LoginComponent',
                    'ReturningCustomerLoginComponent',
                    'ReturningCustomerRegisterComponent',
                    'MyAccountViewUserComponent',
                ],
            },
            // by default core is bundled together with components
            [USER_ACCOUNT_CORE_FEATURE]: USER_ACCOUNT_FEATURE,
        },
    };
    return config;
}
export class UserAccountRootModule {
}
UserAccountRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAccountRootModule, imports: [UserAccountEventModule] });
UserAccountRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountRootModule, providers: [provideDefaultConfigFactory(defaultUserAccountComponentsConfig)], imports: [UserAccountEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [UserAccountEventModule],
                    providers: [provideDefaultConfigFactory(defaultUserAccountComponentsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hY2NvdW50LXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvYWNjb3VudC9yb290L3VzZXItYWNjb3VudC1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLG9CQUFvQixHQUNyQixNQUFNLGdCQUFnQixDQUFDOztBQUV4QiwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLGtDQUFrQztJQUNoRCxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLG9CQUFvQixDQUFDLEVBQUU7Z0JBQ3RCLGFBQWEsRUFBRTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGlDQUFpQztvQkFDakMsb0NBQW9DO29CQUNwQyw0QkFBNEI7aUJBQzdCO2FBQ0Y7WUFDRCxzREFBc0Q7WUFDdEQsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLG9CQUFvQjtTQUNsRDtLQUNGLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBTUQsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLFlBSHRCLHNCQUFzQjttSEFHckIscUJBQXFCLGFBRnJCLENBQUMsMkJBQTJCLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxZQURsRSxzQkFBc0I7MkZBR3JCLHFCQUFxQjtrQkFKakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDakMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUMsa0NBQWtDLENBQUMsQ0FBQztpQkFDN0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVXNlckFjY291bnRFdmVudE1vZHVsZSB9IGZyb20gJy4vZXZlbnRzL3VzZXItYWNjb3VudC1ldmVudC5tb2R1bGUnO1xuaW1wb3J0IHtcbiAgVVNFUl9BQ0NPVU5UX0NPUkVfRkVBVFVSRSxcbiAgVVNFUl9BQ0NPVU5UX0ZFQVRVUkUsXG59IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFVzZXJBY2NvdW50Q29tcG9uZW50c0NvbmZpZygpOiBDbXNDb25maWcge1xuICBjb25zdCBjb25maWc6IENtc0NvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW1VTRVJfQUNDT1VOVF9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbXG4gICAgICAgICAgJ0xvZ2luQ29tcG9uZW50JyxcbiAgICAgICAgICAnUmV0dXJuaW5nQ3VzdG9tZXJMb2dpbkNvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVybmluZ0N1c3RvbWVyUmVnaXN0ZXJDb21wb25lbnQnLFxuICAgICAgICAgICdNeUFjY291bnRWaWV3VXNlckNvbXBvbmVudCcsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgLy8gYnkgZGVmYXVsdCBjb3JlIGlzIGJ1bmRsZWQgdG9nZXRoZXIgd2l0aCBjb21wb25lbnRzXG4gICAgICBbVVNFUl9BQ0NPVU5UX0NPUkVfRkVBVFVSRV06IFVTRVJfQUNDT1VOVF9GRUFUVVJFLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBjb25maWc7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtVc2VyQWNjb3VudEV2ZW50TW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRVc2VyQWNjb3VudENvbXBvbmVudHNDb25maWcpXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckFjY291bnRSb290TW9kdWxlIHt9XG4iXX0=