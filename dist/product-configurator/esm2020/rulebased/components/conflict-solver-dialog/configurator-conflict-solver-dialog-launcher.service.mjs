/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, distinctUntilChanged, filter, first, map, switchMap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/product-configurator/common";
import * as i3 from "../../core/facade/configurator-groups.service";
export class ConfiguratorConflictSolverDialogLauncherService {
    constructor(launchDialogService, configRouterExtractorService, configuratorGroupsService) {
        this.launchDialogService = launchDialogService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.subscription = new Subscription();
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.conflictGroupAndRouterData$ = this.routerData$.pipe(switchMap((routerData) => this.configuratorGroupsService
            .getConflictGroupForImmediateConflictResolution(routerData.owner)
            .pipe(map((conflictGroup) => ({
            conflictGroup: conflictGroup,
            routerData: routerData,
        })))), 
        //Delay because we first want the form to react on data changes
        delay(0));
        this.controlDialog();
    }
    controlDialog() {
        this.subscription.add(this.conflictGroupAndRouterData$
            .pipe(filter((data) => !!data.conflictGroup), 
        // subscribeToCloseDialog triggers another emission of conflictGroup$ with the same conflict group and router data
        // so until we get a new navigation id in the router data, we ignore emissions of same conflict group
        distinctUntilChanged((prev, cur) => prev.conflictGroup === cur.conflictGroup &&
            prev.routerData.navigationId === cur.routerData.navigationId))
            .subscribe(() => {
            this.openModal();
            this.subscribeToCloseDialog();
        }));
    }
    subscribeToCloseDialog() {
        this.subscription.add(this.conflictGroupAndRouterData$
            .pipe(first((data) => !data.conflictGroup)) // stop listening, after we closed once
            .subscribe(() => this.closeModal('CLOSE_NO_CONFLICTS_EXIST')));
    }
    openModal() {
        this.launchDialogService.openDialogAndSubscribe("CONFLICT_SOLVER" /* LAUNCH_CALLER.CONFLICT_SOLVER */, undefined, {
            conflictGroup: this.conflictGroupAndRouterData$.pipe(map((data) => data.conflictGroup)),
            routerData: this.routerData$,
        });
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
ConfiguratorConflictSolverDialogLauncherService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogLauncherService, deps: [{ token: i1.LaunchDialogService }, { token: i2.ConfiguratorRouterExtractorService }, { token: i3.ConfiguratorGroupsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorConflictSolverDialogLauncherService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogLauncherService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogLauncherService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i2.ConfiguratorRouterExtractorService }, { type: i3.ConfiguratorGroupsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNvbmZsaWN0LXNvbHZlci1kaWFsb2ctbGF1bmNoZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9jb25mbGljdC1zb2x2ZXItZGlhbG9nL2NvbmZpZ3VyYXRvci1jb25mbGljdC1zb2x2ZXItZGlhbG9nLWxhdW5jaGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFPdEQsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdoRCxPQUFPLEVBQ0wsS0FBSyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sS0FBSyxFQUNMLEdBQUcsRUFDSCxTQUFTLEdBQ1YsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFVeEIsTUFBTSxPQUFPLCtDQUErQztJQXdCMUQsWUFDWSxtQkFBd0MsRUFDeEMsNEJBQWdFLEVBQ2hFLHlCQUFvRDtRQUZwRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBb0M7UUFDaEUsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQXhCdEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTVDLGdCQUFXLEdBQ1QsSUFBSSxDQUFDLDRCQUE0QixDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFeEQsZ0NBQTJCLEdBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNuQixTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUN2QixJQUFJLENBQUMseUJBQXlCO2FBQzNCLDhDQUE4QyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7YUFDaEUsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0QixhQUFhLEVBQUUsYUFBYTtZQUM1QixVQUFVLEVBQUUsVUFBVTtTQUN2QixDQUFDLENBQUMsQ0FDSixDQUNKO1FBQ0QsK0RBQStEO1FBQy9ELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDVCxDQUFDO1FBT0YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFUyxhQUFhO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsMkJBQTJCO2FBQzdCLElBQUksQ0FDSCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3RDLGtIQUFrSDtRQUNsSCxxR0FBcUc7UUFDckcsb0JBQW9CLENBQ2xCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQ1osSUFBSSxDQUFDLGFBQWEsS0FBSyxHQUFHLENBQUMsYUFBYTtZQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksS0FBSyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FDL0QsQ0FDRjthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFUyxzQkFBc0I7UUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQywyQkFBMkI7YUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyx1Q0FBdUM7YUFDbEYsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUNoRSxDQUFDO0lBQ0osQ0FBQztJQUVTLFNBQVM7UUFDakIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQix3REFFN0MsU0FBUyxFQUNUO1lBQ0UsYUFBYSxFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQ2xELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUNsQztZQUNELFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM3QixDQUNGLENBQUM7SUFDSixDQUFDO0lBRVMsVUFBVSxDQUFDLE1BQVk7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7NElBL0VVLCtDQUErQztnSkFBL0MsK0NBQStDLGNBRjlDLE1BQU07MkZBRVAsK0NBQStDO2tCQUgzRCxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMYXVuY2hEaWFsb2dTZXJ2aWNlLCBMQVVOQ0hfQ0FMTEVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7XG4gIENvbmZpZ3VyYXRvclJvdXRlcixcbiAgQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWdyb3Vwcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7XG4gIGRlbGF5LFxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBmaXJzdCxcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxudHlwZSBDb25mbGljdEdyb3VwQW5kUm91dGVyRGF0YSA9IHtcbiAgY29uZmxpY3RHcm91cD86IENvbmZpZ3VyYXRvci5Hcm91cDtcbiAgcm91dGVyRGF0YTogQ29uZmlndXJhdG9yUm91dGVyLkRhdGE7XG59O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQ29uZmxpY3RTb2x2ZXJEaWFsb2dMYXVuY2hlclNlcnZpY2VcbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbntcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICByb3V0ZXJEYXRhJDogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3JSb3V0ZXIuRGF0YT4gPVxuICAgIHRoaXMuY29uZmlnUm91dGVyRXh0cmFjdG9yU2VydmljZS5leHRyYWN0Um91dGVyRGF0YSgpO1xuXG4gIGNvbmZsaWN0R3JvdXBBbmRSb3V0ZXJEYXRhJDogT2JzZXJ2YWJsZTxDb25mbGljdEdyb3VwQW5kUm91dGVyRGF0YT4gPVxuICAgIHRoaXMucm91dGVyRGF0YSQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocm91dGVyRGF0YSkgPT5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlXG4gICAgICAgICAgLmdldENvbmZsaWN0R3JvdXBGb3JJbW1lZGlhdGVDb25mbGljdFJlc29sdXRpb24ocm91dGVyRGF0YS5vd25lcilcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCgoY29uZmxpY3RHcm91cCkgPT4gKHtcbiAgICAgICAgICAgICAgY29uZmxpY3RHcm91cDogY29uZmxpY3RHcm91cCxcbiAgICAgICAgICAgICAgcm91dGVyRGF0YTogcm91dGVyRGF0YSxcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICksXG4gICAgICAvL0RlbGF5IGJlY2F1c2Ugd2UgZmlyc3Qgd2FudCB0aGUgZm9ybSB0byByZWFjdCBvbiBkYXRhIGNoYW5nZXNcbiAgICAgIGRlbGF5KDApXG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnUm91dGVyRXh0cmFjdG9yU2VydmljZTogQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yR3JvdXBzU2VydmljZTogQ29uZmlndXJhdG9yR3JvdXBzU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNvbnRyb2xEaWFsb2coKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb250cm9sRGlhbG9nKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuY29uZmxpY3RHcm91cEFuZFJvdXRlckRhdGEkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoZGF0YSkgPT4gISFkYXRhLmNvbmZsaWN0R3JvdXApLFxuICAgICAgICAgIC8vIHN1YnNjcmliZVRvQ2xvc2VEaWFsb2cgdHJpZ2dlcnMgYW5vdGhlciBlbWlzc2lvbiBvZiBjb25mbGljdEdyb3VwJCB3aXRoIHRoZSBzYW1lIGNvbmZsaWN0IGdyb3VwIGFuZCByb3V0ZXIgZGF0YVxuICAgICAgICAgIC8vIHNvIHVudGlsIHdlIGdldCBhIG5ldyBuYXZpZ2F0aW9uIGlkIGluIHRoZSByb3V0ZXIgZGF0YSwgd2UgaWdub3JlIGVtaXNzaW9ucyBvZiBzYW1lIGNvbmZsaWN0IGdyb3VwXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAocHJldiwgY3VyKSA9PlxuICAgICAgICAgICAgICBwcmV2LmNvbmZsaWN0R3JvdXAgPT09IGN1ci5jb25mbGljdEdyb3VwICYmXG4gICAgICAgICAgICAgIHByZXYucm91dGVyRGF0YS5uYXZpZ2F0aW9uSWQgPT09IGN1ci5yb3V0ZXJEYXRhLm5hdmlnYXRpb25JZFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5Nb2RhbCgpO1xuICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9DbG9zZURpYWxvZygpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlVG9DbG9zZURpYWxvZygpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmNvbmZsaWN0R3JvdXBBbmRSb3V0ZXJEYXRhJFxuICAgICAgICAucGlwZShmaXJzdCgoZGF0YSkgPT4gIWRhdGEuY29uZmxpY3RHcm91cCkpIC8vIHN0b3AgbGlzdGVuaW5nLCBhZnRlciB3ZSBjbG9zZWQgb25jZVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VNb2RhbCgnQ0xPU0VfTk9fQ09ORkxJQ1RTX0VYSVNUJykpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvcGVuTW9kYWwoKTogdm9pZCB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLm9wZW5EaWFsb2dBbmRTdWJzY3JpYmUoXG4gICAgICBMQVVOQ0hfQ0FMTEVSLkNPTkZMSUNUX1NPTFZFUixcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHtcbiAgICAgICAgY29uZmxpY3RHcm91cDogdGhpcy5jb25mbGljdEdyb3VwQW5kUm91dGVyRGF0YSQucGlwZShcbiAgICAgICAgICBtYXAoKGRhdGEpID0+IGRhdGEuY29uZmxpY3RHcm91cClcbiAgICAgICAgKSxcbiAgICAgICAgcm91dGVyRGF0YTogdGhpcy5yb3V0ZXJEYXRhJCxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNsb3NlTW9kYWwocmVhc29uPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsb3NlRGlhbG9nKHJlYXNvbik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19