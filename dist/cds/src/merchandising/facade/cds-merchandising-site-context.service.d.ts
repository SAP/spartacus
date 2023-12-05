import { BaseSiteService, LanguageService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { MerchandisingSiteContext } from '../model/merchandising-site-context.model';
import * as i0 from "@angular/core";
export declare class CdsMerchandisingSiteContextService {
    protected baseSiteService: BaseSiteService;
    protected languageService: LanguageService;
    constructor(baseSiteService: BaseSiteService, languageService: LanguageService);
    getSiteContext(): Observable<MerchandisingSiteContext>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdsMerchandisingSiteContextService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdsMerchandisingSiteContextService>;
}
