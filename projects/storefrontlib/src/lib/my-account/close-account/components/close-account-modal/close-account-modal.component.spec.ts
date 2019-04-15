import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CloseAccountModalComponent } from './close-account-modal.component';
import {
  I18nTestingModule,
  UserService,
  GlobalMessageService,
  RoutingService,
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
  resetRemoveUserProcessState(): void {}
}

class MockRoutingService {
  go() {}
}

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
      declarations: [CloseAccountModalComponent],
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

  it('should navigate away on when account is closed', () => {
    spyOn(userService, 'getRemoveUserResultSuccess').and.returnValue(of(true));
    spyOn(component, 'onSuccess').and.callThrough();

    component.ngOnInit();

    expect(component.onSuccess).toHaveBeenCalledWith(true);
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalledWith({ route: ['home'] });
  });

  it('should close account and dismiss modal', () => {
    spyOn(userService, 'remove');
    spyOn(activeModal, 'dismiss');

    component.closeAccount(mockUserId);

    expect(userService.remove).toHaveBeenCalledWith(mockUserId);
    expect(activeModal.dismiss).toHaveBeenCalled();
  });
});
