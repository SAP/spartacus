import { Injectable, OnDestroy } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { CdcUserConsentService } from '../../root/consent-management';
import { Subscription } from 'rxjs';
import { CdcJsService } from '../../root/service';

@Injectable({ providedIn: 'root' })
export class CdcReconsentService implements OnDestroy {
  constructor(
    protected cdcUserConsentService: CdcUserConsentService,
    protected cdcJsService: CdcJsService,
    protected globalMessageService: GlobalMessageService
  ) {}
  protected subscription: Subscription = new Subscription();
  saveReconsent(consentId: string[], userParams: any): string {
    var errorMessage: string = '';
    this.subscription.add(
      this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
        if (cdcLoaded) {
          consentId.forEach((consentTemplateId) => {
            this.cdcUserConsentService
              .updateCdcConsent(
                true,
                consentTemplateId,
                userParams?.user,
                userParams?.regToken
              )
              .subscribe({
                next: (result) => {
                  if (result?.errorCode !== 0)
                    errorMessage = result?.errorMessage;
                  else this.reLogin(userParams.user, userParams.password);
                },
                error: (error) => {
                  errorMessage = error?.errorMessage;
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
    return errorMessage;
  }
  reLogin(userId: string, password: string): void {
    this.subscription.add(
      this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
        if (cdcLoaded) {
          // Logging in using CDC Gigya SDK
          this.cdcJsService
            .loginUserWithoutScreenSet(userId, password)
            .subscribe();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
