/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CDC_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class CdcAuthFacade {
}
CdcAuthFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAuthFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CdcAuthFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAuthFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CdcAuthFacade,
        feature: CDC_CORE_FEATURE,
        methods: ['loginWithCustomCdcFlow', 'loginWithToken'],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcAuthFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CdcAuthFacade,
                        feature: CDC_CORE_FEATURE,
                        methods: ['loginWithCustomCdcFlow', 'loginWithToken'],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWF1dGguZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvcm9vdC9mYWNhZGUvY2RjLWF1dGguZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFZbkQsTUFBTSxPQUFnQixhQUFhOzswR0FBYixhQUFhOzhHQUFiLGFBQWEsY0FUckIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsT0FBTyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsZ0JBQWdCLENBQUM7UUFDckQsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDOzJGQUVnQixhQUFhO2tCQVZsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sZUFBZTt3QkFDckIsT0FBTyxFQUFFLGdCQUFnQjt3QkFDekIsT0FBTyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsZ0JBQWdCLENBQUM7d0JBQ3JELEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoVG9rZW4sIGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ0RDX0NPUkVfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PlxuICAgIGZhY2FkZUZhY3Rvcnkoe1xuICAgICAgZmFjYWRlOiBDZGNBdXRoRmFjYWRlLFxuICAgICAgZmVhdHVyZTogQ0RDX0NPUkVfRkVBVFVSRSxcbiAgICAgIG1ldGhvZHM6IFsnbG9naW5XaXRoQ3VzdG9tQ2RjRmxvdycsICdsb2dpbldpdGhUb2tlbiddLFxuICAgICAgYXN5bmM6IHRydWUsXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENkY0F1dGhGYWNhZGUge1xuICBhYnN0cmFjdCBsb2dpbldpdGhDdXN0b21DZGNGbG93KFxuICAgIFVJRDogc3RyaW5nLFxuICAgIFVJRFNpZ25hdHVyZTogc3RyaW5nLFxuICAgIHNpZ25hdHVyZVRpbWVzdGFtcDogc3RyaW5nLFxuICAgIGlkVG9rZW46IHN0cmluZyxcbiAgICBiYXNlU2l0ZTogc3RyaW5nXG4gICk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgbG9naW5XaXRoVG9rZW4oXG4gICAgdG9rZW46IFBhcnRpYWw8QXV0aFRva2VuPiAmIHsgZXhwaXJlc19pbj86IG51bWJlciB9XG4gICk6IHZvaWQ7XG59XG4iXX0=