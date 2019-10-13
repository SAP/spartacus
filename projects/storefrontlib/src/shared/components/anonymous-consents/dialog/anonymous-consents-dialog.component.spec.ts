import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
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

  @Input()
  requiredConsents: string[] = [];
}

class MockAnonymousConsentsService {
  getTemplates(): Observable<ConsentTemplate[]> {
    return of();
  }
  getConsents(): Observable<AnonymousConsent[]> {
    return of();
  }
  withdrawConsent(_templateCode: string): void {}
  giveConsent(_templateCode: string): void {}
  withdrawAllConsents(): Observable<ConsentTemplate[]> {
    return of();
  }
  giveAllConsents(): Observable<ConsentTemplate[]> {
    return of();
  }
}

const mockConfig: AnonymousConsentsConfig = {
  anonymousConsents: { showLegalDescriptionInDialog: true },
};

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
        {
          provide: AnonymousConsentsConfig,
          useValue: mockConfig,
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
      spyOn(anonymousConsentsService, 'getTemplates').and.stub();
      spyOn(anonymousConsentsService, 'getConsents').and.stub();

      component.ngOnInit();
      expect(anonymousConsentsService.getTemplates).toHaveBeenCalled();
      expect(anonymousConsentsService.getConsents).toHaveBeenCalled();
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
    it('should call withdrawAllConsents and close the modal dialog', () => {
      spyOn(anonymousConsentsService, 'withdrawAllConsents').and.returnValue(
        of()
      );
      spyOn(component, 'closeModal').and.stub();
      spyOn<any>(component['subscriptions'], 'add').and.callThrough();

      component.templates$ = of(mockTemplates);
      component.rejectAll();
      expect(anonymousConsentsService.withdrawAllConsents).toHaveBeenCalled();
      expect(component.closeModal).toHaveBeenCalledWith('rejectAll');
      expect(component['subscriptions'].add).toHaveBeenCalled();
    });
  });

  describe('allowAll', () => {
    it('should call giveAllConsents and close the modal dialog', () => {
      spyOn(anonymousConsentsService, 'giveAllConsents').and.returnValue(of());
      spyOn(component, 'closeModal').and.stub();
      spyOn<any>(component['subscriptions'], 'add').and.callThrough();

      component.allowAll();
      expect(anonymousConsentsService.giveAllConsents).toHaveBeenCalled();
      expect(component.closeModal).toHaveBeenCalledWith('allowAll');
      expect(component['subscriptions'].add).toHaveBeenCalled();
    });
  });

  describe('onConsentChange', () => {
    describe('when the consent was given', () => {
      it('should call giveConsent', () => {
        spyOn(anonymousConsentsService, 'giveConsent').and.stub();
        component.onConsentChange({ given: true, template: mockTemplates[0] });
        expect(anonymousConsentsService.giveConsent).toHaveBeenCalledWith(
          mockTemplates[0].id
        );
      });
    });
    describe('when the consent was withdrawn', () => {
      it('should call withdrawConsent', () => {
        spyOn(anonymousConsentsService, 'withdrawConsent').and.stub();
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

  describe('ngOnDestroy', () => {
    it('should call unsubscribe', () => {
      spyOn<any>(component['subscriptions'], 'unsubscribe').and.stub();
      component.ngOnDestroy();
      expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
    });
  });
});
