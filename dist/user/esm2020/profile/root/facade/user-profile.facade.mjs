/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class UserProfileFacade {
}
UserProfileFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserProfileFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserProfileFacade,
        feature: USER_PROFILE_CORE_FEATURE,
        methods: ['get', 'update', 'close', 'getTitles'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserProfileFacade,
                        feature: USER_PROFILE_CORE_FEATURE,
                        methods: ['get', 'update', 'close', 'getTitles'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL3Byb2ZpbGUvcm9vdC9mYWNhZGUvdXNlci1wcm9maWxlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJaEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBVzVELE1BQU0sT0FBZ0IsaUJBQWlCOzs4R0FBakIsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FSekIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUM7S0FDakQsQ0FBQzsyRkFFZ0IsaUJBQWlCO2tCQVR0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sbUJBQW1CO3dCQUN6QixPQUFPLEVBQUUseUJBQXlCO3dCQUNsQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUM7cUJBQ2pELENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnLi4vbW9kZWwvdXNlci1wcm9maWxlLm1vZGVsJztcbmltcG9ydCB7IFVTRVJfUFJPRklMRV9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogVXNlclByb2ZpbGVGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBVU0VSX1BST0ZJTEVfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogWydnZXQnLCAndXBkYXRlJywgJ2Nsb3NlJywgJ2dldFRpdGxlcyddLFxuICAgIH0pLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVc2VyUHJvZmlsZUZhY2FkZSB7XG4gIGFic3RyYWN0IGdldCgpOiBPYnNlcnZhYmxlPFVzZXIgfCB1bmRlZmluZWQ+O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB1c2VyJ3MgZGV0YWlscy5cbiAgICpcbiAgICogQHBhcmFtIGRldGFpbHMgVXNlciBkZXRhaWxzIHRvIGJlIHVwZGF0ZWQuXG4gICAqL1xuICBhYnN0cmFjdCB1cGRhdGUoZGV0YWlsczogVXNlcik6IE9ic2VydmFibGU8dW5rbm93bj47XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgdXNlciBhY2NvdW50LlxuICAgKi9cbiAgYWJzdHJhY3QgY2xvc2UoKTogT2JzZXJ2YWJsZTx1bmtub3duPjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aXRsZXMgdGhhdCBjYW4gYmUgdXNlZCBmb3IgdGhlIHVzZXIgcHJvZmlsZXMuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRUaXRsZXMoKTogT2JzZXJ2YWJsZTxUaXRsZVtdPjtcbn1cbiJdfQ==