import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ExtendSessionDialogComponent } from './extend-session-dialog.component';
import {
  AuthService,
  I18nTestingModule,
  OAuthLibWrapperService,
} from '@spartacus/core';
import {
  IconTestingModule,
  KeyboardFocusTestingModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockLaunchDialogService {
  closeDialog = jasmine.createSpy('closeDialog');
  data$ = of({ timeLeft: 300 });
}

class MockAuthService {
  logout = jasmine.createSpy('logout');
}

class MockOAuthLibWrapperService {
  refreshToken = jasmine.createSpy('refreshToken');
}

fdescribe('ExtendSessionDialogComponent', () => {
  let component: ExtendSessionDialogComponent;
  let fixture: ComponentFixture<ExtendSessionDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let authService: AuthService;
  let oAuthLibWrapperService: OAuthLibWrapperService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        KeyboardFocusTestingModule,
        IconTestingModule,
      ],
      declarations: [ExtendSessionDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendSessionDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    authService = TestBed.inject(AuthService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize timeLeft$ correctly', fakeAsync(() => {
    fixture.detectChanges();
    let time;

    component.timeLeft$.subscribe((t) => {
      time = t;
    });

    tick(1000);
    expect(time).toBe('04:59');

    tick(299_000);
    expect(time).toBe('00:00');
  }));

  it('should call refreshToken on continue session', () => {
    component.continueSession();
    expect(oAuthLibWrapperService.refreshToken).toHaveBeenCalled();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Continue Session'
    );
  });

  it('should call logout on logout', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('Logout');
  });

  it('should dismiss modal with custom reason', () => {
    const reason = 'Custom Reason';
    component.dismissModal(reason);
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(reason);
  });

  it('should handle escape key press to close dialog', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.close')).nativeElement;
    button.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('Cross click');
  });
});
