/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard, AuthRedirectService, AuthService, GlobalMessageService, I18nModule, provideDefaultConfig, RoutingService, UrlModule, } from '@spartacus/core';
import { FormErrorsModule, PasswordVisibilityToggleModule, SpinnerModule, } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { UpdatePasswordComponent } from './update-password.component';
import * as i0 from "@angular/core";
export class UpdatePasswordModule {
}
UpdatePasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UpdatePasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordModule, declarations: [UpdatePasswordComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        UrlModule,
        RouterModule,
        PasswordVisibilityToggleModule] });
UpdatePasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdatePasswordComponent: {
                    component: UpdatePasswordComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: UpdatePasswordComponentService,
                            useClass: UpdatePasswordComponentService,
                            deps: [
                                UserPasswordFacade,
                                RoutingService,
                                GlobalMessageService,
                                AuthRedirectService,
                                AuthService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        UrlModule,
        RouterModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdatePasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        I18nModule,
                        FormErrorsModule,
                        UrlModule,
                        RouterModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdatePasswordComponent: {
                                    component: UpdatePasswordComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: UpdatePasswordComponentService,
                                            useClass: UpdatePasswordComponentService,
                                            deps: [
                                                UserPasswordFacade,
                                                RoutingService,
                                                GlobalMessageService,
                                                AuthRedirectService,
                                                AuthService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [UpdatePasswordComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhc3N3b3JkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL3Byb2ZpbGUvY29tcG9uZW50cy91cGRhdGUtcGFzc3dvcmQvdXBkYXRlLXBhc3N3b3JkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsU0FBUyxFQUNULG1CQUFtQixFQUNuQixXQUFXLEVBRVgsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsOEJBQThCLEVBQzlCLGFBQWEsR0FDZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQXVDdEUsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLGlCQUZoQix1QkFBdUIsYUFqQ3BDLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLFNBQVM7UUFDVCxZQUFZO1FBQ1osOEJBQThCO2tIQTJCckIsb0JBQW9CLGFBekJwQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYix1QkFBdUIsRUFBRTtvQkFDdkIsU0FBUyxFQUFFLHVCQUF1QjtvQkFDbEMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNuQixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLDhCQUE4Qjs0QkFDdkMsUUFBUSxFQUFFLDhCQUE4Qjs0QkFDeEMsSUFBSSxFQUFFO2dDQUNKLGtCQUFrQjtnQ0FDbEIsY0FBYztnQ0FDZCxvQkFBb0I7Z0NBQ3BCLG1CQUFtQjtnQ0FDbkIsV0FBVzs2QkFDWjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBaENDLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLFNBQVM7UUFDVCxZQUFZO1FBQ1osOEJBQThCOzJGQTJCckIsb0JBQW9CO2tCQXJDaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsU0FBUzt3QkFDVCxZQUFZO3dCQUNaLDhCQUE4QjtxQkFDL0I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsdUJBQXVCLEVBQUU7b0NBQ3ZCLFNBQVMsRUFBRSx1QkFBdUI7b0NBQ2xDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztvQ0FDbkIsU0FBUyxFQUFFO3dDQUNUOzRDQUNFLE9BQU8sRUFBRSw4QkFBOEI7NENBQ3ZDLFFBQVEsRUFBRSw4QkFBOEI7NENBQ3hDLElBQUksRUFBRTtnREFDSixrQkFBa0I7Z0RBQ2xCLGNBQWM7Z0RBQ2Qsb0JBQW9CO2dEQUNwQixtQkFBbUI7Z0RBQ25CLFdBQVc7NkNBQ1o7eUNBQ0Y7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgQXV0aFNlcnZpY2UsXG4gIENtc0NvbmZpZyxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBSb3V0aW5nU2VydmljZSxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlTW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVXNlclBhc3N3b3JkRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBVcGRhdGVQYXNzd29yZENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL3VwZGF0ZS1wYXNzd29yZC1jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vdXBkYXRlLXBhc3N3b3JkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFVwZGF0ZVBhc3N3b3JkQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBVcGRhdGVQYXNzd29yZENvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBVcGRhdGVQYXNzd29yZENvbXBvbmVudFNlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUNsYXNzOiBVcGRhdGVQYXNzd29yZENvbXBvbmVudFNlcnZpY2UsXG4gICAgICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgICAgICBVc2VyUGFzc3dvcmRGYWNhZGUsXG4gICAgICAgICAgICAgICAgUm91dGluZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICAgICAgICAgICAgICBBdXRoU2VydmljZSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1VwZGF0ZVBhc3N3b3JkQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVXBkYXRlUGFzc3dvcmRNb2R1bGUge31cbiJdfQ==