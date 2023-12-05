import { CmsService, LoggerService } from '@spartacus/core';
import { PersonalizationConfig } from '@spartacus/tracking/personalization/root';
import { Observable } from 'rxjs';
import { PersonalizationContext } from '../model/personalization-context.model';
import * as i0 from "@angular/core";
export declare class PersonalizationContextService {
    protected config: PersonalizationConfig;
    protected cmsService: CmsService;
    protected logger: LoggerService;
    constructor(config: PersonalizationConfig, cmsService: CmsService);
    getPersonalizationContext(): Observable<PersonalizationContext | undefined>;
    private buildPersonalizationContext;
    static ɵfac: i0.ɵɵFactoryDeclaration<PersonalizationContextService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PersonalizationContextService>;
}
