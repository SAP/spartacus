/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { TextfieldConfiguratorComponentsModule } from './components/textfield-configurator-components.module';
import { TextfieldConfiguratorCoreModule } from './core/textfield-configurator-core.module';
import { TextfieldConfiguratorOccModule } from './occ/textfield-configurator-occ.module';
import * as i0 from "@angular/core";
/**
 * Exposes the textfield configurator, a small configurator that only provides 3 attributes at product level without any dependencies between them,
 * and in the first place serves as a template for other configurator implementations.
 */
export class TextfieldConfiguratorModule {
}
TextfieldConfiguratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorModule, imports: [TextfieldConfiguratorCoreModule,
        TextfieldConfiguratorComponentsModule,
        TextfieldConfiguratorOccModule] });
TextfieldConfiguratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorModule, imports: [TextfieldConfiguratorCoreModule,
        TextfieldConfiguratorComponentsModule,
        TextfieldConfiguratorOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        TextfieldConfiguratorCoreModule,
                        TextfieldConfiguratorComponentsModule,
                        TextfieldConfiguratorOccModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLWNvbmZpZ3VyYXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvdGV4dGZpZWxkL3RleHRmaWVsZC1jb25maWd1cmF0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzlHLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztBQUV6Rjs7O0dBR0c7QUFRSCxNQUFNLE9BQU8sMkJBQTJCOzt3SEFBM0IsMkJBQTJCO3lIQUEzQiwyQkFBMkIsWUFMcEMsK0JBQStCO1FBQy9CLHFDQUFxQztRQUNyQyw4QkFBOEI7eUhBR3JCLDJCQUEyQixZQUxwQywrQkFBK0I7UUFDL0IscUNBQXFDO1FBQ3JDLDhCQUE4QjsyRkFHckIsMkJBQTJCO2tCQVB2QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCwrQkFBK0I7d0JBQy9CLHFDQUFxQzt3QkFDckMsOEJBQThCO3FCQUMvQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUZXh0ZmllbGRDb25maWd1cmF0b3JDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHRmaWVsZC1jb25maWd1cmF0b3ItY29tcG9uZW50cy5tb2R1bGUnO1xuaW1wb3J0IHsgVGV4dGZpZWxkQ29uZmlndXJhdG9yQ29yZU1vZHVsZSB9IGZyb20gJy4vY29yZS90ZXh0ZmllbGQtY29uZmlndXJhdG9yLWNvcmUubW9kdWxlJztcbmltcG9ydCB7IFRleHRmaWVsZENvbmZpZ3VyYXRvck9jY01vZHVsZSB9IGZyb20gJy4vb2NjL3RleHRmaWVsZC1jb25maWd1cmF0b3Itb2NjLm1vZHVsZSc7XG5cbi8qKlxuICogRXhwb3NlcyB0aGUgdGV4dGZpZWxkIGNvbmZpZ3VyYXRvciwgYSBzbWFsbCBjb25maWd1cmF0b3IgdGhhdCBvbmx5IHByb3ZpZGVzIDMgYXR0cmlidXRlcyBhdCBwcm9kdWN0IGxldmVsIHdpdGhvdXQgYW55IGRlcGVuZGVuY2llcyBiZXR3ZWVuIHRoZW0sXG4gKiBhbmQgaW4gdGhlIGZpcnN0IHBsYWNlIHNlcnZlcyBhcyBhIHRlbXBsYXRlIGZvciBvdGhlciBjb25maWd1cmF0b3IgaW1wbGVtZW50YXRpb25zLlxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgVGV4dGZpZWxkQ29uZmlndXJhdG9yQ29yZU1vZHVsZSxcbiAgICBUZXh0ZmllbGRDb25maWd1cmF0b3JDb21wb25lbnRzTW9kdWxlLFxuICAgIFRleHRmaWVsZENvbmZpZ3VyYXRvck9jY01vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVGV4dGZpZWxkQ29uZmlndXJhdG9yTW9kdWxlIHt9XG4iXX0=