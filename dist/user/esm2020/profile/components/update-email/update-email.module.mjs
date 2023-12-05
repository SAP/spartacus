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
import { FormErrorsModule, SpinnerModule, PasswordVisibilityToggleModule, } from '@spartacus/storefront';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { UpdateEmailComponentService } from './update-email-component.service';
import { UpdateEmailComponent } from './update-email.component';
import * as i0 from "@angular/core";
export class UpdateEmailModule {
}
UpdateEmailModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UpdateEmailModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailModule, declarations: [UpdateEmailComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        UrlModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule] });
UpdateEmailModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdateEmailComponent: {
                    component: UpdateEmailComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: UpdateEmailComponentService,
                            useClass: UpdateEmailComponentService,
                            deps: [
                                UserEmailFacade,
                                RoutingService,
                                GlobalMessageService,
                                AuthService,
                                AuthRedirectService,
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
        UrlModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateEmailModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        UrlModule,
                        RouterModule,
                        I18nModule,
                        FormErrorsModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdateEmailComponent: {
                                    component: UpdateEmailComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: UpdateEmailComponentService,
                                            useClass: UpdateEmailComponentService,
                                            deps: [
                                                UserEmailFacade,
                                                RoutingService,
                                                GlobalMessageService,
                                                AuthService,
                                                AuthRedirectService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [UpdateEmailComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWVtYWlsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL3Byb2ZpbGUvY29tcG9uZW50cy91cGRhdGUtZW1haWwvdXBkYXRlLWVtYWlsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsU0FBUyxFQUNULG1CQUFtQixFQUNuQixXQUFXLEVBRVgsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLDhCQUE4QixHQUMvQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUF1Q2hFLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFGYixvQkFBb0IsYUFqQ2pDLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixTQUFTO1FBQ1QsWUFBWTtRQUNaLFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsOEJBQThCOytHQTJCckIsaUJBQWlCLGFBekJqQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixvQkFBb0IsRUFBRTtvQkFDcEIsU0FBUyxFQUFFLG9CQUFvQjtvQkFDL0IsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNuQixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLDJCQUEyQjs0QkFDcEMsUUFBUSxFQUFFLDJCQUEyQjs0QkFDckMsSUFBSSxFQUFFO2dDQUNKLGVBQWU7Z0NBQ2YsY0FBYztnQ0FDZCxvQkFBb0I7Z0NBQ3BCLFdBQVc7Z0NBQ1gsbUJBQW1COzZCQUNwQjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBaENDLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixTQUFTO1FBQ1QsWUFBWTtRQUNaLFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsOEJBQThCOzJGQTJCckIsaUJBQWlCO2tCQXJDN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixTQUFTO3dCQUNULFlBQVk7d0JBQ1osVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLDhCQUE4QjtxQkFDL0I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isb0JBQW9CLEVBQUU7b0NBQ3BCLFNBQVMsRUFBRSxvQkFBb0I7b0NBQy9CLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztvQ0FDbkIsU0FBUyxFQUFFO3dDQUNUOzRDQUNFLE9BQU8sRUFBRSwyQkFBMkI7NENBQ3BDLFFBQVEsRUFBRSwyQkFBMkI7NENBQ3JDLElBQUksRUFBRTtnREFDSixlQUFlO2dEQUNmLGNBQWM7Z0RBQ2Qsb0JBQW9CO2dEQUNwQixXQUFXO2dEQUNYLG1CQUFtQjs2Q0FDcEI7eUNBQ0Y7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgQXV0aFNlcnZpY2UsXG4gIENtc0NvbmZpZyxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBSb3V0aW5nU2VydmljZSxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbiAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVXNlckVtYWlsRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBVcGRhdGVFbWFpbENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL3VwZGF0ZS1lbWFpbC1jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVFbWFpbENvbXBvbmVudCB9IGZyb20gJy4vdXBkYXRlLWVtYWlsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGb3JtRXJyb3JzTW9kdWxlLFxuICAgIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFVwZGF0ZUVtYWlsQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBVcGRhdGVFbWFpbENvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBVcGRhdGVFbWFpbENvbXBvbmVudFNlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUNsYXNzOiBVcGRhdGVFbWFpbENvbXBvbmVudFNlcnZpY2UsXG4gICAgICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgICAgICBVc2VyRW1haWxGYWNhZGUsXG4gICAgICAgICAgICAgICAgUm91dGluZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQXV0aFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1VwZGF0ZUVtYWlsQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVXBkYXRlRW1haWxNb2R1bGUge31cbiJdfQ==