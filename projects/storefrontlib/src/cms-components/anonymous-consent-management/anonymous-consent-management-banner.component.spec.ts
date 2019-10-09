import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AnonymousConsentsService,
  ConsentTemplate,
  I18nTestingModule,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AnonymousConsentsDialogComponent } from '../../shared/components/anonymous-consents/dialog/anonymous-consents-dialog.component';
import { ModalOptions, ModalRef, ModalService } from '../../shared/index';
import { AnonymousConsentManagementBannerComponent } from './anonymous-consent-management-banner.component';

class MockAnonymousConsentsService {
  isAnonymousConsentsBannerVisible(): Observable<boolean> {
    return of();
  }
  giveAllAnonymousConsents(): Observable<ConsentTemplate[]> {
    return of();
  }
  getTemplatesUpdated(): Observable<boolean> {
    return of();
  }
  toggleAnonymousConsentsBannerVisibility(_visible: boolean): void {}
}

class MockModalService {
  open(_content: any, _options?: ModalOptions): ModalRef {
    return undefined;
  }
}

describe('AnonymousConsentManagementBannerComponent', () => {
  let component: AnonymousConsentManagementBannerComponent;
  let fixture: ComponentFixture<AnonymousConsentManagementBannerComponent>;
  let anonymousConsentsService: AnonymousConsentsService;
  let modalService: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AnonymousConsentManagementBannerComponent],
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
    fixture = TestBed.createComponent(
      AnonymousConsentManagementBannerComponent
    );
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
    it('should call anonymousConsentsService.isAnonymousConsentsBannerVisible()', () => {
      spyOn(
        anonymousConsentsService,
        'isAnonymousConsentsBannerVisible'
      ).and.returnValue(of(false));

      component.ngOnInit();

      expect(
        anonymousConsentsService.isAnonymousConsentsBannerVisible
      ).toHaveBeenCalled();
    });
    it('should call getTemplatesUpdated and toggleAnonymousConsentsBannerVisibility', () => {
      spyOn(anonymousConsentsService, 'getTemplatesUpdated').and.returnValue(
        of(true)
      );
      spyOn(
        anonymousConsentsService,
        'toggleAnonymousConsentsBannerVisibility'
      ).and.stub();

      component.ngOnInit();
      component.templatesUpdated$.subscribe().unsubscribe();

      expect(anonymousConsentsService.getTemplatesUpdated).toHaveBeenCalled();
      expect(
        anonymousConsentsService.toggleAnonymousConsentsBannerVisibility
      ).toHaveBeenCalledWith(true);
    });
  });

  describe('viewDetails', () => {
    it('should hide the banner and open the dialog', () => {
      spyOn(component, 'hideBanner').and.stub();
      spyOn(modalService, 'open').and.stub();

      component.viewDetails();

      expect(component.hideBanner).toHaveBeenCalled();
      expect(modalService.open).toHaveBeenCalledWith(
        AnonymousConsentsDialogComponent,
        {
          centered: true,
          size: 'lg',
          scrollable: true,
        }
      );
    });
  });

  describe('allowAll', () => {
    it('should give all anonymous consents and call hideBanner()', () => {
      spyOn<any>(component['subscriptions'], 'add').and.callThrough();
      spyOn(
        anonymousConsentsService,
        'giveAllAnonymousConsents'
      ).and.returnValue(of([]));
      spyOn(component, 'hideBanner').and.stub();

      component.allowAll();

      expect(component['subscriptions'].add).toHaveBeenCalled();
      expect(
        anonymousConsentsService.giveAllAnonymousConsents
      ).toHaveBeenCalled();
      expect(component.hideBanner).toHaveBeenCalled();
    });
  });

  describe('hideBanner', () => {
    it('should anonymousConsentsService.toggleAnonymousConsentsBannerVisibility call with false as an argument', () => {
      spyOn(
        anonymousConsentsService,
        'toggleAnonymousConsentsBannerVisibility'
      ).and.stub();
      component.hideBanner();
      expect(
        anonymousConsentsService.toggleAnonymousConsentsBannerVisibility
      ).toHaveBeenCalledWith(false);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe', () => {
      spyOn<any>(component['subscriptions'], 'unsubscribe').and.stub();
      component.ngOnDestroy();
      expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
    });
  });

  // TODO:#3899 - write UI tests
});
