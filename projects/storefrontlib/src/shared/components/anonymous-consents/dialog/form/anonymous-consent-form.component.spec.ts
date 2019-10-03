import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '@spartacus/core';
import { AnonymousConsentFormComponent } from './anonymous-consent-form.component';

describe('AnonymousConsentFormComponent', () => {
  let component: AnonymousConsentFormComponent;
  let fixture: ComponentFixture<AnonymousConsentFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnonymousConsentFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousConsentFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component method tests', () => {
    describe('ngOnInit', () => {
      it('should set the internal consentGiven to true if the consent is given', () => {
        const mockAnonymousConsent: AnonymousConsent = {
          templateCode: 'MARKETING',
          version: 0,
          consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
        };

        component.consent = mockAnonymousConsent;
        component.ngOnInit();
        expect(component.consentGiven).toEqual(true);
      });
      it('should set the internal consentGiven to false if the consent is NOT given or withdrawn', () => {
        const mockAnonymousConsent: AnonymousConsent = {
          templateCode: 'MARKETING',
          version: 0,
          consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN,
        };

        component.consent = mockAnonymousConsent;
        component.ngOnInit();
        expect(component.consentGiven).toEqual(false);
      });
    });

    describe('onConsentChange', () => {
      it('should emit the current template and the consent state', () => {
        spyOn(component.consentChanged, 'emit').and.stub();

        const mockConsentTemplate: ConsentTemplate = {
          id: 'MARKETING',
        };
        component.consentGiven = true;
        component.template = mockConsentTemplate;

        component.onConsentChange();

        expect(component.consentChanged.emit).toHaveBeenCalledWith({
          given: !component.consentGiven,
          template: mockConsentTemplate,
        });
      });
    });
  });

  describe('component UI tests', () => {
    describe('when a checkbox is clicked', () => {
      const mockConsentTemplate: ConsentTemplate = {
        id: 'mock ID',
      };
      it('should call onConsentChange()', () => {
        spyOn(component, 'onConsentChange').and.stub();

        component.template = mockConsentTemplate;
        component.consentGiven = true;
        component.ngOnInit();
        fixture.detectChanges();

        const checkbox = el.query(By.css('input')).nativeElement as HTMLElement;
        checkbox.dispatchEvent(new MouseEvent('click'));

        expect(component.onConsentChange).toHaveBeenCalled();
      });
    });
  });
});
