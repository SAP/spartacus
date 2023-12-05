import { HttpClient } from '@angular/common/http';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { ScheduledReplenishmentOrderAdapter } from '@spartacus/order/core';
import { ReplenishmentOrder, ScheduleReplenishmentForm } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccScheduledReplenishmentOrderAdapter implements ScheduledReplenishmentOrderAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    scheduleReplenishmentOrder(cartId: string, scheduleReplenishmentForm: ScheduleReplenishmentForm, termsChecked: boolean, userId: string): Observable<ReplenishmentOrder>;
    protected getScheduleReplenishmentOrderEndpoint(userId: string, cartId: string, termsChecked: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccScheduledReplenishmentOrderAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccScheduledReplenishmentOrderAdapter>;
}
