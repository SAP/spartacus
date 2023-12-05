/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Inject, Injectable, isDevMode, } from '@angular/core';
import { LoggerService, resolveApplicable } from '@spartacus/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
import * as i1 from "../../config/layout-config";
export class LaunchDialogService {
    get data$() {
        return this._dataSubject.asObservable();
    }
    constructor(renderStrategies, layoutConfig) {
        this.renderStrategies = renderStrategies;
        this.layoutConfig = layoutConfig;
        this._dialogClose = new BehaviorSubject(undefined);
        this._dataSubject = new BehaviorSubject(undefined);
        this.logger = inject(LoggerService);
        this.renderStrategies = this.renderStrategies || [];
    }
    /**
     * Open the dialog
     *
     * @param caller LAUNCH_CALLER
     * @param openElement button's Element ref
     * @param vcr View Container Ref of the container for inline rendering
     * @param data optional data which could be passed to dialog
     */
    openDialog(caller, openElement, vcr, data) {
        const component = this.launch(caller, vcr, data);
        if (component) {
            return combineLatest([component, this.dialogClose]).pipe(filter(([, close]) => close !== undefined), tap(([comp]) => {
                openElement?.nativeElement.focus();
                this.clear(caller);
                comp?.destroy();
            }), map(([comp]) => comp));
        }
    }
    /**
     * Render the element based on the strategy from the launch configuration
     *
     * @param caller LAUNCH_CALLER
     * @param vcr View Container Ref of the container for inline rendering
     */
    launch(caller, vcr, data) {
        const config = this.findConfiguration(caller);
        if (config) {
            const renderer = this.getStrategy(config);
            // Render if the strategy exists
            if (renderer) {
                this._dialogClose.next(undefined);
                this._dataSubject.next(data);
                return renderer.render(config, caller, vcr);
            }
        }
        else if (isDevMode()) {
            this.logger.warn('No configuration provided for caller ' + caller);
        }
    }
    /**
     * Opens dialog and subscribe in the service. Should be used if the trigger component might get destroyed while the component is open.
     *
     * @param caller Launch Caller
     * @param openElement Element to open
     * @param data Data to provide to the rendered element
     */
    openDialogAndSubscribe(caller, openElement, data) {
        this.openDialog(caller, openElement, undefined, data)
            ?.pipe(take(1))
            .subscribe();
    }
    /**
     * Util method to remove element from rendered elements list
     *
     * @param caller LAUNCH_CALLER
     */
    clear(caller) {
        const config = this.findConfiguration(caller);
        if (config) {
            const renderer = this.getStrategy(config);
            // Render if the strategy exists
            if (renderer) {
                renderer.remove(caller, config);
            }
        }
    }
    get dialogClose() {
        return this._dialogClose.asObservable();
    }
    closeDialog(reason) {
        this._dialogClose.next(reason);
    }
    /**
     * Returns the configuration for the caller
     *
     * @param caller LAUNCH_CALLER
     */
    findConfiguration(caller) {
        if (this.layoutConfig?.launch) {
            return this.layoutConfig.launch[caller];
        }
        return undefined;
    }
    /**
     * Returns the render strategy based on the configuration
     *
     * @param config Configuration for launch
     */
    getStrategy(config) {
        return resolveApplicable(this.renderStrategies, [config]);
    }
}
LaunchDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LaunchDialogService, deps: [{ token: LaunchRenderStrategy }, { token: i1.LayoutConfig }], target: i0.ɵɵFactoryTarget.Injectable });
LaunchDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LaunchDialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LaunchDialogService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LaunchRenderStrategy]
                }] }, { type: i1.LayoutConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWRpYWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvbGF1bmNoLWRpYWxvZy9zZXJ2aWNlcy9sYXVuY2gtZGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFHTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBR2hFLE1BQU0sT0FBTyxtQkFBbUI7SUFNOUIsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxZQUVZLGdCQUF3QyxFQUN4QyxZQUEwQjtRQUQxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBWjlCLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQWtCLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQU0sU0FBUyxDQUFDLENBQUM7UUFFakQsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQVd2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7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TyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QztRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7OztPQUlHO0lBQ08sV0FBVyxDQUNuQixNQUFxQjtRQUVyQixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Z0hBM0lVLG1CQUFtQixrQkFXcEIsb0JBQW9CO29IQVhuQixtQkFBbUIsY0FETixNQUFNOzJGQUNuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFZN0IsTUFBTTsyQkFBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIGluamVjdCxcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBpc0Rldk1vZGUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSwgcmVzb2x2ZUFwcGxpY2FibGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL2xheW91dC1jb25maWcnO1xuaW1wb3J0IHsgTEFVTkNIX0NBTExFUiwgTGF1bmNoT3B0aW9ucyB9IGZyb20gJy4uL2NvbmZpZy9sYXVuY2gtY29uZmlnJztcbmltcG9ydCB7IExhdW5jaFJlbmRlclN0cmF0ZWd5IH0gZnJvbSAnLi9sYXVuY2gtcmVuZGVyLnN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBMYXVuY2hEaWFsb2dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZGlhbG9nQ2xvc2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgcHJpdmF0ZSBfZGF0YVN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4odW5kZWZpbmVkKTtcblxuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGdldCBkYXRhJCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTGF1bmNoUmVuZGVyU3RyYXRlZ3kpXG4gICAgcHJvdGVjdGVkIHJlbmRlclN0cmF0ZWdpZXM6IExhdW5jaFJlbmRlclN0cmF0ZWd5W10sXG4gICAgcHJvdGVjdGVkIGxheW91dENvbmZpZzogTGF5b3V0Q29uZmlnXG4gICkge1xuICAgIHRoaXMucmVuZGVyU3RyYXRlZ2llcyA9IHRoaXMucmVuZGVyU3RyYXRlZ2llcyB8fCBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHRoZSBkaWFsb2dcbiAgICpcbiAgICogQHBhcmFtIGNhbGxlciBMQVVOQ0hfQ0FMTEVSXG4gICAqIEBwYXJhbSBvcGVuRWxlbWVudCBidXR0b24ncyBFbGVtZW50IHJlZlxuICAgKiBAcGFyYW0gdmNyIFZpZXcgQ29udGFpbmVyIFJlZiBvZiB0aGUgY29udGFpbmVyIGZvciBpbmxpbmUgcmVuZGVyaW5nXG4gICAqIEBwYXJhbSBkYXRhIG9wdGlvbmFsIGRhdGEgd2hpY2ggY291bGQgYmUgcGFzc2VkIHRvIGRpYWxvZ1xuICAgKi9cbiAgb3BlbkRpYWxvZyhcbiAgICBjYWxsZXI6IExBVU5DSF9DQUxMRVIgfCBzdHJpbmcsXG4gICAgb3BlbkVsZW1lbnQ/OiBFbGVtZW50UmVmLFxuICAgIHZjcj86IFZpZXdDb250YWluZXJSZWYsXG4gICAgZGF0YT86IGFueVxuICApOiBPYnNlcnZhYmxlPGFueT4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMubGF1bmNoKGNhbGxlciwgdmNyLCBkYXRhKTtcblxuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtjb21wb25lbnQsIHRoaXMuZGlhbG9nQ2xvc2VdKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKFssIGNsb3NlXSkgPT4gY2xvc2UgIT09IHVuZGVmaW5lZCksXG4gICAgICAgIHRhcCgoW2NvbXBdKSA9PiB7XG4gICAgICAgICAgb3BlbkVsZW1lbnQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmNsZWFyKGNhbGxlcik7XG4gICAgICAgICAgY29tcD8uZGVzdHJveSgpO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKChbY29tcF0pID0+IGNvbXApXG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmVuZGVyIHRoZSBlbGVtZW50IGJhc2VkIG9uIHRoZSBzdHJhdGVneSBmcm9tIHRoZSBsYXVuY2ggY29uZmlndXJhdGlvblxuICAgKlxuICAgKiBAcGFyYW0gY2FsbGVyIExBVU5DSF9DQUxMRVJcbiAgICogQHBhcmFtIHZjciBWaWV3IENvbnRhaW5lciBSZWYgb2YgdGhlIGNvbnRhaW5lciBmb3IgaW5saW5lIHJlbmRlcmluZ1xuICAgKi9cbiAgbGF1bmNoKFxuICAgIGNhbGxlcjogTEFVTkNIX0NBTExFUiB8IHN0cmluZyxcbiAgICB2Y3I/OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGRhdGE/OiBhbnlcbiAgKTogdm9pZCB8IE9ic2VydmFibGU8Q29tcG9uZW50UmVmPGFueT4gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmZpbmRDb25maWd1cmF0aW9uKGNhbGxlcik7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFN0cmF0ZWd5KGNvbmZpZyk7XG5cbiAgICAgIC8vIFJlbmRlciBpZiB0aGUgc3RyYXRlZ3kgZXhpc3RzXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nQ2xvc2UubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLl9kYXRhU3ViamVjdC5uZXh0KGRhdGEpO1xuXG4gICAgICAgIHJldHVybiByZW5kZXJlci5yZW5kZXIoY29uZmlnLCBjYWxsZXIsIHZjcik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgdGhpcy5sb2dnZXIud2FybignTm8gY29uZmlndXJhdGlvbiBwcm92aWRlZCBmb3IgY2FsbGVyICcgKyBjYWxsZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBkaWFsb2cgYW5kIHN1YnNjcmliZSBpbiB0aGUgc2VydmljZS4gU2hvdWxkIGJlIHVzZWQgaWYgdGhlIHRyaWdnZXIgY29tcG9uZW50IG1pZ2h0IGdldCBkZXN0cm95ZWQgd2hpbGUgdGhlIGNvbXBvbmVudCBpcyBvcGVuLlxuICAgKlxuICAgKiBAcGFyYW0gY2FsbGVyIExhdW5jaCBDYWxsZXJcbiAgICogQHBhcmFtIG9wZW5FbGVtZW50IEVsZW1lbnQgdG8gb3BlblxuICAgKiBAcGFyYW0gZGF0YSBEYXRhIHRvIHByb3ZpZGUgdG8gdGhlIHJlbmRlcmVkIGVsZW1lbnRcbiAgICovXG4gIG9wZW5EaWFsb2dBbmRTdWJzY3JpYmUoXG4gICAgY2FsbGVyOiBMQVVOQ0hfQ0FMTEVSIHwgc3RyaW5nLFxuICAgIG9wZW5FbGVtZW50PzogRWxlbWVudFJlZixcbiAgICBkYXRhPzogYW55XG4gICk6IHZvaWQge1xuICAgIHRoaXMub3BlbkRpYWxvZyhjYWxsZXIsIG9wZW5FbGVtZW50LCB1bmRlZmluZWQsIGRhdGEpXG4gICAgICA/LnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVdGlsIG1ldGhvZCB0byByZW1vdmUgZWxlbWVudCBmcm9tIHJlbmRlcmVkIGVsZW1lbnRzIGxpc3RcbiAgICpcbiAgICogQHBhcmFtIGNhbGxlciBMQVVOQ0hfQ0FMTEVSXG4gICAqL1xuICBjbGVhcihjYWxsZXI6IExBVU5DSF9DQUxMRVIgfCBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmZpbmRDb25maWd1cmF0aW9uKGNhbGxlcik7XG5cbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0U3RyYXRlZ3koY29uZmlnKTtcblxuICAgICAgLy8gUmVuZGVyIGlmIHRoZSBzdHJhdGVneSBleGlzdHNcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5yZW1vdmUoY2FsbGVyLCBjb25maWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBkaWFsb2dDbG9zZSgpOiBPYnNlcnZhYmxlPGFueSB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLl9kaWFsb2dDbG9zZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNsb3NlRGlhbG9nKHJlYXNvbjogYW55KSB7XG4gICAgdGhpcy5fZGlhbG9nQ2xvc2UubmV4dChyZWFzb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBjYWxsZXJcbiAgICpcbiAgICogQHBhcmFtIGNhbGxlciBMQVVOQ0hfQ0FMTEVSXG4gICAqL1xuICBwcm90ZWN0ZWQgZmluZENvbmZpZ3VyYXRpb24oXG4gICAgY2FsbGVyOiBMQVVOQ0hfQ0FMTEVSIHwgc3RyaW5nXG4gICk6IExhdW5jaE9wdGlvbnMgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLmxheW91dENvbmZpZz8ubGF1bmNoKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYXlvdXRDb25maWcubGF1bmNoW2NhbGxlcl07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVuZGVyIHN0cmF0ZWd5IGJhc2VkIG9uIHRoZSBjb25maWd1cmF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBjb25maWcgQ29uZmlndXJhdGlvbiBmb3IgbGF1bmNoXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0U3RyYXRlZ3koXG4gICAgY29uZmlnOiBMYXVuY2hPcHRpb25zXG4gICk6IExhdW5jaFJlbmRlclN0cmF0ZWd5IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gcmVzb2x2ZUFwcGxpY2FibGUodGhpcy5yZW5kZXJTdHJhdGVnaWVzLCBbY29uZmlnXSk7XG4gIH1cbn1cbiJdfQ==