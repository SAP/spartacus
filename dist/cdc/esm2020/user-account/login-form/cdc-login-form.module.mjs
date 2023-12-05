/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, GlobalMessageService, I18nModule, provideDefaultConfig, UrlModule, WindowRef, } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { LoginFormComponent, LoginFormComponentService, } from '@spartacus/user/account/components';
import { CdcReconsentModule } from './reconsent/cdc-reconsent.module';
import { CdcLoginFormComponentService } from './cdc-login-form-component.service';
import { CdcJsService } from '@spartacus/cdc/root';
import * as i0 from "@angular/core";
export class CDCLoginFormModule {
}
CDCLoginFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCLoginFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCLoginFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCLoginFormModule, imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        CdcReconsentModule] });
CDCLoginFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCLoginFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturningCustomerLoginComponent: {
                    component: LoginFormComponent,
                    providers: [
                        {
                            provide: LoginFormComponentService,
                            useClass: CdcLoginFormComponentService,
                            deps: [
                                AuthService,
                                GlobalMessageService,
                                WindowRef,
                                CdcJsService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        CdcReconsentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCLoginFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        FormErrorsModule,
                        SpinnerModule,
                        CdcReconsentModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturningCustomerLoginComponent: {
                                    component: LoginFormComponent,
                                    providers: [
                                        {
                                            provide: LoginFormComponentService,
                                            useClass: CdcLoginFormComponentService,
                                            deps: [
                                                AuthService,
                                                GlobalMessageService,
                                                WindowRef,
                                                CdcJsService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWxvZ2luLWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvdXNlci1hY2NvdW50L2xvZ2luLWZvcm0vY2RjLWxvZ2luLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxXQUFXLEVBRVgsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsa0JBQWtCLEVBQ2xCLHlCQUF5QixHQUMxQixNQUFNLG9DQUFvQyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFvQ25ELE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixZQWhDM0IsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixrQkFBa0I7Z0hBd0JULGtCQUFrQixhQXRCbEI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsK0JBQStCLEVBQUU7b0JBQy9CLFNBQVMsRUFBRSxrQkFBa0I7b0JBQzdCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUseUJBQXlCOzRCQUNsQyxRQUFRLEVBQUUsNEJBQTRCOzRCQUN0QyxJQUFJLEVBQUU7Z0NBQ0osV0FBVztnQ0FDWCxvQkFBb0I7Z0NBQ3BCLFNBQVM7Z0NBQ1QsWUFBWTs2QkFDYjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBOUJDLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2Isa0JBQWtCOzJGQXdCVCxrQkFBa0I7a0JBbEM5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2Isa0JBQWtCO3FCQUNuQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiwrQkFBK0IsRUFBRTtvQ0FDL0IsU0FBUyxFQUFFLGtCQUFrQjtvQ0FDN0IsU0FBUyxFQUFFO3dDQUNUOzRDQUNFLE9BQU8sRUFBRSx5QkFBeUI7NENBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7NENBQ3RDLElBQUksRUFBRTtnREFDSixXQUFXO2dEQUNYLG9CQUFvQjtnREFDcEIsU0FBUztnREFDVCxZQUFZOzZDQUNiO3lDQUNGO3FDQUNGO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIEF1dGhTZXJ2aWNlLFxuICBDbXNDb25maWcsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxuICBXaW5kb3dSZWYsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzTW9kdWxlLCBTcGlubmVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7XG4gIExvZ2luRm9ybUNvbXBvbmVudCxcbiAgTG9naW5Gb3JtQ29tcG9uZW50U2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBDZGNSZWNvbnNlbnRNb2R1bGUgfSBmcm9tICcuL3JlY29uc2VudC9jZGMtcmVjb25zZW50Lm1vZHVsZSc7XG5pbXBvcnQgeyBDZGNMb2dpbkZvcm1Db21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9jZGMtbG9naW4tZm9ybS1jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDZGNKc1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NkYy9yb290JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGb3JtRXJyb3JzTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgQ2RjUmVjb25zZW50TW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgUmV0dXJuaW5nQ3VzdG9tZXJMb2dpbkNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogTG9naW5Gb3JtQ29tcG9uZW50LFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBMb2dpbkZvcm1Db21wb25lbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VDbGFzczogQ2RjTG9naW5Gb3JtQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgICAgIEF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIFdpbmRvd1JlZixcbiAgICAgICAgICAgICAgICBDZGNKc1NlcnZpY2UsXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDRENMb2dpbkZvcm1Nb2R1bGUge31cbiJdfQ==