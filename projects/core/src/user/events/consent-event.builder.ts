import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AnonymousConsentsActions } from '../../anonymous-consents';
import { EventService } from '../../event';
import { createFrom } from '../../util';
import { UserConsentService } from '../facade/user-consent.service';
import { UserActions } from '../store';
import {
  AnonymousConsentsSetEvent,
  ConsentGivenEvent,
  ConsentWithdrawnEvent,
  UserConsentsLoadedEvent,
} from './consent.events';

@Injectable({ providedIn: 'root' })
export class ConsentEventBuilder {
  constructor(
    protected userConsentService: UserConsentService,
    protected eventService: EventService,
    protected actionSubject: ActionsSubject
  ) {
    this.register();
  }

  protected register(): void {
    this.buildConsentGivenEvent();
    this.buildAnonymousConsentWithdrawnEvent();
    this.buildUserConsentWithdrawnEvent();
    this.buildAnonymousConsentsSetEvent();
    this.buildUserConsentsLoadedEvent();
  }

  protected buildConsentGivenEvent(): void {
    const giveConsentEvent$ = this.actionSubject.pipe(
      ofType<
        | AnonymousConsentsActions.GiveAnonymousConsent
        | UserActions.GiveUserConsentSuccess
      >(
        AnonymousConsentsActions.GIVE_ANONYMOUS_CONSENT,
        UserActions.GIVE_USER_CONSENT_SUCCESS
      ),
      map((consent) =>
        createFrom(ConsentGivenEvent, {
          consent:
            (consent as UserActions.GiveUserConsentSuccess).consentTemplate
              ?.id ??
            (consent as AnonymousConsentsActions.GiveAnonymousConsent)
              .templateCode,
        })
      )
    );

    this.eventService.register(ConsentGivenEvent, giveConsentEvent$);
  }

  protected buildAnonymousConsentWithdrawnEvent(): void {
    const withdrawConsentEvent$ = this.actionSubject.pipe(
      ofType<AnonymousConsentsActions.WithdrawAnonymousConsent>(
        AnonymousConsentsActions.WITHDRAW_ANONYMOUS_CONSENT
      ),
      map((consent) =>
        createFrom(ConsentWithdrawnEvent, {
          consent: consent.templateCode,
        })
      )
    );

    this.eventService.register(ConsentWithdrawnEvent, withdrawConsentEvent$);
  }

  protected buildUserConsentWithdrawnEvent(): void {
    const withdrawConsentEvent$ = this.actionSubject.pipe(
      ofType<UserActions.WithdrawUserConsentSuccess>(
        UserActions.WITHDRAW_USER_CONSENT_SUCCESS
      ),
      switchMap((consent) =>
        of(consent).pipe(
          withLatestFrom(
            this.userConsentService.getConsentTemplateByConsentCode(
              consent.consentCode
            )
          )
        )
      ),
      filter(([, template]) => isNotUndefined(template)),
      map(([, template]) =>
        createFrom(ConsentWithdrawnEvent, {
          consent: template?.id,
        })
      )
    );

    this.eventService.register(ConsentWithdrawnEvent, withdrawConsentEvent$);
  }

  protected buildAnonymousConsentsSetEvent(): void {
    const anonymousConsentsSetEvent$ = this.actionSubject.pipe(
      ofType<AnonymousConsentsActions.SetAnonymousConsents>(
        AnonymousConsentsActions.SET_ANONYMOUS_CONSENTS
      ),
      map((consent) =>
        createFrom(AnonymousConsentsSetEvent, {
          consentTemplates: consent.payload,
        })
      )
    );

    this.eventService.register(
      AnonymousConsentsSetEvent,
      anonymousConsentsSetEvent$
    );
  }

  protected buildUserConsentsLoadedEvent(): void {
    const userConsentsLoadedEvent$ = this.actionSubject.pipe(
      ofType<UserActions.LoadUserConsentsSuccess>(
        UserActions.LOAD_USER_CONSENTS_SUCCESS
      ),
      map((consent) =>
        createFrom(UserConsentsLoadedEvent, {
          consentTemplates: consent.payload,
        })
      )
    );

    this.eventService.register(
      UserConsentsLoadedEvent,
      userConsentsLoadedEvent$
    );
  }
}

// TODO: use global helper
function isNotUndefined<T>(v: T | undefined): v is T {
  return v !== undefined;
}
