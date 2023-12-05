/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';
import { ThemeService } from './theme.service';
import * as i0 from "@angular/core";
export function initTheme(themeService) {
    const result = (component) => themeService.init(component);
    return result;
}
export class ThemeModule {
}
ThemeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ThemeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ThemeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ThemeModule });
ThemeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ThemeModule, providers: [
        {
            provide: APP_BOOTSTRAP_LISTENER,
            multi: true,
            useFactory: initTheme,
            deps: [ThemeService],
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ThemeModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: APP_BOOTSTRAP_LISTENER,
                            multi: true,
                            useFactory: initTheme,
                            deps: [ThemeService],
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvdGhlbWUvdGhlbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsc0JBQXNCLEVBQWdCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRS9DLE1BQU0sVUFBVSxTQUFTLENBQUMsWUFBMEI7SUFDbEQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxTQUE0QixFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlFLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFZRCxNQUFNLE9BQU8sV0FBVzs7d0dBQVgsV0FBVzt5R0FBWCxXQUFXO3lHQUFYLFdBQVcsYUFUWDtRQUNUO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQztTQUNyQjtLQUNGOzJGQUVVLFdBQVc7a0JBVnZCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxzQkFBc0I7NEJBQy9CLEtBQUssRUFBRSxJQUFJOzRCQUNYLFVBQVUsRUFBRSxTQUFTOzRCQUNyQixJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUM7eUJBQ3JCO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQVBQX0JPT1RTVFJBUF9MSVNURU5FUiwgQ29tcG9uZW50UmVmLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVTZXJ2aWNlIH0gZnJvbSAnLi90aGVtZS5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUaGVtZSh0aGVtZVNlcnZpY2U6IFRoZW1lU2VydmljZSkge1xuICBjb25zdCByZXN1bHQgPSAoY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PikgPT4gdGhlbWVTZXJ2aWNlLmluaXQoY29tcG9uZW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQVBQX0JPT1RTVFJBUF9MSVNURU5FUixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgdXNlRmFjdG9yeTogaW5pdFRoZW1lLFxuICAgICAgZGVwczogW1RoZW1lU2VydmljZV0sXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVGhlbWVNb2R1bGUge31cbiJdfQ==