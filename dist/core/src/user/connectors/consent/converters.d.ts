import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { ConsentTemplate } from '../../../model/consent.model';
export declare const CONSENT_TEMPLATE_NORMALIZER: InjectionToken<Converter<any, ConsentTemplate>>;
