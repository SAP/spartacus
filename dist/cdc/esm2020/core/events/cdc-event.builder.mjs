/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import { EventService, StateEventService } from '@spartacus/core';
import { CdcAuthActions } from '../store/actions';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CdcEventBuilder {
    constructor(stateEventService, eventService) {
        this.stateEventService = stateEventService;
        this.eventService = eventService;
        this.register();
    }
    /**
     * Registers CDC events
     */
    register() {
        this.registerLoadUserTokenFail();
    }
    /**
     * Register the load user token fail event.
     */
    registerLoadUserTokenFail() {
        this.stateEventService.register({
            action: CdcAuthActions.LOAD_CDC_USER_TOKEN_FAIL,
            event: CdcLoadUserTokenFailEvent,
        });
    }
}
CdcEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcEventBuilder, deps: [{ token: i1.StateEventService }, { token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StateEventService }, { type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWV2ZW50LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy9jb3JlL2V2ZW50cy9jZGMtZXZlbnQuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7QUFLbEQsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFDWSxpQkFBb0MsRUFDcEMsWUFBMEI7UUFEMUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUVwQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ08sUUFBUTtRQUNoQixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDTyx5QkFBeUI7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztZQUM5QixNQUFNLEVBQUUsY0FBYyxDQUFDLHdCQUF3QjtZQUMvQyxLQUFLLEVBQUUseUJBQXlCO1NBQ2pDLENBQUMsQ0FBQztJQUNMLENBQUM7OzRHQXZCVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RjTG9hZFVzZXJUb2tlbkZhaWxFdmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY2RjL3Jvb3QnO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlLCBTdGF0ZUV2ZW50U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDZGNBdXRoQWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2RjRXZlbnRCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0YXRlRXZlbnRTZXJ2aWNlOiBTdGF0ZUV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5yZWdpc3RlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBDREMgZXZlbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RlckxvYWRVc2VyVG9rZW5GYWlsKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgdGhlIGxvYWQgdXNlciB0b2tlbiBmYWlsIGV2ZW50LlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyTG9hZFVzZXJUb2tlbkZhaWwoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZUV2ZW50U2VydmljZS5yZWdpc3Rlcih7XG4gICAgICBhY3Rpb246IENkY0F1dGhBY3Rpb25zLkxPQURfQ0RDX1VTRVJfVE9LRU5fRkFJTCxcbiAgICAgIGV2ZW50OiBDZGNMb2FkVXNlclRva2VuRmFpbEV2ZW50LFxuICAgIH0pO1xuICB9XG59XG4iXX0=