import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AnonymousConsent,
  AnonymousConsentsService,
  ConsentTemplate,
  I18nTestingModule,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ModalService } from '../../modal/index';
import { AnonymousConsentsDialogComponent } from './anonymous-consents-dialog.component';

@Component({
  selector: 'cx-icon',
  template: ``,
})
export class MockCxIconComponent {
  @Input() type: string;
}

@Component({
  selector: 'cx-anonymous-consent-form',
  template: ``,
})
export class MockAnonymousConsentFormComponent {
  @Input()
  template: ConsentTemplate;

  @Input()
  consent: AnonymousConsent;
}

class MockAnonymousConsentsService {
  getAnonymousConsentTemplates(): Observable<ConsentTemplate[]> {
    return of();
  }
  getAnonymousConsents(): Observable<AnonymousConsent[]> {
    return of();
  }
  withdrawAnonymousConsent(_templateCode: string): void {}
  giveAnonymousConsent(_templateCode: string): void {}
}

class MockModalService {
  closeActiveModal(_reason?: any): void {}
}

const mockTemplates: ConsentTemplate[] = [
  { id: 'MARKETING' },
  { id: 'PERSONALIZATION' },
];

describe('AnonymousConsentsDialogComponent', () => {
  let component: AnonymousConsentsDialogComponent;
  let fixture: ComponentFixture<AnonymousConsentsDialogComponent>;
  let anonymousConsentsService: AnonymousConsentsService;
  let modalService: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AnonymousConsentsDialogComponent,
        MockCxIconComponent,
        MockAnonymousConsentFormComponent,
      ],
      providers: [
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        {
          provide: ModalService,
          useClass: MockModalService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousConsentsDialogComponent);
    component = fixture.componentInstance;
    anonymousConsentsService = TestBed.get(AnonymousConsentsService as Type<
      AnonymousConsentsService
    >);
    modalService = TestBed.get(ModalService as Type<ModalService>);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set templates$ and consents$', () => {
      spyOn(
        anonymousConsentsService,
        'getAnonymousConsentTemplates'
      ).and.stub();
      spyOn(anonymousConsentsService, 'getAnonymousConsents').and.stub();

      component.ngOnInit();
      expect(
        anonymousConsentsService.getAnonymousConsentTemplates
      ).toHaveBeenCalled();
      expect(anonymousConsentsService.getAnonymousConsents).toHaveBeenCalled();
    });
  });

  describe('closeModal', () => {
    it('should call modalService.closeActiveModal', () => {
      spyOn(modalService, 'closeActiveModal').and.stub();
      component.closeModal('xxx');
      expect(modalService.closeActiveModal).toHaveBeenCalledWith('xxx');
    });
  });

  describe('rejectAll', () => {
    it('should call withdrawAnonymousConsent for each consent and close the dialog', () => {
      spyOn(anonymousConsentsService, 'withdrawAnonymousConsent').and.stub();
      spyOn(component, 'closeModal').and.stub();
      spyOn<any>(component['subscriptions'], 'add').and.callThrough();

      component.templates$ = of(mockTemplates);
      component.rejectAll();
      expect(
        anonymousConsentsService.withdrawAnonymousConsent
      ).toHaveBeenCalledTimes(mockTemplates.length);
      expect(component.closeModal).toHaveBeenCalledWith('rejectAll');
      expect(component['subscriptions'].add).toHaveBeenCalled();
    });
  });

  describe('allowAll', () => {
    it('should call giveAnonymousConsent for each consent and close the dialog', () => {
      spyOn(anonymousConsentsService, 'giveAnonymousConsent').and.stub();
      spyOn(component, 'closeModal').and.stub();
      spyOn<any>(component['subscriptions'], 'add').and.callThrough();

      component.templates$ = of(mockTemplates);
      component.allowAll();
      expect(
        anonymousConsentsService.giveAnonymousConsent
      ).toHaveBeenCalledTimes(mockTemplates.length);
      expect(component.closeModal).toHaveBeenCalledWith('allowAll');
      expect(component['subscriptions'].add).toHaveBeenCalled();
    });
  });

  describe('onConsentChange', () => {
    describe('when the consent was given', () => {
      it('should call giveAnonymousConsent', () => {
        spyOn(anonymousConsentsService, 'giveAnonymousConsent').and.stub();
        component.onConsentChange({ given: true, template: mockTemplates[0] });
        expect(
          anonymousConsentsService.giveAnonymousConsent
        ).toHaveBeenCalledWith(mockTemplates[0].id);
      });
    });
    describe('when the consent was withdrawn', () => {
      it('should call withdrawAnonymousConsent', () => {
        spyOn(anonymousConsentsService, 'withdrawAnonymousConsent').and.stub();
        component.onConsentChange({ given: false, template: mockTemplates[0] });
        expect(
          anonymousConsentsService.withdrawAnonymousConsent
        ).toHaveBeenCalledWith(mockTemplates[0].id);
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should call unsubscribe', () => {
      spyOn<any>(component['subscriptions'], 'unsubscribe').and.stub();
      component.ngOnDestroy();
      expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
    });
  });
});
