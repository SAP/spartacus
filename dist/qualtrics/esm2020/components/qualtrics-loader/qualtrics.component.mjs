/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, inject, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "./qualtrics-loader.service";
import * as i2 from "./config/qualtrics-config";
/**
 * Adds the Qualtrics deployment script whenever the component is loaded. The
 * deployment script is loaded from the global configuration (`qualtrics.scriptSource`).
 */
export class QualtricsComponent {
    constructor(qualtricsLoader, config) {
        this.qualtricsLoader = qualtricsLoader;
        this.config = config;
        this.logger = inject(LoggerService);
        if (this.config.qualtrics?.scriptSource) {
            this.qualtricsLoader.addScript(this.config.qualtrics.scriptSource);
        }
        else if (isDevMode()) {
            this.logger.warn(`We're unable to add the Qualtrics deployment code as there is no script source defined in config.qualtrics.scriptSource.`);
        }
    }
}
QualtricsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponent, deps: [{ token: i1.QualtricsLoaderService }, { token: i2.QualtricsConfig }], target: i0.ɵɵFactoryTarget.Component });
QualtricsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: QualtricsComponent, selector: "cx-qualtrics", ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-qualtrics',
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: i1.QualtricsLoaderService }, { type: i2.QualtricsConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbHRyaWNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9xdWFsdHJpY3MvY29tcG9uZW50cy9xdWFsdHJpY3MtbG9hZGVyL3F1YWx0cmljcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFHaEQ7OztHQUdHO0FBS0gsTUFBTSxPQUFPLGtCQUFrQjtJQUc3QixZQUNZLGVBQXVDLEVBQ3ZDLE1BQXVCO1FBRHZCLG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUp6QixXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBTXZDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BFO2FBQU0sSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCwwSEFBMEgsQ0FDM0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7K0dBZFUsa0JBQWtCO21HQUFsQixrQkFBa0Isb0RBRm5CLEVBQUU7MkZBRUQsa0JBQWtCO2tCQUo5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsRUFBRTtpQkFDYiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgaW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUXVhbHRyaWNzQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvcXVhbHRyaWNzLWNvbmZpZyc7XG5pbXBvcnQgeyBRdWFsdHJpY3NMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9xdWFsdHJpY3MtbG9hZGVyLnNlcnZpY2UnO1xuLyoqXG4gKiBBZGRzIHRoZSBRdWFsdHJpY3MgZGVwbG95bWVudCBzY3JpcHQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBsb2FkZWQuIFRoZVxuICogZGVwbG95bWVudCBzY3JpcHQgaXMgbG9hZGVkIGZyb20gdGhlIGdsb2JhbCBjb25maWd1cmF0aW9uIChgcXVhbHRyaWNzLnNjcmlwdFNvdXJjZWApLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1xdWFsdHJpY3MnLFxuICB0ZW1wbGF0ZTogJycsXG59KVxuZXhwb3J0IGNsYXNzIFF1YWx0cmljc0NvbXBvbmVudCB7XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHF1YWx0cmljc0xvYWRlcjogUXVhbHRyaWNzTG9hZGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBRdWFsdHJpY3NDb25maWdcbiAgKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnF1YWx0cmljcz8uc2NyaXB0U291cmNlKSB7XG4gICAgICB0aGlzLnF1YWx0cmljc0xvYWRlci5hZGRTY3JpcHQodGhpcy5jb25maWcucXVhbHRyaWNzLnNjcmlwdFNvdXJjZSk7XG4gICAgfSBlbHNlIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgYFdlJ3JlIHVuYWJsZSB0byBhZGQgdGhlIFF1YWx0cmljcyBkZXBsb3ltZW50IGNvZGUgYXMgdGhlcmUgaXMgbm8gc2NyaXB0IHNvdXJjZSBkZWZpbmVkIGluIGNvbmZpZy5xdWFsdHJpY3Muc2NyaXB0U291cmNlLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=