/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory, UserProfileFacadeTransitionalToken, } from '@spartacus/core';
import { UserProfileFacade } from './facade/user-profile.facade';
import { USER_PROFILE_CORE_FEATURE, USER_PROFILE_FEATURE, } from './feature-name';
import * as i0 from "@angular/core";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserProfileComponentsConfig() {
    const config = {
        featureModules: {
            [USER_PROFILE_FEATURE]: {
                cmsComponents: [
                    'RegisterCustomerComponent',
                    'UpdateProfileComponent',
                    'UpdateEmailComponent',
                    'UpdatePasswordComponent',
                    'ForgotPasswordComponent',
                    'ResetPasswordComponent',
                    'CloseAccountComponent',
                ],
            },
            // by default core is bundled together with components
            [USER_PROFILE_CORE_FEATURE]: USER_PROFILE_FEATURE,
        },
    };
    return config;
}
export class UserProfileRootModule {
}
UserProfileRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserProfileRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserProfileRootModule });
UserProfileRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileRootModule, providers: [
        provideDefaultConfigFactory(defaultUserProfileComponentsConfig),
        {
            provide: UserProfileFacadeTransitionalToken,
            useExisting: UserProfileFacade,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultUserProfileComponentsConfig),
                        {
                            provide: UserProfileFacadeTransitionalToken,
                            useExisting: UserProfileFacade,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9yb290L3VzZXItcHJvZmlsZS1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBRUwsMkJBQTJCLEVBQzNCLGtDQUFrQyxHQUNuQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsb0JBQW9CLEdBQ3JCLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXhCLDJFQUEyRTtBQUMzRSxNQUFNLFVBQVUsa0NBQWtDO0lBQ2hELE1BQU0sTUFBTSxHQUFjO1FBQ3hCLGNBQWMsRUFBRTtZQUNkLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDdEIsYUFBYSxFQUFFO29CQUNiLDJCQUEyQjtvQkFDM0Isd0JBQXdCO29CQUN4QixzQkFBc0I7b0JBQ3RCLHlCQUF5QjtvQkFDekIseUJBQXlCO29CQUN6Qix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtpQkFDeEI7YUFDRjtZQUNELHNEQUFzRDtZQUN0RCxDQUFDLHlCQUF5QixDQUFDLEVBQUUsb0JBQW9CO1NBQ2xEO0tBQ0YsQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFXRCxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixhQVJyQjtRQUNULDJCQUEyQixDQUFDLGtDQUFrQyxDQUFDO1FBQy9EO1lBQ0UsT0FBTyxFQUFFLGtDQUFrQztZQUMzQyxXQUFXLEVBQUUsaUJBQWlCO1NBQy9CO0tBQ0Y7MkZBRVUscUJBQXFCO2tCQVRqQyxRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCwyQkFBMkIsQ0FBQyxrQ0FBa0MsQ0FBQzt3QkFDL0Q7NEJBQ0UsT0FBTyxFQUFFLGtDQUFrQzs0QkFDM0MsV0FBVyxFQUFFLGlCQUFpQjt5QkFDL0I7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnksXG4gIFVzZXJQcm9maWxlRmFjYWRlVHJhbnNpdGlvbmFsVG9rZW4sXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZUZhY2FkZSB9IGZyb20gJy4vZmFjYWRlL3VzZXItcHJvZmlsZS5mYWNhZGUnO1xuaW1wb3J0IHtcbiAgVVNFUl9QUk9GSUxFX0NPUkVfRkVBVFVSRSxcbiAgVVNFUl9QUk9GSUxFX0ZFQVRVUkUsXG59IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFVzZXJQcm9maWxlQ29tcG9uZW50c0NvbmZpZygpOiBDbXNDb25maWcge1xuICBjb25zdCBjb25maWc6IENtc0NvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW1VTRVJfUFJPRklMRV9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbXG4gICAgICAgICAgJ1JlZ2lzdGVyQ3VzdG9tZXJDb21wb25lbnQnLFxuICAgICAgICAgICdVcGRhdGVQcm9maWxlQ29tcG9uZW50JyxcbiAgICAgICAgICAnVXBkYXRlRW1haWxDb21wb25lbnQnLFxuICAgICAgICAgICdVcGRhdGVQYXNzd29yZENvbXBvbmVudCcsXG4gICAgICAgICAgJ0ZvcmdvdFBhc3N3b3JkQ29tcG9uZW50JyxcbiAgICAgICAgICAnUmVzZXRQYXNzd29yZENvbXBvbmVudCcsXG4gICAgICAgICAgJ0Nsb3NlQWNjb3VudENvbXBvbmVudCcsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgLy8gYnkgZGVmYXVsdCBjb3JlIGlzIGJ1bmRsZWQgdG9nZXRoZXIgd2l0aCBjb21wb25lbnRzXG4gICAgICBbVVNFUl9QUk9GSUxFX0NPUkVfRkVBVFVSRV06IFVTRVJfUFJPRklMRV9GRUFUVVJFLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBjb25maWc7XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0VXNlclByb2ZpbGVDb21wb25lbnRzQ29uZmlnKSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBVc2VyUHJvZmlsZUZhY2FkZVRyYW5zaXRpb25hbFRva2VuLFxuICAgICAgdXNlRXhpc3Rpbmc6IFVzZXJQcm9maWxlRmFjYWRlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJQcm9maWxlUm9vdE1vZHVsZSB7fVxuIl19