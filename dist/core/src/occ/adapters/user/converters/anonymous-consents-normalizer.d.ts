import { AnonymousConsentsService } from '../../../../anonymous-consents/facade/anonymous-consents.service';
import { AnonymousConsent } from '../../../../model/consent.model';
import { Converter } from '../../../../util/converter.service';
import * as i0 from "@angular/core";
export declare class AnonymousConsentNormalizer implements Converter<string, AnonymousConsent[]> {
    protected anonymousConsentsService: AnonymousConsentsService;
    constructor(anonymousConsentsService: AnonymousConsentsService);
    convert(source: string): AnonymousConsent[];
    static ɵfac: i0.ɵɵFactoryDeclaration<AnonymousConsentNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnonymousConsentNormalizer>;
}
