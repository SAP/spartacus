import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  FeatureDirective,
  I18nTestingModule,
  NotificationPreference,
  TranslatePipe,
  UrlPipe,
  UserInterestsService,
} from '@spartacus/core';
import { UrlTestingModule } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { Observable, of } from 'rxjs';
import { LaunchDialogService } from '../../../../layout/launch-dialog/services/index';
import { StockNotificationDialogComponent } from './stock-notification-dialog.component';

describe('StockNotificationDialogComponent', () => {
  let component: StockNotificationDialogComponent;
  let fixture: ComponentFixture<StockNotificationDialogComponent>;
  let el: DebugElement;
  let launchDialogService: LaunchDialogService;

  class MockLaunchDialogService implements Partial<LaunchDialogService> {
    get data$(): Observable<any> {
      return of(undefined);
    }

    closeDialog(_reason: string): void {}
  }

  const interestsService = { resetAddInterestState: vi.fn() };

  const preferences: NotificationPreference[] = [
    {
      channel: 'EMAIL',
      enabled: true,
      value: 'test@sap.com',
      visible: true,
    },
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: UserInterestsService, useValue: interestsService },
      ],
    })
      .overrideComponent(StockNotificationDialogComponent, {
        remove: { imports: [FeatureDirective, UrlPipe, TranslatePipe] },
        add: {
          imports: [MockFeatureDirective, I18nTestingModule, UrlTestingModule],
        },
      })
      .compileComponents();

    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockNotificationDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.subscribeSuccess$ = of(true);
    component.enabledPrefs = preferences;
    interestsService.resetAddInterestState.mockImplementation(() => {});
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show notification dialog', () => {
    fixture.detectChanges();

    expect(el.query(By.css('.cx-modal-header'))).toBeTruthy();
    expect(el.query(By.css('.close'))).toBeTruthy();
    expect(el.queryAll(By.css('.channels'))).toBeTruthy();
    expect(el.query(By.css('.link-prefs'))).toBeTruthy();
    expect(el.query(By.css('.link-interests'))).toBeTruthy();
    expect(el.query(By.css('.btn-ok'))).toBeTruthy();
  });

  it('should show spinner when loading', () => {
    component.subscribeSuccess$ = of(false);
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should be able to close dialog by close button', () => {
    vi.spyOn(launchDialogService, 'closeDialog').mockImplementation(() => {});

    fixture.detectChanges();
    el.query(By.css('.close')).nativeElement.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Button clicked'
    );
  });

  it('should be able to close dialog by OK button', () => {
    vi.spyOn(launchDialogService, 'closeDialog').mockImplementation(() => {});

    fixture.detectChanges();
    el.query(By.css('.btn-ok')).nativeElement.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Button clicked'
    );
  });

  it('should be able to reset the adding state in destory()', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(interestsService.resetAddInterestState).toHaveBeenCalled();
  });
});
