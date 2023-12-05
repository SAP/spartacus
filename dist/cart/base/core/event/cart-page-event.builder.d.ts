import { CartPageEvent } from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CartPageEventBuilder {
    protected eventService: EventService;
    constructor(eventService: EventService);
    protected register(): void;
    protected buildCartPageEvent(): Observable<CartPageEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartPageEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartPageEventBuilder>;
}
