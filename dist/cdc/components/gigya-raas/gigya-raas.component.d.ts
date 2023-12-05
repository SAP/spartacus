import { NgZone, OnInit } from '@angular/core';
import { GigyaRaasComponentData } from '@spartacus/cdc/core';
import { CdcConfig, CdcJsService } from '@spartacus/cdc/root';
import { BaseSiteService, LanguageService, WindowRef } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class GigyaRaasComponent implements OnInit {
    component: CmsComponentData<GigyaRaasComponentData>;
    private baseSiteService;
    private languageService;
    private cdcConfig;
    private winRef;
    private cdcJSService;
    private zone;
    protected renderScreenSet: boolean;
    language$: Observable<string>;
    jsError$: Observable<boolean>;
    jsLoaded$: Observable<boolean>;
    constructor(component: CmsComponentData<GigyaRaasComponentData>, baseSiteService: BaseSiteService, languageService: LanguageService, cdcConfig: CdcConfig, winRef: WindowRef, cdcJSService: CdcJsService, zone: NgZone);
    ngOnInit(): void;
    /**
     * Display screen set in embed mode
     *
     * @param data - GigyaRaasComponentData
     * @param lang - language
     */
    displayScreenSet(data: GigyaRaasComponentData, lang: string): void;
    /**
     * Show screen set
     *
     * @param data - GigyaRaasComponentData
     * @param lang - language
     */
    showScreenSet(data: GigyaRaasComponentData, lang: string): void;
    protected isLoginScreenSet(data: GigyaRaasComponentData): boolean;
    protected getSessionExpirationValue(): number;
    private getCurrentBaseSite;
    /**
     * Check if the component should be displayed in embed mode
     *
     * @param data - GigyaRaasComponentData
     */
    displayInEmbedMode(data: GigyaRaasComponentData): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<GigyaRaasComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GigyaRaasComponent, "cx-gigya-raas", never, {}, {}, never, never, false, never>;
}
