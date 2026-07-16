import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ANONYMOUS_CONSENT_STATUS,
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  MockTranslatePipe,
  Translatable,
  TranslatePipe,
} from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import { IconComponent } from '../../../cms-components/misc/icon/icon.component';
import { ConsentManagementFormComponent } from '../../../cms-components/myaccount/consent-management/components/consent-form/consent-management-form.component';
import { FocusDirective } from '../../../layout/a11y/keyboard-focus/focus.directive';
import { MockKeyboardFocusDirective } from '../../../layout/a11y/keyboard-focus/focus-testing.module';
import { LaunchDialogService } from '../../../layout/launch-dialog/index';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AnonymousConsentDialogComponent } from './anonymous-consent-dialog.component';

@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

@Component({
  selector: 'cx-icon',
  template: ``,
})
class MockCxIconComponent {
  @Input() type: string;
}

@Component({
  selector: 'cx-consent-management-form',
  template: ``,
})
class MockConsentManagementFormComponent {
  @Input()
  consentTemplate: ConsentTemplate;
  @Input()
  requiredConsents: string[] = [];
  @Input()
  consent: AnonymousConsent;
}

class MockAnonymousConsentsService {
  getTemplates(): Observable<ConsentTemplate[]> {
    return EMPTY;
  }
  getConsents(): Observable<AnonymousConsent[]> {
    return EMPTY;
  }
  withdrawConsent(_templateCode: string): void {}
  giveConsent(_templateCode: string): void {}
  isConsentGiven(_consent: AnonymousConsent): boolean {
    return true;
  }
  isConsentWithdrawn(_consent: AnonymousConsent): boolean {
    return true;
  }
  getLoadTemplatesLoading(): Observable<boolean> {
    return of(false);
  }
}

class GlobalMessageServiceMock {
  add(_text: string | Translatable, _type: GlobalMessageType): void {}
}

class MockLaunchDialogService {
  closeDialog() {}
}

const mockTemplates: ConsentTemplate[] = [
  { id: 'MARKETING' },
  { id: 'PERSONALIZATION' },
];

