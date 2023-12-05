/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import { ListService } from '../../../shared/list/list.service';
import { UnitChildrenService } from './unit-children.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/current-unit.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../shared/sub-list/sub-list.component";
import * as i4 from "../../../shared/detail/disable-info/disable-info.component";
import * as i5 from "@spartacus/core";
import * as i6 from "@angular/common";
export class UnitChildrenComponent {
    constructor(currentUnitService) {
        this.currentUnitService = currentUnitService;
        this.unit$ = this.currentUnitService
            ? this.currentUnitService.item$
            : of({ active: true });
    }
}
UnitChildrenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenComponent, deps: [{ token: i1.CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitChildrenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitChildrenComponent, selector: "cx-org-unit-children", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitChildrenService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [showHint]=\"true\">\n  <a\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitChildren\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i3.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "component", type: i4.DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-children', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitChildrenService,
                        },
                    ], template: "<cx-org-sub-list [showHint]=\"true\">\n  <a\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitChildren\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jaGlsZHJlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy9jaGlsZHJlbi91bml0LWNoaWxkcmVuLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2NoaWxkcmVuL3VuaXQtY2hpbGRyZW4uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkUsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7O0FBYzlELE1BQU0sT0FBTyxxQkFBcUI7SUFLaEMsWUFBc0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFKNUQsVUFBSyxHQUFvQyxJQUFJLENBQUMsa0JBQWtCO1lBQzlELENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUMvQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFFc0MsQ0FBQzs7a0hBTHJELHFCQUFxQjtzR0FBckIscUJBQXFCLDRGQVByQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLFdBQVc7WUFDcEIsV0FBVyxFQUFFLG1CQUFtQjtTQUNqQztLQUNGLDBCQ3ZCSCw2Y0FvQkE7MkZES2EscUJBQXFCO2tCQVpqQyxTQUFTOytCQUNFLHNCQUFzQixtQkFFZix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQ3ZCO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixXQUFXLEVBQUUsbUJBQW1CO3lCQUNqQztxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEIyQlVuaXQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IEN1cnJlbnRVbml0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2N1cnJlbnQtdW5pdC5zZXJ2aWNlJztcbmltcG9ydCB7IFVuaXRDaGlsZHJlblNlcnZpY2UgfSBmcm9tICcuL3VuaXQtY2hpbGRyZW4uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy11bml0LWNoaWxkcmVuJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VuaXQtY2hpbGRyZW4uY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeyBjbGFzczogJ2NvbnRlbnQtd3JhcHBlcicgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTGlzdFNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogVW5pdENoaWxkcmVuU2VydmljZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0Q2hpbGRyZW5Db21wb25lbnQge1xuICB1bml0JDogT2JzZXJ2YWJsZTxCMkJVbml0IHwgdW5kZWZpbmVkPiA9IHRoaXMuY3VycmVudFVuaXRTZXJ2aWNlXG4gICAgPyB0aGlzLmN1cnJlbnRVbml0U2VydmljZS5pdGVtJFxuICAgIDogb2YoeyBhY3RpdmU6IHRydWUgfSk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGN1cnJlbnRVbml0U2VydmljZTogQ3VycmVudFVuaXRTZXJ2aWNlKSB7fVxufVxuIiwiPGN4LW9yZy1zdWItbGlzdCBbc2hvd0hpbnRdPVwidHJ1ZVwiPlxuICA8YVxuICAgIGFjdGlvbnNcbiAgICBjbGFzcz1cImxpbmtcIlxuICAgIHJvdXRlckxpbms9XCJjcmVhdGVcIlxuICAgIFtjbGFzcy5kaXNhYmxlZF09XCIhKHVuaXQkIHwgYXN5bmMpPy5hY3RpdmVcIlxuICA+XG4gICAge3sgJ29yZ2FuaXphdGlvbi5jcmVhdGUnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9hPlxuICA8Y3gtb3JnLWRpc2FibGUtaW5mb1xuICAgIGluZm9cbiAgICBpMThuUm9vdD1cIm9yZ1VuaXRDaGlsZHJlblwiXG4gICAgW2Rpc3BsYXlJbmZvQ29uZmlnXT1cIntcbiAgICAgIGRpc2FibGVkQ3JlYXRlOiB0cnVlLFxuICAgICAgZGlzYWJsZWRFbmFibGU6IGZhbHNlLFxuICAgICAgZGlzYWJsZWRFZGl0OiBmYWxzZVxuICAgIH1cIlxuICA+XG4gIDwvY3gtb3JnLWRpc2FibGUtaW5mbz5cbjwvY3gtb3JnLXN1Yi1saXN0PlxuIl19