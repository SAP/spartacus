import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthService,
  Consent,
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  MockTranslatePipe,
  Translatable,
  TranslatePipe,
  UserConsentService,
} from '@spartacus/core';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { MyAccountV2ConsentManagementFormComponent } from './consent-form/my-account-v2-consent-management-form.component';
import { EMPTY, Observable, of } from 'rxjs';
import { ConsentManagementComponentService } from '../../../consent-management/consent-management-component.service';
import { MyAccountV2ConsentManagementComponent } from './my-account-v2-consent-management.component';

@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

@Component({
  selector: 'cx-my-account-v2-consent-management',
  template: ` <div>form</div> `,
})
class MockConsentManagementFormComponent {
  @Input()
  consentTemplate: ConsentTemplate;
  @Input()
  requiredConsents: string[] = [];
  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();
}

class UserConsentServiceMock {
  loadConsents(): void {}
  getConsentsResultLoading(): Observable<boolean> {
    return EMPTY;
  }
  getGiveConsentResultLoading(): Observable<boolean> {
    return EMPTY;
  }
  getGiveConsentResultSuccess(): Observable<boolean> {
    return EMPTY;
  }
  getWithdrawConsentResultLoading(): Observable<boolean> {
    return EMPTY;
  }
  getWithdrawConsentResultSuccess(): Observable<boolean> {
    return EMPTY;
  }
  getConsents(): Observable<ConsentTemplate[]> {
    return EMPTY;
  }
  giveConsent(
    _consentTemplateId: string,
    _consentTemplateVersion: number
  ): void {}
  resetGiveConsentProcessState(): void {}
  withdrawConsent(_consentCode: string): void {}
  resetWithdrawConsentProcessState(): void {}
  filterConsentTemplates(
    _templateList: ConsentTemplate[],
    _hideTemplateIds: string[] = []
  ): ConsentTemplate[] {
    return [];
  }
  isConsentGiven(_consent: Consent): boolean {
    return false;
  }
  isConsentWithdrawn(_consent: Consent): boolean {
    return false;
  }
}

class AnonymousConsentsServiceMock {
  getTemplates(): Observable<ConsentTemplate[]> {
    return of([]);
  }
}

class GlobalMessageServiceMock {
  add(_text: string | Translatable, _type: GlobalMessageType): void {}
}

