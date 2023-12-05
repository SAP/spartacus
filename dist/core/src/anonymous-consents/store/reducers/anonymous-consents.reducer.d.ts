import { AnonymousConsent, ANONYMOUS_CONSENT_STATUS } from '../../../model/consent.model';
import { AnonymousConsentsActions } from '../actions/index';
export declare const initialState: AnonymousConsent[];
export declare function toggleConsentStatus(consents: AnonymousConsent[], templateCode: string, status: ANONYMOUS_CONSENT_STATUS): AnonymousConsent[];
export declare function reducer(state: AnonymousConsent[] | undefined, action: AnonymousConsentsActions.AnonymousConsentsActions): AnonymousConsent[];
