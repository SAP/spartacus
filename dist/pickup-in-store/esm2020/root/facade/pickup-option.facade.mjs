/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class PickupOptionFacade {
}
PickupOptionFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PickupOptionFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: PickupOptionFacade,
        feature: PICKUP_IN_STORE_CORE_FEATURE,
        methods: [
            'setPageContext',
            'getPageContext',
            'setPickupOption',
            'getPickupOption',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: PickupOptionFacade,
                        feature: PICKUP_IN_STORE_CORE_FEATURE,
                        methods: [
                            'setPageContext',
                            'getPageContext',
                            'setPickupOption',
                            'getPickupOption',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLW9wdGlvbi5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL3Jvb3QvZmFjYWRlL3BpY2t1cC1vcHRpb24uZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFrQi9ELE1BQU0sT0FBZ0Isa0JBQWtCOzsrR0FBbEIsa0JBQWtCO21IQUFsQixrQkFBa0IsY0FkMUIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxPQUFPLEVBQUU7WUFDUCxnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGlCQUFpQjtZQUNqQixpQkFBaUI7U0FDbEI7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7MkZBRWdCLGtCQUFrQjtrQkFmdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLG9CQUFvQjt3QkFDMUIsT0FBTyxFQUFFLDRCQUE0Qjt3QkFDckMsT0FBTyxFQUFFOzRCQUNQLGdCQUFnQjs0QkFDaEIsZ0JBQWdCOzRCQUNoQixpQkFBaUI7NEJBQ2pCLGlCQUFpQjt5QkFDbEI7d0JBQ0QsS0FBSyxFQUFFLElBQUk7cUJBQ1osQ0FBQztpQkFDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUElDS1VQX0lOX1NUT1JFX0NPUkVfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBQaWNrdXBPcHRpb24gfSBmcm9tICcuLi9tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PlxuICAgIGZhY2FkZUZhY3Rvcnkoe1xuICAgICAgZmFjYWRlOiBQaWNrdXBPcHRpb25GYWNhZGUsXG4gICAgICBmZWF0dXJlOiBQSUNLVVBfSU5fU1RPUkVfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogW1xuICAgICAgICAnc2V0UGFnZUNvbnRleHQnLFxuICAgICAgICAnZ2V0UGFnZUNvbnRleHQnLFxuICAgICAgICAnc2V0UGlja3VwT3B0aW9uJyxcbiAgICAgICAgJ2dldFBpY2t1cE9wdGlvbicsXG4gICAgICBdLFxuICAgICAgYXN5bmM6IHRydWUsXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBpY2t1cE9wdGlvbkZhY2FkZSB7XG4gIGFic3RyYWN0IHNldFBhZ2VDb250ZXh0KHBhZ2VDb250ZXh0OiBzdHJpbmcpOiB2b2lkO1xuICBhYnN0cmFjdCBnZXRQYWdlQ29udGV4dCgpOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIGFic3RyYWN0IHNldFBpY2t1cE9wdGlvbihcbiAgICBlbnRyeU51bWJlcjogbnVtYmVyLFxuICAgIHBpY2t1cE9wdGlvbjogUGlja3VwT3B0aW9uXG4gICk6IHZvaWQ7XG4gIGFic3RyYWN0IGdldFBpY2t1cE9wdGlvbihcbiAgICBlbnRyeU51bWJlcjogbnVtYmVyXG4gICk6IE9ic2VydmFibGU8UGlja3VwT3B0aW9uIHwgdW5kZWZpbmVkPjtcbn1cbiJdfQ==