import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { AuthActions, ConsentService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, mapTo, take } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';
import { ConsentChangedPushEvent } from '../model/profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagLifecycleService {
  constructor(
    protected consentService: ConsentService,
    protected config: CdsConfig,
    protected actionsSubject: ActionsSubject
  ) {}

  /**
   * We are only interested in the first time the ProfileConsent is granted
   */
  consentGranted(): Observable<ConsentChangedPushEvent> {
    return this.consentService
      .getConsent(this.config.cds.consentTemplateId)
      .pipe(
        filter(Boolean),
        filter((profileConsent) => {
          return this.consentService.isConsentGiven(profileConsent);
        }),
        mapTo(true),
        map((granted) => {
          return new ConsentChangedPushEvent(granted);
        }),
        take(1)
      );
  }

  loginSuccessful(): Observable<boolean> {
    return this.actionsSubject.pipe(
      filter((action) => action.type === AuthActions.LOGIN),
      mapTo(true)
    );
  }
  
}
