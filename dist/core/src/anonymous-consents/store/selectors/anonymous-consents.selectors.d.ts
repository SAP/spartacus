import { MemoizedSelector } from '@ngrx/store';
import { AnonymousConsent } from '../../../model/consent.model';
import { StateWithAnonymousConsents } from '../anonymous-consents-state';
export declare const getAnonymousConsents: MemoizedSelector<StateWithAnonymousConsents, AnonymousConsent[]>;
export declare const getAnonymousConsentByTemplateCode: (templateCode: string) => MemoizedSelector<StateWithAnonymousConsents, AnonymousConsent | undefined>;
