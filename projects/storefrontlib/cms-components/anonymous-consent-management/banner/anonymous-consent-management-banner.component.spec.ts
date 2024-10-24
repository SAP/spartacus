import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AnonymousConsentsService,
  ConsentTemplate,
  I18nTestingModule,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { AnonymousConsentManagementBannerComponent } from './anonymous-consent-management-banner.component';

class MockAnonymousConsentsService {
  isBannerVisible(): Observable<boolean> {
    return EMPTY;
  }
  giveAllConsents(): Observable<ConsentTemplate[]> {
    return EMPTY;
  }
  getTemplatesUpdated(): Observable<boolean> {
    return EMPTY;
  }
  toggleBannerDismissed(_dismissed: boolean): void {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
}

describe('AnonymousConsentManagementBannerComponent', () => {
  let component: AnonymousConsentManagementBannerComponent;
  let fixture: ComponentFixture<AnonymousConsentManagementBannerComponent>;
  let anonymousConsentsService: AnonymousConsentsService;
  let launchDialogService: LaunchDialogService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AnonymousConsentManagementBannerComponent],
      providers: [
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    console.log('Starting AnonymousConsentManagementBannerComponent test');
    fixture = TestBed.createComponent(
      AnonymousConsentManagementBannerComponent
    );
    component = fixture.componentInstance;
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
    launchDialogService = TestBed.inject(LaunchDialogService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('viewDetails', () => {
    it('should hide the banner and open the dialog', () => {
      spyOn(component, 'hideBanner').and.stub();
      spyOn(launchDialogService, 'openDialog');

      component.viewDetails();

      expect(component.hideBanner).toHaveBeenCalled();
      expect(launchDialogService.openDialog).toHaveBeenCalledWith(
        LAUNCH_CALLER.ANONYMOUS_CONSENT,
        undefined,
        component['vcr']
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
    it('should anonymousConsentsService.toggleBannerDismissed call with true as an argument', () => {
      spyOn(anonymousConsentsService, 'toggleBannerDismissed').and.stub();
      component.hideBanner();
      expect(
        anonymousConsentsService.toggleBannerDismissed
      ).toHaveBeenCalledWith(true);
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
