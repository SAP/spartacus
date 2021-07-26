import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { USER_ANONYMOUS_CONSENTS_FEATURE } from '../feature-name';
import { AnonymousConsent } from '../model/user-anonymous-consents.model';

export function userAnonymousConsentsFacadeFactory() {
  return facadeFactory({
    facade: UserAnonymousConsentsFacade,
    feature: USER_ANONYMOUS_CONSENTS_FEATURE,
    methods: ['get'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: userAnonymousConsentsFacadeFactory,
})
export abstract class UserAnonymousConsentsFacade {
  abstract get(): Observable<AnonymousConsent[] | undefined>;
}
