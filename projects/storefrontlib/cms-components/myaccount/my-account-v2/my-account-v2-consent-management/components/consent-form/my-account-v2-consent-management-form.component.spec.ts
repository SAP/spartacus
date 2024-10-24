import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
  I18nTestingModule,
} from '@spartacus/core';
import { MyAccountV2ConsentManagementFormComponent } from './my-account-v2-consent-management-form.component';

describe('MyAccountV2ConsentManagementFormComponent', () => {
  let component: MyAccountV2ConsentManagementFormComponent;
  let fixture: ComponentFixture<MyAccountV2ConsentManagementFormComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [MyAccountV2ConsentManagementFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    console.log('Starting MyAccountV2ConsentManagementFormComponent test');
    fixture = TestBed.createComponent(
      MyAccountV2ConsentManagementFormComponent
    );
    component = fixture.componentInstance;
    component.consentTemplate = {};
    component.requiredConsents = [];
    component.consent = null;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component method tests', () => {
    describe('ngOnInit', () => {
      describe('when anonymous consents feature is enabled and consent is provided', () => {
        it('should set consentGiven according to the state of the provided consent', () => {
          component.consent = { consentState: ANONYMOUS_CONSENT_STATUS.GIVEN };
          component.ngOnInit();
          expect(component.consentGiven).toEqual(true);
        });
      });
      describe('when a consent is given', () => {
        const mockConsentTemplate: ConsentTemplate = {
          id: 'TEMPLATE_ID',
          currentConsent: {
            consentGivenDate: new Date(),
          },
        };
        it('should set internal flag to true', () => {
          component.consentTemplate = mockConsentTemplate;
          component.ngOnInit();
          expect(component['consentGiven']).toEqual(true);
        });
      });
      describe('when a consent is withdrawn', () => {
        const mockConsentTemplate: ConsentTemplate = {
          currentConsent: {
            consentWithdrawnDate: new Date(),
          },
        };
        it('should set internal flag to false', () => {
          component.consentTemplate = mockConsentTemplate;
          component.ngOnInit();
          expect(component['consentGiven']).toEqual(false);
        });
      });
    });

    describe('onConsentChange', () => {
      const mockConsentTemplate: ConsentTemplate = {
        id: 'mock ID',
      };
      it('should emit an event', () => {
        const consentGiven = true;
        component.consentGiven = consentGiven;
        component.consentTemplate = mockConsentTemplate;
        spyOn(component.consentChanged, 'emit').and.stub();

        component.onConsentChange();

        expect(component.consentChanged.emit).toHaveBeenCalledWith({
          given: !consentGiven,
          template: mockConsentTemplate,
        });
      });
    });

    describe('isRequired', () => {
      it('should return TRUE if the id is included in the required array', () => {
        const templateId = 'TEMPLATE_ID';
        component.requiredConsents = [templateId, 'OTHER1', 'OTHER2'];

        expect(component.isRequired(templateId)).toBeTruthy();
      });
      it('should return FALSE if the id is NOT included in the required array', () => {
        const templateId = 'TEMPLATE_ID';
        component.requiredConsents = ['OTHER1', 'OTHER2'];

        expect(component.isRequired(templateId)).toBeFalsy();

        component.requiredConsents = [];
        expect(component.isRequired(templateId)).toBeFalsy();
      });
    });
  });

  describe('component UI tests', () => {
    describe('when a checkbox is clicked', () => {
      const date = new Date('2023-09-12T09:19:49+0000');
      const mockConsentTemplate: ConsentTemplate = {
        id: 'mock ID',
        currentConsent: {
          consentGivenDate: date,
        },
      };
      it('should call onConsentChange()', () => {
        spyOn(component, 'onConsentChange').and.stub();

        component.consentTemplate = mockConsentTemplate;
        component.consentGiven = true;
        component.ngOnInit();
        fixture.detectChanges();

        const checkbox = el.query(By.css('input')).nativeElement as HTMLElement;
        checkbox.dispatchEvent(new MouseEvent('click'));

        expect(component.onConsentChange).toHaveBeenCalled();
      });
      it('should disable required consents', () => {
        component.consentTemplate = mockConsentTemplate;
        component.requiredConsents = [mockConsentTemplate.id];

        fixture.detectChanges();

        const checkbox = el.query(By.css('input')).nativeElement as HTMLElement;

        expect(checkbox.hasAttribute('disabled')).toBeTruthy();
      });
    });
  });
});
