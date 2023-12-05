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
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { FormErrorsModule, NgSelectA11yModule, SpinnerModule, } from '@spartacus/storefront';
import { UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { CDCUpdateProfileComponentService } from './cdc-update-profile-component.service';
import * as i0 from "@angular/core";
export class CDCUpdateProfileModule {
}
CDCUpdateProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUpdateProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileModule, imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        RouterModule,
        UrlModule,
        NgSelectModule,
        NgSelectA11yModule] });
CDCUpdateProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdateProfileComponent: {
                    providers: [
                        {
                            provide: UpdateProfileComponentService,
                            useClass: CDCUpdateProfileComponentService,
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CDCUpdateProfileModule, decorators: [{
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
                                    providers: [
                                        {
                                            provide: UpdateProfileComponentService,
                                            useClass: CDCUpdateProfileComponentService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVwZGF0ZS1wcm9maWxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3VzZXItcHJvZmlsZS91cGRhdGUtcHJvZmlsZS9jZGMtdXBkYXRlLXByb2ZpbGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBRUwsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUE4QjFGLE1BQU0sT0FBTyxzQkFBc0I7O21IQUF0QixzQkFBc0I7b0hBQXRCLHNCQUFzQixZQTFCL0IsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLFNBQVM7UUFDVCxjQUFjO1FBQ2Qsa0JBQWtCO29IQWlCVCxzQkFBc0IsYUFmdEI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isc0JBQXNCLEVBQUU7b0JBQ3RCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsNkJBQTZCOzRCQUN0QyxRQUFRLEVBQUUsZ0NBQWdDO3lCQUMzQztxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBeEJDLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixTQUFTO1FBQ1QsY0FBYztRQUNkLGtCQUFrQjsyRkFpQlQsc0JBQXNCO2tCQTVCbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixTQUFTO3dCQUNULGNBQWM7d0JBQ2Qsa0JBQWtCO3FCQUNuQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixzQkFBc0IsRUFBRTtvQ0FDdEIsU0FBUyxFQUFFO3dDQUNUOzRDQUNFLE9BQU8sRUFBRSw2QkFBNkI7NENBQ3RDLFFBQVEsRUFBRSxnQ0FBZ0M7eUNBQzNDO3FDQUNGO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgTmdTZWxlY3RBMTF5TW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZUNvbXBvbmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzJztcbmltcG9ydCB7IENEQ1VwZGF0ZVByb2ZpbGVDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9jZGMtdXBkYXRlLXByb2ZpbGUtY29tcG9uZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgICBOZ1NlbGVjdEExMXlNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBVcGRhdGVQcm9maWxlQ29tcG9uZW50OiB7XG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IFVwZGF0ZVByb2ZpbGVDb21wb25lbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VDbGFzczogQ0RDVXBkYXRlUHJvZmlsZUNvbXBvbmVudFNlcnZpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDRENVcGRhdGVQcm9maWxlTW9kdWxlIHt9XG4iXX0=