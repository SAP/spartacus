/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { FormModule } from '../../shared/form/form.module';
import { UserGroupFormComponent } from './user-group-form.component';
import * as i0 from "@angular/core";
export class UserGroupFormModule {
}
UserGroupFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormModule, declarations: [UserGroupFormComponent], imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FormModule] });
UserGroupFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormModule, imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        FormModule,
                    ],
                    declarations: [UserGroupFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyLWdyb3VwL2Zvcm0vdXNlci1ncm91cC1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFlckUsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGlCQUZmLHNCQUFzQixhQVRuQyxZQUFZO1FBQ1osWUFBWTtRQUNaLGNBQWM7UUFDZCxTQUFTO1FBQ1QsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsVUFBVTtpSEFJRCxtQkFBbUIsWUFYNUIsWUFBWTtRQUNaLFlBQVk7UUFDWixjQUFjO1FBQ2QsU0FBUztRQUNULFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLFVBQVU7MkZBSUQsbUJBQW1CO2tCQWIvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxTQUFTO3dCQUNULFVBQVU7d0JBQ1YsbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLFVBQVU7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgVXJsTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgRm9ybU1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mb3JtL2Zvcm0ubW9kdWxlJztcbmltcG9ydCB7IFVzZXJHcm91cEZvcm1Db21wb25lbnQgfSBmcm9tICcuL3VzZXItZ3JvdXAtZm9ybS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgRm9ybU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVXNlckdyb3VwRm9ybUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cEZvcm1Nb2R1bGUge31cbiJdfQ==