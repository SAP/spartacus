import { vi } from 'vitest';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AuthService,
  GlobalMessageService,
  MockTranslatePipe,
  MockTranslationService,
  RoutingService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
  SpinnerComponent,
} from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable, of, throwError } from 'rxjs';
import { CloseAccountModalComponent } from './close-account-modal.component';

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn();
}

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  close = vi.fn().mockReturnValue(of(undefined));
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }

  coreLogout = vi.fn().mockReturnValue(Promise.resolve());
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog = vi.fn();
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

describe('CloseAccountModalComponent', () => {
  let component: CloseAccountModalComponent;
  let fixture: ComponentFixture<CloseAccountModalComponent>;
  let userFacade: UserProfileFacade;
  let globalMessageService: GlobalMessageService;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CloseAccountModalComponent],
      providers: [
        {
          provide: UserProfileFacade,
          useClass: MockUserProfileFacade,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
      ],
    })
      .overrideComponent(CloseAccountModalComponent, {
        remove: { imports: [TranslatePipe, IconComponent, SpinnerComponent] },
        add: {
          imports: [
            MockTranslatePipe,
            MockCxIconComponent,
            MockCxSpinnerComponent,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAccountModalComponent);
    component = fixture.componentInstance;

    userFacade = TestBed.inject(UserProfileFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close account', () => {
    component.closeAccount();
    expect(userFacade.close).toHaveBeenCalled();
  });

  it('should navigate away and dismiss modal when account is closed', () => {
    vi.spyOn(component, 'onSuccess');
    // vi.spyOn(launchDialogService, 'closeDialog');

    component.ngOnInit();
    component.closeAccount();

    expect(component.onSuccess).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(launchDialogService.closeDialog).toHaveBeenCalled();
  });

  it('should dismiss modal when account failed to close', () => {
    vi.spyOn(component, 'onError');
    // vi.spyOn(launchDialogService, 'closeDialog');
    (userFacade.close as any).mockReturnValue(throwError(() => undefined));

    component.ngOnInit();
    component.closeAccount();

    expect(component.onError).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(launchDialogService.closeDialog).toHaveBeenCalled();
  });

  it('should closeModal when user click outside', () => {
    const el = fixture.debugElement.nativeElement;
    vi.spyOn(component, 'dismissModal');

    el.click();
    expect(component.dismissModal).toHaveBeenCalledWith('Cross click');
  });
});
