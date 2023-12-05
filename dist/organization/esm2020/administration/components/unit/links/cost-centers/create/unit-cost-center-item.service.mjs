/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CostCenterItemService } from '../../../../cost-center/services/cost-center-item.service';
import * as i0 from "@angular/core";
export class UnitCostCenterItemService extends CostCenterItemService {
    save(form, key) {
        // we enable the unit so that the underlying
        // save method can read the complete form.value.
        form.get('unit')?.enable();
        return super.save(form, key);
    }
    /**
     * @override
     * Returns 'orgUnitCostCenters'
     */
    getDetailsRoute() {
        return 'orgUnitCostCenters';
    }
    buildRouteParams(item) {
        return { uid: item.unit?.uid };
    }
}
UnitCostCenterItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterItemService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnitCostCenterItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jb3N0LWNlbnRlci1pdGVtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy9jb3N0LWNlbnRlcnMvY3JlYXRlL3VuaXQtY29zdC1jZW50ZXItaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDOztBQUtsRyxNQUFNLE9BQU8seUJBQTBCLFNBQVEscUJBQXFCO0lBQ2xFLElBQUksQ0FDRixJQUFzQixFQUN0QixHQUFZO1FBRVosNENBQTRDO1FBQzVDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzNCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGVBQWU7UUFDdkIsT0FBTyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDO0lBRVMsZ0JBQWdCLENBQUMsSUFBZ0I7UUFDekMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7O3NIQXJCVSx5QkFBeUI7MEhBQXpCLHlCQUF5QixjQUZ4QixNQUFNOzJGQUVQLHlCQUF5QjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29zdENlbnRlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25JdGVtU3RhdHVzIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb3N0Q2VudGVySXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3N0LWNlbnRlci9zZXJ2aWNlcy9jb3N0LWNlbnRlci1pdGVtLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdENvc3RDZW50ZXJJdGVtU2VydmljZSBleHRlbmRzIENvc3RDZW50ZXJJdGVtU2VydmljZSB7XG4gIHNhdmUoXG4gICAgZm9ybTogVW50eXBlZEZvcm1Hcm91cCxcbiAgICBrZXk/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPENvc3RDZW50ZXI+PiB7XG4gICAgLy8gd2UgZW5hYmxlIHRoZSB1bml0IHNvIHRoYXQgdGhlIHVuZGVybHlpbmdcbiAgICAvLyBzYXZlIG1ldGhvZCBjYW4gcmVhZCB0aGUgY29tcGxldGUgZm9ybS52YWx1ZS5cbiAgICBmb3JtLmdldCgndW5pdCcpPy5lbmFibGUoKTtcbiAgICByZXR1cm4gc3VwZXIuc2F2ZShmb3JtLCBrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZVxuICAgKiBSZXR1cm5zICdvcmdVbml0Q29zdENlbnRlcnMnXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0RGV0YWlsc1JvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdvcmdVbml0Q29zdENlbnRlcnMnO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkUm91dGVQYXJhbXMoaXRlbTogQ29zdENlbnRlcikge1xuICAgIHJldHVybiB7IHVpZDogaXRlbS51bml0Py51aWQgfTtcbiAgfVxufVxuIl19