/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable, isDevMode, } from '@angular/core';
import { LoggerService, } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../config/tms-config";
/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
 */
export class TmsService {
    constructor(eventsService, windowRef, tmsConfig, injector) {
        this.eventsService = eventsService;
        this.windowRef = windowRef;
        this.tmsConfig = tmsConfig;
        this.injector = injector;
        /**
         * Stores subscriptions to events.
         */
        this.subscription = new Subscription();
        this.logger = inject(LoggerService);
    }
    /**
     * Called only once to start collecting and dispatching events
     */
    collect() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        for (const tmsCollectorConfig in this.tmsConfig.tagManager) {
            if (!this.tmsConfig.tagManager?.hasOwnProperty(tmsCollectorConfig)) {
                continue;
            }
            const collectorConfig = this.tmsConfig.tagManager[tmsCollectorConfig] ?? {};
            if (!collectorConfig.collector) {
                if (isDevMode()) {
                    this.logger.warn(`Skipping the '${tmsCollectorConfig}', as the collector is not defined.`);
                }
                continue;
            }
            const events = collectorConfig.events?.map((event) => this.eventsService.get(event)) ||
                [];
            const collector = this.injector.get(collectorConfig.collector);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            collector.init(collectorConfig, this.windowRef.nativeWindow);
            this.subscription.add(this.mapEvents(events).subscribe((event) => {
                if (collectorConfig.debug) {
                    this.logger.log(`🎤 Pushing the following event to ${tmsCollectorConfig}: `, event);
                }
                event = collector.map?.(event) ?? event;
                collector.pushEvent(collectorConfig, 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.windowRef.nativeWindow, event);
            }));
        }
    }
    /**
     * Maps the given events to an appropriate type that fits the specified TMS' structure.
     *
     * @param events - the events to map
     * @param collector - a name of the collector for which the events should be mapped
     */
    mapEvents(events) {
        return merge(...events);
    }
    /**
     * Angular's callback
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
TmsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsService, deps: [{ token: i1.EventService }, { token: i1.WindowRef }, { token: i2.TmsConfig }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
TmsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TmsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1.WindowRef }, { type: i2.TmsConfig }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdHJhY2tpbmcvdG1zL2NvcmUvc2VydmljZXMvdG1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUVWLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0wsYUFBYSxHQUVkLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLEtBQUssRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFJdkQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sVUFBVTtJQVFyQixZQUNZLGFBQTJCLEVBQzNCLFNBQW9CLEVBQ3BCLFNBQW9CLEVBQ3BCLFFBQWtCO1FBSGxCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBWDlCOztXQUVHO1FBQ08saUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxDLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFPdEMsQ0FBQztJQUVKOztPQUVHO0lBQ0gsT0FBTztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUVELEtBQUssTUFBTSxrQkFBa0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ2xFLFNBQVM7YUFDVjtZQUVELE1BQU0sZUFBZSxHQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV0RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTtnQkFDOUIsSUFBSSxTQUFTLEVBQUUsRUFBRTtvQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCxpQkFBaUIsa0JBQWtCLHFDQUFxQyxDQUN6RSxDQUFDO2lCQUNIO2dCQUNELFNBQVM7YUFDVjtZQUVELE1BQU0sTUFBTSxHQUNWLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckUsRUFBRSxDQUFDO1lBQ0wsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2pDLGVBQWUsQ0FBQyxTQUFTLENBQzFCLENBQUM7WUFDRixvRUFBb0U7WUFDcEUsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFhLENBQUMsQ0FBQztZQUU5RCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFO29CQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDYixxQ0FBcUMsa0JBQWtCLElBQUksRUFDM0QsS0FBSyxDQUNOLENBQUM7aUJBQ0g7Z0JBRUQsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUM7Z0JBQ3hDLFNBQVMsQ0FBQyxTQUFTLENBQ2pCLGVBQWU7Z0JBQ2Ysb0VBQW9FO2dCQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWEsRUFDNUIsS0FBSyxDQUNOLENBQUM7WUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyxTQUFTLENBQ2pCLE1BQXVCO1FBRXZCLE9BQU8sS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7dUdBdkZVLFVBQVU7MkdBQVYsVUFBVSxjQURHLE1BQU07MkZBQ25CLFVBQVU7a0JBRHRCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgaW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgaXNEZXZNb2RlLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ3hFdmVudCxcbiAgRXZlbnRTZXJ2aWNlLFxuICBMb2dnZXJTZXJ2aWNlLFxuICBXaW5kb3dSZWYsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUbXNDb25maWcgfSBmcm9tICcuLi9jb25maWcvdG1zLWNvbmZpZyc7XG5pbXBvcnQgeyBUbXNDb2xsZWN0b3IgfSBmcm9tICcuLi9tb2RlbC90bXMubW9kZWwnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBpbnRlcmFjdHMgd2l0aCB0aGUgY29uZmlndXJlZCBkYXRhIGxheWVyIG9iamVjdCBieSBwdXNoaW5nIHRoZSBTcGFydGFjdXMgZXZlbnRzIHRvIGl0LlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRtc1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU3RvcmVzIHN1YnNjcmlwdGlvbnMgdG8gZXZlbnRzLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBldmVudHNTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpbmRvd1JlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCB0bXNDb25maWc6IFRtc0NvbmZpZyxcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICAvKipcbiAgICogQ2FsbGVkIG9ubHkgb25jZSB0byBzdGFydCBjb2xsZWN0aW5nIGFuZCBkaXNwYXRjaGluZyBldmVudHNcbiAgICovXG4gIGNvbGxlY3QoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgdG1zQ29sbGVjdG9yQ29uZmlnIGluIHRoaXMudG1zQ29uZmlnLnRhZ01hbmFnZXIpIHtcbiAgICAgIGlmICghdGhpcy50bXNDb25maWcudGFnTWFuYWdlcj8uaGFzT3duUHJvcGVydHkodG1zQ29sbGVjdG9yQ29uZmlnKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29sbGVjdG9yQ29uZmlnID1cbiAgICAgICAgdGhpcy50bXNDb25maWcudGFnTWFuYWdlclt0bXNDb2xsZWN0b3JDb25maWddID8/IHt9O1xuXG4gICAgICBpZiAoIWNvbGxlY3RvckNvbmZpZy5jb2xsZWN0b3IpIHtcbiAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAgIGBTa2lwcGluZyB0aGUgJyR7dG1zQ29sbGVjdG9yQ29uZmlnfScsIGFzIHRoZSBjb2xsZWN0b3IgaXMgbm90IGRlZmluZWQuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV2ZW50cyA9XG4gICAgICAgIGNvbGxlY3RvckNvbmZpZy5ldmVudHM/Lm1hcCgoZXZlbnQpID0+IHRoaXMuZXZlbnRzU2VydmljZS5nZXQoZXZlbnQpKSB8fFxuICAgICAgICBbXTtcbiAgICAgIGNvbnN0IGNvbGxlY3RvciA9IHRoaXMuaW5qZWN0b3IuZ2V0PFRtc0NvbGxlY3Rvcj4oXG4gICAgICAgIGNvbGxlY3RvckNvbmZpZy5jb2xsZWN0b3JcbiAgICAgICk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgY29sbGVjdG9yLmluaXQoY29sbGVjdG9yQ29uZmlnLCB0aGlzLndpbmRvd1JlZi5uYXRpdmVXaW5kb3chKTtcblxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICB0aGlzLm1hcEV2ZW50cyhldmVudHMpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoY29sbGVjdG9yQ29uZmlnLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coXG4gICAgICAgICAgICAgIGDwn46kIFB1c2hpbmcgdGhlIGZvbGxvd2luZyBldmVudCB0byAke3Rtc0NvbGxlY3RvckNvbmZpZ306IGAsXG4gICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50ID0gY29sbGVjdG9yLm1hcD8uKGV2ZW50KSA/PyBldmVudDtcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaEV2ZW50KFxuICAgICAgICAgICAgY29sbGVjdG9yQ29uZmlnLFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIHRoaXMud2luZG93UmVmLm5hdGl2ZVdpbmRvdyEsXG4gICAgICAgICAgICBldmVudFxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXBzIHRoZSBnaXZlbiBldmVudHMgdG8gYW4gYXBwcm9wcmlhdGUgdHlwZSB0aGF0IGZpdHMgdGhlIHNwZWNpZmllZCBUTVMnIHN0cnVjdHVyZS5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50cyAtIHRoZSBldmVudHMgdG8gbWFwXG4gICAqIEBwYXJhbSBjb2xsZWN0b3IgLSBhIG5hbWUgb2YgdGhlIGNvbGxlY3RvciBmb3Igd2hpY2ggdGhlIGV2ZW50cyBzaG91bGQgYmUgbWFwcGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgbWFwRXZlbnRzPFQgZXh0ZW5kcyBDeEV2ZW50PihcbiAgICBldmVudHM6IE9ic2VydmFibGU8VD5bXVxuICApOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbWVyZ2UoLi4uZXZlbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmd1bGFyJ3MgY2FsbGJhY2tcbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==