class AuthServiceMock {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

const mockConsentTemplate: ConsentTemplate = {
  id: 'mock ID',
  version: 0,
  currentConsent: {
    code: 'mock code',
  },
};

describe('MyAccountV2ConsentManagementComponent', () => {
  let component: MyAccountV2ConsentManagementComponent;
  let fixture: ComponentFixture<MyAccountV2ConsentManagementComponent>;
  let el: DebugElement;

  let userService: UserConsentService;
  let globalMessageService: GlobalMessageService;
  let anonymousConsentsConfig: AnonymousConsentsConfig;
  let anonymousConsentsService: AnonymousConsentsService;

  beforeEach(async () => {
    const mockAnonymousConsentsConfig = {
      anonymousConsents: {},
    };

    TestBed.configureTestingModule({
      imports: [MyAccountV2ConsentManagementComponent],
      providers: [
        ConsentManagementComponentService,
        { provide: UserConsentService, useClass: UserConsentServiceMock },
        { provide: GlobalMessageService, useClass: GlobalMessageServiceMock },
        {
          provide: AnonymousConsentsService,
          useClass: AnonymousConsentsServiceMock,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: AnonymousConsentsConfig,
          useValue: mockAnonymousConsentsConfig,
        },
      ],
    })
      .overrideComponent(MyAccountV2ConsentManagementComponent, {
        remove: {
          imports: [
            TranslatePipe,
            SpinnerComponent,
            MyAccountV2ConsentManagementFormComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockCxSpinnerComponent,
            MockConsentManagementFormComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2ConsentManagementComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userService = TestBed.inject(UserConsentService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    anonymousConsentsConfig = TestBed.inject(AnonymousConsentsConfig);
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  const consentListInitMethod = 'consentListInit';
  const giveConsentInitMethod = 'giveConsentInit';
  const withdrawConsentInitMethod = 'withdrawConsentInit';
  const consentsExistsMethod = 'consentsExists';
  const onConsentGivenSuccessMethod = 'onConsentGivenSuccess';
  const onConsentWithdrawnSuccessMethod = 'onConsentWithdrawnSuccess';
  const hideAnonymousConsentsMethod = 'hideAnonymousConsents';

  describe('component method tests', () => {
    describe('ngOnInit', () => {
      it('should combine all loading flags into one', async () => {
        vi.useFakeTimers();
        vi.spyOn(userService, 'getConsentsResultLoading').mockReturnValue(
          of(true)
        );
        vi.spyOn(userService, 'getGiveConsentResultLoading').mockReturnValue(
          of(false)
        );
        vi.spyOn(userService, 'getWithdrawConsentResultLoading').mockReturnValue(
          of(false)
        );

        component.ngOnInit();
        expect(userService.getConsentsResultLoading).toHaveBeenCalled();
        expect(userService.getGiveConsentResultLoading).toHaveBeenCalled();
        expect(userService.getWithdrawConsentResultLoading).toHaveBeenCalled();

        let loadingResult = false;
        const sub = component.loading$.subscribe(
          (result) => (loadingResult = result)
        );
        await vi.advanceTimersByTimeAsync(300);
        vi.useRealTimers();
        sub.unsubscribe();
        expect(loadingResult).toEqual(true);
      });

      it('should call all init methods', () => {
        vi.spyOn<any>(component, consentListInitMethod).mockImplementation(() => {});
        vi.spyOn<any>(component, giveConsentInitMethod).mockImplementation(() => {});
        vi.spyOn<any>(component, withdrawConsentInitMethod).mockImplementation(() => {});

        component.ngOnInit();
        expect(component[consentListInitMethod]).toHaveBeenCalled();
        expect(component[giveConsentInitMethod]).toHaveBeenCalled();
        expect(component[withdrawConsentInitMethod]).toHaveBeenCalled();
      });
    });

    describe(consentListInitMethod, () => {
      describe('when there are no consents loaded', () => {
        const mockTemplateList = [] as ConsentTemplate[];
        it('should trigger the loadConsents method', () => {
          vi.spyOn(userService, 'getConsents').mockReturnValue(
            of(mockTemplateList)
          );
          vi.spyOn<any>(component, consentsExistsMethod).mockReturnValue(false);
          vi.spyOn(userService, 'loadConsents').mockImplementation(() => {});

          component[consentListInitMethod]();

          let result: ConsentTemplate[];
          component.templateList$
            .subscribe((templates) => (result = templates))
            .unsubscribe();
          expect(result).toEqual(mockTemplateList);
          expect(component[consentsExistsMethod]).toHaveBeenCalledWith(
            mockTemplateList
          );
          expect(userService.loadConsents).toHaveBeenCalled();
        });
      });
      describe('when the consents are already present', () => {
        const mockTemplateList: ConsentTemplate[] = [mockConsentTemplate];
        it('should not trigger loading of consents and should return consent template list', () => {
          vi.spyOn(userService, 'getConsents').mockReturnValue(
            of(mockTemplateList)
          );
          vi.spyOn<any>(component, consentsExistsMethod).mockReturnValue(true);
          vi.spyOn(userService, 'loadConsents').mockImplementation(() => {});

          component[consentListInitMethod]();

          let result: ConsentTemplate[];
          component.templateList$
            .subscribe((templates) => (result = templates))
            .unsubscribe();
          expect(result).toEqual(mockTemplateList);
          expect(component[consentsExistsMethod]).toHaveBeenCalledWith(
            mockTemplateList
          );
          expect(userService.loadConsents).not.toHaveBeenCalled();
        });
      });
      describe('when the anonymousConsents.consentManagementPage config is defined', () => {
        it(`should call ${hideAnonymousConsentsMethod} method`, () => {
          const mockTemplateList: ConsentTemplate[] = [mockConsentTemplate];
          vi.spyOn(userService, 'getConsents').mockReturnValue(
            of(mockTemplateList)
          );
          vi.spyOn<any>(component, hideAnonymousConsentsMethod).mockReturnValue(
            mockTemplateList
          );
          const mockAnonymousConsentTemplates: ConsentTemplate[] = [
            { id: 'MARKETING' },
          ];
          vi.spyOn(anonymousConsentsService, 'getTemplates').mockReturnValue(
            of(mockAnonymousConsentTemplates)
          );
          anonymousConsentsConfig.anonymousConsents.consentManagementPage = {};

          component[consentListInitMethod]();

          let result: ConsentTemplate[];
          component.templateList$
            .subscribe((templates) => (result = templates))
            .unsubscribe();
          expect(result).toEqual(mockTemplateList);
          expect(anonymousConsentsService.getTemplates).toHaveBeenCalled();
          expect(component[hideAnonymousConsentsMethod]).toHaveBeenCalledWith(
            mockTemplateList,
            mockAnonymousConsentTemplates
          );
        });
      });
    });

    describe(giveConsentInitMethod, () => {
      it('should reset the processing state', () => {
        vi.spyOn(userService, 'resetGiveConsentProcessState').mockImplementation(() => {});
        component[giveConsentInitMethod]();
        expect(userService.resetGiveConsentProcessState).toHaveBeenCalled();
      });
      it(`should call ${onConsentGivenSuccessMethod}`, () => {
        const success = true;
        vi.spyOn(userService, 'getGiveConsentResultSuccess').mockReturnValue(
          of(success)
        );
        vi.spyOn<any>(component, onConsentGivenSuccessMethod).mockImplementation(() => {});

        component[giveConsentInitMethod]();
        expect(component[onConsentGivenSuccessMethod]).toHaveBeenCalledWith(
          success
        );
      });
    });

    describe(withdrawConsentInitMethod, () => {
      it('should reset the processing state', () => {
        vi.spyOn(userService, 'resetWithdrawConsentProcessState').mockImplementation(() => {});
        component[withdrawConsentInitMethod]();
        expect(userService.resetWithdrawConsentProcessState).toHaveBeenCalled();
      });
      it(`should load all consents if the withdrawal was successful and call ${onConsentWithdrawnSuccessMethod}`, () => {
        const withdrawalSuccess = true;
        vi.spyOn(userService, 'getWithdrawConsentResultLoading').mockReturnValue(
          of(false)
        );
        vi.spyOn(userService, 'getWithdrawConsentResultSuccess').mockReturnValue(
          of(withdrawalSuccess)
        );
        vi.spyOn(userService, 'loadConsents').mockImplementation(() => {});
        vi.spyOn<any>(component, onConsentWithdrawnSuccessMethod).mockImplementation(() => {});

        component[withdrawConsentInitMethod]();

        expect(userService.loadConsents).toHaveBeenCalled();
        expect(component[onConsentWithdrawnSuccessMethod]).toHaveBeenCalledWith(
          withdrawalSuccess
        );
      });
      it('should NOT load all consents if the withdrawal was NOT successful', () => {
        vi.spyOn(userService, 'getWithdrawConsentResultLoading').mockReturnValue(
          of(false)
        );
        vi.spyOn(userService, 'getWithdrawConsentResultSuccess').mockReturnValue(
          of(false)
        );
        vi.spyOn(userService, 'loadConsents').mockImplementation(() => {});

        component[withdrawConsentInitMethod]();

        expect(userService.loadConsents).not.toHaveBeenCalled();
      });
    });

    describe(consentsExistsMethod, () => {
      describe('when undefined is provided', () => {
        it('should return false', () => {
          expect(component[consentsExistsMethod](undefined)).toEqual(false);
        });
      });
      describe('when consentTemplates do not exist', () => {
        it('should return false', () => {
          const consentTemplateList = {} as ConsentTemplate[];
          expect(component[consentsExistsMethod](consentTemplateList)).toEqual(
            false
          );
        });
      });
      describe('when consentTemplates are an empty array', () => {
        it('should return false', () => {
          const consentTemplateList: ConsentTemplate[] = [];
          expect(component[consentsExistsMethod](consentTemplateList)).toEqual(
            false
          );
        });
      });
      describe('when consentTemplates are present', () => {
        it('should return true', () => {
          const consentTemplateList: ConsentTemplate[] = [mockConsentTemplate];
          expect(component[consentsExistsMethod](consentTemplateList)).toEqual(
            true
          );
        });
      });
    });

    describe('onConsentChange', () => {
      describe('when the consent was given', () => {
        it('should call facades giveConsent method', () => {
          vi.spyOn(userService, 'giveConsent').mockImplementation(() => {});
          vi.spyOn(userService, 'withdrawConsent').mockImplementation(() => {});

          component.onConsentChange({
            given: true,
            template: mockConsentTemplate,
          });

          expect(userService.giveConsent).toHaveBeenCalledWith(
            mockConsentTemplate.id,
            mockConsentTemplate.version
          );
          expect(userService.withdrawConsent).not.toHaveBeenCalled();
        });
      });
      describe('when the consent was NOT given', () => {
        it('should call facades withdrawConsent method', () => {
          vi.spyOn(userService, 'giveConsent').mockImplementation(() => {});
          vi.spyOn(userService, 'withdrawConsent').mockImplementation(() => {});

          component.onConsentChange({
            given: false,
            template: mockConsentTemplate,
          });

          expect(userService.withdrawConsent).toHaveBeenCalledWith(
            mockConsentTemplate.currentConsent.code,
            mockConsentTemplate.id
          );
          expect(userService.giveConsent).not.toHaveBeenCalled();
        });
      });
    });

    describe(onConsentGivenSuccessMethod, () => {
      describe('when the consent was NOT successfully given', () => {
        it('should NOT reset the processing state and display a success message', () => {
          vi.spyOn(userService, 'resetGiveConsentProcessState').mockImplementation(() => {});
          vi.spyOn(globalMessageService, 'add').mockImplementation(() => {});

          component[onConsentGivenSuccessMethod](false);

          expect(
            userService.resetGiveConsentProcessState
          ).not.toHaveBeenCalled();
          expect(globalMessageService.add).not.toHaveBeenCalled();
        });
      });
      describe('when the consent was successfully given', () => {
        it('should reset the processing state and display a success message', () => {
          vi.spyOn(userService, 'resetGiveConsentProcessState').mockImplementation(() => {});
          vi.spyOn(globalMessageService, 'add').mockImplementation(() => {});

          component[onConsentGivenSuccessMethod](true);

          expect(userService.resetGiveConsentProcessState).toHaveBeenCalled();
          expect(globalMessageService.add).toHaveBeenCalledWith(
            { key: 'consentManagementForm.message.success.given' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        });
      });
    });

    describe(onConsentWithdrawnSuccessMethod, () => {
      describe('when the consent was NOT successfully withdrawn', () => {
        it('should NOT reset the processing state and display a success message', () => {
          vi.spyOn(userService, 'resetWithdrawConsentProcessState').mockImplementation(() => {});
          vi.spyOn(globalMessageService, 'add').mockImplementation(() => {});

          component[onConsentWithdrawnSuccessMethod](false);

          expect(
            userService.resetWithdrawConsentProcessState
          ).not.toHaveBeenCalled();
          expect(globalMessageService.add).not.toHaveBeenCalled();
        });
      });
      describe('when the consent was successfully withdrawn', () => {
        it('should reset the processing state and display a success message', () => {
          vi.spyOn(userService, 'resetWithdrawConsentProcessState').mockImplementation(() => {});
          vi.spyOn(globalMessageService, 'add').mockImplementation(() => {});

          component[onConsentWithdrawnSuccessMethod](true);

          expect(
            userService.resetWithdrawConsentProcessState
          ).toHaveBeenCalled();
          expect(globalMessageService.add).toHaveBeenCalledWith(
            { key: 'consentManagementForm.message.success.withdrawn' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        });
      });
    });

    const isRequiredConsentMethod = 'isRequiredConsent';
    describe(isRequiredConsentMethod, () => {
      describe('when the requiredConsents is NOT configured', () => {
        it('should return false', () => {
          anonymousConsentsConfig.anonymousConsents.requiredConsents =
            undefined;
          const result =
            component[isRequiredConsentMethod](mockConsentTemplate);
          expect(result).toEqual(false);
        });
      });
      describe('when the requiredConsents is configured', () => {
        it('should return true', () => {
          anonymousConsentsConfig.anonymousConsents.requiredConsents = [
            mockConsentTemplate.id,
          ];
          const result =
            component[isRequiredConsentMethod](mockConsentTemplate);
          expect(result).toEqual(true);
        });
      });
    });

    describe('rejectAll', () => {
      describe('when no consent is given', () => {
        it('should not call userConsentService.withdrawConsent', () => {
          vi.spyOn(userService, 'withdrawConsent').mockImplementation(() => {});
          vi.spyOn(userService, 'loadConsents').mockImplementation(() => {});
          component.rejectAll([]);
          expect(userService.withdrawConsent).not.toHaveBeenCalled();
        });
      });
      describe('when consents are given', () => {
        it('should call userConsentService.withdrawConsent for each', () => {
          vi.spyOn(userService, 'withdrawConsent').mockImplementation(() => {});
          vi.spyOn(userService, 'isConsentGiven').mockReturnValue(true);
          vi.spyOn(userService, 'getWithdrawConsentResultLoading').mockReturnValue(
            of(false)
          );

          component.rejectAll([mockConsentTemplate]);

          expect(userService.withdrawConsent).toHaveBeenCalledWith(
            mockConsentTemplate.currentConsent.code,
            mockConsentTemplate.id
          );
          expect(userService.withdrawConsent).toHaveBeenCalledTimes(1);
        });
      });
      describe('when the required consents are configured', () => {
        it('should skip them', () => {
          anonymousConsentsConfig.anonymousConsents.requiredConsents = [
            mockConsentTemplate[0],
          ];
          vi.spyOn(userService, 'withdrawConsent').mockImplementation(() => {});
          vi.spyOn(userService, 'loadConsents').mockImplementation(() => {});
          vi.spyOn(userService, 'isConsentGiven').mockReturnValue(true);
          vi.spyOn<any>(component, isRequiredConsentMethod).mockReturnValue(true);

          component.rejectAll([mockConsentTemplate]);

          expect(userService.withdrawConsent).not.toHaveBeenCalled();
        });
      });
    });

    describe('allowAll', () => {
      describe('when no consent is withdrawn', () => {
        it('should not call userConsentService.giveConsent', () => {
          vi.spyOn(userService, 'giveConsent').mockImplementation(() => {});
          vi.spyOn(userService, 'loadConsents').mockImplementation(() => {});
          component.allowAll([]);
          expect(userService.giveConsent).not.toHaveBeenCalled();
        });
      });
      describe('when consents are withdrawn', () => {
        it('should call userConsentService.giveConsent for each', () => {
          vi.spyOn(userService, 'giveConsent').mockImplementation(() => {});
          vi.spyOn(userService, 'isConsentWithdrawn').mockReturnValue(true);
          vi.spyOn(userService, 'getGiveConsentResultLoading').mockReturnValue(
            of(false)
          );

          component.allowAll([mockConsentTemplate]);

          expect(userService.giveConsent).toHaveBeenCalledWith(
            mockConsentTemplate.id,
            mockConsentTemplate.version
          );
          expect(userService.giveConsent).toHaveBeenCalledTimes(1);
        });
      });
      describe('when the required consents are configured', () => {
        it('should skip them', () => {
          anonymousConsentsConfig.anonymousConsents.requiredConsents = [
            mockConsentTemplate[0],
          ];
          vi.spyOn(userService, 'giveConsent').mockImplementation(() => {});
          vi.spyOn(userService, 'loadConsents').mockImplementation(() => {});
          vi.spyOn(userService, 'isConsentWithdrawn').mockReturnValue(true);
          vi.spyOn<any>(component, isRequiredConsentMethod).mockReturnValue(true);

          component.allowAll([mockConsentTemplate]);

          expect(userService.giveConsent).not.toHaveBeenCalled();
        });
      });
    });

    describe('ngOnDestroy', () => {
      it('should unsubscribe and reset the processing states', () => {
        vi.spyOn(component['subscriptions'], 'unsubscribe').mockImplementation(() => {});
        vi.spyOn(userService, 'resetGiveConsentProcessState').mockImplementation(() => {});
        vi.spyOn(userService, 'resetWithdrawConsentProcessState').mockImplementation(() => {});

        component.ngOnDestroy();

        expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
        expect(userService.resetGiveConsentProcessState).toHaveBeenCalled();
        expect(userService.resetWithdrawConsentProcessState).toHaveBeenCalled();
      });
    });

    describe(hideAnonymousConsentsMethod, () => {
      const mockConsentTemplates = [mockConsentTemplate];
      const anonymousTemplates: ConsentTemplate[] = [{ id: 'MARKETING' }];
      const hideConsents: string[] = ['MARKETING'];
      describe('when the showAnonymousConsents config is false', () => {
        it('should filter with the provided anonymousTemplates', () => {
          anonymousConsentsConfig.anonymousConsents.consentManagementPage = {
            showAnonymousConsents: false,
            hideConsents,
          };
          vi.spyOn(userService, 'filterConsentTemplates').mockReturnValue(
            mockConsentTemplates
          );

          const result = component[hideAnonymousConsentsMethod](
            mockConsentTemplates,
            anonymousTemplates
          );
          expect(result).toEqual(mockConsentTemplates);
          expect(userService.filterConsentTemplates).toHaveBeenCalledWith(
            mockConsentTemplates,
            hideConsents
          );
        });
      });
      describe('when the showAnonymousConsents config is true', () => {
        it('should check hideConsents config and filter with provided hideConsents', () => {
          anonymousConsentsConfig.anonymousConsents.consentManagementPage = {
            showAnonymousConsents: true,
            hideConsents,
          };
          vi.spyOn(userService, 'filterConsentTemplates').mockReturnValue(
            mockConsentTemplates
          );

          const result = component[hideAnonymousConsentsMethod](
            mockConsentTemplates,
            anonymousTemplates
          );
          expect(result).toEqual(mockConsentTemplates);
          expect(userService.filterConsentTemplates).toHaveBeenCalledWith(
            mockConsentTemplates,
            hideConsents
          );
          expect(userService.filterConsentTemplates).toHaveBeenCalledWith(
            mockConsentTemplates,
            hideConsents
          );
        });
      });
    });
  });

  describe('component UI tests', () => {
    describe('spinner', () => {
      describe('when consents are loading', () => {
        it('should show spinner', async () => {
          vi.useFakeTimers();
          vi.spyOn(userService, 'getConsentsResultLoading').mockReturnValue(
            of(true)
          );
          vi.spyOn(userService, 'getGiveConsentResultLoading').mockReturnValue(
            of(false)
          );
          vi.spyOn(userService, 'getWithdrawConsentResultLoading').mockReturnValue(
            of(false)
          );
          vi.spyOn<any>(component, consentListInitMethod).mockImplementation(() => {});
          vi.spyOn<any>(component, giveConsentInitMethod).mockImplementation(() => {});
          vi.spyOn<any>(component, withdrawConsentInitMethod).mockImplementation(() => {});

          component.ngOnInit();
          fixture.detectChanges();
          await vi.advanceTimersByTimeAsync(300);
          vi.useRealTimers();
          fixture.detectChanges();

          expect(el.query(By.css('cx-spinner'))).toBeTruthy();
        });
      });
      describe('when a consent is being given', () => {
        it('should show spinner', async () => {
          vi.useFakeTimers();
          vi.spyOn(userService, 'getConsentsResultLoading').mockReturnValue(
            of(false)
          );
          vi.spyOn(userService, 'getGiveConsentResultLoading').mockReturnValue(
            of(true)
          );
          vi.spyOn(userService, 'getWithdrawConsentResultLoading').mockReturnValue(
            of(false)
          );
          vi.spyOn<any>(component, consentListInitMethod).mockImplementation(() => {});
          vi.spyOn<any>(component, giveConsentInitMethod).mockImplementation(() => {});
          vi.spyOn<any>(component, withdrawConsentInitMethod).mockImplementation(() => {});

          component.ngOnInit();
          fixture.detectChanges();
          await vi.advanceTimersByTimeAsync(300);
          vi.useRealTimers();
          fixture.detectChanges();

          expect(el.query(By.css('cx-spinner'))).toBeTruthy();
        });
      });
      describe('when a consent is being withdrawn', () => {
        it('should show spinner', async () => {
          vi.useFakeTimers();
          vi.spyOn(userService, 'getConsentsResultLoading').mockReturnValue(
            of(false)
          );
          vi.spyOn(userService, 'getGiveConsentResultLoading').mockReturnValue(
            of(false)
          );
          vi.spyOn(userService, 'getWithdrawConsentResultLoading').mockReturnValue(
            of(true)
          );
          vi.spyOn<any>(component, consentListInitMethod).mockImplementation(() => {});
          vi.spyOn<any>(component, giveConsentInitMethod).mockImplementation(() => {});
          vi.spyOn<any>(component, withdrawConsentInitMethod).mockImplementation(() => {});

          component.ngOnInit();
          fixture.detectChanges();
          await vi.advanceTimersByTimeAsync(300);
          vi.useRealTimers();
          fixture.detectChanges();

          expect(el.query(By.css('cx-spinner'))).toBeTruthy();
        });
      });

      describe('when nothing is being loaded', () => {
        it('should NOT show the spinner but rather diplay a checkbox for each consent', () => {
          vi.spyOn(userService, 'getConsentsResultLoading').mockReturnValue(
            of(false)
          );
          vi.spyOn(userService, 'getGiveConsentResultLoading').mockReturnValue(
            of(false)
          );
          vi.spyOn(userService, 'getWithdrawConsentResultLoading').mockReturnValue(
            of(false)
          );
          vi.spyOn(userService, 'getConsents').mockReturnValue(
            of([
              mockConsentTemplate,
              mockConsentTemplate,
              mockConsentTemplate,
            ] as ConsentTemplate[])
          );

          component.ngOnInit();
          fixture.detectChanges();

          expect(el.query(By.css('cx-spinner'))).toBeFalsy();
          expect(
            (el.nativeElement as HTMLElement).querySelectorAll(
              'cx-my-account-v2-consent-management-form'
            ).length
          ).toEqual(3);
        });
      });
    });
  });
});
