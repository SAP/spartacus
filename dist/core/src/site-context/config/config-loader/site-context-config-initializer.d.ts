import { Observable } from 'rxjs';
import { ConfigInitializer } from '../../../config/config-initializer/config-initializer';
import { BaseSite } from '../../../model/misc.model';
import { JavaRegExpConverter } from '../../../util/java-reg-exp-converter/java-reg-exp-converter';
import { WindowRef } from '../../../window/window-ref';
import { BaseSiteService } from '../../facade/base-site.service';
import { SiteContextConfig } from '../site-context-config';
import * as i0 from "@angular/core";
export declare class SiteContextConfigInitializer implements ConfigInitializer {
    protected baseSiteService: BaseSiteService;
    protected javaRegExpConverter: JavaRegExpConverter;
    protected winRef: WindowRef;
    readonly scopes: string[];
    readonly configFactory: () => Promise<SiteContextConfig>;
    constructor(baseSiteService: BaseSiteService, javaRegExpConverter: JavaRegExpConverter, winRef: WindowRef);
    private get currentUrl();
    /**
     * Emits the site context config basing on the current base site data.
     *
     * Completes after emitting the value.
     */
    protected resolveConfig(): Observable<SiteContextConfig>;
    protected getConfig(source: BaseSite): SiteContextConfig;
    private isCurrentBaseSite;
    /**
     * Returns an array of url encoded site context parameters.
     *
     * It maps the string "storefront" (used in OCC) to the "baseSite" (used in Spartacus)
     */
    private getUrlParams;
    /**
     * Returns iso codes in a array, where the first element is the default iso code.
     */
    private getIsoCodes;
    /**
     * Moves to the start of the array the first element that satisfies the given predicate.
     *
     * @param array array to modify
     * @param predicate function called on elements
     */
    private moveToFirst;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextConfigInitializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SiteContextConfigInitializer>;
}
