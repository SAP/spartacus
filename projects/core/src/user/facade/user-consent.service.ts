import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { iif, Observable } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Consent, ConsentTemplate } from '../../model/consent.model';
import { StateWithProcess } from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import {
  GIVE_CONSENT_PROCESS_ID,
  StateWithUser,
  WITHDRAW_CONSENT_PROCESS_ID,
} from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserConsentService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService: AuthService,
    protected userIdService: UserIdService
  ) {}

  /**
   * Retrieves all consents.
   */
  loadConsents(): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(new UserActions.LoadUserConsents(userId));
    });
  }

  /**
   * Returns all consent templates. If `loadIfMissing` parameter is set to `true`, the method triggers the load if consent templates.
   * @param loadIfMissing is set to `true`, the method will load templates if those are not already present. The default value is `false`.
   */
  getConsents(loadIfMissing = false): Observable<ConsentTemplate[]> {
    return iif(
      () => loadIfMissing,
      this.store.pipe(
        select(UsersSelectors.getConsentsValue),
        withLatestFrom(
          this.getConsentsResultLoading(),
          this.getConsentsResultSuccess()
        ),
        filter(([_templates, loading, _success]) => !loading),
        tap(([templates, _loading, success]) => {
          if (!templates || templates.length === 0) {
            // avoid infinite loop - if we've already attempted to load templates and we got an empty array as the response
            if (!success) {
              this.loadConsents();
            }
          }
        }),
        filter(([templates, _loading]) => Boolean(templates)),
        map(([templates, _loading]) => templates)
      ),
      this.store.pipe(select(UsersSelectors.getConsentsValue))
    );
  }

  /**
   * Returns the consents loading flag
   */
  getConsentsResultLoading(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getConsentsLoading));
  }

  /**
   * Returns the consents success flag
   */
  getConsentsResultSuccess(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getConsentsSuccess));
  }

  /**
   * Returns the consents error flag
   */
  getConsentsResultError(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getConsentsError));
  }

  /**
   * Resets the processing state for consent retrieval
   */
  resetConsentsProcessState(): void {
    this.store.dispatch(new UserActions.ResetLoadUserConsents());
  }

  /**
   * Returns the registered consent for the given template ID.
   *
   * As a side-effect, the method will call `getConsents(true)` to load the templates if those are not present.
   *
   * @param templateId a template ID by which to filter the registered templates.
   */
  getConsent(templateId: string): Observable<Consent> {
    return this.authService.isUserLoggedIn().pipe(
      filter(Boolean),
      switchMap(() => this.getConsents(true)),
      switchMap(() =>
        this.store.pipe(
          select(UsersSelectors.getConsentByTemplateId(templateId))
        )
      ),
      filter((template) => Boolean(template)),
      map((template) => template.currentConsent)
    );
  }

  /**
   * Returns `true` if the consent is truthy and if `consentWithdrawnDate` doesn't exist.
   * Otherwise, `false` is returned.
   *
   * @param consent to check
   */
  isConsentGiven(consent: Consent): boolean {
    return (
      Boolean(consent) &&
      Boolean(consent.consentGivenDate) &&
      !Boolean(consent.consentWithdrawnDate)
    );
  }

  /**
   * Returns `true` if the consent is either falsy or if `consentWithdrawnDate` is present.
   * Otherwise, `false` is returned.
   *
   * @param consent to check
   */
  isConsentWithdrawn(consent: Consent): boolean {
    if (Boolean(consent)) {
      return Boolean(consent.consentWithdrawnDate);
    }
    return true;
  }

  /**
   * Give consent for specified consent template ID and version.
   * @param consentTemplateId a template ID for which to give a consent
   * @param consentTemplateVersion a template version for which to give a consent
   */
  giveConsent(consentTemplateId: string, consentTemplateVersion: number): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.GiveUserConsent({
          userId,
          consentTemplateId,
          consentTemplateVersion,
        })
      );
    });
  }

  /**
   * Returns the give consent process loading flag
   */
  getGiveConsentResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(GIVE_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Returns the give consent process success flag
   */
  getGiveConsentResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(GIVE_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Returns the give consent process error flag
   */
  getGiveConsentResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(GIVE_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Resents the give consent process flags
   */
  resetGiveConsentProcessState(): void {
    return this.store.dispatch(new UserActions.ResetGiveUserConsentProcess());
  }

  /**
   * Withdraw consent for the given `consentCode`
   * @param consentCode for which to withdraw the consent
   */
  withdrawConsent(consentCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.WithdrawUserConsent({
          userId,
          consentCode,
        })
      );
    });
  }

  /**
   * Returns the withdraw consent process loading flag
   */
  getWithdrawConsentResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(WITHDRAW_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Returns the withdraw consent process success flag
   */
  getWithdrawConsentResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(WITHDRAW_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Returns the withdraw consent process error flag
   */
  getWithdrawConsentResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(WITHDRAW_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Resets the process flags for withdraw consent
   */
  resetWithdrawConsentProcessState(): void {
    return this.store.dispatch(
      new UserActions.ResetWithdrawUserConsentProcess()
    );
  }

  /**
   * Filters the provided `templateList`' templates by hiding the template IDs specified in `hideTemplateIds`.
   * If the `hideTemplateIds` is empty, the provided `templateList` is returned.
   *
   * @param templateList a list of consent templates to filter
   * @param hideTemplateIds template IDs to hide
   */
  filterConsentTemplates(
    templateList: ConsentTemplate[],
    hideTemplateIds: string[] = []
  ): ConsentTemplate[] {
    if (hideTemplateIds.length === 0) {
      return templateList;
    }

    const updatedTemplateList: ConsentTemplate[] = [];
    for (const template of templateList) {
      const show = !hideTemplateIds.includes(template.id);
      if (show) {
        updatedTemplateList.push(template);
      }
    }

    return updatedTemplateList;
  }
}
