/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GlobalMessageService, I18nModule, NotAuthGuard, provideDefaultConfig, RoutingService, } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule, PasswordVisibilityToggleModule, } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { ResetPasswordComponentService } from './reset-password-component.service';
import { ResetPasswordComponent } from './reset-password.component';
import * as i0 from "@angular/core";
export class ResetPasswordModule {
}
ResetPasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ResetPasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordModule, declarations: [ResetPasswordComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule] });
ResetPasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ResetPasswordComponent: {
                    component: ResetPasswordComponent,
                    guards: [NotAuthGuard],
                    providers: [
                        {
                            provide: ResetPasswordComponentService,
                            useClass: ResetPasswordComponentService,
                            deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ResetPasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        I18nModule,
                        FormErrorsModule,
                        SpinnerModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ResetPasswordComponent: {
                                    component: ResetPasswordComponent,
                                    guards: [NotAuthGuard],
                                    providers: [
                                        {
                                            provide: ResetPasswordComponentService,
                                            useClass: ResetPasswordComponentService,
                                            deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [ResetPasswordComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBRUwsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLGNBQWMsR0FDZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLDhCQUE4QixHQUMvQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQWdDcEUsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGlCQUZmLHNCQUFzQixhQTFCbkMsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsYUFBYTtRQUNiLDhCQUE4QjtpSEFxQnJCLG1CQUFtQixhQW5CbkI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isc0JBQXNCLEVBQUU7b0JBQ3RCLFNBQVMsRUFBRSxzQkFBc0I7b0JBQ2pDLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdEIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSw2QkFBNkI7NEJBQ3RDLFFBQVEsRUFBRSw2QkFBNkI7NEJBQ3ZDLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQzt5QkFDakU7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7S0FDSCxZQXpCQyxZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsOEJBQThCOzJGQXFCckIsbUJBQW1CO2tCQTlCL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYiw4QkFBOEI7cUJBQy9CO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHNCQUFzQixFQUFFO29DQUN0QixTQUFTLEVBQUUsc0JBQXNCO29DQUNqQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0NBQ3RCLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsNkJBQTZCOzRDQUN0QyxRQUFRLEVBQUUsNkJBQTZCOzRDQUN2QyxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUM7eUNBQ2pFO3FDQUNGO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBJMThuTW9kdWxlLFxuICBOb3RBdXRoR3VhcmQsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1FcnJvcnNNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG4gIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFVzZXJQYXNzd29yZEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL3Jlc2V0LXBhc3N3b3JkLWNvbXBvbmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb21wb25lbnQgfSBmcm9tICcuL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGb3JtRXJyb3JzTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgUmVzZXRQYXNzd29yZENvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogUmVzZXRQYXNzd29yZENvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtOb3RBdXRoR3VhcmRdLFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBSZXNldFBhc3N3b3JkQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgdXNlQ2xhc3M6IFJlc2V0UGFzc3dvcmRDb21wb25lbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICBkZXBzOiBbVXNlclBhc3N3b3JkRmFjYWRlLCBSb3V0aW5nU2VydmljZSwgR2xvYmFsTWVzc2FnZVNlcnZpY2VdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUmVzZXRQYXNzd29yZENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRNb2R1bGUge31cbiJdfQ==