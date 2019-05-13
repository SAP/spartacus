import { Component, Input } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CloseAccountModalComponent } from './close-account-modal.component';
import {
  I18nTestingModule,
  UserService,
  GlobalMessageService,
  RoutingService,
  UserToken,
  AuthService,
} from '@spartacus/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';

import createSpy = jasmine.createSpy;

const mockUserId = 'userId1';

class MockNgbActiveModal {
  dismiss(): void {}

  close(): void {}
}

class MockGlobalMessageService {
  add = createSpy();
}

class MockUserService {
  remove(_userId: string): void {}
  getRemoveUserResultSuccess(): Observable<Boolean> {
    return of();
  }

  getRemoveUserResultLoading(): Observable<Boolean> {
    return of(false);
  }

  resetRemoveUserProcessState(): void {}
}

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}

class MockRoutingService {
  go() {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
export class MockCxIconComponent {
  @Input() type;
}
@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockCxSpinnerComponent {}

describe('CloseAccountModalComponent', () => {
  let component: CloseAccountModalComponent;
  let fixture: ComponentFixture<CloseAccountModalComponent>;
  let userService: UserService;
  let routingService: RoutingService;
  let globalMessageService: any;
  let activeModal: NgbActiveModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, NgbModule],
      declarations: [
        CloseAccountModalComponent,
        MockCxSpinnerComponent,
        MockCxIconComponent,
      ],
      providers: [
        {
          provide: NgbActiveModal,
          useClass: MockNgbActiveModal,
        },
        {
          provide: UserService,
          useClass: MockUserService,
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAccountModalComponent);
    component = fixture.componentInstance;

    userService = TestBed.get(UserService);
    routingService = TestBed.get(RoutingService);
    globalMessageService = TestBed.get(GlobalMessageService);
    activeModal = TestBed.get(NgbActiveModal);

    spyOn(routingService, 'go').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close account', () => {
    spyOn(userService, 'remove');

    component.closeAccount(mockUserId);

    expect(userService.remove).toHaveBeenCalledWith(mockUserId);
  });

  it('should navigate away and dismiss modal when account is closed', () => {
    spyOn(userService, 'getRemoveUserResultSuccess').and.returnValue(of(true));
    spyOn(component, 'onSuccess').and.callThrough();
    spyOn(activeModal, 'dismiss');

    component.ngOnInit();

    expect(component.onSuccess).toHaveBeenCalledWith(true);
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    expect(activeModal.dismiss).toHaveBeenCalled();
  });
});
