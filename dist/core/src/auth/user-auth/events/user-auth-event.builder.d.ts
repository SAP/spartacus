import { Observable } from 'rxjs';
import { EventService } from '../../../event/event.service';
import { StateEventService } from '../../../state/event/index';
import { AuthService } from '../facade/auth.service';
import { LogoutEvent } from './user-auth.events';
import * as i0 from "@angular/core";
export declare class UserAuthEventBuilder {
    protected stateEventService: StateEventService;
    protected eventService: EventService;
    protected authService: AuthService;
    constructor(stateEventService: StateEventService, eventService: EventService, authService: AuthService);
    /**
     * Registers user auth events
     */
    protected register(): void;
    /**
     * Register a login event
     */
    protected registerLoginEvent(): void;
    /**
     * Register a logout event
     */
    protected registerLogoutEvent(): void;
    /**
     * Returns logout event stream
     */
    protected buildLogoutEvent(): Observable<LogoutEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAuthEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAuthEventBuilder>;
}
