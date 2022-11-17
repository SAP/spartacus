import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AuthService,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { ICON_TYPE, ModalService } from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable, of, throwError } from 'rxjs';
import { CloseAccountModalComponent } from './close-account-modal.component';
import createSpy = jasmine.createSpy;

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockModalService implements Partial<ModalService> {
  dismissActiveModal(): void {}
}

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  close = createSpy().and.returnValue(of(undefined));
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
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
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let mockModalService: MockModalService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          CloseAccountModalComponent,
          MockCxSpinnerComponent,
          MockCxIconComponent,
        ],
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
            provide: ModalService,
            useClass: MockModalService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAccountModalComponent);
    component = fixture.componentInstance;

    userFacade = TestBed.inject(UserProfileFacade);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    mockModalService = TestBed.inject(ModalService);

    spyOn(routingService, 'go').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close account', () => {
    component.closeAccount();
    expect(userFacade.close).toHaveBeenCalled();
  });

  it('should navigate away and dismiss modal when account is closed', () => {
    spyOn(component, 'onSuccess').and.callThrough();
    spyOn(mockModalService, 'dismissActiveModal').and.callThrough();

    component.ngOnInit();
    component.closeAccount();

    expect(component.onSuccess).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    expect(mockModalService.dismissActiveModal).toHaveBeenCalled();
  });

  it('should dismiss modal when account failed to close', () => {
    spyOn(component, 'onError').and.callThrough();
    spyOn(mockModalService, 'dismissActiveModal').and.callThrough();
    (userFacade.close as any).and.returnValue(throwError(undefined));

    component.ngOnInit();
    component.closeAccount();

    expect(component.onError).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(mockModalService.dismissActiveModal).toHaveBeenCalled();
  });
});
