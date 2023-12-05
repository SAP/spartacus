/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfiguratorOverviewFilterBarModule } from '../overview-filter-bar/configurator-overview-filter-bar.module';
import { ConfiguratorOverviewFilterComponent } from './configurator-overview-filter.component';
import * as i0 from "@angular/core";
export class ConfiguratorOverviewFilterModule {
}
ConfiguratorOverviewFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterModule, declarations: [ConfiguratorOverviewFilterComponent], imports: [CommonModule,
        I18nModule,
        FormsModule,
        ReactiveFormsModule,
        ConfiguratorOverviewFilterBarModule], exports: [ConfiguratorOverviewFilterComponent] });
ConfiguratorOverviewFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterModule, imports: [CommonModule,
        I18nModule,
        FormsModule,
        ReactiveFormsModule,
        ConfiguratorOverviewFilterBarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ConfiguratorOverviewFilterBarModule,
                    ],
                    declarations: [ConfiguratorOverviewFilterComponent],
                    exports: [ConfiguratorOverviewFilterComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZpbHRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvb3ZlcnZpZXctZmlsdGVyL2NvbmZpZ3VyYXRvci1vdmVydmlldy1maWx0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQ3JILE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQWEvRixNQUFNLE9BQU8sZ0NBQWdDOzs2SEFBaEMsZ0NBQWdDOzhIQUFoQyxnQ0FBZ0MsaUJBSDVCLG1DQUFtQyxhQU5oRCxZQUFZO1FBQ1osVUFBVTtRQUNWLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsbUNBQW1DLGFBRzNCLG1DQUFtQzs4SEFFbEMsZ0NBQWdDLFlBVHpDLFlBQVk7UUFDWixVQUFVO1FBQ1YsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixtQ0FBbUM7MkZBSzFCLGdDQUFnQztrQkFYNUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixtQ0FBbUM7cUJBQ3BDO29CQUNELFlBQVksRUFBRSxDQUFDLG1DQUFtQyxDQUFDO29CQUNuRCxPQUFPLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDL0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckJhck1vZHVsZSB9IGZyb20gJy4uL292ZXJ2aWV3LWZpbHRlci1iYXIvY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZpbHRlci1iYXIubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck92ZXJ2aWV3RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3Itb3ZlcnZpZXctZmlsdGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvck92ZXJ2aWV3RmlsdGVyQmFyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvck92ZXJ2aWV3RmlsdGVyTW9kdWxlIHt9XG4iXX0=