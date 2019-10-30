import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AnonymousConsentsService,
  ConsentTemplate,
  I18nTestingModule,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AnonymousConsentDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consent-dialog.component';
import { ModalOptions, ModalRef, ModalService } from '../../../shared/index';
import { AnonymousConsentManagementBannerComponent } from './anonymous-consent-management-banner.component';

class MockAnonymousConsentsService {
  isBannerVisible(): Observable<boolean> {
    return of();
  }
  giveAllConsents(): Observable<ConsentTemplate[]> {
    return of();
  }
  getTemplatesUpdated(): Observable<boolean> {
    return of();
  }
  toggleBannerVisibility(_visible: boolean): void {}
  getTemplates(): Observable<ConsentTemplate[]> {
    return of();
  }
  loadTemplates(): void {}
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
    it('should call getTemplates() and loadTemplates() if there are no templates already loaded', () => {
      spyOn(anonymousConsentsService, 'getTemplates').and.returnValue(of(null));
      spyOn(anonymousConsentsService, 'loadTemplates').and.stub();

      component.ngOnInit();
      component.bannerVisible$.subscribe().unsubscribe();

      expect(anonymousConsentsService.getTemplates).toHaveBeenCalled();
      expect(anonymousConsentsService.loadTemplates).toHaveBeenCalled();
    });
    it('should call anonymousConsentsService.isBannerVisible()', () => {
      spyOn(anonymousConsentsService, 'isBannerVisible').and.returnValue(
        of(false)
      );

      component.ngOnInit();

      expect(anonymousConsentsService.isBannerVisible).toHaveBeenCalled();
    });
    it('should call getTemplatesUpdated and toggleBannerVisibility', () => {
      spyOn(anonymousConsentsService, 'getTemplatesUpdated').and.returnValue(
        of(true)
      );
      spyOn(anonymousConsentsService, 'toggleBannerVisibility').and.stub();

      component.ngOnInit();
      component.bannerVisible$.subscribe().unsubscribe();

      expect(anonymousConsentsService.getTemplatesUpdated).toHaveBeenCalled();
      expect(
        anonymousConsentsService.toggleBannerVisibility
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
        AnonymousConsentDialogComponent,
        {
          centered: true,
          size: 'lg',
        }
      );
    });
  });

  describe('allowAll', () => {
    it('should give all anonymous consents and call hideBanner()', () => {
      spyOn<any>(component['subscriptions'], 'add').and.callThrough();
      spyOn(anonymousConsentsService, 'giveAllConsents').and.returnValue(
        of([])
      );
      spyOn(component, 'hideBanner').and.stub();

      component.allowAll();

      expect(component['subscriptions'].add).toHaveBeenCalled();
      expect(anonymousConsentsService.giveAllConsents).toHaveBeenCalled();
      expect(component.hideBanner).toHaveBeenCalled();
    });
  });

  describe('hideBanner', () => {
    it('should anonymousConsentsService.toggleBannerVisibility call with false as an argument', () => {
      spyOn(anonymousConsentsService, 'toggleBannerVisibility').and.stub();
      component.hideBanner();
      expect(
        anonymousConsentsService.toggleBannerVisibility
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
});
