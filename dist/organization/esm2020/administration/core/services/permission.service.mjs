/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { queueScheduler, using } from 'rxjs';
import { auditTime, filter, map, observeOn, tap } from 'rxjs/operators';
import { PermissionActions } from '../store/actions/index';
import { getPermission, getPermissionList, getPermissionState, getPermissionTypes, getPermissionValue, } from '../store/selectors/permission.selector';
import { getItemStatus } from '../utils/get-item-status';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
export class PermissionService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    loadPermission(permissionCode) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => this.store.dispatch(new PermissionActions.LoadPermission({
                userId,
                permissionCode,
            })),
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    loadPermissions(params) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => this.store.dispatch(new PermissionActions.LoadPermissions({ userId, params })),
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    loadPermissionTypes() {
        this.userIdService.takeUserId(true).subscribe({
            next: () => this.store.dispatch(new PermissionActions.LoadPermissionTypes()),
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    getPermission(permissionCode) {
        return this.store.select(getPermission(permissionCode));
    }
    getPermissionValue(permissionCode) {
        return this.store
            .select(getPermissionValue(permissionCode))
            .pipe(filter((permission) => Boolean(permission)));
    }
    getPermissionList(params) {
        return this.store.select(getPermissionList(params));
    }
    getPermissionTypeList() {
        return this.store.select(getPermissionTypes());
    }
    get(permissionCode) {
        const loading$ = this.getPermission(permissionCode).pipe(auditTime(0), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadPermission(permissionCode);
            }
        }));
        return using(() => loading$.subscribe(), () => this.getPermissionValue(permissionCode));
    }
    getTypes() {
        return this.getPermissionTypeList().pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadPermissionTypes();
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getList(params) {
        return this.getPermissionList(params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadPermissions(params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    create(permission) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => this.store.dispatch(new PermissionActions.CreatePermission({ userId, permission })),
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    update(permissionCode, permission) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => this.store.dispatch(new PermissionActions.UpdatePermission({
                userId,
                permissionCode,
                permission,
            })),
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    getLoadingStatus(permissionCode) {
        return getItemStatus(this.getPermission(permissionCode));
    }
    getPermissionState(code) {
        return this.store.select(getPermissionState(code));
    }
    getErrorState(permissionCode) {
        return this.getPermissionState(permissionCode).pipe(map((state) => state.error ?? false));
    }
}
PermissionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionService, deps: [{ token: i1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlL3NlcnZpY2VzL3Blcm1pc3Npb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVMzQyxPQUFPLEVBQWMsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTNELE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsa0JBQWtCLEdBQ25CLE1BQU0sd0NBQXdDLENBQUM7QUFDaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBR3pELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFDWSxLQUFtQyxFQUNuQyxhQUE0QjtRQUQ1QixVQUFLLEdBQUwsS0FBSyxDQUE4QjtRQUNuQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNyQyxDQUFDO0lBRUosY0FBYyxDQUFDLGNBQXNCO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1QyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQixJQUFJLGlCQUFpQixDQUFDLGNBQWMsQ0FBQztnQkFDbkMsTUFBTTtnQkFDTixjQUFjO2FBQ2YsQ0FBQyxDQUNI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QUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBc0IsRUFBRSxVQUFzQjtRQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDZixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDakIsSUFBSSxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDckMsTUFBTTtnQkFDTixjQUFjO2dCQUNkLFVBQVU7YUFDWCxDQUFDLENBQ0g7WUFDSCxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUNWLGlFQUFpRTtZQUNuRSxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUNkLGNBQXNCO1FBRXRCLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8sa0JBQWtCLENBQ3hCLElBQVk7UUFFWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELGFBQWEsQ0FBQyxjQUFzQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQ2pELEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FDckMsQ0FBQztJQUNKLENBQUM7OzhHQS9KVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQURKLE1BQU07MkZBQ25CLGlCQUFpQjtrQkFEN0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIEVudGl0aWVzTW9kZWwsXG4gIE9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZSxcbiAgU2VhcmNoQ29uZmlnLFxuICBTdGF0ZVV0aWxzLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgcXVldWVTY2hlZHVsZXIsIHVzaW5nIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIGZpbHRlciwgbWFwLCBvYnNlcnZlT24sIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMgfSBmcm9tICcuLi9tb2RlbC9vcmdhbml6YXRpb24taXRlbS1zdGF0dXMnO1xuaW1wb3J0IHsgUGVybWlzc2lvbiB9IGZyb20gJy4uL21vZGVsL3Blcm1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFN0YXRlV2l0aE9yZ2FuaXphdGlvbiB9IGZyb20gJy4uL3N0b3JlL29yZ2FuaXphdGlvbi1zdGF0ZSc7XG5pbXBvcnQge1xuICBnZXRQZXJtaXNzaW9uLFxuICBnZXRQZXJtaXNzaW9uTGlzdCxcbiAgZ2V0UGVybWlzc2lvblN0YXRlLFxuICBnZXRQZXJtaXNzaW9uVHlwZXMsXG4gIGdldFBlcm1pc3Npb25WYWx1ZSxcbn0gZnJvbSAnLi4vc3RvcmUvc2VsZWN0b3JzL3Blcm1pc3Npb24uc2VsZWN0b3InO1xuaW1wb3J0IHsgZ2V0SXRlbVN0YXR1cyB9IGZyb20gJy4uL3V0aWxzL2dldC1pdGVtLXN0YXR1cyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvblNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aE9yZ2FuaXphdGlvbj4sXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2VcbiAgKSB7fVxuXG4gIGxvYWRQZXJtaXNzaW9uKHBlcm1pc3Npb25Db2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCh0cnVlKS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKHVzZXJJZCkgPT5cbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgUGVybWlzc2lvbkFjdGlvbnMuTG9hZFBlcm1pc3Npb24oe1xuICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgcGVybWlzc2lvbkNvZGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgbG9hZFBlcm1pc3Npb25zKHBhcmFtczogU2VhcmNoQ29uZmlnKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICh1c2VySWQpID0+XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgbmV3IFBlcm1pc3Npb25BY3Rpb25zLkxvYWRQZXJtaXNzaW9ucyh7IHVzZXJJZCwgcGFyYW1zIH0pXG4gICAgICAgICksXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBmb3IgZnV0dXJlIHJlbGVhc2VzLCByZWZhY3RvciB0aGlzIHBhcnQgdG8gdGhyb3duIGVycm9yc1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRQZXJtaXNzaW9uVHlwZXMoKSB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICgpID0+XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFBlcm1pc3Npb25BY3Rpb25zLkxvYWRQZXJtaXNzaW9uVHlwZXMoKSksXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBmb3IgZnV0dXJlIHJlbGVhc2VzLCByZWZhY3RvciB0aGlzIHBhcnQgdG8gdGhyb3duIGVycm9yc1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGVybWlzc2lvbihcbiAgICBwZXJtaXNzaW9uQ29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8U3RhdGVVdGlscy5Mb2FkZXJTdGF0ZTxQZXJtaXNzaW9uPj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChnZXRQZXJtaXNzaW9uKHBlcm1pc3Npb25Db2RlKSk7XG4gIH1cblxuICBwcml2YXRlIGdldFBlcm1pc3Npb25WYWx1ZShwZXJtaXNzaW9uQ29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQZXJtaXNzaW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmVcbiAgICAgIC5zZWxlY3QoZ2V0UGVybWlzc2lvblZhbHVlKHBlcm1pc3Npb25Db2RlKSlcbiAgICAgIC5waXBlKGZpbHRlcigocGVybWlzc2lvbikgPT4gQm9vbGVhbihwZXJtaXNzaW9uKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQZXJtaXNzaW9uTGlzdChcbiAgICBwYXJhbXM6IFNlYXJjaENvbmZpZ1xuICApOiBPYnNlcnZhYmxlPFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8RW50aXRpZXNNb2RlbDxQZXJtaXNzaW9uPj4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3QoZ2V0UGVybWlzc2lvbkxpc3QocGFyYW1zKSk7XG4gIH1cblxuICBwcml2YXRlIGdldFBlcm1pc3Npb25UeXBlTGlzdCgpOiBPYnNlcnZhYmxlPFxuICAgIFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8T3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlW10+XG4gID4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChnZXRQZXJtaXNzaW9uVHlwZXMoKSk7XG4gIH1cblxuICBnZXQocGVybWlzc2lvbkNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8UGVybWlzc2lvbj4ge1xuICAgIGNvbnN0IGxvYWRpbmckID0gdGhpcy5nZXRQZXJtaXNzaW9uKHBlcm1pc3Npb25Db2RlKS5waXBlKFxuICAgICAgYXVkaXRUaW1lKDApLFxuICAgICAgdGFwKChzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIShzdGF0ZS5sb2FkaW5nIHx8IHN0YXRlLnN1Y2Nlc3MgfHwgc3RhdGUuZXJyb3IpKSB7XG4gICAgICAgICAgdGhpcy5sb2FkUGVybWlzc2lvbihwZXJtaXNzaW9uQ29kZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHJldHVybiB1c2luZyhcbiAgICAgICgpID0+IGxvYWRpbmckLnN1YnNjcmliZSgpLFxuICAgICAgKCkgPT4gdGhpcy5nZXRQZXJtaXNzaW9uVmFsdWUocGVybWlzc2lvbkNvZGUpXG4gICAgKTtcbiAgfVxuXG4gIGdldFR5cGVzKCk6IE9ic2VydmFibGU8T3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlW10gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRQZXJtaXNzaW9uVHlwZUxpc3QoKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHF1ZXVlU2NoZWR1bGVyKSxcbiAgICAgIHRhcCgocHJvY2VzczogU3RhdGVVdGlscy5Mb2FkZXJTdGF0ZTxPcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVbXT4pID0+IHtcbiAgICAgICAgaWYgKCEocHJvY2Vzcy5sb2FkaW5nIHx8IHByb2Nlc3Muc3VjY2VzcyB8fCBwcm9jZXNzLmVycm9yKSkge1xuICAgICAgICAgIHRoaXMubG9hZFBlcm1pc3Npb25UeXBlcygpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcigocHJvY2VzczogU3RhdGVVdGlscy5Mb2FkZXJTdGF0ZTxPcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVbXT4pID0+XG4gICAgICAgIEJvb2xlYW4ocHJvY2Vzcy5zdWNjZXNzIHx8IHByb2Nlc3MuZXJyb3IpXG4gICAgICApLFxuICAgICAgbWFwKChyZXN1bHQpID0+IHJlc3VsdC52YWx1ZSlcbiAgICApO1xuICB9XG5cbiAgZ2V0TGlzdChcbiAgICBwYXJhbXM6IFNlYXJjaENvbmZpZ1xuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8UGVybWlzc2lvbj4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRQZXJtaXNzaW9uTGlzdChwYXJhbXMpLnBpcGUoXG4gICAgICBvYnNlcnZlT24ocXVldWVTY2hlZHVsZXIpLFxuICAgICAgdGFwKChwcm9jZXNzOiBTdGF0ZVV0aWxzLkxvYWRlclN0YXRlPEVudGl0aWVzTW9kZWw8UGVybWlzc2lvbj4+KSA9PiB7XG4gICAgICAgIGlmICghKHByb2Nlc3MubG9hZGluZyB8fCBwcm9jZXNzLnN1Y2Nlc3MgfHwgcHJvY2Vzcy5lcnJvcikpIHtcbiAgICAgICAgICB0aGlzLmxvYWRQZXJtaXNzaW9ucyhwYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcigocHJvY2VzczogU3RhdGVVdGlscy5Mb2FkZXJTdGF0ZTxFbnRpdGllc01vZGVsPFBlcm1pc3Npb24+PikgPT5cbiAgICAgICAgQm9vbGVhbihwcm9jZXNzLnN1Y2Nlc3MgfHwgcHJvY2Vzcy5lcnJvcilcbiAgICAgICksXG4gICAgICBtYXAoKHJlc3VsdCkgPT4gcmVzdWx0LnZhbHVlKVxuICAgICk7XG4gIH1cblxuICBjcmVhdGUocGVybWlzc2lvbjogUGVybWlzc2lvbik6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodXNlcklkKSA9PlxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgIG5ldyBQZXJtaXNzaW9uQWN0aW9ucy5DcmVhdGVQZXJtaXNzaW9uKHsgdXNlcklkLCBwZXJtaXNzaW9uIH0pXG4gICAgICAgICksXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBmb3IgZnV0dXJlIHJlbGVhc2VzLCByZWZhY3RvciB0aGlzIHBhcnQgdG8gdGhyb3duIGVycm9yc1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZShwZXJtaXNzaW9uQ29kZTogc3RyaW5nLCBwZXJtaXNzaW9uOiBQZXJtaXNzaW9uKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICh1c2VySWQpID0+XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgbmV3IFBlcm1pc3Npb25BY3Rpb25zLlVwZGF0ZVBlcm1pc3Npb24oe1xuICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgcGVybWlzc2lvbkNvZGUsXG4gICAgICAgICAgICBwZXJtaXNzaW9uLFxuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBmb3IgZnV0dXJlIHJlbGVhc2VzLCByZWZhY3RvciB0aGlzIHBhcnQgdG8gdGhyb3duIGVycm9yc1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldExvYWRpbmdTdGF0dXMoXG4gICAgcGVybWlzc2lvbkNvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8UGVybWlzc2lvbj4+IHtcbiAgICByZXR1cm4gZ2V0SXRlbVN0YXR1cyh0aGlzLmdldFBlcm1pc3Npb24ocGVybWlzc2lvbkNvZGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGVybWlzc2lvblN0YXRlKFxuICAgIGNvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8UGVybWlzc2lvbj4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3QoZ2V0UGVybWlzc2lvblN0YXRlKGNvZGUpKTtcbiAgfVxuXG4gIGdldEVycm9yU3RhdGUocGVybWlzc2lvbkNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmdldFBlcm1pc3Npb25TdGF0ZShwZXJtaXNzaW9uQ29kZSkucGlwZShcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmVycm9yID8/IGZhbHNlKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==