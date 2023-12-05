/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ORDER_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class ReorderOrderFacade {
}
ReorderOrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ReorderOrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: ReorderOrderFacade,
        feature: ORDER_CORE_FEATURE,
        methods: ['reorder'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: ReorderOrderFacade,
                        feature: ORDER_CORE_FEATURE,
                        methods: ['reorder'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlci1vcmRlci5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvcm9vdC9mYWNhZGUvcmVvcmRlci1vcmRlci5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQVdyRCxNQUFNLE9BQWdCLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBUjFCLE1BQU0sY0FDTixHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7UUFDWixNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO0tBQ3JCLENBQUM7MkZBRWdCLGtCQUFrQjtrQkFUdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLG9CQUFvQjt3QkFDMUIsT0FBTyxFQUFFLGtCQUFrQjt3QkFDM0IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO3FCQUNyQixDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydE1vZGlmaWNhdGlvbkxpc3QgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT1JERVJfQ09SRV9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IFJlb3JkZXJPcmRlckZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IE9SREVSX0NPUkVfRkVBVFVSRSxcbiAgICAgIG1ldGhvZHM6IFsncmVvcmRlciddLFxuICAgIH0pLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW9yZGVyT3JkZXJGYWNhZGUge1xuICAvKipcbiAgICogQ3JlYXRlIGNhcnQgZnJvbSBhbiBleGlzdGluZyBvcmRlclxuICAgKi9cbiAgYWJzdHJhY3QgcmVvcmRlcihvcmRlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENhcnRNb2RpZmljYXRpb25MaXN0Pjtcbn1cbiJdfQ==