/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { ComponentHandler } from './handlers/component-handler';
import { DefaultComponentHandler } from './handlers/default-component.handler';
import { LazyComponentHandler } from './handlers/lazy-component.handler';
import { InnerComponentsHostDirective } from './inner-components-host.directive';
import * as i0 from "@angular/core";
export class PageComponentModule {
    static forRoot() {
        return {
            ngModule: PageComponentModule,
            providers: [
                {
                    provide: ComponentHandler,
                    useExisting: DefaultComponentHandler,
                    multi: true,
                },
                {
                    provide: ComponentHandler,
                    useExisting: LazyComponentHandler,
                    multi: true,
                },
            ],
        };
    }
}
PageComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PageComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PageComponentModule, declarations: [ComponentWrapperDirective, InnerComponentsHostDirective], imports: [CommonModule], exports: [ComponentWrapperDirective, InnerComponentsHostDirective] });
PageComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageComponentModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [ComponentWrapperDirective, InnerComponentsHostDirective],
                    exports: [ComponentWrapperDirective, InnerComponentsHostDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1jb21wb25lbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtc3RydWN0dXJlL3BhZ2UvY29tcG9uZW50L3BhZ2UtY29tcG9uZW50Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztBQU9qRixNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLFdBQVcsRUFBRSx1QkFBdUI7b0JBQ3BDLEtBQUssRUFBRSxJQUFJO2lCQUNaO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLFdBQVcsRUFBRSxvQkFBb0I7b0JBQ2pDLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0hBakJVLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGlCQUhmLHlCQUF5QixFQUFFLDRCQUE0QixhQUQ1RCxZQUFZLGFBRVoseUJBQXlCLEVBQUUsNEJBQTRCO2lIQUV0RCxtQkFBbUIsWUFKcEIsWUFBWTsyRkFJWCxtQkFBbUI7a0JBTC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSw0QkFBNEIsQ0FBQztvQkFDdkUsT0FBTyxFQUFFLENBQUMseUJBQXlCLEVBQUUsNEJBQTRCLENBQUM7aUJBQ25FIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRXcmFwcGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnQtd3JhcHBlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50SGFuZGxlciB9IGZyb20gJy4vaGFuZGxlcnMvY29tcG9uZW50LWhhbmRsZXInO1xuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudEhhbmRsZXIgfSBmcm9tICcuL2hhbmRsZXJzL2RlZmF1bHQtY29tcG9uZW50LmhhbmRsZXInO1xuaW1wb3J0IHsgTGF6eUNvbXBvbmVudEhhbmRsZXIgfSBmcm9tICcuL2hhbmRsZXJzL2xhenktY29tcG9uZW50LmhhbmRsZXInO1xuaW1wb3J0IHsgSW5uZXJDb21wb25lbnRzSG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vaW5uZXItY29tcG9uZW50cy1ob3N0LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDb21wb25lbnRXcmFwcGVyRGlyZWN0aXZlLCBJbm5lckNvbXBvbmVudHNIb3N0RGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0NvbXBvbmVudFdyYXBwZXJEaXJlY3RpdmUsIElubmVyQ29tcG9uZW50c0hvc3REaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlQ29tcG9uZW50TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxQYWdlQ29tcG9uZW50TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBQYWdlQ29tcG9uZW50TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDb21wb25lbnRIYW5kbGVyLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOiBEZWZhdWx0Q29tcG9uZW50SGFuZGxlcixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENvbXBvbmVudEhhbmRsZXIsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6IExhenlDb21wb25lbnRIYW5kbGVyLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=