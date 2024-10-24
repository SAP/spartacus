import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  NotificationPreference,
  UserInterestsService,
} from '@spartacus/core';
import { FocusDirective } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { Observable, of } from 'rxjs';
import { LaunchDialogService } from '../../../../layout/launch-dialog/services/index';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
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

  const interestsService = jasmine.createSpyObj('interestsService', [
    'resetAddInterestState',
  ]);

  const preferences: NotificationPreference[] = [
    {
      channel: 'EMAIL',
      enabled: true,
      value: 'test@sap.com',
      visible: true,
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        StockNotificationDialogComponent,
        FocusDirective,
        MockFeatureDirective,
      ],
      imports: [
        I18nTestingModule,
        RouterTestingModule,
        SpinnerModule,
        UrlTestingModule,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: UserInterestsService, useValue: interestsService },
      ],
    }).compileComponents();

    launchDialogService = TestBed.inject(LaunchDialogService);
  }));

  beforeEach(() => {
    console.log('Starting StockNotificationDialogComponent test');
    fixture = TestBed.createComponent(StockNotificationDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.subscribeSuccess$ = of(true);
    component.enabledPrefs = preferences;
    interestsService.resetAddInterestState.and.stub();
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
    spyOn(launchDialogService, 'closeDialog').and.stub();

    fixture.detectChanges();
    el.query(By.css('.close')).nativeElement.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Button clicked'
    );
  });

  it('should be able to close dialog by OK button', () => {
    spyOn(launchDialogService, 'closeDialog').and.stub();

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
