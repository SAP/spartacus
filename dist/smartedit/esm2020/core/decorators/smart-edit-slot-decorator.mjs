/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { SlotDecorator } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/smart-edit.service";
export class SmartEditSlotDecorator extends SlotDecorator {
    constructor(smartEditService) {
        super();
        this.smartEditService = smartEditService;
    }
    decorate(element, renderer, slot) {
        if (slot) {
            this.smartEditService.addSmartEditContract(element, renderer, slot.properties);
        }
    }
}
SmartEditSlotDecorator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditSlotDecorator, deps: [{ token: i1.SmartEditService }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditSlotDecorator.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditSlotDecorator, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditSlotDecorator, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SmartEditService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtZWRpdC1zbG90LWRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9zbWFydGVkaXQvY29yZS9kZWNvcmF0b3JzL3NtYXJ0LWVkaXQtc2xvdC1kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFtQixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBTWpFLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxhQUFhO0lBQ3ZELFlBQXNCLGdCQUFrQztRQUN0RCxLQUFLLEVBQUUsQ0FBQztRQURZLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFFeEQsQ0FBQztJQUVELFFBQVEsQ0FBQyxPQUFnQixFQUFFLFFBQW1CLEVBQUUsSUFBcUI7UUFDbkUsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQ3hDLE9BQU8sRUFDUCxRQUFRLEVBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FDaEIsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7bUhBYlUsc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FGckIsTUFBTTsyRkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250ZW50U2xvdERhdGEsIFNsb3REZWNvcmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU21hcnRFZGl0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NtYXJ0LWVkaXQuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTbWFydEVkaXRTbG90RGVjb3JhdG9yIGV4dGVuZHMgU2xvdERlY29yYXRvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzbWFydEVkaXRTZXJ2aWNlOiBTbWFydEVkaXRTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGRlY29yYXRlKGVsZW1lbnQ6IEVsZW1lbnQsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHNsb3Q6IENvbnRlbnRTbG90RGF0YSk6IHZvaWQge1xuICAgIGlmIChzbG90KSB7XG4gICAgICB0aGlzLnNtYXJ0RWRpdFNlcnZpY2UuYWRkU21hcnRFZGl0Q29udHJhY3QoXG4gICAgICAgIGVsZW1lbnQsXG4gICAgICAgIHJlbmRlcmVyLFxuICAgICAgICBzbG90LnByb3BlcnRpZXNcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=