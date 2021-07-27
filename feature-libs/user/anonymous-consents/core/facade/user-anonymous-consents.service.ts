import { Injectable } from '@angular/core';
import { LogoutEvent, Query, QueryService } from '@spartacus/core';
import {
  AnonymousConsent,
  UserAnonymousConsentsFacade,
} from '@spartacus/user/anonymous-consents/root';
import { Observable } from 'rxjs';
import { UserAnonymousConsentTemplatesConnector } from '../connectors/user-anonymous-consent-templates.connector';

// TODO:#anon - test
@Injectable()
export class UserAnonymousConsentsService
  implements UserAnonymousConsentsFacade {
  protected userQuery: Query<AnonymousConsent[]> = this.query.create(
    () => this.userAnonymousConsentConnector.loadAnonymousConsents(),
    {
      reloadOn: [LogoutEvent],
    }
  );

  constructor(
    protected userAnonymousConsentConnector: UserAnonymousConsentTemplatesConnector,
    protected query: QueryService
  ) {}

  /**
   * Returns the anonymous consents.
   */
  get(): Observable<AnonymousConsent[] | undefined> {
    return this.userQuery.get();
  }
}
