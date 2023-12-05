import { StateEventService } from '../../state/event/state-event.service';
import * as i0 from "@angular/core";
export declare class UserEventBuilder {
    protected stateEventService: StateEventService;
    constructor(stateEventService: StateEventService);
    /**
     * Registers user events
     */
    protected register(): void;
    /**
     * Register an address successfully updated event
     */
    protected updateUserAddressEvent(): void;
    protected addUserAddressEvent(): void;
    protected deleteUserAddressEvent(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserEventBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserEventBuilder>;
}
