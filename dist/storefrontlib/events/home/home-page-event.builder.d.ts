import { EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { HomePageEvent } from './home-page.events';
import * as i0 from "@angular/core";
export declare class HomePageEventBuilder {
    protected eventService: EventService;
    constructor(eventService: EventService);
    protected register(): void;
    protected buildHomePageEvent(): Observable<HomePageEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HomePageEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HomePageEventBuilder>;
}
