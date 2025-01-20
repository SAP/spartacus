import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AnonymousConsentsService,
  ConsentTemplate,
  I18nTestingModule,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { EMPTY, Observable, of } from 'rxjs';
import { AnonymousConsentOpenDialogComponent } from './anonymous-consent-open-dialog.component';

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

describe('AnonymousConsentOpenDialogComponent', () => {
  let component: AnonymousConsentOpenDialogComponent;
  let fixture: ComponentFixture<AnonymousConsentOpenDialogComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AnonymousConsentOpenDialogComponent, MockFeatureDirective],
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
    fixture = TestBed.createComponent(AnonymousConsentOpenDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDialog', () => {
    it('should not show the button if the banner is visible', () => {
      component.bannerVisible$ = of(true);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const button =
          fixture.debugElement.nativeElement.querySelector('button');
        expect(button).toBeNull();
      });
    });

    it('should show the button and open the dialog if the banner is not visible', waitForAsync(() => {
      component.bannerVisible$ = of(false);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const button =
          fixture.debugElement.nativeElement.querySelector('button');
        expect(button).not.toBeNull();

        spyOn(launchDialogService, 'openDialog');
        button.click();

        expect(launchDialogService.openDialog).toHaveBeenCalledWith(
          LAUNCH_CALLER.ANONYMOUS_CONSENT,
          component.openElement,
          component['vcr']
        );
      });
    }));
  });
});
