import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthService,
  Consent,
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  Translatable,
  UserConsentService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConsentManagementComponent } from './consent-management.component';

@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

@Component({
  selector: 'cx-consent-management-form',
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
    return of();
  }
  getGiveConsentResultLoading(): Observable<boolean> {
    return of();
  }
  getGiveConsentResultSuccess(): Observable<boolean> {
    return of();
  }
  getWithdrawConsentResultLoading(): Observable<boolean> {
    return of();
  }
  getWithdrawConsentResultSuccess(): Observable<boolean> {
    return of();
  }
  getConsents(): Observable<ConsentTemplate[]> {
    return of();
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

describe('ConsentManagementComponent', () => {
  let component: ConsentManagementComponent;
  let fixture: ComponentFixture<ConsentManagementComponent>;
  let el: DebugElement;

  let userService: UserConsentService;
  let globalMessageService: GlobalMessageService;
  let anonymousConsentsConfig: AnonymousConsentsConfig;
  let anonymousConsentsService: AnonymousConsentsService;

  beforeEach(
    waitForAsync(() => {
      const mockAnonymousConsentsConfig = {
        anonymousConsents: {},
      };

      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          MockCxSpinnerComponent,
          MockConsentManagementFormComponent,
          ConsentManagementComponent,
        ],
        providers: [
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
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentManagementComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userService = TestBed.inject(UserConsentService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    anonymousConsentsConfig = TestBed.inject(AnonymousConsentsConfig);
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);

    fixture.detectChanges();
  });

  it('should create', () => {
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
      it('should combine all loading flags into one', () => {
        spyOn(userService, 'getConsentsResultLoading').and.returnValue(
          of(true)
        );
        spyOn(userService, 'getGiveConsentResultLoading').and.returnValue(
          of(false)
        );
        spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
          of(false)
        );

        component.ngOnInit();
        expect(userService.getConsentsResultLoading).toHaveBeenCalled();
        expect(userService.getGiveConsentResultLoading).toHaveBeenCalled();
        expect(userService.getWithdrawConsentResultLoading).toHaveBeenCalled();

        let loadingResult = false;
        component.loading$
          .subscribe((result) => (loadingResult = result))
          .unsubscribe();
        expect(loadingResult).toEqual(true);
      });

      it('should call all init methods', () => {
        spyOn<any>(component, consentListInitMethod).and.stub();
        spyOn<any>(component, giveConsentInitMethod).and.stub();
        spyOn<any>(component, withdrawConsentInitMethod).and.stub();

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
          spyOn(userService, 'getConsents').and.returnValue(
            of(mockTemplateList)
          );
          spyOn<any>(component, consentsExistsMethod).and.returnValue(false);
          spyOn(userService, 'loadConsents').and.stub();

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
          spyOn(userService, 'getConsents').and.returnValue(
            of(mockTemplateList)
          );
          spyOn<any>(component, consentsExistsMethod).and.returnValue(true);
          spyOn(userService, 'loadConsents').and.stub();

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
          spyOn(userService, 'getConsents').and.returnValue(
            of(mockTemplateList)
          );
          spyOn<any>(component, hideAnonymousConsentsMethod).and.returnValue(
            mockTemplateList
          );
          const mockAnonymousConsentTemplates: ConsentTemplate[] = [
            { id: 'MARKETING' },
          ];
          spyOn(anonymousConsentsService, 'getTemplates').and.returnValue(
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
        spyOn(userService, 'resetGiveConsentProcessState').and.stub();
        component[giveConsentInitMethod]();
        expect(userService.resetGiveConsentProcessState).toHaveBeenCalled();
      });
      it(`should call ${onConsentGivenSuccessMethod}`, () => {
        const success = true;
        spyOn(userService, 'getGiveConsentResultSuccess').and.returnValue(
          of(success)
        );
        spyOn<any>(component, onConsentGivenSuccessMethod).and.stub();

        component[giveConsentInitMethod]();
        expect(component[onConsentGivenSuccessMethod]).toHaveBeenCalledWith(
          success
        );
      });
    });

    describe(withdrawConsentInitMethod, () => {
      it('should reset the processing state', () => {
        spyOn(userService, 'resetWithdrawConsentProcessState').and.stub();
        component[withdrawConsentInitMethod]();
        expect(userService.resetWithdrawConsentProcessState).toHaveBeenCalled();
      });
      it(`should load all consents if the withdrawal was successful and call ${onConsentWithdrawnSuccessMethod}`, () => {
        const withdrawalSuccess = true;
        spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
          of(false)
        );
        spyOn(userService, 'getWithdrawConsentResultSuccess').and.returnValue(
          of(withdrawalSuccess)
        );
        spyOn(userService, 'loadConsents').and.stub();
        spyOn<any>(component, onConsentWithdrawnSuccessMethod).and.stub();

        component[withdrawConsentInitMethod]();

        expect(userService.loadConsents).toHaveBeenCalled();
        expect(component[onConsentWithdrawnSuccessMethod]).toHaveBeenCalledWith(
          withdrawalSuccess
        );
      });
      it('should NOT load all consents if the withdrawal was NOT successful', () => {
        spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
          of(false)
        );
        spyOn(userService, 'getWithdrawConsentResultSuccess').and.returnValue(
          of(false)
        );
        spyOn(userService, 'loadConsents').and.stub();

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
          spyOn(userService, 'giveConsent').and.stub();
          spyOn(userService, 'withdrawConsent').and.stub();

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
          spyOn(userService, 'giveConsent').and.stub();
          spyOn(userService, 'withdrawConsent').and.stub();

          component.onConsentChange({
            given: false,
            template: mockConsentTemplate,
          });

          expect(userService.withdrawConsent).toHaveBeenCalledWith(
            mockConsentTemplate.currentConsent.code
          );
          expect(userService.giveConsent).not.toHaveBeenCalled();
        });
      });
    });

    describe(onConsentGivenSuccessMethod, () => {
      describe('when the consent was NOT successfully given', () => {
        it('should NOT reset the processing state and display a success message', () => {
          spyOn(userService, 'resetGiveConsentProcessState').and.stub();
          spyOn(globalMessageService, 'add').and.stub();

          component[onConsentGivenSuccessMethod](false);

          expect(
            userService.resetGiveConsentProcessState
          ).not.toHaveBeenCalled();
          expect(globalMessageService.add).not.toHaveBeenCalled();
        });
      });
      describe('when the consent was successfully given', () => {
        it('should reset the processing state and display a success message', () => {
          spyOn(userService, 'resetGiveConsentProcessState').and.stub();
          spyOn(globalMessageService, 'add').and.stub();

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
          spyOn(userService, 'resetWithdrawConsentProcessState').and.stub();
          spyOn(globalMessageService, 'add').and.stub();

          component[onConsentWithdrawnSuccessMethod](false);

          expect(
            userService.resetWithdrawConsentProcessState
          ).not.toHaveBeenCalled();
          expect(globalMessageService.add).not.toHaveBeenCalled();
        });
      });
      describe('when the consent was successfully withdrawn', () => {
        it('should reset the processing state and display a success message', () => {
          spyOn(userService, 'resetWithdrawConsentProcessState').and.stub();
          spyOn(globalMessageService, 'add').and.stub();

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
          spyOn(userService, 'withdrawConsent').and.stub();
          spyOn(userService, 'loadConsents').and.stub();
          component.rejectAll([]);
          expect(userService.withdrawConsent).not.toHaveBeenCalled();
        });
      });
      describe('when consents are given', () => {
        it('should call userConsentService.withdrawConsent for each', () => {
          spyOn(userService, 'withdrawConsent').and.stub();
          spyOn(userService, 'isConsentGiven').and.returnValue(true);
          spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
            of(false)
          );

          component.rejectAll([mockConsentTemplate]);

          expect(userService.withdrawConsent).toHaveBeenCalledWith(
            mockConsentTemplate.currentConsent.code
          );
          expect(userService.withdrawConsent).toHaveBeenCalledTimes(1);
        });
      });
      describe('when the required consents are configured', () => {
        it('should skip them', () => {
          anonymousConsentsConfig.anonymousConsents.requiredConsents = [
            mockConsentTemplate[0],
          ];
          spyOn(userService, 'withdrawConsent').and.stub();
          spyOn(userService, 'loadConsents').and.stub();
          spyOn(userService, 'isConsentGiven').and.returnValue(true);
          spyOn<any>(component, isRequiredConsentMethod).and.returnValue(true);

          component.rejectAll([mockConsentTemplate]);

          expect(userService.withdrawConsent).not.toHaveBeenCalled();
        });
      });
    });

    describe('allowAll', () => {
      describe('when no consent is withdrawn', () => {
        it('should not call userConsentService.giveConsent', () => {
          spyOn(userService, 'giveConsent').and.stub();
          spyOn(userService, 'loadConsents').and.stub();
          component.allowAll([]);
          expect(userService.giveConsent).not.toHaveBeenCalled();
        });
      });
      describe('when consents are withdrawn', () => {
        it('should call userConsentService.giveConsent for each', () => {
          spyOn(userService, 'giveConsent').and.stub();
          spyOn(userService, 'isConsentWithdrawn').and.returnValue(true);
          spyOn(userService, 'getGiveConsentResultLoading').and.returnValue(
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
          spyOn(userService, 'giveConsent').and.stub();
          spyOn(userService, 'loadConsents').and.stub();
          spyOn(userService, 'isConsentWithdrawn').and.returnValue(true);
          spyOn<any>(component, isRequiredConsentMethod).and.returnValue(true);

          component.allowAll([mockConsentTemplate]);

          expect(userService.giveConsent).not.toHaveBeenCalled();
        });
      });
    });

    describe('ngOnDestroy', () => {
      it('should unsubscribe and reset the processing states', () => {
        spyOn(component['subscriptions'], 'unsubscribe').and.stub();
        spyOn(userService, 'resetGiveConsentProcessState').and.stub();
        spyOn(userService, 'resetWithdrawConsentProcessState').and.stub();

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
          spyOn(userService, 'filterConsentTemplates').and.returnValue(
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
          spyOn(userService, 'filterConsentTemplates').and.returnValue(
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
        it('should show spinner', () => {
          spyOn(userService, 'getConsentsResultLoading').and.returnValue(
            of(true)
          );
          spyOn(userService, 'getGiveConsentResultLoading').and.returnValue(
            of(false)
          );
          spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
            of(false)
          );
          spyOn<any>(component, consentListInitMethod).and.stub();
          spyOn<any>(component, giveConsentInitMethod).and.stub();
          spyOn<any>(component, withdrawConsentInitMethod).and.stub();

          component.ngOnInit();
          fixture.detectChanges();

          expect(el.query(By.css('cx-spinner'))).toBeTruthy();
        });
      });
      describe('when a consent is being given', () => {
        it('should show spinner', () => {
          spyOn(userService, 'getConsentsResultLoading').and.returnValue(
            of(false)
          );
          spyOn(userService, 'getGiveConsentResultLoading').and.returnValue(
            of(true)
          );
          spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
            of(false)
          );
          spyOn<any>(component, consentListInitMethod).and.stub();
          spyOn<any>(component, giveConsentInitMethod).and.stub();
          spyOn<any>(component, withdrawConsentInitMethod).and.stub();

          component.ngOnInit();
          fixture.detectChanges();

          expect(el.query(By.css('cx-spinner'))).toBeTruthy();
        });
      });
      describe('when a consent is being withdrawn', () => {
        it('should show spinner', () => {
          spyOn(userService, 'getConsentsResultLoading').and.returnValue(
            of(false)
          );
          spyOn(userService, 'getGiveConsentResultLoading').and.returnValue(
            of(false)
          );
          spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
            of(true)
          );
          spyOn<any>(component, consentListInitMethod).and.stub();
          spyOn<any>(component, giveConsentInitMethod).and.stub();
          spyOn<any>(component, withdrawConsentInitMethod).and.stub();

          component.ngOnInit();
          fixture.detectChanges();

          expect(el.query(By.css('cx-spinner'))).toBeTruthy();
        });
      });

      describe('when nothing is being loaded', () => {
        it('should NOT show the spinner but rather diplay a checkbox for each consent', () => {
          spyOn(userService, 'getConsentsResultLoading').and.returnValue(
            of(false)
          );
          spyOn(userService, 'getGiveConsentResultLoading').and.returnValue(
            of(false)
          );
          spyOn(userService, 'getWithdrawConsentResultLoading').and.returnValue(
            of(false)
          );
          spyOn(userService, 'getConsents').and.returnValue(
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
              'cx-consent-management-form'
            ).length
          ).toEqual(3);
        });
      });
    });
  });
});
