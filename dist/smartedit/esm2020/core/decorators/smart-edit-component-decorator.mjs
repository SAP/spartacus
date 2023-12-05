/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ComponentDecorator } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/smart-edit.service";
export class SmartEditComponentDecorator extends ComponentDecorator {
    constructor(smartEditService) {
        super();
        this.smartEditService = smartEditService;
    }
    decorate(element, renderer, component) {
        if (component) {
            this.smartEditService.addSmartEditContract(element, renderer, component.properties);
        }
    }
}
SmartEditComponentDecorator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditComponentDecorator, deps: [{ token: i1.SmartEditService }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditComponentDecorator.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditComponentDecorator, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditComponentDecorator, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SmartEditService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtZWRpdC1jb21wb25lbnQtZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3NtYXJ0ZWRpdC9jb3JlL2RlY29yYXRvcnMvc21hcnQtZWRpdC1jb21wb25lbnQtZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBNEIsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBTS9FLE1BQU0sT0FBTywyQkFBNEIsU0FBUSxrQkFBa0I7SUFDakUsWUFBc0IsZ0JBQWtDO1FBQ3RELEtBQUssRUFBRSxDQUFDO1FBRFkscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUV4RCxDQUFDO0lBRUQsUUFBUSxDQUNOLE9BQWdCLEVBQ2hCLFFBQW1CLEVBQ25CLFNBQW1DO1FBRW5DLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUN4QyxPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsQ0FBQyxVQUFVLENBQ3JCLENBQUM7U0FDSDtJQUNILENBQUM7O3dIQWpCVSwyQkFBMkI7NEhBQTNCLDJCQUEyQixjQUYxQixNQUFNOzJGQUVQLDJCQUEyQjtrQkFIdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudERlY29yYXRvciwgQ29udGVudFNsb3RDb21wb25lbnREYXRhIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFNtYXJ0RWRpdFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zbWFydC1lZGl0LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU21hcnRFZGl0Q29tcG9uZW50RGVjb3JhdG9yIGV4dGVuZHMgQ29tcG9uZW50RGVjb3JhdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNtYXJ0RWRpdFNlcnZpY2U6IFNtYXJ0RWRpdFNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZGVjb3JhdGUoXG4gICAgZWxlbWVudDogRWxlbWVudCxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGNvbXBvbmVudDogQ29udGVudFNsb3RDb21wb25lbnREYXRhXG4gICk6IHZvaWQge1xuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIHRoaXMuc21hcnRFZGl0U2VydmljZS5hZGRTbWFydEVkaXRDb250cmFjdChcbiAgICAgICAgZWxlbWVudCxcbiAgICAgICAgcmVuZGVyZXIsXG4gICAgICAgIGNvbXBvbmVudC5wcm9wZXJ0aWVzXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19