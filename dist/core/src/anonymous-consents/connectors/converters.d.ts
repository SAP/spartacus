import { InjectionToken } from '@angular/core';
import { AnonymousConsent } from '../../model/consent.model';
import { Converter } from '../../util/converter.service';
export declare const ANONYMOUS_CONSENT_NORMALIZER: InjectionToken<Converter<string, AnonymousConsent[]>>;
