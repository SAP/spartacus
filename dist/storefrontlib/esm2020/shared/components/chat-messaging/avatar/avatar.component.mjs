/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Input } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../../cms-components/misc/icon/icon.component";
export class AvatarComponent {
    constructor() {
        this.iconTypes = ICON_TYPE;
    }
    getInitials(author) {
        return author
            .split(' ')
            .map((string) => string[0])
            .join('');
    }
}
AvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AvatarComponent, selector: "cx-avatar", inputs: { message: "message" }, ngImport: i0, template: "<div\n  *ngIf=\"message\"\n  class=\"cx-avatar\"\n  [ngClass]=\"{ 'right-align': message.rightAlign }\"\n>\n  <span *ngIf=\"!message.rightAlign && message?.author\">\n    {{ getInitials(message?.author || '') }}\n  </span>\n\n  <cx-icon\n    *ngIf=\"!message.rightAlign && !message?.author\"\n    [type]=\"iconTypes.USER\"\n  ></cx-icon>\n\n  <cx-icon *ngIf=\"message.rightAlign\" [type]=\"iconTypes.HEADSET\"></cx-icon>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-avatar', template: "<div\n  *ngIf=\"message\"\n  class=\"cx-avatar\"\n  [ngClass]=\"{ 'right-align': message.rightAlign }\"\n>\n  <span *ngIf=\"!message.rightAlign && message?.author\">\n    {{ getInitials(message?.author || '') }}\n  </span>\n\n  <cx-icon\n    *ngIf=\"!message.rightAlign && !message?.author\"\n    [type]=\"iconTypes.USER\"\n  ></cx-icon>\n\n  <cx-icon *ngIf=\"message.rightAlign\" [type]=\"iconTypes.HEADSET\"></cx-icon>\n</div>\n" }]
        }], propDecorators: { message: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvY2hhdC1tZXNzYWdpbmcvYXZhdGFyL2F2YXRhci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL2NoYXQtbWVzc2FnaW5nL2F2YXRhci9hdmF0YXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7OztBQU81RSxNQUFNLE9BQU8sZUFBZTtJQUo1QjtRQU1FLGNBQVMsR0FBRyxTQUFTLENBQUM7S0FRdkI7SUFOQyxXQUFXLENBQUMsTUFBYztRQUN4QixPQUFPLE1BQU07YUFDVixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsQ0FBQzs7NEdBVFUsZUFBZTtnR0FBZixlQUFlLGlGQ2Q1QixnYkFnQkE7MkZERmEsZUFBZTtrQkFKM0IsU0FBUzsrQkFDRSxXQUFXOzhCQUlaLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJy4uLy4uLy4uLy4uL2Ntcy1jb21wb25lbnRzL21pc2MvaWNvbi9pY29uLm1vZGVsJztcbmltcG9ydCB7IE1lc3NhZ2VFdmVudCB9IGZyb20gJy4uL21lc3NhZ2luZy9tZXNzYWdpbmcubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1hdmF0YXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYXZhdGFyLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbWVzc2FnZTogTWVzc2FnZUV2ZW50O1xuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG5cbiAgZ2V0SW5pdGlhbHMoYXV0aG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBhdXRob3JcbiAgICAgIC5zcGxpdCgnICcpXG4gICAgICAubWFwKChzdHJpbmcpID0+IHN0cmluZ1swXSlcbiAgICAgIC5qb2luKCcnKTtcbiAgfVxufVxuIiwiPGRpdlxuICAqbmdJZj1cIm1lc3NhZ2VcIlxuICBjbGFzcz1cImN4LWF2YXRhclwiXG4gIFtuZ0NsYXNzXT1cInsgJ3JpZ2h0LWFsaWduJzogbWVzc2FnZS5yaWdodEFsaWduIH1cIlxuPlxuICA8c3BhbiAqbmdJZj1cIiFtZXNzYWdlLnJpZ2h0QWxpZ24gJiYgbWVzc2FnZT8uYXV0aG9yXCI+XG4gICAge3sgZ2V0SW5pdGlhbHMobWVzc2FnZT8uYXV0aG9yIHx8ICcnKSB9fVxuICA8L3NwYW4+XG5cbiAgPGN4LWljb25cbiAgICAqbmdJZj1cIiFtZXNzYWdlLnJpZ2h0QWxpZ24gJiYgIW1lc3NhZ2U/LmF1dGhvclwiXG4gICAgW3R5cGVdPVwiaWNvblR5cGVzLlVTRVJcIlxuICA+PC9jeC1pY29uPlxuXG4gIDxjeC1pY29uICpuZ0lmPVwibWVzc2FnZS5yaWdodEFsaWduXCIgW3R5cGVdPVwiaWNvblR5cGVzLkhFQURTRVRcIj48L2N4LWljb24+XG48L2Rpdj5cbiJdfQ==