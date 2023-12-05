/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { GigyaRaasComponent } from './gigya-raas.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class GigyaRaasModule {
}
GigyaRaasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GigyaRaasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasModule, declarations: [GigyaRaasComponent], imports: [CommonModule,
        I18nModule, i1.ConfigModule], exports: [GigyaRaasComponent] });
GigyaRaasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasModule, imports: [CommonModule,
        I18nModule,
        ConfigModule.withConfig({
            cmsComponents: {
                GigyaRaasComponent: { component: GigyaRaasComponent },
            },
            layoutSlots: {
                GigyaLoginPageTemplate: {
                    slots: ['BodyContent', 'BottomContent'],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                GigyaRaasComponent: { component: GigyaRaasComponent },
                            },
                            layoutSlots: {
                                GigyaLoginPageTemplate: {
                                    slots: ['BodyContent', 'BottomContent'],
                                },
                            },
                        }),
                    ],
                    declarations: [GigyaRaasComponent],
                    exports: [GigyaRaasComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lneWEtcmFhcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy9jb21wb25lbnRzL2dpZ3lhLXJhYXMvZ2lneWEtcmFhcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztBQW9CNUQsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFIWCxrQkFBa0IsYUFiL0IsWUFBWTtRQUNaLFVBQVUsOEJBYUYsa0JBQWtCOzZHQUVqQixlQUFlLFlBaEJ4QixZQUFZO1FBQ1osVUFBVTtRQUNWLFlBQVksQ0FBQyxVQUFVLENBQTJCO1lBQ2hELGFBQWEsRUFBRTtnQkFDYixrQkFBa0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRTthQUN0RDtZQUNELFdBQVcsRUFBRTtnQkFDWCxzQkFBc0IsRUFBRTtvQkFDdEIsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQztpQkFDeEM7YUFDRjtTQUNGLENBQUM7MkZBS08sZUFBZTtrQkFsQjNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixZQUFZLENBQUMsVUFBVSxDQUEyQjs0QkFDaEQsYUFBYSxFQUFFO2dDQUNiLGtCQUFrQixFQUFFLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFOzZCQUN0RDs0QkFDRCxXQUFXLEVBQUU7Z0NBQ1gsc0JBQXNCLEVBQUU7b0NBQ3RCLEtBQUssRUFBRSxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUM7aUNBQ3hDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQ2xDLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBDb25maWdNb2R1bGUsIEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEdpZ3lhUmFhc0NvbXBvbmVudCB9IGZyb20gJy4vZ2lneWEtcmFhcy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWcoPENtc0NvbmZpZyB8IExheW91dENvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIEdpZ3lhUmFhc0NvbXBvbmVudDogeyBjb21wb25lbnQ6IEdpZ3lhUmFhc0NvbXBvbmVudCB9LFxuICAgICAgfSxcbiAgICAgIGxheW91dFNsb3RzOiB7XG4gICAgICAgIEdpZ3lhTG9naW5QYWdlVGVtcGxhdGU6IHtcbiAgICAgICAgICBzbG90czogWydCb2R5Q29udGVudCcsICdCb3R0b21Db250ZW50J10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtHaWd5YVJhYXNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbR2lneWFSYWFzQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgR2lneWFSYWFzTW9kdWxlIHt9XG4iXX0=