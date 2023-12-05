/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { FormModule } from './form/form.module';
import { ListModule } from './list/list.module';
import { SubListModule } from './sub-list/sub-list.module';
import * as i0 from "@angular/core";
export class SharedOrganizationModule {
}
SharedOrganizationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SharedOrganizationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SharedOrganizationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SharedOrganizationModule, imports: [ListModule, SubListModule, FormModule] });
SharedOrganizationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SharedOrganizationModule, imports: [ListModule, SubListModule, FormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SharedOrganizationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, SubListModule, FormModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLW9yZ2FuaXphdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL3NoYXJlZC1vcmdhbml6YXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQUszRCxNQUFNLE9BQU8sd0JBQXdCOztxSEFBeEIsd0JBQXdCO3NIQUF4Qix3QkFBd0IsWUFGekIsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVO3NIQUVwQyx3QkFBd0IsWUFGekIsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVOzJGQUVwQyx3QkFBd0I7a0JBSHBDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUM7aUJBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Nb2R1bGUgfSBmcm9tICcuL2Zvcm0vZm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgTGlzdE1vZHVsZSB9IGZyb20gJy4vbGlzdC9saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBTdWJMaXN0TW9kdWxlIH0gZnJvbSAnLi9zdWItbGlzdC9zdWItbGlzdC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTGlzdE1vZHVsZSwgU3ViTGlzdE1vZHVsZSwgRm9ybU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE9yZ2FuaXphdGlvbk1vZHVsZSB7fVxuIl19