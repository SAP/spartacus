import { Injectable, OnDestroy } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { CdcUserConsentService } from '../../root/consent-management';
import { Subscription } from 'rxjs';
import { CdcReConsentEvent } from '../../root/events';
import { CdcJsService } from '../../root/service';

@Injectable({
  providedIn: 'root',
})
export class CdcReconsentService implements OnDestroy {
  constructor(
    protected cdcUserConsentService: CdcUserConsentService,
    protected cdcJsService: CdcJsService,
    protected globalMessageService: GlobalMessageService
  ) {}
  protected subscription: Subscription = new Subscription();
  saveConsent(consentId: string[], user: string): void {
    this.subscription.add(
      this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
        if (cdcLoaded) {
          consentId.forEach((consentTemplateId) => {
            this.cdcUserConsentService
              .updateCdcConsent(true, consentTemplateId, user)
              .subscribe({
                next: () => {},
                error: (errorResponse) => {
                  console.log(errorResponse);
                },
              });
          });
        } else {
          // CDC Gigya SDK not loaded, show error to the user
          this.globalMessageService.add(
            {
              key: 'errorHandlers.scriptFailedToLoad',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        }
      })
    );
  }
  generateCdcReConsentEvent(
    user: string,
    reconsentIds: string[],
    errorMessage: string
  ): CdcReConsentEvent {
    const newReConsentEvent = new CdcReConsentEvent();
    newReConsentEvent.user = user;
    newReConsentEvent.consentIds = this.fetchReconsentIDs(reconsentIds);
    newReConsentEvent.errorMessage = errorMessage;
    return newReConsentEvent;
  }
  fetchReconsentIDs(reconsentIds: string[]): string[] {
    var consentIds: string[] = [];
    reconsentIds.forEach((template) => {
      let removePreference = template.replace('preferences.', '');
      let removeIsConsentGranted = removePreference.replace(
        '.isConsentGranted',
        ''
      );
      consentIds.push(removeIsConsentGranted);
    });
    return consentIds;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
