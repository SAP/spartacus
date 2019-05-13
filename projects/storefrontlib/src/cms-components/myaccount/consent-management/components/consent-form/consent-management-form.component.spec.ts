import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConsentTemplate } from '@spartacus/core';
import { ConsentManagementFormComponent } from './consent-management-form.component';

describe('ConsentManagementFormComponent', () => {
  let component: ConsentManagementFormComponent;
  let fixture: ComponentFixture<ConsentManagementFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsentManagementFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentManagementFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component method tests', () => {
    describe('ngOnInit', () => {
      describe('when a consent is given', () => {
        const mockConsentTemplate: ConsentTemplate = {
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
        component.consentGiven = true;
        component.consentTemplate = mockConsentTemplate;
        spyOn(component.consentChanged, 'emit').and.stub();

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

        component.consentTemplate = mockConsentTemplate;
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
