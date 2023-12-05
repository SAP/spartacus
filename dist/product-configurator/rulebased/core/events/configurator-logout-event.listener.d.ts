import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ConfiguratorExpertModeService } from '../services/configurator-expert-mode.service';
import { ConfiguratorCommonsService } from '../facade/configurator-commons.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorLogoutEventListener implements OnDestroy {
    protected eventService: EventService;
    protected configExpertModeService: ConfiguratorExpertModeService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected subscription: Subscription;
    constructor(eventService: EventService, configExpertModeService: ConfiguratorExpertModeService, configuratorCommonsService: ConfiguratorCommonsService);
    protected onLogout(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorLogoutEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorLogoutEventListener>;
}
