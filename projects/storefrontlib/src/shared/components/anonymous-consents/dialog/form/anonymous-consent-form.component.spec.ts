import { Component, DebugElement, ElementRef, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
  I18nTestingModule,
} from '@spartacus/core';
import { ICON_TYPE } from '../../../../../cms-components/index';
import { AnonymousConsentFormComponent } from './anonymous-consent-form.component';

@Component({ selector: 'cx-icon', template: '' })
class MockIconComponent {
  @Input() type: ICON_TYPE;
}

describe('AnonymousConsentFormComponent', () => {
  let component: AnonymousConsentFormComponent;
  let fixture: ComponentFixture<AnonymousConsentFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AnonymousConsentFormComponent, MockIconComponent],
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
      it('should set fire true for the consentGiven$ and map its value to a translation key', () => {
        const mockAnonymousConsent: AnonymousConsent = {
          templateCode: 'MARKETING',
          version: 0,
          consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN,
        };

        spyOn(component.consentGiven$, 'next').and.callThrough();
        component.consent = mockAnonymousConsent;
        component.ngOnInit();
        expect(component.consentGiven$.next).toHaveBeenCalledWith(true);
        let translationKeyValue: string;
        component.consentGivenTranslation$
          .subscribe(result => (translationKeyValue = result))
          .unsubscribe();
        expect(translationKeyValue).toEqual('anonymousConsents.dialog.on');
      });
      it('should set fire false for the consentGiven$ and map its value to a translation key', () => {
        const mockAnonymousConsent: AnonymousConsent = {
          templateCode: 'MARKETING',
          version: 0,
          consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN,
        };

        spyOn(component.consentGiven$, 'next').and.callThrough();
        component.consent = mockAnonymousConsent;
        component.ngOnInit();
        expect(component.consentGiven$.next).toHaveBeenCalledWith(false);
        let translationKeyValue: string;
        component.consentGivenTranslation$
          .subscribe(result => (translationKeyValue = result))
          .unsubscribe();
        expect(translationKeyValue).toEqual('anonymousConsents.dialog.off');
      });
    });

    describe('toggleAccordion', () => {
      describe('when a keydown event occurs', () => {
        it('should NOT expand the accordion if the key event was not Space or Enter', () => {
          const keyEvent = <KeyboardEvent>{
            key: 'x',
          };
          component.toggleAccordion(keyEvent);
          expect(component.accordionExpanded).toEqual(false);
          expect(component.accordionHeight).toEqual('0px');
        });
        it('should expand the accordion if the key event was either Space or Enter', () => {
          const keyEvent = <KeyboardEvent>{
            key: ' ',
          };
          component.accordionContent = <ElementRef<HTMLDivElement>>{
            nativeElement: <HTMLDivElement>{ clientHeight: 10 },
          };
          component.toggleAccordion(keyEvent);
          expect(component.accordionExpanded).toEqual(true);
          expect(component.accordionHeight).toEqual('10px');
        });
      });
      describe('when a mouse click event occurs, the keyEvent is falsy and', () => {
        it('should expand the accordion', () => {
          component.accordionContent = <ElementRef<HTMLDivElement>>{
            nativeElement: <HTMLDivElement>{ clientHeight: 10 },
          };
          component.toggleAccordion();
          expect(component.accordionExpanded).toEqual(true);
          expect(component.accordionHeight).toEqual('10px');
        });
      });
    });

    describe('ngOnDestroy', () => {
      it('should unsubscribe', () => {
        spyOn(component.consentGiven$, 'unsubscribe').and.stub();
        component.ngOnDestroy();
        expect(component.consentGiven$.unsubscribe).toHaveBeenCalled();
      });
    });

    describe('onConsentChange', () => {
      it('should fire the inverted consentGiven$ value and emit the current template and the consent state', () => {
        spyOn(component.consentGiven$, 'next').and.callThrough();
        spyOn(component.consentChanged, 'emit').and.stub();

        const mockConsentTemplate: ConsentTemplate = {
          id: 'MARKETING',
        };
        const mockAnonymousConsent: AnonymousConsent = {
          templateCode: 'MARKETING',
          version: 0,
          consentState: ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_WITHDRAWN,
        };

        component.consent = mockAnonymousConsent;
        component.template = mockConsentTemplate;

        component.onConsentChange();

        expect(component.consentGiven$.next).toHaveBeenCalledWith(true);
        expect(component.consentChanged.emit).toHaveBeenCalledWith({
          given: true,
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
        component.ngOnInit();
        fixture.detectChanges();

        const checkbox = el.query(By.css('input')).nativeElement as HTMLElement;
        checkbox.dispatchEvent(new MouseEvent('click'));

        expect(component.onConsentChange).toHaveBeenCalled();
      });
    });
  });
});
