/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Input, NgModule } from '@angular/core';
import * as i0 from "@angular/core";
export class MockKeyboardFocusDirective {
    constructor() {
        this.config = {};
    }
}
MockKeyboardFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MockKeyboardFocusDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MockKeyboardFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: MockKeyboardFocusDirective, selector: "[cxFocus]", inputs: { config: ["cxFocus", "config"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MockKeyboardFocusDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxFocus]',
                }]
        }], propDecorators: { config: [{
                type: Input,
                args: ['cxFocus']
            }] } });
export class KeyboardFocusTestingModule {
}
KeyboardFocusTestingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: KeyboardFocusTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
KeyboardFocusTestingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: KeyboardFocusTestingModule, declarations: [MockKeyboardFocusDirective], exports: [MockKeyboardFocusDirective] });
KeyboardFocusTestingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: KeyboardFocusTestingModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: KeyboardFocusTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MockKeyboardFocusDirective],
                    exports: [MockKeyboardFocusDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdGVzdGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2ZvY3VzLXRlc3RpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNELE1BQU0sT0FBTywwQkFBMEI7SUFIdkM7UUFJb0IsV0FBTSxHQUFnQixFQUFFLENBQUM7S0FDNUM7O3VIQUZZLDBCQUEwQjsyR0FBMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBSHRDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCOzhCQUVtQixNQUFNO3NCQUF2QixLQUFLO3VCQUFDLFNBQVM7O0FBT2xCLE1BQU0sT0FBTywwQkFBMEI7O3VIQUExQiwwQkFBMEI7d0hBQTFCLDBCQUEwQixpQkFSMUIsMEJBQTBCLGFBQTFCLDBCQUEwQjt3SEFRMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBSnRDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQzFDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c0NvbmZpZyB9IGZyb20gJy4va2V5Ym9hcmQtZm9jdXMubW9kZWwnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY3hGb2N1c10nLFxufSlcbmV4cG9ydCBjbGFzcyBNb2NrS2V5Ym9hcmRGb2N1c0RpcmVjdGl2ZSB7XG4gIEBJbnB1dCgnY3hGb2N1cycpIGNvbmZpZzogRm9jdXNDb25maWcgPSB7fTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTW9ja0tleWJvYXJkRm9jdXNEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTW9ja0tleWJvYXJkRm9jdXNEaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEZvY3VzVGVzdGluZ01vZHVsZSB7fVxuIl19