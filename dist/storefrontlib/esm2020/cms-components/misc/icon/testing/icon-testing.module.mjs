/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Input, NgModule } from '@angular/core';
import { IconLoaderService } from '../icon-loader.service';
import * as i0 from "@angular/core";
// PRIVATE TESTING UTIL
export class MockIconComponent {
}
MockIconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MockIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MockIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MockIconComponent, selector: "cx-icon,[cxIcon]", inputs: { cxIcon: "cxIcon", type: "type" }, ngImport: i0, template: `{{ type || cxIcon }}`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MockIconComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-icon,[cxIcon]',
                    template: `{{ type || cxIcon }}`,
                }]
        }], propDecorators: { cxIcon: [{
                type: Input
            }], type: [{
                type: Input
            }] } });
const mockComponents = [MockIconComponent];
export class MockIconLoaderService {
    getHtml() {
        // Intentional empty method
    }
    getStyleClasses() {
        // Intentional empty method
    }
    addStyleClasses() {
        // Intentional empty method
    }
    addLinkResource() {
        // Intentional empty method
    }
}
export class IconTestingModule {
}
IconTestingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
IconTestingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: IconTestingModule, declarations: [MockIconComponent], exports: [MockIconComponent] });
IconTestingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconTestingModule, providers: [
        {
            provide: IconLoaderService,
            useClass: MockIconLoaderService,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IconTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: mockComponents,
                    exports: mockComponents,
                    providers: [
                        {
                            provide: IconLoaderService,
                            useClass: MockIconLoaderService,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi10ZXN0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL3Rlc3RpbmcvaWNvbi10ZXN0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQUUzRCx1QkFBdUI7QUFLdkIsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjtrR0FBakIsaUJBQWlCLG9HQUZsQixzQkFBc0I7MkZBRXJCLGlCQUFpQjtrQkFKN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs4QkFFVSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLOztBQUdSLE1BQU0sY0FBYyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUzQyxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLE9BQU87UUFDTCwyQkFBMkI7SUFDN0IsQ0FBQztJQUNELGVBQWU7UUFDYiwyQkFBMkI7SUFDN0IsQ0FBQztJQUNELGVBQWU7UUFDYiwyQkFBMkI7SUFDN0IsQ0FBQztJQUNELGVBQWU7UUFDYiwyQkFBMkI7SUFDN0IsQ0FBQztDQUNGO0FBWUQsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQWhDakIsaUJBQWlCLGFBQWpCLGlCQUFpQjsrR0FnQ2pCLGlCQUFpQixhQVBqQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixRQUFRLEVBQUUscUJBQXFCO1NBQ2hDO0tBQ0Y7MkZBRVUsaUJBQWlCO2tCQVY3QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxjQUFjO29CQUM1QixPQUFPLEVBQUUsY0FBYztvQkFDdkIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFFBQVEsRUFBRSxxQkFBcUI7eUJBQ2hDO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25Mb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vaWNvbi1sb2FkZXIuc2VydmljZSc7XG5cbi8vIFBSSVZBVEUgVEVTVElORyBVVElMXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1pY29uLFtjeEljb25dJyxcbiAgdGVtcGxhdGU6IGB7eyB0eXBlIHx8IGN4SWNvbiB9fWAsXG59KVxuZXhwb3J0IGNsYXNzIE1vY2tJY29uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY3hJY29uOiBhbnk7XG4gIEBJbnB1dCgpIHR5cGU6IGFueTtcbn1cblxuY29uc3QgbW9ja0NvbXBvbmVudHMgPSBbTW9ja0ljb25Db21wb25lbnRdO1xuXG5leHBvcnQgY2xhc3MgTW9ja0ljb25Mb2FkZXJTZXJ2aWNlIHtcbiAgZ2V0SHRtbCgpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBtZXRob2RcbiAgfVxuICBnZXRTdHlsZUNsYXNzZXMoKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgbWV0aG9kXG4gIH1cbiAgYWRkU3R5bGVDbGFzc2VzKCkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IG1ldGhvZFxuICB9XG4gIGFkZExpbmtSZXNvdXJjZSgpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBtZXRob2RcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IG1vY2tDb21wb25lbnRzLFxuICBleHBvcnRzOiBtb2NrQ29tcG9uZW50cyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogSWNvbkxvYWRlclNlcnZpY2UsXG4gICAgICB1c2VDbGFzczogTW9ja0ljb25Mb2FkZXJTZXJ2aWNlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEljb25UZXN0aW5nTW9kdWxlIHt9XG4iXX0=