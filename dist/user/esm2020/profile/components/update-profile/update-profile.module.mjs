/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard, GlobalMessageService, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule, NgSelectA11yModule, } from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { UpdateProfileComponentService } from './update-profile-component.service';
import { UpdateProfileComponent } from './update-profile.component';
import * as i0 from "@angular/core";
export class UpdateProfileModule {
}
UpdateProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UpdateProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileModule, declarations: [UpdateProfileComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        RouterModule,
        UrlModule,
        NgSelectModule,
        NgSelectA11yModule] });
UpdateProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdateProfileComponent: {
                    component: UpdateProfileComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: UpdateProfileComponentService,
                            useClass: UpdateProfileComponentService,
                            deps: [UserProfileFacade, GlobalMessageService],
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
        RouterModule,
        UrlModule,
        NgSelectModule,
        NgSelectA11yModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UpdateProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        I18nModule,
                        FormErrorsModule,
                        RouterModule,
                        UrlModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdateProfileComponent: {
                                    component: UpdateProfileComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: UpdateProfileComponentService,
                                            useClass: UpdateProfileComponentService,
                                            deps: [UserProfileFacade, GlobalMessageService],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [UpdateProfileComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXByb2ZpbGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzL3VwZGF0ZS1wcm9maWxlL3VwZGF0ZS1wcm9maWxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUNMLFNBQVMsRUFFVCxvQkFBb0IsRUFDcEIsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixrQkFBa0IsR0FDbkIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFrQ3BFLE1BQU0sT0FBTyxtQkFBbUI7O2dIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQixpQkFGZixzQkFBc0IsYUE1Qm5DLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixTQUFTO1FBQ1QsY0FBYztRQUNkLGtCQUFrQjtpSEFxQlQsbUJBQW1CLGFBbkJuQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixzQkFBc0IsRUFBRTtvQkFDdEIsU0FBUyxFQUFFLHNCQUFzQjtvQkFDakMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNuQixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLDZCQUE2Qjs0QkFDdEMsUUFBUSxFQUFFLDZCQUE2Qjs0QkFDdkMsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUM7eUJBQ2hEO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUEzQkMsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLFNBQVM7UUFDVCxjQUFjO1FBQ2Qsa0JBQWtCOzJGQXFCVCxtQkFBbUI7a0JBaEMvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixhQUFhO3dCQUNiLFVBQVU7d0JBQ1YsZ0JBQWdCO3dCQUNoQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsY0FBYzt3QkFDZCxrQkFBa0I7cUJBQ25CO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHNCQUFzQixFQUFFO29DQUN0QixTQUFTLEVBQUUsc0JBQXNCO29DQUNqQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0NBQ25CLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsNkJBQTZCOzRDQUN0QyxRQUFRLEVBQUUsNkJBQTZCOzRDQUN2QyxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQzt5Q0FDaEQ7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbiAgTmdTZWxlY3RBMTF5TW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVXNlclByb2ZpbGVGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IFVwZGF0ZVByb2ZpbGVDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi91cGRhdGUtcHJvZmlsZS1jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlQ29tcG9uZW50IH0gZnJvbSAnLi91cGRhdGUtcHJvZmlsZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgICBOZ1NlbGVjdEExMXlNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBVcGRhdGVQcm9maWxlQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBVcGRhdGVQcm9maWxlQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IFVwZGF0ZVByb2ZpbGVDb21wb25lbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VDbGFzczogVXBkYXRlUHJvZmlsZUNvbXBvbmVudFNlcnZpY2UsXG4gICAgICAgICAgICAgIGRlcHM6IFtVc2VyUHJvZmlsZUZhY2FkZSwgR2xvYmFsTWVzc2FnZVNlcnZpY2VdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVXBkYXRlUHJvZmlsZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVByb2ZpbGVNb2R1bGUge31cbiJdfQ==