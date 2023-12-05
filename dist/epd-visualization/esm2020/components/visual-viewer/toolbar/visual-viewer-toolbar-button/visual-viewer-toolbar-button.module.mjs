/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spartacus/storefront';
import { VisualViewerToolbarButtonComponent } from './visual-viewer-toolbar-button.component';
import * as i0 from "@angular/core";
export class VisualViewerToolbarButtonModule {
}
VisualViewerToolbarButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualViewerToolbarButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonModule, declarations: [VisualViewerToolbarButtonComponent], imports: [CommonModule, IconModule], exports: [VisualViewerToolbarButtonComponent] });
VisualViewerToolbarButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonModule, imports: [CommonModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule],
                    declarations: [VisualViewerToolbarButtonComponent],
                    exports: [VisualViewerToolbarButtonComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdlci10b29sYmFyLWJ1dHRvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXZpZXdlci90b29sYmFyL3Zpc3VhbC12aWV3ZXItdG9vbGJhci1idXR0b24vdmlzdWFsLXZpZXdlci10b29sYmFyLWJ1dHRvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUFPOUYsTUFBTSxPQUFPLCtCQUErQjs7NEhBQS9CLCtCQUErQjs2SEFBL0IsK0JBQStCLGlCQUgzQixrQ0FBa0MsYUFEdkMsWUFBWSxFQUFFLFVBQVUsYUFFeEIsa0NBQWtDOzZIQUVqQywrQkFBK0IsWUFKaEMsWUFBWSxFQUFFLFVBQVU7MkZBSXZCLCtCQUErQjtrQkFMM0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDO29CQUNuQyxZQUFZLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztvQkFDbEQsT0FBTyxFQUFFLENBQUMsa0NBQWtDLENBQUM7aUJBQzlDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFZpc3VhbFZpZXdlclRvb2xiYXJCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3Zpc3VhbC12aWV3ZXItdG9vbGJhci1idXR0b24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1Zpc3VhbFZpZXdlclRvb2xiYXJCdXR0b25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbVmlzdWFsVmlld2VyVG9vbGJhckJ1dHRvbkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFZpc3VhbFZpZXdlclRvb2xiYXJCdXR0b25Nb2R1bGUge31cbiJdfQ==