describe('AnonymousConsentsDialogComponent', () => {
  let component: AnonymousConsentDialogComponent;
  let fixture: ComponentFixture<AnonymousConsentDialogComponent>;
  let anonymousConsentsService: AnonymousConsentsService;
  let anonymousConsentsConfig: AnonymousConsentsConfig;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    const mockConfig: AnonymousConsentsConfig = {
      anonymousConsents: { showLegalDescriptionInDialog: true },
    };

    TestBed.configureTestingModule({
      imports: [AnonymousConsentDialogComponent],
      providers: [
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        {
          provide: AnonymousConsentsConfig,
          useValue: mockConfig,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(AnonymousConsentDialogComponent, {
        remove: {
          imports: [
            TranslatePipe,
            FocusDirective,
            IconComponent,
            ConsentManagementFormComponent,
            SpinnerComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockKeyboardFocusDirective,
            MockCxIconComponent,
            MockConsentManagementFormComponent,
            MockCxSpinnerComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousConsentDialogComponent);
    component = fixture.componentInstance;
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
    anonymousConsentsConfig = TestBed.inject(AnonymousConsentsConfig);
    launchDialogService = TestBed.inject(LaunchDialogService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set templates$ and consents$', () => {
      vi.spyOn(anonymousConsentsService, 'getTemplates').mockImplementation(() => {});
      vi.spyOn(anonymousConsentsService, 'getConsents').mockImplementation(() => {});

      component.ngOnInit();
      expect(anonymousConsentsService.getTemplates).toHaveBeenCalled();
      expect(anonymousConsentsService.getConsents).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('should call modalService.closeActiveModal', () => {
      vi.spyOn(launchDialogService, 'closeDialog');

      component.close('xxx');

      expect(launchDialogService.closeDialog).toHaveBeenCalledWith('xxx');
    });
  });

  describe('rejectAll', () => {
    const mockConsent: AnonymousConsent[] = [
      {
        templateCode: mockTemplates[0].id,
        consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
      },
      {
        templateCode: mockTemplates[1].id,
        consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
      },
    ];
    describe('when a required consent is present', () => {
      it('should skip it', () => {
        anonymousConsentsConfig.anonymousConsents.requiredConsents = [
          mockTemplates[0].id,
        ];

        const closeDialogSpy = vi.spyOn(
          launchDialogService,
          'closeDialog'
        ).mockImplementation(() => {});
        const messageNextSpy = vi.spyOn(
          component.message$,
          'next'
        );
        vi.spyOn(component, 'close').mockImplementation(() => {});
        vi.spyOn(anonymousConsentsService, 'isConsentGiven').mockReturnValueOnce(true).mockReturnValueOnce(true);
        vi.spyOn(anonymousConsentsService, 'withdrawConsent').mockImplementation(() => {});
        vi.spyOn(anonymousConsentsService, 'getTemplates').mockReturnValue(
          of(mockTemplates)
        );
        vi.spyOn(anonymousConsentsService, 'getConsents').mockReturnValue(
          of(mockConsent)
        );

        component.ngOnInit();
        component.rejectAll();

        expect(anonymousConsentsService.withdrawConsent).toHaveBeenCalledTimes(
          1
        );
        expect(closeDialogSpy).not.toHaveBeenCalled();
        expect(messageNextSpy).toHaveBeenCalledWith({
          type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          key: 'consentManagementForm.message.success.withdrawn',
        });
      });
    });
    describe('when no required consent is present', () => {
      it('should call withdrawAllConsents and close the modal dialog', () => {
        const closeDialogSpy = vi.spyOn(
          launchDialogService,
          'closeDialog'
        ).mockImplementation(() => {});
        const messageNextSpy = vi.spyOn(
          component.message$,
          'next'
        );

        vi.spyOn(anonymousConsentsService, 'isConsentGiven').mockReturnValueOnce(true).mockReturnValueOnce(true);
        vi.spyOn(anonymousConsentsService, 'withdrawConsent').mockImplementation(() => {});
        vi.spyOn(anonymousConsentsService, 'getTemplates').mockReturnValue(
          of(mockTemplates)
        );
        vi.spyOn(anonymousConsentsService, 'getConsents').mockReturnValue(
          of(mockConsent)
        );

        component.ngOnInit();
        component.rejectAll();

        expect(anonymousConsentsService.withdrawConsent).toHaveBeenCalledTimes(
          mockTemplates.length
        );
        expect(closeDialogSpy).not.toHaveBeenCalled();
        expect(messageNextSpy).toHaveBeenCalledWith({
          type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          key: 'consentManagementForm.message.success.withdrawn',
        });
      });
    });
  });

  describe('allowAll', () => {
    const mockConsents: AnonymousConsent[] = [
      {
        templateCode: mockTemplates[0].id,
        consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
      },
      {
        templateCode: mockTemplates[1].id,
        consentState: ANONYMOUS_CONSENT_STATUS.WITHDRAWN,
      },
    ];
    describe('when a required consent is present', () => {
      it('should skip it', () => {
        anonymousConsentsConfig.anonymousConsents.requiredConsents = [
          mockTemplates[0].id,
        ];

        const closeDialogSpy = vi.spyOn(
          launchDialogService,
          'closeDialog'
        ).mockImplementation(() => {});
        const messageNextSpy = vi.spyOn(
          component.message$,
          'next'
        );

        vi.spyOn(anonymousConsentsService, 'isConsentWithdrawn').mockReturnValueOnce(true).mockReturnValueOnce(true);
        vi.spyOn(anonymousConsentsService, 'giveConsent').mockImplementation(() => {});
        vi.spyOn(anonymousConsentsService, 'getTemplates').mockReturnValue(
          of(mockTemplates)
        );
        vi.spyOn(anonymousConsentsService, 'getConsents').mockReturnValue(
          of(mockConsents)
        );

        component.ngOnInit();
        component.allowAll();

        expect(anonymousConsentsService.giveConsent).toHaveBeenCalledTimes(1);
        expect(closeDialogSpy).not.toHaveBeenCalled();
        expect(messageNextSpy).toHaveBeenCalledWith({
          type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          key: 'consentManagementForm.message.success.given',
        });
      });
    });
    describe('when no required consent is present', () => {
      it('should call giveConsent for each consent and close the modal dialog', () => {
        const closeDialogSpy = vi.spyOn(
          launchDialogService,
          'closeDialog'
        ).mockImplementation(() => {});
        const messageNextSpy = vi.spyOn(
          component.message$,
          'next'
        );

        vi.spyOn(anonymousConsentsService, 'isConsentWithdrawn').mockReturnValueOnce(true).mockReturnValueOnce(true);
        vi.spyOn(anonymousConsentsService, 'giveConsent').mockImplementation(() => {});
        vi.spyOn(anonymousConsentsService, 'getTemplates').mockReturnValue(
          of(mockTemplates)
        );
        vi.spyOn(anonymousConsentsService, 'getConsents').mockReturnValue(
          of(mockConsents)
        );

        component.ngOnInit();
        component.allowAll();

        expect(anonymousConsentsService.giveConsent).toHaveBeenCalledTimes(
          mockTemplates.length
        );
        expect(closeDialogSpy).not.toHaveBeenCalled();
        expect(messageNextSpy).toHaveBeenCalledWith({
          type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          key: 'consentManagementForm.message.success.given',
        });
      });
    });
    describe('when the consents have null state', () => {
      it('should be able to give consents and close the dialog', () => {
        const nullStateMockConsents: AnonymousConsent[] = [
          {
            templateCode: mockTemplates[0].id,
            consentState: null,
          },
          {
            templateCode: mockTemplates[1].id,
            consentState: null,
          },
        ];

        const closeDialogSpy = vi.spyOn(
          launchDialogService,
          'closeDialog'
        ).mockImplementation(() => {});
        const messageNextSpy = vi.spyOn(
          component.message$,
          'next'
        );
        vi.spyOn(anonymousConsentsService, 'isConsentWithdrawn').mockReturnValueOnce(true).mockReturnValueOnce(true);
        vi.spyOn(anonymousConsentsService, 'giveConsent').mockImplementation(() => {});
        vi.spyOn(anonymousConsentsService, 'getTemplates').mockReturnValue(
          of(mockTemplates)
        );
        vi.spyOn(anonymousConsentsService, 'getConsents').mockReturnValue(
          of(nullStateMockConsents)
        );

        component.ngOnInit();
        component.allowAll();

        expect(anonymousConsentsService.giveConsent).toHaveBeenCalledTimes(
          mockTemplates.length
        );
        expect(closeDialogSpy).not.toHaveBeenCalled();
        expect(messageNextSpy).toHaveBeenCalledWith({
          type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          key: 'consentManagementForm.message.success.given',
        });
      });
    });
  });

  const isRequiredConsentMethod = 'isRequiredConsent';
  describe(isRequiredConsentMethod, () => {
    describe('when the requiredConsents is NOT configured', () => {
      it('should return false', () => {
        anonymousConsentsConfig.anonymousConsents.requiredConsents = undefined;
        const result = component[isRequiredConsentMethod](mockTemplates[0]);
        expect(result).toEqual(false);
      });
    });
    describe('when the requiredConsents is configured', () => {
      it('should return true', () => {
        anonymousConsentsConfig.anonymousConsents.requiredConsents = [
          mockTemplates[0].id,
        ];
        const result = component[isRequiredConsentMethod](mockTemplates[0]);
        expect(result).toEqual(true);
      });
    });
  });

  describe('onConsentChange', () => {
    describe('when the consent was given', () => {
      it('should call giveConsent', () => {
        vi.spyOn(anonymousConsentsService, 'giveConsent').mockImplementation(() => {});
        component.onConsentChange({ given: true, template: mockTemplates[0] });
        expect(anonymousConsentsService.giveConsent).toHaveBeenCalledWith(
          mockTemplates[0].id
        );
      });
    });
    describe('when the consent was withdrawn', () => {
      it('should call withdrawConsent', () => {
        vi.spyOn(anonymousConsentsService, 'withdrawConsent').mockImplementation(() => {});
        component.onConsentChange({ given: false, template: mockTemplates[0] });
        expect(anonymousConsentsService.withdrawConsent).toHaveBeenCalledWith(
          mockTemplates[0].id
        );
      });
    });
  });

  describe('getCorrespondingConsent', () => {
    it('should return null if no consent matches the provided template', () => {
      expect(component.getCorrespondingConsent(mockTemplates[0], [])).toEqual(
        null
      );
    });
    it('should return the corresponding consent', () => {
      const mockConsents: AnonymousConsent[] = [
        { templateCode: 'XXX' },
        { templateCode: 'MARKETING' },
      ];
      expect(
        component.getCorrespondingConsent(mockTemplates[0], mockConsents)
      ).toEqual(mockConsents[1]);
    });
  });

  describe('closeMessage', () => {
    it('should reset message$ subject', () => {
      vi.spyOn(component.message$, 'next').mockImplementation(() => {});
      component.closeMessage();
      expect(component.message$.next).toHaveBeenCalledWith(null);
    });

    it('should reset focus to last selected element on close', () => {
      component.selectedInput = <HTMLElement>(
        document.querySelector('.cx-dialog-buttons button')
      );
      vi.spyOn(component.selectedInput, 'focus');
      component.selectedInput.focus();
      expect(component.selectedInput.focus).toHaveBeenCalledTimes(1);
      component.selectedInput.click();
      expect(component.selectedInput.focus).toHaveBeenCalledTimes(1);
      component.closeMessage();
      expect(component.selectedInput.focus).toHaveBeenCalledTimes(2);
    });
  });

  describe('ngOnDestroy', () => {
    it('should call unsubscribe', () => {
      vi.spyOn<any>(component['subscriptions'], 'unsubscribe').mockImplementation(() => {});
      component.ngOnDestroy();
      expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
    });
  });
});
