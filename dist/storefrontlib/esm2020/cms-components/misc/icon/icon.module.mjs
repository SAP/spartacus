/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultIconConfig } from './default-icon.config';
import { fontawesomeIconConfig } from './fontawesome-icon.config';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
export class IconModule {
}
IconModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IconModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: IconModule, declarations: [IconComponent], imports: [CommonModule], exports: [IconComponent] });
IconModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconModule, providers: [
        provideDefaultConfig(defaultIconConfig),
        // TODO: move the opinionated fontawesome config to a recipe
        provideDefaultConfig(fontawesomeIconConfig),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [IconComponent],
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultIconConfig),
                        // TODO: move the opinionated fontawesome config to a recipe
                        provideDefaultConfig(fontawesomeIconConfig),
                    ],
                    exports: [IconComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL21pc2MvaWNvbi9pY29uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQVlqRCxNQUFNLE9BQU8sVUFBVTs7dUdBQVYsVUFBVTt3R0FBVixVQUFVLGlCQVROLGFBQWEsYUFDbEIsWUFBWSxhQU1aLGFBQWE7d0dBRVosVUFBVSxhQVBWO1FBQ1Qsb0JBQW9CLENBQUMsaUJBQWlCLENBQUM7UUFDdkMsNERBQTREO1FBQzVELG9CQUFvQixDQUFDLHFCQUFxQixDQUFDO0tBQzVDLFlBTFMsWUFBWTsyRkFRWCxVQUFVO2tCQVZ0QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDN0IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMsaUJBQWlCLENBQUM7d0JBQ3ZDLDREQUE0RDt3QkFDNUQsb0JBQW9CLENBQUMscUJBQXFCLENBQUM7cUJBQzVDO29CQUNELE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRJY29uQ29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWljb24uY29uZmlnJztcbmltcG9ydCB7IGZvbnRhd2Vzb21lSWNvbkNvbmZpZyB9IGZyb20gJy4vZm9udGF3ZXNvbWUtaWNvbi5jb25maWcnO1xuaW1wb3J0IHsgSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vaWNvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtJY29uQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRJY29uQ29uZmlnKSxcbiAgICAvLyBUT0RPOiBtb3ZlIHRoZSBvcGluaW9uYXRlZCBmb250YXdlc29tZSBjb25maWcgdG8gYSByZWNpcGVcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhmb250YXdlc29tZUljb25Db25maWcpLFxuICBdLFxuICBleHBvcnRzOiBbSWNvbkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEljb25Nb2R1bGUge31cbiJdfQ==