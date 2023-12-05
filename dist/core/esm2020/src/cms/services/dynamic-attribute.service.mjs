/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { getLastValueSync } from '../../util/rxjs/get-last-value-sync';
import { ComponentDecorator } from '../decorators/component-decorator';
import { SlotDecorator } from '../decorators/slot-decorator';
import * as i0 from "@angular/core";
import * as i1 from "../../lazy-loading/unified-injector";
/**
 * Service that used to add dynamic attributes to CMS component
 * and slot elements.
 */
export class DynamicAttributeService {
    constructor(unifiedInjector) {
        this.unifiedInjector = unifiedInjector;
        this.componentDecorators$ = this.unifiedInjector
            .getMulti(ComponentDecorator)
            .pipe(shareReplay(1));
        this.slotDecorators$ = this.unifiedInjector
            .getMulti(SlotDecorator)
            .pipe(shareReplay(1));
    }
    /**
     * Add dynamic attributes to CMS component element
     * @param element: CMS component element
     * @param renderer
     * @param componentData: component data
     */
    addAttributesToComponent(element, renderer, componentData) {
        (getLastValueSync(this.componentDecorators$) || []).forEach((decorator) => decorator.decorate(element, renderer, componentData));
    }
    /**
     * Add dynamic attributes to CMS slot element
     * @param element: CMS slot element
     * @param renderer
     * @param slotData: slot data
     */
    addAttributesToSlot(element, renderer, slotData) {
        (getLastValueSync(this.slotDecorators$) || []).forEach((decorator) => decorator.decorate(element, renderer, slotData));
    }
}
DynamicAttributeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicAttributeService, deps: [{ token: i1.UnifiedInjector }], target: i0.ɵɵFactoryTarget.Injectable });
DynamicAttributeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicAttributeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicAttributeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UnifiedInjector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1hdHRyaWJ1dGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2Ntcy9zZXJ2aWNlcy9keW5hbWljLWF0dHJpYnV0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7OztBQUk3RDs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sdUJBQXVCO0lBU2xDLFlBQXNCLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVI5Qyx5QkFBb0IsR0FBRyxJQUFJLENBQUMsZUFBZTthQUNoRCxRQUFRLENBQUMsa0JBQWtCLENBQUM7YUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhCLG9CQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWU7YUFDM0MsUUFBUSxDQUFDLGFBQWEsQ0FBQzthQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaUMsQ0FBQztJQUUxRDs7Ozs7T0FLRztJQUNILHdCQUF3QixDQUN0QixPQUFnQixFQUNoQixRQUFtQixFQUNuQixhQUF3QztRQUV4QyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ3hFLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FDckQsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILG1CQUFtQixDQUNqQixPQUFnQixFQUNoQixRQUFtQixFQUNuQixRQUEwQjtRQUUxQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUNuRSxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQ2hELENBQUM7SUFDSixDQUFDOztvSEF6Q1UsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVuaWZpZWRJbmplY3RvciB9IGZyb20gJy4uLy4uL2xhenktbG9hZGluZy91bmlmaWVkLWluamVjdG9yJztcbmltcG9ydCB7IGdldExhc3RWYWx1ZVN5bmMgfSBmcm9tICcuLi8uLi91dGlsL3J4anMvZ2V0LWxhc3QtdmFsdWUtc3luYyc7XG5pbXBvcnQgeyBDb21wb25lbnREZWNvcmF0b3IgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2NvbXBvbmVudC1kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2xvdERlY29yYXRvciB9IGZyb20gJy4uL2RlY29yYXRvcnMvc2xvdC1kZWNvcmF0b3InO1xuaW1wb3J0IHsgQ29udGVudFNsb3RDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vbW9kZWwvY29udGVudC1zbG90LWNvbXBvbmVudC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IENvbnRlbnRTbG90RGF0YSB9IGZyb20gJy4uL21vZGVsL2NvbnRlbnQtc2xvdC1kYXRhLm1vZGVsJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRoYXQgdXNlZCB0byBhZGQgZHluYW1pYyBhdHRyaWJ1dGVzIHRvIENNUyBjb21wb25lbnRcbiAqIGFuZCBzbG90IGVsZW1lbnRzLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0F0dHJpYnV0ZVNlcnZpY2Uge1xuICBwcml2YXRlIGNvbXBvbmVudERlY29yYXRvcnMkID0gdGhpcy51bmlmaWVkSW5qZWN0b3JcbiAgICAuZ2V0TXVsdGkoQ29tcG9uZW50RGVjb3JhdG9yKVxuICAgIC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcblxuICBwcml2YXRlIHNsb3REZWNvcmF0b3JzJCA9IHRoaXMudW5pZmllZEluamVjdG9yXG4gICAgLmdldE11bHRpKFNsb3REZWNvcmF0b3IpXG4gICAgLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB1bmlmaWVkSW5qZWN0b3I6IFVuaWZpZWRJbmplY3Rvcikge31cblxuICAvKipcbiAgICogQWRkIGR5bmFtaWMgYXR0cmlidXRlcyB0byBDTVMgY29tcG9uZW50IGVsZW1lbnRcbiAgICogQHBhcmFtIGVsZW1lbnQ6IENNUyBjb21wb25lbnQgZWxlbWVudFxuICAgKiBAcGFyYW0gcmVuZGVyZXJcbiAgICogQHBhcmFtIGNvbXBvbmVudERhdGE6IGNvbXBvbmVudCBkYXRhXG4gICAqL1xuICBhZGRBdHRyaWJ1dGVzVG9Db21wb25lbnQoXG4gICAgZWxlbWVudDogRWxlbWVudCxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGNvbXBvbmVudERhdGE/OiBDb250ZW50U2xvdENvbXBvbmVudERhdGFcbiAgKSB7XG4gICAgKGdldExhc3RWYWx1ZVN5bmModGhpcy5jb21wb25lbnREZWNvcmF0b3JzJCkgfHwgW10pLmZvckVhY2goKGRlY29yYXRvcikgPT5cbiAgICAgIGRlY29yYXRvci5kZWNvcmF0ZShlbGVtZW50LCByZW5kZXJlciwgY29tcG9uZW50RGF0YSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBkeW5hbWljIGF0dHJpYnV0ZXMgdG8gQ01TIHNsb3QgZWxlbWVudFxuICAgKiBAcGFyYW0gZWxlbWVudDogQ01TIHNsb3QgZWxlbWVudFxuICAgKiBAcGFyYW0gcmVuZGVyZXJcbiAgICogQHBhcmFtIHNsb3REYXRhOiBzbG90IGRhdGFcbiAgICovXG4gIGFkZEF0dHJpYnV0ZXNUb1Nsb3QoXG4gICAgZWxlbWVudDogRWxlbWVudCxcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHNsb3REYXRhPzogQ29udGVudFNsb3REYXRhXG4gICkge1xuICAgIChnZXRMYXN0VmFsdWVTeW5jKHRoaXMuc2xvdERlY29yYXRvcnMkKSB8fCBbXSkuZm9yRWFjaCgoZGVjb3JhdG9yKSA9PlxuICAgICAgZGVjb3JhdG9yLmRlY29yYXRlKGVsZW1lbnQsIHJlbmRlcmVyLCBzbG90RGF0YSlcbiAgICApO1xuICB9XG59XG4iXX0=