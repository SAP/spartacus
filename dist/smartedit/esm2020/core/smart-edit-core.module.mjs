/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { smartEditDecorators } from './decorators/index';
import * as i0 from "@angular/core";
import * as i1 from "./services/smart-edit.service";
export class SmartEditCoreModule {
    constructor(smartEditService) {
        this.smartEditService = smartEditService;
        this.smartEditService.processCmsPage();
    }
}
SmartEditCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditCoreModule, deps: [{ token: i1.SmartEditService }], target: i0.ɵɵFactoryTarget.NgModule });
SmartEditCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SmartEditCoreModule });
SmartEditCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditCoreModule, providers: [...smartEditDecorators] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [...smartEditDecorators],
                }]
        }], ctorParameters: function () { return [{ type: i1.SmartEditService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtZWRpdC1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9zbWFydGVkaXQvY29yZS9zbWFydC1lZGl0LWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7QUFNekQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNwRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Z0hBSFUsbUJBQW1CO2lIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQixhQUZuQixDQUFDLEdBQUcsbUJBQW1CLENBQUM7MkZBRXhCLG1CQUFtQjtrQkFIL0IsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzbWFydEVkaXREZWNvcmF0b3JzIH0gZnJvbSAnLi9kZWNvcmF0b3JzL2luZGV4JztcbmltcG9ydCB7IFNtYXJ0RWRpdFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3NtYXJ0LWVkaXQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogWy4uLnNtYXJ0RWRpdERlY29yYXRvcnNdLFxufSlcbmV4cG9ydCBjbGFzcyBTbWFydEVkaXRDb3JlTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzbWFydEVkaXRTZXJ2aWNlOiBTbWFydEVkaXRTZXJ2aWNlKSB7XG4gICAgdGhpcy5zbWFydEVkaXRTZXJ2aWNlLnByb2Nlc3NDbXNQYWdlKCk7XG4gIH1cbn1cbiJdfQ==