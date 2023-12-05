import { Observable } from 'rxjs';
import { ConfigInitializer } from '../../../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../../../config/config-initializer/config-initializer.service';
import { BaseSite } from '../../../model/misc.model';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { RoutingConfig } from '../config/routing-config';
import * as i0 from "@angular/core";
export declare class SecurePortalConfigInitializer implements ConfigInitializer {
    protected baseSiteService: BaseSiteService;
    protected configInit: ConfigInitializerService;
    readonly scopes: string[];
    readonly configFactory: () => Promise<RoutingConfig>;
    constructor(baseSiteService: BaseSiteService, configInit: ConfigInitializerService);
    /**
     * Emits the Routing config basing on the current base site data.
     *
     * Completes after emitting the value.
     */
    protected resolveConfig(): Observable<RoutingConfig>;
    protected getRoutingConfig(source: BaseSite | undefined): RoutingConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<SecurePortalConfigInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SecurePortalConfigInitializer>;
}
