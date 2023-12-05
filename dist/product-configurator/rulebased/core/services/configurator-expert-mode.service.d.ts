import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * This implementation is OCC specific.
 * Different backend might have completely different need regarding expert mode.
 * To implement custom solution provide your own implementation and customize services that use ConfiguratorExpertModeService
 */
export declare class ConfiguratorExpertModeService {
    private _expModeRequested;
    private _expModeActive;
    /**
     * Sets requested expert mode.
     *
     * @param expMode
     */
    setExpModeRequested(expMode: boolean): void;
    /**
     * This function provides the requested expert mode the OCC calls should use, depending
     * on whether there is an active storefront session or not.
     */
    getExpModeRequested(): Observable<boolean>;
    /**
     * Sets requested expert mode.
     *
     * @param expMode
     */
    setExpModeActive(expMode: boolean): void;
    /**
     * This function provides the requested expert mode the OCC calls should use, depending
     * on whether there is an active storefront session or not.
     */
    getExpModeActive(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorExpertModeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorExpertModeService>;
}
