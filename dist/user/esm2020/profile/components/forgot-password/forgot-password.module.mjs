/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthConfigService, GlobalMessageService, I18nModule, NotAuthGuard, provideDefaultConfig, RoutingService, UrlModule, } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { ForgotPasswordComponentService } from './forgot-password-component.service';
import { ForgotPasswordComponent } from './forgot-password.component';
import * as i0 from "@angular/core";
export class ForgotPasswordModule {
}
ForgotPasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ForgotPasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordModule, declarations: [ForgotPasswordComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
ForgotPasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ForgotPasswordComponent: {
                    component: ForgotPasswordComponent,
                    guards: [NotAuthGuard],
                    providers: [
                        {
                            provide: ForgotPasswordComponentService,
                            useClass: ForgotPasswordComponentService,
                            deps: [
                                UserPasswordFacade,
                                RoutingService,
                                AuthConfigService,
                                GlobalMessageService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ForgotPasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        FormErrorsModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ForgotPasswordComponent: {
                                    component: ForgotPasswordComponent,
                                    guards: [NotAuthGuard],
                                    providers: [
                                        {
                                            provide: ForgotPasswordComponentService,
                                            useClass: ForgotPasswordComponentService,
                                            deps: [
                                                UserPasswordFacade,
                                                RoutingService,
                                                AuthConfigService,
                                                GlobalMessageService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [ForgotPasswordComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290LXBhc3N3b3JkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL3Byb2ZpbGUvY29tcG9uZW50cy9mb3Jnb3QtcGFzc3dvcmQvZm9yZ290LXBhc3N3b3JkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCxTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDckYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBb0N0RSxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsaUJBRmhCLHVCQUF1QixhQTlCcEMsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsYUFBYTtrSEEwQkosb0JBQW9CLGFBeEJwQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYix1QkFBdUIsRUFBRTtvQkFDdkIsU0FBUyxFQUFFLHVCQUF1QjtvQkFDbEMsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN0QixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLDhCQUE4Qjs0QkFDdkMsUUFBUSxFQUFFLDhCQUE4Qjs0QkFDeEMsSUFBSSxFQUFFO2dDQUNKLGtCQUFrQjtnQ0FDbEIsY0FBYztnQ0FDZCxpQkFBaUI7Z0NBQ2pCLG9CQUFvQjs2QkFDckI7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7S0FDSCxZQTdCQyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixhQUFhOzJGQTBCSixvQkFBb0I7a0JBbENoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsZ0JBQWdCO3dCQUNoQixhQUFhO3FCQUNkO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHVCQUF1QixFQUFFO29DQUN2QixTQUFTLEVBQUUsdUJBQXVCO29DQUNsQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0NBQ3RCLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsOEJBQThCOzRDQUN2QyxRQUFRLEVBQUUsOEJBQThCOzRDQUN4QyxJQUFJLEVBQUU7Z0RBQ0osa0JBQWtCO2dEQUNsQixjQUFjO2dEQUNkLGlCQUFpQjtnREFDakIsb0JBQW9COzZDQUNyQjt5Q0FDRjtxQ0FDRjtpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO2lCQUN4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBdXRoQ29uZmlnU2VydmljZSxcbiAgQ21zQ29uZmlnLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgSTE4bk1vZHVsZSxcbiAgTm90QXV0aEd1YXJkLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgUm91dGluZ1NlcnZpY2UsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNNb2R1bGUsIFNwaW5uZXJNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVXNlclBhc3N3b3JkRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBGb3Jnb3RQYXNzd29yZENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL2ZvcmdvdC1wYXNzd29yZC1jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBGb3Jnb3RQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgRm9yZ290UGFzc3dvcmRDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IEZvcmdvdFBhc3N3b3JkQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW05vdEF1dGhHdWFyZF0sXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IEZvcmdvdFBhc3N3b3JkQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgdXNlQ2xhc3M6IEZvcmdvdFBhc3N3b3JkQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgICAgIFVzZXJQYXNzd29yZEZhY2FkZSxcbiAgICAgICAgICAgICAgICBSb3V0aW5nU2VydmljZSxcbiAgICAgICAgICAgICAgICBBdXRoQ29uZmlnU2VydmljZSxcbiAgICAgICAgICAgICAgICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0ZvcmdvdFBhc3N3b3JkQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRm9yZ290UGFzc3dvcmRNb2R1bGUge31cbiJdfQ==