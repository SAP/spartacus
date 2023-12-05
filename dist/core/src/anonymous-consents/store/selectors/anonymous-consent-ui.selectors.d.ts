import { MemoizedSelector } from '@ngrx/store';
import { StateWithAnonymousConsents } from '../anonymous-consents-state';
export declare const getAnonymousConsentTemplatesUpdate: MemoizedSelector<StateWithAnonymousConsents, boolean>;
export declare const getAnonymousConsentsBannerDismissed: MemoizedSelector<StateWithAnonymousConsents, boolean>;
