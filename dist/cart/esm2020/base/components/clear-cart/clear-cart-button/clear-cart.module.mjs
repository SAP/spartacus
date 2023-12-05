/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ClearCartComponent } from './clear-cart.component';
import { ClearCartDialogModule } from '../clear-cart-dialog/clear-cart-dialog.module';
import { defaultClearCartLayoutConfig } from '../clear-cart-dialog/default-clear-cart-layout.config';
import * as i0 from "@angular/core";
export class ClearCartModule {
}
ClearCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ClearCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ClearCartModule, declarations: [ClearCartComponent], imports: [CommonModule, I18nModule, ClearCartDialogModule], exports: [ClearCartComponent] });
ClearCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ClearCartComponent: {
                    component: ClearCartComponent,
                },
            },
        }),
        provideDefaultConfig(defaultClearCartLayoutConfig),
    ], imports: [CommonModule, I18nModule, ClearCartDialogModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ClearCartComponent],
                    exports: [ClearCartComponent],
                    imports: [CommonModule, I18nModule, ClearCartDialogModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ClearCartComponent: {
                                    component: ClearCartComponent,
                                },
                            },
                        }),
                        provideDefaultConfig(defaultClearCartLayoutConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXItY2FydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvbXBvbmVudHMvY2xlYXItY2FydC9jbGVhci1jYXJ0LWJ1dHRvbi9jbGVhci1jYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDOztBQWlCckcsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFkWCxrQkFBa0IsYUFFdkIsWUFBWSxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsYUFEL0Msa0JBQWtCOzZHQWFqQixlQUFlLGFBWGY7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isa0JBQWtCLEVBQUU7b0JBQ2xCLFNBQVMsRUFBRSxrQkFBa0I7aUJBQzlCO2FBQ0Y7U0FDRixDQUFDO1FBQ0Ysb0JBQW9CLENBQUMsNEJBQTRCLENBQUM7S0FDbkQsWUFWUyxZQUFZLEVBQUUsVUFBVSxFQUFFLHFCQUFxQjsyRkFZOUMsZUFBZTtrQkFmM0IsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDbEMsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQzdCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUscUJBQXFCLENBQUM7b0JBQzFELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLGtCQUFrQixFQUFFO29DQUNsQixTQUFTLEVBQUUsa0JBQWtCO2lDQUM5Qjs2QkFDRjt5QkFDRixDQUFDO3dCQUNGLG9CQUFvQixDQUFDLDRCQUE0QixDQUFDO3FCQUNuRDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDbGVhckNhcnRDb21wb25lbnQgfSBmcm9tICcuL2NsZWFyLWNhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IENsZWFyQ2FydERpYWxvZ01vZHVsZSB9IGZyb20gJy4uL2NsZWFyLWNhcnQtZGlhbG9nL2NsZWFyLWNhcnQtZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBkZWZhdWx0Q2xlYXJDYXJ0TGF5b3V0Q29uZmlnIH0gZnJvbSAnLi4vY2xlYXItY2FydC1kaWFsb2cvZGVmYXVsdC1jbGVhci1jYXJ0LWxheW91dC5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDbGVhckNhcnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2xlYXJDYXJ0Q29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgQ2xlYXJDYXJ0RGlhbG9nTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENsZWFyQ2FydENvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ2xlYXJDYXJ0Q29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q2xlYXJDYXJ0TGF5b3V0Q29uZmlnKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xlYXJDYXJ0TW9kdWxlIHt9XG4iXX0=